from django.contrib import admin

from apps.ai.models import ModelType, FileRecomendationModel, OrderRecomendationField


@admin.register(ModelType)
class ModelTypeAdmin(admin.ModelAdmin):
    """Регистрация типа модели для ИИ"""

    list_display = [
        "name",
    ]
    search_fields = ("name",)


@admin.register(FileRecomendationModel)
class FileRecomendationModelAdmin(admin.ModelAdmin):
    """Регистрация файла модели для ИИ"""

    list_display = [
        "name",
        "created_date",
        "is_active",
        "type",
    ]
    search_fields = ("name",)


@admin.register(OrderRecomendationField)
class OrderRecomendationFieldAdmin(admin.ModelAdmin):
    """Регистрация порядка рекомендаций для ИИ"""

    list_display = [
        "name",
        "slug",
        "order_num",
    ]
    search_fields = (
        "name",
        "slug",
    )
