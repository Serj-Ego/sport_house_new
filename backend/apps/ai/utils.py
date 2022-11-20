from apps.ai.models import OrderRecomendationField, ModelTypeConst
from apps.base.models import (
    GenderConst,
    SportType,
    SportTypeСontraindication,
    BreakfastEatType,
    LunchEatType,
    DinnerEatType,
)
from apps.user.models import UserReccomendationInfo


def convert_input_data(data: [UserReccomendationInfo]):
    """Конвертирует queryset в список числовых данных"""
    # получаем список полей, отсортированные по требуемому порядку
    fields = OrderRecomendationField.objects.all().order_by("order_num")
    input_data = []
    for field_name in fields:
        # получаем значение из данных пользователя по нужным полям
        value = getattr(data, field_name.slug)
        if field_name.slug == "gender":
            if value == GenderConst.MALE:
                value = 1
            if value == GenderConst.FEMALE:
                value = 0
        if field_name.slug == "physical_training":
            value = value.index
        if field_name.slug == "sport_type":
            if value == "Игровой":
                value = 0
            elif value == "Неигровой":
                value = 1
        if field_name.slug == "training_type":
            if value == "Командная":
                value = 0
            elif value == "Индивидуальная":
                value = 1
        if isinstance(value, bool):
            if value:
                value = 1
            else:
                value = 0
        input_data.append(value)
    return input_data


def get_labels_model(model_name):
    if model_name == ModelTypeConst.SPORT:
        return SportType
    elif model_name == ModelTypeConst.NO_REC_SPORT:
        return SportTypeСontraindication
    elif model_name == ModelTypeConst.BREAKFAST:
        return BreakfastEatType
    elif model_name == ModelTypeConst.LUNCH:
        return LunchEatType
    elif model_name == ModelTypeConst.DINNER:
        return DinnerEatType
    else:
        raise TypeError("Неверно передан тип модели!!")


def get_recomendation_field(model_name, recomendation):
    if model_name == ModelTypeConst.SPORT:
        return recomendation.sport
    elif model_name == ModelTypeConst.NO_REC_SPORT:
        return recomendation.no_rec_sport
    elif model_name == ModelTypeConst.BREAKFAST:
        return recomendation.breakfast
    elif model_name == ModelTypeConst.LUNCH:
        return recomendation.lunch
    elif model_name == ModelTypeConst.DINNER:
        return recomendation.dinner
    else:
        raise TypeError("Неверно передан тип модели!!")


def start_calculate_predict(model, row: list, labels_encode_inv: dict):
    """ПРОГНОЗ для одного человека"""

    thresh_val = 0.1  # ПОРОГ
    dicts_pred = {
        labels_encode_inv[num]: i for num, i in enumerate(model.predict_proba([row])[0])
    }
    dicts_pred = dict(sorted(dicts_pred.items(), key=lambda x: x[1], reverse=True))
    out_pred = [k for k, v in dicts_pred.items() if v >= thresh_val]

    # если список пустой, то надо порог понизить
    if out_pred.__len__() == 0:
        out_pred = [k for k, v in dicts_pred.items() if v >= 0.05]

    return out_pred
