from django.contrib import admin

from apps.location.models import Location


@admin.register(Location)
class LocationLightAdmin(admin.ModelAdmin):
    list_display = ["full_name", "short_name", "phone", "email"]
    search_fields = (
        "full_name",
        "short_name",
        "phone",
        "email",
    )
