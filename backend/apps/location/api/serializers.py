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


class LocationCreateSerializer(serializers.ModelSerializer):
    """Сериализатор спортивных площадок"""

    images = serializers.ListField()
    address = LocationAddressSerializer()
    work_time = serializers.ListField()
    lighting = serializers.CharField()
    coating = serializers.CharField()
    category = serializers.CharField()
    sport_type = serializers.CharField()
    options = serializers.ListField()
    keywords = serializers.ListField()

    def create(self, validated_data):
        images = validated_data.pop("images", None)
        work_time = validated_data.pop("work_time", None)
        options = validated_data.pop("options", None)
        keywords = validated_data.pop("keywords", None)

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
        validated_data["sport_type"] = LocationSportType.objects.get(
            name=validated_data.pop("sport_type", None)
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
            )
            location.work_time.add(week)

        for option in options:
            opt, _ = LocationOptions.objects.get_or_create(name=option)
            location.options.add(opt)

        for keyword in keywords:
            kw, _ = LocationKeyWords.objects.get_or_create(name=keyword)
            location.keywords.add(kw)

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
        read_only_fields = (
            "id",
            "full_name",
            "short_name",
            "description",
            "last_status",
        )


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
    sport_type = serializers.CharField(source="sport_type.name", read_only=True)
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
        )
        read_only_fields = fields
