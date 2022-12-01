import random

from django.contrib.auth import logout
from django.utils import timezone
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.base.models import File
from apps.user.api.serializers import (
    UploadUserAvatarSerializer,
    CreateUpdateRecUserInfoSerializer,
    UserNotificationSerializer,
    CreateUpdateRecUserInfoFormSerializer,
    RegistrationUserSerializer,
    UserInfoSerializer,
)
from apps.user.models import (
    UserReccomendationInfo,
    User,
)
from apps.user.tasks import send_email_confirm_code


class CustomAuthToken(ObtainAuthToken):
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)
        user.last_login = timezone.now()
        user.save()
        return Response({"token": token.key, "user_id": user.pk, "email": user.email})


class UserLogoutAPIView(APIView):
    """Выход из системы"""

    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        request.user.auth_token.delete()
        logout(request)
        return Response({}, status=status.HTTP_200_OK)


class UserInfoApiView(RetrieveAPIView):
    """Отдает информацию о пользователе"""

    permission_classes = (IsAuthenticated,)
    queryset = User.objects.all()
    serializer_class = UserInfoSerializer


class UploadUserAvatarAPIView(CreateAPIView):
    """Загружает новую аватарку пользователя"""

    permission_classes = (IsAuthenticated,)
    serializer_class = UploadUserAvatarSerializer
    queryset = File.objects.all()

    def get_serializer_context(self):
        """Проставляем в контекст сериализатора пользователя"""
        return {
            "user": self.request.user,
        }


class UpdateUserInfoAPIView(APIView):
    """Обновляет данные пользователя (Имя, Фамилию)"""

    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        user = request.user
        if first_name := request.data.get("first_name", None):
            user.first_name = first_name
        if last_name := request.data.get("last_name", None):
            user.last_name = last_name

        if email := request.data.get("email", None):
            if User.objects.filter(email=email).exclude(id=user.id).exists():
                return Response(
                    {"message": "Данный e-mail уже существует!"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            else:
                user.email = email
        if username := request.data.get("username", None):
            if User.objects.filter(username=username).exclude(id=user.id).exists():
                return Response(
                    {"message": "Данное имя пользователя уже существует!"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            else:
                user.username = username
        if notification_token := request.data.get("notification_token", None):
            user.notification_token = notification_token
        user.save()

        return Response(
            UserInfoSerializer(request.user).data, status=status.HTTP_200_OK
        )


class CreateUpdateRecUserInfoAPIView(CreateAPIView):
    """Создает или обновляет входные данные пользователя для расчета рекомендаций"""

    permission_classes = (IsAuthenticated,)
    serializer_class = CreateUpdateRecUserInfoSerializer
    queryset = UserReccomendationInfo.objects.all()

    def get_serializer_context(self):
        """Проставляем в контекст сериализатора пользователя"""
        return {
            "user": self.request.user,
        }


class ViewUserRecInfoAPIView(APIView):
    """Отдает заполненные входные данные пользователя"""

    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        if instance := UserReccomendationInfo.objects.filter(user=request.user).first():
            return Response(
                CreateUpdateRecUserInfoSerializer(instance).data,
                status=status.HTTP_200_OK,
            )
        return Response(status=status.HTTP_404_NOT_FOUND)


class UpdateNotificationTokenAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        user = request.user
        user.notification_token = request.data.get("token", None)
        user.save()
        return Response(status=status.HTTP_200_OK)


class UserNotificationListAPIView(ListAPIView):
    """Список пуш-уведомлений пользователя"""

    permission_classes = (IsAuthenticated,)
    serializer_class = UserNotificationSerializer
    pagination_class = None
    queryset = None

    def get_queryset(self):
        return self.request.user.user_notification.all().order_by("-created_date")


class CheckAllUserNotificationAPIView(APIView):
    """Устанавливает для всех пуш уведомлений статус прочитано"""

    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        user = request.user
        notification = user.user_notification.filter(is_read=False).update(is_read=True)
        notification = self.request.user.user_notification.all().order_by(
            "-created_date"
        )
        serializer_data = UserNotificationSerializer(notification, many=True).data
        return Response(serializer_data, status=status.HTTP_200_OK)


"""API для дополнительной формы сбора информации о пользователях"""


class StartCreateAdditionalForm(APIView):
    """Создает пользователя для ввода данных пользователя"""

    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        if User.objects.filter(email=request.data.get("email")).exists():
            return Response(
                "Данный E-mail уже есть в системе", status=status.HTTP_400_BAD_REQUEST
            )
        else:
            user = User.objects.create_user(
                username=request.data.get("email"),
                email=request.data.get("email"),
                password="glassonion",
                last_name=request.data.get("full_name"),
                is_active=False,
            )
            return Response({"id": user.id}, status=status.HTTP_200_OK)


class CreateUpdateRecUserInfoAdditionalFormAPIView(CreateAPIView):
    """Создает или обновляет входные данные пользователя для расчета рекомендаций"""

    permission_classes = (IsAuthenticated,)
    serializer_class = CreateUpdateRecUserInfoFormSerializer
    queryset = UserReccomendationInfo.objects.all()

    def get_serializer_context(self):
        """Проставляем в контекст сериализатора пользователя"""
        return {
            "user": self.request.user,
        }


class RegistrationUserCreateAPIView(CreateAPIView):
    """Создает нового пользователя в системе"""

    permission_classes = (AllowAny,)
    queryset = User.objects.all()
    serializer_class = RegistrationUserSerializer


class ConfirmRegistrationCodeAPIView(APIView):
    """Проверяет и отправляет заново код подтверждения"""

    permission_classes = (AllowAny,)

    def get(self, request, **kwargs):
        code = random.randint(10000, 99999)
        user = User.objects.get(id=kwargs.get("id"))
        user.confirm_code = code
        user.save()
        send_email_confirm_code.apply_async(kwargs={"email": user.email, "code": code})
        return Response("Success", status=status.HTTP_200_OK)

    def post(self, request, **kwargs):
        user = User.objects.get(id=kwargs.get("id"))
        if user.confirm_code == int(request.data):
            user.is_active = True
            user.save()
            return Response("Success", status=status.HTTP_200_OK)
        else:
            return Response(
                "Код-подтверждения неверный!", status=status.HTTP_400_BAD_REQUEST
            )


class ChangeUserPasswordAPIView(APIView):
    """Изменить пароль пользователя"""

    permission_classes = (IsAuthenticated,)

    def post(self, request, **kwargs):
        user = request.user
        if user.check_password(request.data.get("old_password")):
            user.set_password(request.data.get("password"))
            user.save()
            return Response(
                {"message": "Пароль успешно изменен!"},
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {"message": "Введен неверный пароль!"},
                status=status.HTTP_400_BAD_REQUEST,
            )
