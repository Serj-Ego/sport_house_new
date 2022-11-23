from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
from apps.base.models import (
    File,
    SportType,
    PhysicalTraining,
    SportTypeСontraindication,
    NotificationType,
    BreakfastEatType,
    LunchEatType,
    DinnerEatType,
)


class User(AbstractUser):
    """Пользователь"""

    first_name = models.CharField("Имя", max_length=255)
    last_name = models.CharField("Фамилия", max_length=255)
    patronymic = models.CharField("Отчество", max_length=255, blank=True, null=True)
    email = models.EmailField("E-Mail", unique=True)
    avatar = models.ManyToManyField(
        File, verbose_name="Аватарки пользователя", blank=True
    )
    notification_token = models.CharField(
        "Токен для Push уведомлений", max_length=255, blank=True, null=True
    )
    recommendation = models.ManyToManyField(
        "UserRecommendation", verbose_name="Мои Рекомендации", blank=True
    )
    user_notification = models.ManyToManyField(
        "UserNotification",
        verbose_name="Пуш-уведомления",
        related_name="user_notifications",
    )
    # my_location = models.ManyToManyField(Location, verbose_name="Мои площадки")
    confirm_code = models.PositiveIntegerField(
        "Код-подтверждения", null=True, blank=True
    )

    @property
    def get_last_avatar_uri(self):
        avatar = self.avatar.all().order_by("-created_date").first()
        if avatar:
            return avatar.path.url
        return None

    @property
    def get_last_recommendation(self):
        return self.recommendation.all().order_by("-created_date").first()

    @property
    def get_count_not_read_notification(self):
        if self.user_notification.filter(is_read=False).count() > 0:
            return True
        return False

    @property
    def group_names(self) -> set[str]:
        return set(self.groups.all().values_list("name", flat=True))

    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"

    def __str__(self):
        return f"{self.username}"


class UserReccomendationInfo(models.Model):
    """Данные для расчета рекомендаций пользователя"""

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        verbose_name="Пользователь",
        related_name="user_recomendation_info",
    )
    gender = models.CharField("Пол", max_length=8, null=True, blank=True)
    age = models.PositiveIntegerField("Возраст", null=True, blank=True)
    weight = models.FloatField("Вес", null=True, blank=True)
    height = models.FloatField("Рост", null=True, blank=True)
    physical_training = models.ForeignKey(
        PhysicalTraining,
        on_delete=models.PROTECT,
        verbose_name="Физическая подготовка",
        null=True,
        blank=True,
    )
    meat = models.BooleanField("Мясо", null=True, blank=True)
    fish = models.BooleanField("Рыба", null=True, blank=True)
    milk = models.BooleanField("Молочные продукты", null=True, blank=True)
    egg = models.BooleanField("Яйца", null=True, blank=True)
    allergy_citrus = models.BooleanField("Аллергия (цитрусовые)", null=True, blank=True)
    allergy_nut = models.BooleanField("Аллергия (орехи)", null=True, blank=True)
    allergy_honey = models.BooleanField("Аллергия (мед)", null=True, blank=True)
    musculoskeletal_system = models.BooleanField(
        "Заболевание(Опорно-двигательный аппарат)", null=True, blank=True
    )
    diabetes = models.BooleanField("Заболевание(Диабет)", null=True, blank=True)
    health = models.BooleanField(
        "Заболевание(Сердечно-сосудистые)", null=True, blank=True
    )
    varicose = models.BooleanField(
        "Заболевание(Варикозное расширение вен)", null=True, blank=True
    )
    epilepsy = models.BooleanField("Заболевание(Эпилепсия)", null=True, blank=True)
    myopia = models.BooleanField("Заболевание(Близорукость)", null=True, blank=True)
    breath = models.BooleanField("Заболевание(Органы дыхания)", null=True, blank=True)
    digestion = models.BooleanField(
        "Заболевание(Органы пищеварения)", null=True, blank=True
    )
    sport_type = models.CharField("Тип спорта", max_length=255, null=True, blank=True)
    training_type = models.CharField(
        "Тип тренировки", max_length=255, null=True, blank=True
    )

    class Meta:
        verbose_name = "Входные данные рекомендаций"
        verbose_name_plural = "Входные данные рекомендаций"


class UserRecommendation(models.Model):
    """Рекомендации пользователей"""

    created_date = models.DateTimeField("Дата создания", auto_now=True)
    sport = models.ManyToManyField(
        SportType, verbose_name="Рекомендации по видам спорта", symmetrical=False
    )
    no_rec_sport = models.ManyToManyField(
        SportTypeСontraindication,
        verbose_name="Рекомендации по противопоказанным видам спорта",
        symmetrical=False,
    )
    breakfast = models.ManyToManyField(
        BreakfastEatType,
        verbose_name="Рекомендации по питанию (Завтрак)",
        symmetrical=False,
    )
    lunch = models.ManyToManyField(
        LunchEatType,
        verbose_name="Рекомендации по питанию (Обед)",
        symmetrical=False,
    )
    dinner = models.ManyToManyField(
        DinnerEatType,
        verbose_name="Рекомендации по питанию (Ужин)",
        symmetrical=False,
    )

    class Meta:
        verbose_name = "Выходные данные рекомендаций"
        verbose_name_plural = "Выходные данные рекомендаций"


class UserNotification(models.Model):
    """Пуш - уведомления пользователей"""

    title = models.CharField("Заголовок уведомления", max_length=255)
    body = models.CharField("Тело уведомления", max_length=255)
    delivered = models.BooleanField(
        "Статус доставки уведомления", null=True, default=None
    )
    delivered_message = models.TextField(
        "Текст сообщения об ошибке доставки", null=True, blank=True
    )
    notification_id = models.CharField(
        "Идентификатор уведомления", max_length=255, null=True, blank=True
    )
    is_read = models.BooleanField("Прочитано ли уведомление", default=False)
    created_date = models.DateTimeField("Дата создания", auto_now=True)
    read_date = models.DateTimeField("Дата прочтения", null=True, blank=True)
    type = models.ForeignKey(
        NotificationType,
        related_name="notification",
        verbose_name="Тип уведомления",
        on_delete=models.SET_NULL,
        null=True,
    )

    class Meta:
        verbose_name = "Пуш - уведомление пользователя"
        verbose_name_plural = "Пуш - уведомления пользователей"
