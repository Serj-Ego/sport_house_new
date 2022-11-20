from django.contrib import admin

from apps.user.models import UserRecommendation


# Register your models here.


@admin.register(UserRecommendation)
class UserRecommendationAdmin(admin.ModelAdmin):
    list_display = ["id", "created_date"]
