from colorfield.fields import ColorField
from django.db import models

# Create your models here.
from django.utils import timezone

from apps.base.models import FileTypeConst, File, Status


class LocationCategory(models.Model):
    """Категории площадок"""

    name = models.CharField("Наименование", max_length=255)
    description = models.TextField("Описание", null=True)
    color = ColorField(format="hex")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "(Справочник) Категория спортивной площадки"
        verbose_name_plural = "(Справочник) Категории спортивных площадок"


def get_file_path(file: "Location", filename: str) -> str:
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
        file_type=FileTypeConst.SPORT_ICON,
    )


def get_file_path_location_image(file: "LocationSportType", filename: str) -> str:
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
        file_type=FileTypeConst.LOCATION_IMAGE,
    )


class LocationSportType(models.Model):
    """Категории спорта на локации"""

    name = models.CharField("Наименование", max_length=255)
    slug = models.SlugField("Слаг наименования", max_length=255)
    icon = models.ImageField("Иконка категории", upload_to=get_file_path, null=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "(Справочник) Категория спорта на локации"
        verbose_name_plural = "(Справочник) Категории спорта на локации"


class LocationAddress(models.Model):
    """Адрес спортивной площадки"""

    locality = models.CharField("Город", max_length=255, null=True, blank=True)
    sub_thoroughfare = models.CharField(
        "Номер дома/строения", max_length=255, null=True, blank=True
    )
    sub_locality = models.CharField("", max_length=255, null=True, blank=True)
    postal_code = models.CharField("Индекс", max_length=255, null=True, blank=True)
    administrative_area = models.CharField(
        "Область", max_length=255, null=True, blank=True
    )
    country = models.CharField("Страна", max_length=255, null=True, blank=True)
    sub_administrative_area = models.CharField(
        "Округ", max_length=255, null=True, blank=True
    )
    thoroughfare = models.CharField("Улица", max_length=255, null=True, blank=True)
    country_code = models.CharField("Код страны", max_length=255, null=True, blank=True)
    name = models.CharField(
        "Полный адрес (Улица и дом)", max_length=255, null=True, blank=True
    )
    latitude = models.FloatField("Широта", null=True, blank=True)
    longitude = models.FloatField("Долгота", null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "(Справочник) Адрес"
        verbose_name_plural = "(Справочник) Адреса"


class WorkTimeLocation(models.Model):
    """Время работы спортивной площадки"""

    week_name = models.CharField("День Недели", max_length=255)
    start_date = models.DateTimeField("Начало работы")
    end_date = models.DateTimeField("Завершение работы")

    def __str__(self):
        return self.week_name

    class Meta:
        verbose_name = "Время работы спортивной площадки"
        verbose_name_plural = "Время работы спортивной площадки"


class LocationStatus(models.Model):
    """Статус площадки"""

    status = models.ForeignKey(Status, verbose_name="Статус", on_delete=models.CASCADE)
    created_date = models.DateTimeField("Дата создания", auto_now=True)
    commentary = models.TextField("Комментарий", null=True, blank=True)
    user = models.ForeignKey(
        "user.User", on_delete=models.CASCADE, verbose_name="Пользователь"
    )

    def __str__(self):
        return self.status.name

    class Meta:
        verbose_name = "Статус площадки"
        verbose_name_plural = "Статус площадки"


class Location(models.Model):
    """Спортивные площадки"""

    images = models.ManyToManyField(File, verbose_name="Изображения площадки")
    name = models.CharField("Наименование", max_length=510, null=True, blank=True)
    description = models.TextField("Описание", null=True, blank=True)
    category = models.ManyToManyField(LocationCategory, verbose_name="Категорииб")
    sports = models.ManyToManyField(
        LocationSportType, verbose_name="Список категорий спорта на площадке"
    )
    confirmed_phone = models.CharField(
        "Номер телефона для подтверждения площадки",
        max_length=20,
        null=True,
        blank=True,
    )
    phone = models.CharField("Номер телефона", max_length=20, null=True, blank=True)
    additional_phone = models.CharField(
        "Доп. номер телефона", max_length=20, null=True, blank=True
    )
    email = models.EmailField("Электронный адрес площадки", null=True, blank=True)
    additional_email = models.EmailField(
        "Доп. электронный адрес площадки", null=True, blank=True
    )
    work_time = models.ManyToManyField(WorkTimeLocation, verbose_name="Время работы")
    address = models.ForeignKey(
        LocationAddress, on_delete=models.SET_NULL, null=True, blank=True
    )
    owner = models.ForeignKey(
        "user.User", on_delete=models.CASCADE, null=True, blank=True
    )
    created_date = models.DateTimeField("Дата создания", auto_now=True)

    status_list = models.ManyToManyField(LocationStatus, verbose_name="Статусы локации")

    def __str__(self):
        return self.name

    @property
    def last_status(self):
        return self.status_list.all().order_by("-created_date").first().status

    @property
    def last_status_commentary(self):
        return self.status_list.all().order_by("-created_date").first().commentary

    def add_status(self, user, status_name, commentary=None):
        status = LocationStatus.objects.create(
            user=user,
            status=Status.objects.get(name=status_name),
            commentary=commentary,
        )
        self.status_list.add(status)

    class Meta:
        verbose_name = "Спортивная площадка"
        verbose_name_plural = "Спортивные площадки"
