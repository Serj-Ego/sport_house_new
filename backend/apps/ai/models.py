from django.db import models

from apps.base.models import File


class ModelTypeConst:
    """(Константы) Типы моделей обучения"""

    SPORT = "SPORT"
    NO_REC_SPORT = "NO_REC_SPORT"
    BREAKFAST = "BREAKFAST"
    LUNCH = "LUNCH"
    DINNER = "DINNER"


class ModelType(models.Model):
    """(Справочник) Типы моделей обучения"""

    name = models.CharField("Наименование", max_length=255)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "(Справочник) Тип модели обучения"
        verbose_name_plural = "(Справочник) Типы модели обучения"


class FileRecomendationModel(models.Model):
    """(Справочник) Модель для хранения модели обучения интеллекта"""

    name = models.CharField("Наименование", max_length=255)
    created_date = models.DateTimeField("Дата создания", auto_now=True)
    file = models.ForeignKey(File, on_delete=models.PROTECT, verbose_name="Файл модели")
    type = models.ForeignKey(
        ModelType, on_delete=models.PROTECT, verbose_name="Тип модели"
    )
    is_active = models.BooleanField("Активная модель", default=False)

    def __str__(self):
        return f"{self.name}/{'Активная' if self.is_active else 'Неактивная'}"

    class Meta:
        verbose_name = "(Справочник) Модель обучения"
        verbose_name_plural = "(Справочник) Модели обучения"


class OrderRecomendationField(models.Model):
    """(Справочник) Порядок входных полей"""

    name = models.CharField("Наименование", max_length=255)
    slug = models.SlugField("Слаг поля")
    order_num = models.PositiveIntegerField("Порядок", unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "(Справочник) Порядок входных полей"
        verbose_name_plural = "(Справочник) Порядок входных полей"
