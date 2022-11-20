from django.contrib import admin, messages
from django.contrib.admin import SimpleListFilter
from django.db.models import F, Subquery
from django.http import HttpResponseRedirect
from django.urls import path
from django.utils.html import format_html

from apps.base.models import StatusConst, Status

# Register your models here.
from apps.location.models import (
    LocationCategory,
    LocationSportType,
    Location,
    LocationStatus,
)


@admin.register(LocationCategory)
class LocationCategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "description"]
    search_fields = ("name",)


@admin.register(LocationSportType)
class LocationSportTypeAdmin(admin.ModelAdmin):
    list_display = ["name", "slug"]
    search_fields = ("name",)


# class StatusLocationFilter(SimpleListFilter):
#     title = "Статус"
#     parameter_name = "status"
#
#     def lookups(self, request, model_admin):
#         countries = set([c.last_status for c in model_admin.model.objects.all()])
#         return [(c.id, c.name) for c in countries]
#
#     def queryset(self, request, queryset):
#         if self.value():
#             a = queryset.all().annotate(last_status_id=Subquery())
#             return queryset.filter(status_list__status__id=self.value())


@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "description",
        "get_last_status",
        "location_actions",
    ]

    def get_last_status(self, obj):
        if obj.last_status:
            return obj.last_status
        else:
            return "Not Available"

    get_last_status.short_description = "Текущий статус"

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path(
                "<int:pk>/approve-location/",
                self.approve_location,
                name="approve-location",
            ),
            path(
                "<int:pk>/reject-location/",
                self.reject_location,
                name="reject-location",
            ),
        ]
        return custom_urls + urls

    def approve_location(self, request, pk):
        instance = Location.objects.get(pk=pk)
        instance.add_status(
            request.user,
            StatusConst.CONFIRMED,
        )
        messages.add_message(
            request, messages.SUCCESS, "Спортивная площадка успешно подтверждена!"
        )
        return HttpResponseRedirect("../")

    def reject_location(self, request, pk):
        instance = Location.objects.get(pk=pk)
        instance.add_status(
            request.user,
            StatusConst.REJECTED,
            "Для уточнения обратитесь в техническую поддержку: support@my-sport-house.ru",
        )
        messages.add_message(request, messages.ERROR, "Спортивная площадка отклонена!")
        return HttpResponseRedirect("../")

    def location_actions(self, obj):
        if obj.last_status.name == StatusConst.REVIEW:
            return format_html(
                f'<a class="button" style="background:green" href="{obj.pk}/approve-location/">Подтвердить</a>'
                f"</br>"
                f"</br>"
                f'<a class="button" style="background:red" href="{obj.pk}/reject-location/">Отклонить</a>',
            )

    location_actions.short_description = "Действия"
    location_actions.allow_tags = True

    search_fields = ("name",)
    list_filter = ("created_date",)
