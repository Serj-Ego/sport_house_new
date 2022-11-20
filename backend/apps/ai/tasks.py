import os
import pickle

from apps.ai.models import ModelTypeConst, FileRecomendationModel
from apps.ai.utils import (
    convert_input_data,
    start_calculate_predict,
    get_labels_model,
    get_recomendation_field,
)
from apps.base.models import NotificationTypeConst
from apps.user.models import UserReccomendationInfo, UserRecommendation, User
from apps.user.utils.notification import send_user_notification
from config.celery_app import app


def start_calculation(
    user: User, recomendation: UserRecommendation, input_data: list, model_type: str
) -> None:
    """Расчет рекомендации/противопоказаний по разным моделям"""
    if model := FileRecomendationModel.objects.filter(
        is_active=True, type__name=model_type
    ).first():
        model_file = model.file.path.path
        if os.path.exists(model_file):
            with open(model_file, "rb") as f:
                model = pickle.load(f)
                labels_encode_inv = {
                    v[0]: v[1]
                    for v in get_labels_model(model_name=model_type)
                    .objects.all()
                    .values_list("index", "name")
                }
                data = start_calculate_predict(model, input_data, labels_encode_inv)
                for value in data:
                    get_recomendation_field(
                        model_name=model_type, recomendation=recomendation
                    ).add(
                        get_labels_model(model_name=model_type).objects.get(name=value)
                    )

        else:
            send_user_notification(
                user,
                "Опссс...",
                body="При расчете произошла ошибка!",
            )
            raise FileExistsError("Файл модели отсутствует!")
    else:
        send_user_notification(
            user,
            "Опссс...",
            body="При расчете произошла ошибка!",
        )
        raise ModuleNotFoundError("Текущая модель не найдена!")


@app.task()
def calculate_recomendation(user):
    """Задача для запуска расчета рекомендаций"""
    user = User.objects.get(id=user)
    input_data = UserReccomendationInfo.objects.filter(user=user).first()
    converting_data = convert_input_data(input_data)
    recomendation_instance = UserRecommendation.objects.create()
    user.recommendation.add(recomendation_instance)

    for model_name in (
        ModelTypeConst.SPORT,
        ModelTypeConst.NO_REC_SPORT,
        ModelTypeConst.BREAKFAST,
        ModelTypeConst.LUNCH,
        ModelTypeConst.DINNER,
    ):
        start_calculation(user, recomendation_instance, converting_data, model_name)

    send_user_notification(
        user,
        "Расчет рекомендации завершен🎉",
        body="Просмотр рекомендации доступен в Вашем профиле",
        type=NotificationTypeConst.RECOMENDATION,
    )
