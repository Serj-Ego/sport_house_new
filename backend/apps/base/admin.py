from django.contrib import admin

# Register your models here.
from apps.base.models import (
    File,
    FileType,
    SportType,
    PhysicalTraining,
    SportTypeСontraindication,
    NotificationType,
    Status,
    BreakfastEatType,
    LunchEatType,
    DinnerEatType,
    LocationCategory,
    LocationSportType,
)


@admin.register(FileType)
class FileTypeAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "created_date",
    ]
    search_fields = ("name",)


@admin.register(File)
class FileAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "created_date",
        "file_type",
    ]
    search_fields = (
        "name",
        "file_type",
    )


@admin.register(SportType)
class SportTypeAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "index",
    ]
    search_fields = ("name",)


@admin.register(SportTypeСontraindication)
class SportTypeAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "index",
    ]
    search_fields = ("name",)


@admin.register(BreakfastEatType)
class BreakfastEatTypeAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "index",
    ]
    search_fields = ("name",)


@admin.register(LunchEatType)
class LunchEatTypeTypeAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "index",
    ]
    search_fields = ("name",)


@admin.register(DinnerEatType)
class DinnerEatTypeTypeAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "index",
    ]
    search_fields = ("name",)


@admin.register(PhysicalTraining)
class PhysicalTrainingAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "index",
    ]
    search_fields = ("name",)


@admin.register(NotificationType)
class NotificationTypeAdmin(admin.ModelAdmin):
    list_display = [
        "name",
    ]
    search_fields = ("name",)


@admin.register(Status)
class StatusAdmin(admin.ModelAdmin):
    list_display = [
        "name",
    ]
    search_fields = ("name",)


@admin.register(LocationCategory)
class LocationCategoryAdmin(admin.ModelAdmin):
    list_display = ["name"]
    search_fields = ("name",)


@admin.register(LocationSportType)
class LocationSportTypeAdmin(admin.ModelAdmin):
    list_display = ["name"]
    search_fields = ("name",)
