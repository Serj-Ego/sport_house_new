from django.contrib import admin, messages
from django.http import HttpResponseRedirect
from django.urls import path
from django.utils.html import format_html

from apps.base.models import StatusConst
from apps.location.models import Location


@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    """Регистрация спортивной площадки в административной панели"""

    list_display = (
        "full_name",
        "category",
        "sport_type",
        "get_last_status",
        "is_blocked",
        "location_actions",
    )
    search_fields = (
        "full_name",
        "short_name",
        "phone",
        "email",
    )

    filter_horizontal = (
        "images",
        "work_time",
        "options",
        "keywords",
    )

    list_filter = (
        "is_blocked",
        "category",
        "sport_type",
    )

    fieldsets = (
        (
            "Основная информация",
            {
                "fields": (
                    "full_name",
                    "short_name",
                    "description",
                    "images",
                    "img_preview",
                    "address",
                    "work_time",
                    "price",
                )
            },
        ),
        (
            "Размеры площадки",
            {
                "fields": (
                    "length",
                    "width",
                    "squad",
                )
            },
        ),
        (
            "Характеристики площадки",
            {
                "fields": (
                    "lighting",
                    "coating",
                    "category",
                    "sport_type",
                    "is_covered",
                    "options",
                )
            },
        ),
        (
            "Контактные данные площадки",
            {
                "fields": (
                    "phone",
                    "additional_phone",
                    "additional_phone_code",
                    "email",
                    "web_site",
                )
            },
        ),
        (
            "Опционально",
            {"fields": ("keywords",)},
        ),
        (
            "Внутренняя информация",
            {
                "fields": (
                    "owner",
                    "created_date",
                    # "managers",
                    "is_blocked",
                    "get_last_status",
                )
            },
        ),
    )
    readonly_fields = (
        "created_date",
        "img_preview",
        "get_last_status",
    )

    def get_last_status(self, obj):
        if obj.last_status:
            return obj.last_status
        else:
            return "Not Available"

    def img_preview(self, obj):
        images = obj.images.all()
        img_html = "<table><thead><tr>"
        for image in images:
            img_html = (
                img_html
                + f'<td><img src="{image.path.url}" width = "300px" height = "300px"/></td>'
            )
        img_html = img_html + "</tr></thead></table>"
        from django.utils.safestring import mark_safe

        return mark_safe(img_html)

    img_preview.short_description = "Предпросмотр фото"
    img_preview.allow_tags = True

    get_last_status.short_description = "Последний статус"

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
            path(
                "<int:pk>/block-location/",
                self.block_location,
                name="block-location",
            ),
            path(
                "<int:pk>/remove-block-location/",
                self.remove_block_location,
                name="remove-block-location",
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

    def block_location(self, request, pk):
        instance = Location.objects.get(pk=pk)
        instance.is_blocked = True
        instance.save()
        messages.add_message(
            request, messages.ERROR, "Спортивная площадка заблокирована!"
        )
        return HttpResponseRedirect("../")

    def remove_block_location(self, request, pk):
        instance = Location.objects.get(pk=pk)
        instance.is_blocked = False
        instance.save()
        messages.add_message(
            request, messages.SUCCESS, "Спортивная площадка разблокирована!"
        )
        return HttpResponseRedirect("../")

    def location_actions(self, obj):
        if obj.last_status == StatusConst.REVIEW:
            return format_html(
                f'<a class="button" style="background:green" href="{obj.pk}/approve-location/">Подтвердить</a>'
                f"</br>"
                f"</br>"
                f'<a class="button" style="background:red" href="{obj.pk}/reject-location/">Отклонить</a>',
            )
        elif (
            obj.last_status
            in (StatusConst.PUBLISHED, StatusConst.ARCHIVE, StatusConst.CREATED)
            and not obj.is_blocked
        ):
            return format_html(
                f'<a class="button" style="background:silver" href="{obj.pk}/block-location/">Заблокировать</a>'
            )
        elif (
            obj.last_status
            in (StatusConst.PUBLISHED, StatusConst.ARCHIVE, StatusConst.CREATED)
            and obj.is_blocked
        ):
            return format_html(
                f'<a class="button" style="background:silver" href="{obj.pk}/remove-block-location/">Разблокировать</a>'
            )

    location_actions.short_description = "Действия"
    location_actions.allow_tags = True
