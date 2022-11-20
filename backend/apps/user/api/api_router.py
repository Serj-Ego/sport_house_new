from django.urls import path, include

from apps.user.api.views import (
    CustomAuthToken,
    UserLogoutAPIView,
    StartCreateAdditionalForm,
    CreateUpdateRecUserInfoAdditionalFormAPIView,
    RegistrationUserCreateAPIView,
    ConfirmRegistrationCodeAPIView,
    UserInfoApiView,
    UserNotificationListAPIView,
    CheckAllUserNotificationAPIView,
    UploadUserAvatarAPIView,
    UpdateUserInfoAPIView,
    ChangeUserPasswordAPIView,
    UpdateNotificationTokenAPIView,
)

app_name = "user"

url_additional_form = [
    path("", StartCreateAdditionalForm.as_view(), name="start-form"),
    path(
        "<int:id>",
        CreateUpdateRecUserInfoAdditionalFormAPIView.as_view(),
        name="update-rec-info",
    ),
]

urlpatterns = [
    path("login/", CustomAuthToken.as_view(), name="auth"),
    path("logout/", UserLogoutAPIView.as_view(), name="logout"),
    path("registration/", RegistrationUserCreateAPIView.as_view(), name="registration"),
    path(
        "confirm/<int:id>",
        ConfirmRegistrationCodeAPIView.as_view(),
        name="confirm-code",
    ),
    path("info/<int:pk>", UserInfoApiView.as_view(), name="info"),
    path("upload-avatar/", UploadUserAvatarAPIView.as_view(), name="upload-avatar"),
    path("update-info/", UpdateUserInfoAPIView.as_view(), name="update-info"),
    path(
        "update-rec-info/",
        CreateUpdateRecUserInfoAdditionalFormAPIView.as_view(),
        name="update-rec-info",
    ),
    path(
        "update-password/",
        ChangeUserPasswordAPIView.as_view(),
        name="update-password",
    ),
    # path(
    #     "rec-info-user/",
    #     ViewUserRecInfoAPIView.as_view(),
    #     name="rec-info-user",
    # ),
    path(
        "update-notification-token/",
        UpdateNotificationTokenAPIView.as_view(),
        name="update-notification-token",
    ),
    path(
        "notification-list/",
        UserNotificationListAPIView.as_view(),
        name="notification-list",
    ),
    path(
        "notification-check/",
        CheckAllUserNotificationAPIView.as_view(),
        name="notification-check",
    ),
    # path(
    #     "additional-form/",
    #     include(url_additional_form),
    #     name="additional-form",
    # ),
]
