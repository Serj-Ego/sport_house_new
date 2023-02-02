import random

from django.contrib.auth.models import Group
from rest_framework import serializers

from apps.base.models import File, FileType, FileTypeConst, PhysicalTraining
from apps.user.models import (
    User,
    UserReccomendationInfo,
    UserNotification,
)
from apps.user.tasks import send_email_confirm_code


class UserInfoSerializer(serializers.ModelSerializer):
    """Сериализатор информации пользователя на главном табе"""

    avatar = serializers.CharField(source="get_last_avatar_uri", default=None)
    full_name = serializers.CharField(source="get_full_name")
    recommendation = serializers.SerializerMethodField()
    notification_badge = serializers.BooleanField(
        source="get_count_not_read_notification"
    )
    recomendation_info = serializers.SerializerMethodField()
    role = serializers.SerializerMethodField()

    def get_role(self, obj):
        group = obj.groups.all().first()
        if group:
            return group.name
        return None

    def get_recomendation_info(self, obj):
        try:
            return CreateUpdateRecUserInfoFormSerializer(
                obj.user_recomendation_info
            ).data
        except Exception as e:
            return None

    def get_recommendation(self, obj):
        if obj.get_last_recommendation:
            return True
        return False

    class Meta:
        model = User
        fields = (
            "full_name",
            "avatar",
            "first_name",
            "last_name",
            "recommendation",
            "notification_badge",
            "recomendation_info",
            "username",
            "email",
            "role",
        )


class UploadUserAvatarSerializer(serializers.ModelSerializer):
    image = serializers.FileField(source="path", write_only=True)

    def create(self, validated_data):
        user = self.context.get("user")
        file = validated_data.pop("path", None)
        instance = File.objects.create(
            path=file,
            name=file.name,
            file_type=FileType.objects.get(name=FileTypeConst.AVATAR_IMAGE),
        )
        user.avatar.add(instance)

        return instance

    class Meta:
        model = File
        fields = ("image",)


class CreateUpdateRecUserInfoSerializer(serializers.ModelSerializer):
    """Создает или обновляет входные данные пользователя для расчета рекомендаций"""

    def create(self, validated_data):
        user = self.context.get("user")
        if instance := UserReccomendationInfo.objects.filter(user=user).first():
            pass
        else:
            instance = UserReccomendationInfo.objects.create(user=user)
        for attr, value in validated_data.items():
            if attr == "gender":
                value = "male" if value == 0 else "female"
            setattr(instance, attr, value)

        if physical_training := self.initial_data.get("physical_training", None):
            instance.physical_training = PhysicalTraining.objects.get(
                name=physical_training
            )

        instance.save()
        return instance

    class Meta:
        model = UserReccomendationInfo
        exclude = (
            "user",
            "physical_training",
        )


class UserNotificationSerializer(serializers.ModelSerializer):
    """Сериализатор пуш-уведомлений пользователя"""

    type = serializers.CharField(source="type.name")

    class Meta:
        model = UserNotification
        fields = (
            "id",
            "title",
            "body",
            "created_date",
            "is_read",
            "type",
        )


class CreateUpdateRecUserInfoFormSerializer(serializers.ModelSerializer):
    """Создает или обновляет входные данные пользователя для расчета рекомендаций через форму"""

    def create(self, validated_data):
        user = self.context.get("user")
        if instance := UserReccomendationInfo.objects.filter(user=user).first():
            pass
        else:
            instance = UserReccomendationInfo.objects.create(user=user)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if physical_training := self.initial_data.get("physical_training", None):
            instance.physical_training = PhysicalTraining.objects.get(
                name=physical_training
            )
        gender = self.initial_data.get("gender", None)
        if gender:
            instance.gender = "female"
        else:
            instance.gender = "male"

        instance.save()
        return instance

    class Meta:
        model = UserReccomendationInfo
        exclude = (
            "user",
            "physical_training",
            "gender",
        )


class RegistrationUserSerializer(serializers.ModelSerializer):
    """Сериализатор регистрации пользователя"""

    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        """Проверяет email на наличие у пользователей"""
        if User.objects.filter(
            email=attrs.get("email"),
        ).exists():
            raise serializers.ValidationError(
                {"error": f"Пользователь с таким E-mail уже существует"}
            )
        return attrs

    def create(self, validated_data):
        code = random.randint(10000, 99999)
        instance = User.objects.create_user(
            username=validated_data.get("email"),
            email=validated_data.get("email"),
            password=validated_data.get("password"),
            is_active=False,
            confirm_code=code,
        )
        instance.groups.add(Group.objects.get(name=self.initial_data.get("role")))
        send_email_confirm_code.apply_async(
            kwargs={"email": instance.email, "code": code}
        )
        return instance

    class Meta:
        model = User
        fields = (
            "email",
            "password",
            "confirm_code",
            "id",
        )
        read_only_fields = (
            "confirm_code",
            "id",
        )
