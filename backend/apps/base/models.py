from django.db import models

# Create your models here.
from django.utils import timezone


class FileTypeConst:
    """(Константы) Типы файлов"""

    AVATAR_IMAGE = "AVATAR_IMAGE"
    SPORT_ICON = "SPORT_ICON"
    LOCATION_IMAGE = "LOCATION_IMAGE"
    MODEL_FILE = "MODEL_FILE"


class GenderConst:
    MALE = "male"
    FEMALE = "female"


class NotificationTypeConst:
    RECOMENDATION = "Рекомендации"
    OTHER = "Иные"


class RoleConst:
    SPORTSMAN = "Спортсмен"
    SPORT_AREA = "Спортивная площадка"


class StatusConst:
    DRAFT = "Черновик"
    CREATED = "Создано"
    REVIEW = "На проверке"
    CONFIRMED = "Подтверждено"
    ARCHIVE = "Архив"
    PUBLISHED = "Опубликовано"
    REJECTED = "Отклонено"


class FileType(models.Model):
    """(Справочник) Типы файлов"""

    name = models.CharField("Тип файла", max_length=255)
    created_date = models.DateTimeField("Дата создания", auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "(Справочник) Тип файла"
        verbose_name_plural = "(Справочник) Типы файлов"


def get_file_path(file: "File", filename: str) -> str:
    """
    Возвращает путь до папки сохранения файла в зависимости
     от даты и типа файла
    """
    now = timezone.now()
    return "{file_type}/{year}/{month}/{day}/{filename}".format(
        year=now.strftime("%Y"),
        month=now.strftime("%m"),
        day=now.strftime("%d"),
        filename=filename,
        file_type=file.file_type.name,
    )


class File(models.Model):
    """Файловое хранилище"""

    name = models.CharField("Название файла", max_length=510)
    path = models.FileField("Файл", upload_to=get_file_path)
    file_type = models.ForeignKey(
        FileType, verbose_name="Тип файла", on_delete=models.SET_NULL, null=True
    )
    created_date = models.DateTimeField("Дата создания", auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Файл"
        verbose_name_plural = "Файлы"


class SportType(models.Model):
    """(Справочник) Виды спорта"""

    name = models.CharField("Спорт", max_length=255)
    index = models.IntegerField("Индекс спорта (для ИИ)", unique=True)
    description = models.TextField("Описание", null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "(Справочник) Вид спорта"
        verbose_name_plural = "(Справочник) Виды спорта"


class SportTypeСontraindication(models.Model):
    """(Справочник) Виды спорта - для противопоказаний"""

    name = models.CharField("Спорт", max_length=255)
    index = models.IntegerField("Индекс спорта (для ИИ)", unique=True)
    description = models.TextField("Описание", null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "(Справочник) Вид спорта - для противопоказаний"
        verbose_name_plural = "(Справочник) Виды спорта - для противопоказаний"


class BreakfastEatType(models.Model):
    """(Справочник) Виды блюд на завтрак"""

    name = models.CharField("Вид блюда", max_length=255)
    index = models.IntegerField("Индекс блюда (для ИИ)", unique=True)
    description = models.TextField("Описание", null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "(Справочник) Виды блюд на завтрак"
        verbose_name_plural = "(Справочник) Виды блюд на завтрак"


class LunchEatType(models.Model):
    """(Справочник) Виды блюд на обед"""

    name = models.CharField("Вид блюда", max_length=255)
    index = models.IntegerField("Индекс блюда (для ИИ)", unique=True)
    description = models.TextField("Описание", null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "(Справочник) Виды блюд на обед"
        verbose_name_plural = "(Справочник) Виды блюд на обед"


class DinnerEatType(models.Model):
    """(Справочник) Виды блюд на ужин"""

    name = models.CharField("Вид блюда", max_length=255)
    index = models.IntegerField("Индекс блюда (для ИИ)", unique=True)
    description = models.TextField("Описание", null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "(Справочник) Виды блюд на ужин"
        verbose_name_plural = "(Справочник) Виды блюд на ужин"


class PhysicalTraining(models.Model):
    """(Справочник) Виды физической подготовки"""

    name = models.CharField("Наименование", max_length=255)
    index = models.IntegerField("Индекс (для ИИ)", unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "(Справочник) Вид физической подготовки"
        verbose_name_plural = "(Справочник) Виды физической подготовки"


class NotificationType(models.Model):
    """(Справочник) Типы уведомлений"""

    name = models.CharField("Тип уведомления", max_length=255)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "(Справочник) Тип уведомления"
        verbose_name_plural = "(Справочник) Типы уведомлений"


class Status(models.Model):
    """Статусы"""

    name = models.CharField("Название", max_length=255)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "(Справочник) Статус"
        verbose_name_plural = "(Справочник) Статусы"


class LocationCategory(models.Model):
    """Категории площадок"""

    name = models.CharField("Наименование", max_length=255)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "(Справочник) Категория спортивной площадки"
        verbose_name_plural = "(Справочник) Категории спортивных площадок"


class LocationSportType(models.Model):
    """Категории спорта на локации"""

    name = models.CharField("Наименование", max_length=255)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "(Справочник) Категория спорта на локации"
        verbose_name_plural = "(Справочник) Категории спорта на локации"
