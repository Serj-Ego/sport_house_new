from rest_framework import serializers

from rest_framework import serializers

from apps.base.models import LocationCategory, LocationSportType
from apps.location.models import (
    LocationAddress,
)


class LocationCategorySerializer(serializers.ModelSerializer):
    """Сериализатор категории площадок"""

    class Meta:
        model = LocationCategory
        fields = (
            "id",
            "name",
        )


class LocationSportTypeSerializer(serializers.ModelSerializer):
    """Сериализатор категории спорта на локации"""

    class Meta:
        model = LocationSportType
        fields = (
            "id",
            "name",
        )


class LocationAddressSerializer(serializers.ModelSerializer):
    subThoroughfare = serializers.CharField(source="sub_thoroughfare", required=False)
    subLocality = serializers.CharField(source="sub_locality", required=False)
    postalCode = serializers.CharField(source="postal_code", required=False)
    administrativeArea = serializers.CharField(
        source="administrative_area", required=False
    )
    subAdministrativeArea = serializers.CharField(
        source="sub_administrative_area", required=False
    )
    countryCode = serializers.CharField(source="country_code", required=False)

    class Meta:
        model = LocationAddress
        fields = (
            "locality",
            "country",
            "thoroughfare",
            "name",
            "latitude",
            "longitude",
            "subThoroughfare",
            "subLocality",
            "postalCode",
            "administrativeArea",
            "subAdministrativeArea",
            "countryCode",
        )


# class LocationCreateSerializer(serializers.ModelSerializer):
#     """Сериализатор спортивных площадок"""
#
#     images = serializers.ListField(required=False)
#     category = serializers.ListField(required=False)
#     sportTypes = serializers.ListField(required=False)
#     address = LocationAddressSerializer(required=False)
#     confirmedPhone = serializers.CharField(source="confirmed_phone", required=False)
#     additionalPhone = serializers.CharField(source="additional_phone", required=False)
#     additionalEmail = serializers.CharField(source="additional_email", required=False)
#     workTime = serializers.ListField(required=False)
#
#     def validate(self, attrs):
#         errors = ""
#         if not attrs.get("name", None):
#             errors = f"{errors}\n - Наименование площадки"
#         if attrs.get("images").__len__() == 0:
#             errors = f"{errors}\n - Изображения площадки"
#         if not attrs.get("name", None):
#             errors = f"{errors}\n - Описание площадки"
#         if attrs.get("category").__len__() == 0:
#             errors = f"{errors}\n - Категории площадки"
#         if attrs.get("sportTypes").__len__() == 0:
#             errors = f"{errors}\n - Виды спорта на площадке"
#         if attrs.get("address").__len__() == 0:
#             errors = f"{errors}\n - Местоположение"
#         if attrs.get("confirmed_phone").__len__() < 18:
#             errors = f"{errors}\n - Номер телефона - для подтверждения"
#         if attrs.get("workTime")[0].get("weeks").__len__() < 1:
#             errors = f"{errors}\n - Время работы"
#         if errors.__len__() > 0:
#             raise serializers.ValidationError({"error": errors})
#         return attrs
#
#     def create(self, validated_data):
#         images = validated_data.pop("images")
#         categories = validated_data.pop("category")
#         sport_types = validated_data.pop("sportTypes")
#         address = validated_data.pop("address")
#         work_time = validated_data.pop("workTime")[0]
#
#         instance = super().create(validated_data)
#
#         for image in images:
#             file = File.objects.create(
#                 path=image,
#                 name=image.name,
#                 file_type=FileType.objects.get(name=FileTypeConst.LOCATION_IMAGE),
#             )
#             instance.images.add(file)
#
#         for category in categories:
#             instance.category.add(LocationCategory.objects.get(id=category))
#
#         for sport_type in sport_types:
#             instance.sports.add(LocationSportType.objects.get(id=sport_type))
#
#         instance.address = LocationAddress.objects.create(**address)
#
#         for week in work_time.get("weeks"):
#             week = WorkTimeLocation.objects.create(
#                 week_name=week.get("value"),
#                 start_date=work_time.get("startTime"),
#                 end_date=work_time.get("endTime"),
#             )
#             instance.work_time.add(week)
#
#         instance.owner = self.context.get("user")
#         instance.add_status(self.context.get("user"), StatusConst.CREATED)
#         instance.save()
#         return instance
#
#     class Meta:
#         model = Location
#         fields = (
#             "name",
#             "description",
#             "images",
#             "category",
#             "sportTypes",
#             "address",
#             "phone",
#             "confirmedPhone",
#             "additionalPhone",
#             "additionalEmail",
#             "email",
#             "workTime",
#         )


# class LocationOwnerListSerializer(serializers.ModelSerializer):
#     """Сериализация спортивных площадок у менеджера"""
#
#     images = serializers.SerializerMethodField()
#     last_status = serializers.SerializerMethodField()
#     status = serializers.CharField(write_only=True)
#
#     def get_last_status(self, obj):
#         return obj.last_status.name
#
#     def get_images(self, obj):
#         data = []
#         images = obj.images.all()
#         for image in images:
#             data.append({"uri": image.path.url})
#
#         return data
#
#     def update(self, instance, validated_data):
#         status_name = validated_data.pop("status", None)
#         if status_name:
#             instance.add_status(self.context.get("user"), status_name)
#             instance.save()
#         return instance
#
#     class Meta:
#         model = Location
#         fields = (
#             "id",
#             "name",
#             "description",
#             "images",
#             "last_status",
#             "last_status_commentary",
#             "status",
#         )
#         read_only_fields = (
#             "id",
#             "name",
#             "description",
#             "images",
#             "last_status",
#         )


class CategoryLocationSerializer(serializers.ModelSerializer):
    """"""

    class Meta:
        model = LocationCategory
        fields = (
            "name",
            "id",
        )


# class LocationForUserSerializer(serializers.ModelSerializer):
#     """Сериализация первоначальных данных спортивной площадки"""
#
#     address = LocationAddressSerializer()
#     category = CategoryLocationSerializer(many=True)
#     images = serializers.SerializerMethodField()
#     is_open = serializers.SerializerMethodField()
#     work_time_today = serializers.SerializerMethodField()
#     work_time = serializers.SerializerMethodField()
#
#     def get_is_open(self, obj):
#         weeks = {
#             "Monday": "Понедельник",
#             "Tuesday": "Вторник",
#             "Wednesday": "Среда",
#             "Thursday": "Четверг",
#             "Friday": "Пятница",
#             "Saturday": "Суббота",
#             "Sunday": "Воскресенье",
#         }
#         now = datetime.datetime.now()
#         week_name_now = weeks[now.strftime("%A")]
#         work_day = obj.work_time.filter(week_name=week_name_now).first()
#         if work_day:
#             start_day = datetime.datetime(
#                 now.year,
#                 now.month,
#                 now.day,
#                 work_day.start_date.hour,
#                 work_day.start_date.minute,
#             )
#             end_day = datetime.datetime(
#                 now.year,
#                 now.month,
#                 now.day,
#                 work_day.end_date.hour,
#                 work_day.end_date.minute,
#             )
#             return start_day <= now <= end_day
#         return False
#
#     def get_work_time_today(self, obj):
#         weeks = {
#             "Monday": "Понедельник",
#             "Tuesday": "Вторник",
#             "Wednesday": "Среда",
#             "Thursday": "Четверг",
#             "Friday": "Пятница",
#             "Saturday": "Суббота",
#             "Sunday": "Воскресенье",
#         }
#         now = datetime.datetime.now()
#         week_name_now = weeks[now.strftime("%A")]
#         work_day = obj.work_time.filter(week_name=week_name_now).first()
#         if work_day:
#             start_day = datetime.datetime(
#                 now.year,
#                 now.month,
#                 now.day,
#                 work_day.start_date.hour,
#                 work_day.start_date.minute,
#             )
#             end_day = datetime.datetime(
#                 now.year,
#                 now.month,
#                 now.day,
#                 work_day.end_date.hour,
#                 work_day.end_date.minute,
#             )
#             return f"{start_day.strftime('%H:%M')}—{end_day.strftime('%H:%M')}"
#         return "Выходной"
#
#     def get_work_time(self, obj):
#         weeks = [
#             "Понедельник",
#             "Вторник",
#             "Среда",
#             "Четверг",
#             "Пятница",
#             "Суббота",
#             "Воскресенье",
#         ]
#         data = []
#         for week in weeks:
#             work_day = obj.work_time.filter(week_name=week).first()
#             if work_day:
#                 data.append(
#                     {
#                         "name": week,
#                         "time": f"{work_day.start_date.strftime('%H:%M')}—{work_day.end_date.strftime('%H:%M')}",
#                     }
#                 )
#         return data
#
#     def get_images(self, obj):
#         data = []
#         images = obj.images.all()
#         domain = Site.objects.first().domain
#         for image in images:
#             data.append({"uri": f"{domain}{image.path.url}"})
#
#         return data
#
#     class Meta:
#         model = Location
#         fields = (
#             "id",
#             "name",
#             "address",
#             "description",
#             "category",
#             "phone",
#             "email",
#             "images",
#             "is_open",
#             "work_time_today",
#             "work_time",
#         )
