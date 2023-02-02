import datetime

from django.contrib.sites.models import Site
from rest_framework import serializers

from apps.base.models import (
    LocationLight,
    LocationCoating,
    LocationCategory,
    LocationSportType,
    File,
    FileType,
    FileTypeConst,
    StatusConst,
)
from apps.location.models import (
    LocationAddress,
    Location,
    WorkTimeLocation,
    LocationOptions,
    LocationKeyWords,
    ListLocationStatus,
    BookingLocation,
)
from apps.user.utils.notification import send_user_notification


def weeknum(dayname):
    if dayname == "Monday":
        return 0
    if dayname == "Tuesday":
        return 1
    if dayname == "Wednesday":
        return 2
    if dayname == "Thursday":
        return 3
    if dayname == "Friday":
        return 4
    if dayname == "Saturday":
        return 5
    if dayname == "Sunday":
        return 6


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


class LocationCreateSerializer(serializers.ModelSerializer):
    """Сериализатор спортивных площадок"""

    images = serializers.ListField()
    address = LocationAddressSerializer()
    work_time = serializers.ListField()
    lighting = serializers.CharField()
    coating = serializers.CharField()
    category = serializers.CharField()
    sport_type = serializers.ListField()
    options = serializers.ListField()
    keywords = serializers.ListField()

    def create(self, validated_data):
        images = validated_data.pop("images", None)
        work_time = validated_data.pop("work_time", None)
        options = validated_data.pop("options", None)
        keywords = validated_data.pop("keywords", None)
        sport_types = validated_data.pop("sport_type", None)

        validated_data["address"] = LocationAddress.objects.create(
            **validated_data.pop("address", None)
        )
        validated_data["lighting"] = LocationLight.objects.get(
            name=validated_data.pop("lighting", None)
        )
        validated_data["coating"] = LocationCoating.objects.get(
            name=validated_data.pop("coating", None)
        )
        validated_data["category"] = LocationCategory.objects.get(
            name=validated_data.pop("category", None)
        )
        validated_data["owner"] = self.context.get("user")
        location: Location = super().create(validated_data)

        for image in images:
            file = File.objects.create(
                path=image,
                name=image.name,
                file_type=FileType.objects.get(name=FileTypeConst.LOCATION_IMAGE),
            )
            location.images.add(file)

        for week in work_time:
            week, _ = WorkTimeLocation.objects.get_or_create(
                week_name=week.get("week"),
                start_date=week.get("startWork"),
                end_date=week.get("endWork"),
                interval=week.get("interval"),
                breaking=week.get("break"),
            )
            location.work_time.add(week)

        for option in options:
            opt, _ = LocationOptions.objects.get_or_create(name=option)
            location.options.add(opt)

        for keyword in keywords:
            kw, _ = LocationKeyWords.objects.get_or_create(name=keyword)
            location.keywords.add(kw)

        for sport_type in sport_types:
            inst = LocationSportType.objects.get(name=sport_type)
            location.sport_type.add(inst)

        location.add_status(self.context.get("user"), StatusConst.CREATED)
        return location

    class Meta:
        model = Location
        fields = (
            "full_name",
            "short_name",
            "description",
            "images",
            "address",
            "work_time",
            "price",
            "length",
            "width",
            "squad",
            "lighting",
            "coating",
            "category",
            "sport_type",
            "is_covered",
            "options",
            "phone",
            "additional_phone",
            "additional_phone_code",
            "email",
            "web_site",
            "keywords",
            "max_member",
            "max_viewer",
        )


class LocationOwnerListSerializer(serializers.ModelSerializer):
    """Сериализация спортивных площадок у создателя или менеджера"""

    last_status = serializers.CharField(read_only=True)

    class Meta:
        model = Location
        fields = (
            "id",
            "full_name",
            "short_name",
            "description",
            "last_status",
        )
        read_only_fields = fields


class WorkTimeLocationSerializer(serializers.ModelSerializer):
    """Сериализатор времени работы площадки"""

    class Meta:
        model = WorkTimeLocation
        fields = (
            "week_name",
            "start_date",
            "end_date",
        )


class OptionsSerializer(serializers.ModelSerializer):
    """Сериализатор опций площадки"""

    class Meta:
        model = LocationOptions
        fields = ("name",)


class SportTypeSerializer(serializers.ModelSerializer):
    """Сериализатор видов спорта площадки"""

    class Meta:
        model = LocationSportType
        fields = ("name",)


class KeyWordsSerializer(serializers.ModelSerializer):
    """Сериализатор ключевых слов площадки"""

    class Meta:
        model = LocationKeyWords
        fields = ("name",)


class ListLocationStatusSerializer(serializers.ModelSerializer):
    """Сериализатор списка статусов у площадки"""

    status = serializers.CharField(source="status.name")
    user = serializers.CharField(source="user.get_full_name")

    class Meta:
        model = ListLocationStatus
        fields = ("created_date", "status", "commentary", "user")


class LocationRetrieveOwnerSerializer(serializers.ModelSerializer):
    """Сериализатор карточки площадки для создателя"""

    images = serializers.SerializerMethodField(read_only=True)
    last_status = serializers.CharField(read_only=True)
    address = LocationAddressSerializer(read_only=True)
    work_time = WorkTimeLocationSerializer(many=True, read_only=True)
    lighting = serializers.CharField(source="lighting.name", read_only=True)
    coating = serializers.CharField(source="coating.name", read_only=True)
    category = serializers.CharField(source="category.name", read_only=True)
    sport_type = SportTypeSerializer(many=True, read_only=True)
    options = OptionsSerializer(many=True, read_only=True)
    keywords = KeyWordsSerializer(many=True, read_only=True)
    owner = serializers.CharField(source="owner.get_full_name", read_only=True)
    statuses = serializers.SerializerMethodField(read_only=True)

    def get_statuses(self, obj):
        statuses = obj.listlocationstatus.all().order_by("-created_date")
        return ListLocationStatusSerializer(statuses, many=True).data

    def get_images(self, obj):
        data = []
        images = obj.images.all()
        domain = Site.objects.first().domain
        for image in images:
            data.append({"uri": f"{domain}{image.path.url}"})

        return data

    def update(self, instance, validated_data):
        status = self.initial_data.get("status", None)
        if status:
            instance.add_status(self.context.get("user"), status_name=status)
        return instance

    class Meta:
        model = Location
        fields = (
            "id",
            "full_name",
            "short_name",
            "description",
            "last_status",
            "images",
            "address",
            "work_time",
            "price",
            "length",
            "width",
            "squad",
            "lighting",
            "coating",
            "category",
            "sport_type",
            "is_covered",
            "options",
            "phone",
            "additional_phone",
            "additional_phone_code",
            "email",
            "web_site",
            "keywords",
            "statuses",
            "owner",
            "created_date",
            "is_blocked",
            "max_member",
            "max_viewer",
        )
        read_only_fields = fields


class LocationMapSerializer(serializers.ModelSerializer):
    """Сериализатор спортивных площадок на карте у пользователя"""

    images = serializers.SerializerMethodField(read_only=True)
    address = LocationAddressSerializer(read_only=True)
    category = serializers.CharField(source="category.name", read_only=True)
    options = OptionsSerializer(many=True, read_only=True)
    work_time = serializers.SerializerMethodField()
    is_open = serializers.SerializerMethodField()
    work_time_today = serializers.SerializerMethodField()

    def get_work_time_today(self, obj):
        weeks = {
            "Monday": "Понедельник",
            "Tuesday": "Вторник",
            "Wednesday": "Среда",
            "Thursday": "Четверг",
            "Friday": "Пятница",
            "Saturday": "Суббота",
            "Sunday": "Воскресенье",
        }
        now = datetime.datetime.now()
        week_name_now = weeks[now.strftime("%A")]
        work_day = obj.work_time.filter(week_name=week_name_now).first()
        if work_day and work_day.start_date and work_day.end_date:
            start_day = datetime.datetime(
                now.year,
                now.month,
                now.day,
                work_day.start_date.hour,
                work_day.start_date.minute,
            )
            end_day = datetime.datetime(
                now.year,
                now.month,
                now.day,
                work_day.end_date.hour,
                work_day.end_date.minute,
            )
            return f"{start_day.strftime('%H:%M')}—{end_day.strftime('%H:%M')}"
        return "Выходной"

    def get_is_open(self, obj):
        weeks = {
            "Monday": "Понедельник",
            "Tuesday": "Вторник",
            "Wednesday": "Среда",
            "Thursday": "Четверг",
            "Friday": "Пятница",
            "Saturday": "Суббота",
            "Sunday": "Воскресенье",
        }
        now = datetime.datetime.now()
        week_name_now = weeks[now.strftime("%A")]
        work_day = obj.work_time.filter(week_name=week_name_now).first()
        if work_day and work_day.start_date and work_day.end_date:
            start_day = datetime.datetime(
                now.year,
                now.month,
                now.day,
                work_day.start_date.hour,
                work_day.start_date.minute,
            )
            end_day = datetime.datetime(
                now.year,
                now.month,
                now.day,
                work_day.end_date.hour,
                work_day.end_date.minute,
            )
            return start_day <= now <= end_day
        return False

    def get_images(self, obj):
        data = []
        images = obj.images.all()
        domain = Site.objects.first().domain
        for image in images:
            data.append({"uri": f"{domain}{image.path.url}"})

        return data

    def get_work_time(self, obj):
        weeks = [
            "Понедельник",
            "Вторник",
            "Среда",
            "Четверг",
            "Пятница",
            "Суббота",
            "Воскресенье",
        ]
        data = []
        for week in weeks:
            work_day = obj.work_time.filter(week_name=week).first()
            if work_day:
                if work_day.start_date and work_day.end_date:
                    data.append(
                        {
                            "name": week,
                            "time": f"{work_day.start_date.strftime('%H:%M')}—{work_day.end_date.strftime('%H:%M')}",
                        }
                    )
                else:
                    data.append(
                        {
                            "name": week,
                            "time": f"Выходной",
                        }
                    )
        return data

    class Meta:
        model = Location
        fields = (
            "id",
            "full_name",
            "short_name",
            "description",
            "images",
            "address",
            "category",
            "phone",
            "email",
            "web_site",
            "options",
            "work_time",
            "is_open",
            "work_time_today",
            "price",
        )


class LocationCheckDateSerializer(serializers.ModelSerializer):
    """"""

    days = serializers.SerializerMethodField()

    def get_days(self, obj):
        from datetime import date, timedelta

        disabled_dates = []
        weeks = {
            "Понедельник": "Monday",
            "Вторник": "Tuesday",
            "Среда": "Wednesday",
            "Четверг": "Thursday",
            "Пятница": "Friday",
            "Суббота": "Saturday",
            "Воскресенье": "Sunday",
        }

        def alldays(year, whichDayYouWant):
            d = date(year, datetime.datetime.now().month, datetime.datetime.now().day)
            d += timedelta(days=(weeknum(whichDayYouWant) - d.weekday()) % 7)
            while d.year <= year + 1:
                yield d
                d += timedelta(days=7)

        for work_time in obj.work_time.filter(start_date__isnull=True):
            for d in alldays(datetime.datetime.now().year, weeks[work_time.week_name]):
                disabled_dates.append(d)
        return disabled_dates

    class Meta:
        model = Location
        fields = ("id", "days")


class LocationCheckTimeEnrollSerializer(serializers.ModelSerializer):
    """ """

    time = serializers.SerializerMethodField(read_only=True)

    def get_time(self, obj):
        weeks = {
            "Monday": "Понедельник",
            "Tuesday": "Вторник",
            "Wednesday": "Среда",
            "Thursday": "Четверг",
            "Friday": "Пятница",
            "Saturday": "Суббота",
            "Sunday": "Воскресенье",
        }
        day = weeks.get(
            datetime.datetime.strptime(self.context.get("day"), "%Y-%m-%d").strftime(
                "%A"
            )
        )
        work_time = obj.work_time.get(week_name=day)

        def datetime_range(start, end, delta):
            current = start
            while current <= end:
                yield current
                current += delta

        dts = []
        for dt in datetime_range(
            work_time.start_date,
            work_time.end_date,
            datetime.timedelta(minutes=work_time.interval + work_time.breaking),
        ):
            is_active = True
            if BookingLocation.objects.filter(
                date=self.context.get("day"), start_event=dt
            ).exists():
                is_active = False
            dts.append({"time": dt.strftime("%H:%M"), "isActive": is_active})

        return dts

    class Meta:
        model = Location
        fields = ("id", "time")


class BookingLocationCreateSerializer(serializers.ModelSerializer):
    """Создание бронирования спортивной площадки"""

    def create(self, validated_data):
        user = self.context.get("user")
        location = Location.objects.get(id=self.context.get("location_id"))
        weeks = {
            "Monday": "Понедельник",
            "Tuesday": "Вторник",
            "Wednesday": "Среда",
            "Thursday": "Четверг",
            "Friday": "Пятница",
            "Saturday": "Суббота",
            "Sunday": "Воскресенье",
        }
        week_name_now = weeks[validated_data.get("date").strftime("%A")]
        work_day = location.work_time.filter(week_name=week_name_now).first()
        booking = BookingLocation.objects.create(
            end_event=(
                datetime.datetime.combine(
                    datetime.datetime.today(), validated_data.get("start_event")
                )
                + datetime.timedelta(minutes=work_day.interval)
            ).time(),
            creator=user,
            **validated_data,
        )
        booking.members.add(user)
        booking.add_status(user, StatusConst.REVIEW)
        send_user_notification(
            location.owner, "Поступила новая заявка", location.full_name
        )
        location.bookings.add(booking)
        return booking

    class Meta:
        model = BookingLocation
        fields = (
            "date",
            "start_event",
        )


class BookingListSerializer(serializers.ModelSerializer):
    last_status = serializers.CharField(read_only=True)
    location_name = serializers.SerializerMethodField(read_only=True)
    last_commentary = serializers.CharField(read_only=True)

    def get_location_name(self, obj):
        return obj.location.first().full_name

    class Meta:
        model = BookingLocation
        fields = (
            "id",
            "date",
            "start_event",
            "end_event",
            "last_status",
            "location_name",
            "last_commentary",
        )
