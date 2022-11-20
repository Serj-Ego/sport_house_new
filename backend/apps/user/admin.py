from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth import admin as auth_admin
from django.contrib.admin.filters import RelatedOnlyFieldListFilter
from apps.user.models import UserReccomendationInfo, UserNotification

# Register your models here.

User = get_user_model()


@admin.register(User)
class UserAdmin(auth_admin.UserAdmin):
    list_display = [
        "username",
        "first_name",
        "last_name",
        "patronymic",
        "is_superuser",
    ]
    fieldsets = (
        (None, {"fields": ("username", "password")}),
        (
            "Персональная информация",
            {"fields": ("first_name", "last_name", "patronymic", "email")},
        ),
        (
            "Права доступа",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                    "recommendation",
                )
            },
        ),
        ("Важные даты", {"fields": ("last_login", "date_joined")}),
    )
    search_fields = ["username", "last_name", "first_name", "patronymic"]


@admin.register(UserReccomendationInfo)
class UserReccomendationInfoAdmin(admin.ModelAdmin):
    list_display = ["user"]
    search_fields = ("user",)


@admin.register(UserNotification)
class UserNotificationAdmin(admin.ModelAdmin):
    list_display = [
        "title",
        "delivered",
        "created_date",
    ]
    list_filter = (
        ("user_notifications", RelatedOnlyFieldListFilter),
        "created_date",
        "delivered",
    )
    search_fields = (
        "delivered",
        "created_date",
    )
