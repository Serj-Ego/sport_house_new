from django.contrib.auth.models import Permission
from django.db import models
from django.utils import timezone

from apps.base.models import (
    File,
    Status,
    LocationLight,
    LocationCoating,
    LocationCategory,
    LocationSportType,
)
from apps.user.models import User


# Create your models here.


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
    start_date = models.DateTimeField("Начало работы", null=True)
    end_date = models.DateTimeField("Завершение работы", null=True)
    interval = models.PositiveIntegerField("Интервал", default=None, null=True)
    breaking = models.PositiveIntegerField("Перерыв", default=None, null=True)

    def __str__(self):
        if self.start_date and self.end_date:
            return (
                f"{self.week_name} ({self.start_date.time()} - {self.end_date.time()})"
            )
        else:
            return f"{self.week_name} (Выходной)"

    class Meta:
        verbose_name = "Время работы спортивной площадки"
        verbose_name_plural = "Время работы спортивной площадки"


class LocationOptions(models.Model):
    """Опции спортивной площадки (Создаются автоматически с фронта)"""

    name = models.CharField("Наименование", max_length=255)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Опция спортивной площадки (Создается автоматически с фронта)"
        verbose_name_plural = (
            "Опции спортивной площадки (Создаются автоматически с фронта)"
        )


class LocationKeyWords(models.Model):
    """Ключевые слова спортивной площадки (Создаются автоматически с фронта)"""

    name = models.CharField("Ключевое слово", max_length=255)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = (
            "Ключевое слово спортивной площадки (Создается автоматически с фронта)"
        )
        verbose_name_plural = (
            "Ключевые слова спортивной площадки (Создаются автоматически с фронта)"
        )


class ListLocationStatus(models.Model):
    """Статусы спортивной площадки"""

    created_date = models.DateTimeField("Дата создания", auto_now=True)
    commentary = models.TextField("Комментарий", null=True, blank=True)
    user = models.ForeignKey(
        "user.User", on_delete=models.PROTECT, verbose_name="Пользователь"
    )
    status = models.ForeignKey(Status, on_delete=models.PROTECT, verbose_name="Статус")
    location = models.ForeignKey(
        "Location",
        on_delete=models.CASCADE,
        related_name="listlocationstatus",
        verbose_name="Спортивная площадка",
    )

    class Meta:
        verbose_name = "Статус спортивной площадки"
        verbose_name_plural = "Статусы спортивной площадки"


class ListManagerLocation(models.Model):
    """Менеджеры спортивной площадки"""

    created_date = models.DateTimeField("Дата создания", auto_now=True)
    user = models.ForeignKey(
        "user.User",
        on_delete=models.CASCADE,
        verbose_name="Пользователь",
        related_name="user",
    )
    location = models.ForeignKey(
        "Location",
        on_delete=models.CASCADE,
        related_name="listmanagerlocation",
        verbose_name="Спортивная площадка",
    )
    root = models.ForeignKey(
        Permission, on_delete=models.CASCADE, verbose_name="Права пользователя"
    )
    user_assigned = models.ForeignKey(
        "user.User",
        on_delete=models.PROTECT,
        verbose_name="Пользователь назначивший права",
        related_name="user_assigned",
    )

    class Meta:
        verbose_name = "Менеджер спортивной площадки"
        verbose_name_plural = "Менеджеры спортивной площадки"


class ListBookingStatus(models.Model):
    """Статусы бронирований"""

    created_date = models.DateTimeField("Дата создания", auto_now=True)
    commentary = models.TextField("Комментарий", null=True, blank=True)
    user = models.ForeignKey(
        "user.User", on_delete=models.PROTECT, verbose_name="Пользователь"
    )
    status = models.ForeignKey(Status, on_delete=models.PROTECT, verbose_name="Статус")
    booking = models.ForeignKey(
        "BookingLocation",
        on_delete=models.CASCADE,
        related_name="listbookingstatus",
        verbose_name="Бронирование",
    )

    class Meta:
        verbose_name = "Статусы бронирований"
        verbose_name_plural = "Статусы бронирований"


class BookingLocation(models.Model):
    """Календарь Бронирований на спортивной площадке"""

    date = models.DateField("Дата проведения")
    start_event = models.TimeField("Время начала")
    end_event = models.TimeField("Время завершения")
    creator = models.ForeignKey(
        "user.User",
        on_delete=models.PROTECT,
        verbose_name="Пользователь",
        related_name="user_event",
    )
    members = models.ManyToManyField(
        "user.User", verbose_name="Участники", related_name="user_member_booking"
    )
    created_date = models.DateTimeField("Дата создания", auto_now=True)
    statuses = models.ManyToManyField(
        Status,
        through="ListBookingStatus",
        through_fields=("booking", "status"),
        verbose_name="Cтатусы",
    )

    def add_status(self, user: User, status_name: str, commentary=""):
        """
        Добавить новый статус бронированию

        :param user: Пользователь изменивший статус
        :param status_name: Новый статус
        :param commentary: Комментарий к статусу
        """

        return ListBookingStatus.objects.create(
            created_date=timezone.now(),
            user=user,
            status=Status.objects.get(name=status_name),
            commentary=commentary,
            booking=self,
        )

    @property
    def last_status(self):
        """Последний статус у спортивной площадки"""

        return (
            ListBookingStatus.objects.filter(booking=self)
            .order_by("-created_date")
            .first()
            .status.name
        )

    @property
    def last_commentary(self):
        """Последний комментарий у спортивной площадки"""

        return (
            ListBookingStatus.objects.filter(booking=self)
            .order_by("-created_date")
            .first()
            .commentary
        )

    @property
    def location(self):
        return Location.objects.filter(bookings=self)

    class Meta:
        verbose_name = "Бронирование площадки"
        verbose_name_plural = "Бронирования площадки"


class Location(models.Model):
    """Спортивные площадки"""

    full_name = models.CharField("Полное наименование объекта", max_length=1020)
    short_name = models.CharField(
        "Сокращенное наименование объекта", max_length=510, null=True, blank=True
    )
    description = models.TextField("Описание")
    images = models.ManyToManyField(File, verbose_name="Изображения площадки")
    address = models.ForeignKey(
        LocationAddress, on_delete=models.PROTECT, verbose_name="Адрес"
    )
    work_time = models.ManyToManyField(WorkTimeLocation, verbose_name="Время работы")
    price = models.PositiveIntegerField("Стоимость (в час)", default=0)
    length = models.PositiveIntegerField("Длина")
    width = models.PositiveIntegerField("Ширина")
    squad = models.PositiveIntegerField("Площадь")
    lighting = models.ForeignKey(
        LocationLight, verbose_name="Освещение", on_delete=models.PROTECT
    )
    coating = models.ForeignKey(
        LocationCoating, verbose_name="Покрытие", on_delete=models.PROTECT
    )
    category = models.ForeignKey(
        LocationCategory, verbose_name="Категория", on_delete=models.PROTECT
    )
    sport_type = models.ManyToManyField(LocationSportType, verbose_name="Вид спорта")
    is_covered = models.BooleanField("Крытая площадка", default=False)
    options = models.ManyToManyField(
        LocationOptions, verbose_name="Опции спортивной площадки"
    )
    phone = models.CharField("Номер телефона", max_length=20)
    additional_phone = models.CharField(
        "Доп. номер телефона", max_length=20, null=True, blank=True
    )
    additional_phone_code = models.CharField(
        "Доп. код для дополнительного номера", max_length=20, null=True, blank=True
    )
    email = models.EmailField("Электронный адрес площадки")
    web_site = models.CharField("Веб сайт площадки", blank=True, null=True, max_length=10000)
    keywords = models.ManyToManyField(LocationKeyWords, verbose_name="Ключевые слова")
    statuses = models.ManyToManyField(
        Status,
        through="ListLocationStatus",
        through_fields=("location", "status"),
        verbose_name="Cтатусы",
    )
    owner = models.ForeignKey(
        "user.User",
        on_delete=models.PROTECT,
        verbose_name="Владелец спортивной площадки",
    )
    created_date = models.DateTimeField("Дата создания", auto_now=True)
    managers = models.ManyToManyField(
        "user.User",
        through="ListManagerLocation",
        through_fields=("location", "user"),
        verbose_name="Менеджеры",
        related_name="managers",
    )
    is_blocked = models.BooleanField("Блокировка", default=False)
    max_member = models.PositiveIntegerField(
        "Максимальное количество участников", default=0
    )
    max_viewer = models.PositiveIntegerField(
        "Максимальное количество зрителей", default=0
    )
    bookings = models.ManyToManyField(BookingLocation, verbose_name="Бронирования")

    def add_status(self, user: User, status_name: str, commentary=""):
        """
        Добавить новый статус спортивной площадке

        :param user: Пользователь изменивший статус
        :param status_name: Новый статус
        :param commentary: Комментарий к статусу
        """

        return ListLocationStatus.objects.create(
            created_date=timezone.now(),
            user=user,
            status=Status.objects.get(name=status_name),
            commentary=commentary,
            location=self,
        )

    @property
    def last_status(self):
        """Последний статус у спортивной площадки"""

        return (
            ListLocationStatus.objects.filter(location=self)
            .order_by("-created_date")
            .first()
            .status.name
        )

    class Meta:
        verbose_name = "Спортивная площадка"
        verbose_name_plural = "Спортивные площадки"
