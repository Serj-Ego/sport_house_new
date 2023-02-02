from django.urls import path

from apps.location.api.views import (
    LocationCreateAPIView,
    LocationOwnerListAPIVIew,
    LocationOwnerChangeStatusUpdateAPIView,
    LocationOwnerRetrieveAPIView,
    LocationUserMapListAPIView,
    LocationCheckCalendarDate,
    LocationCheckTimeEnroll,
    BookingLocationCreateAPIView,
    BookingUserListAPIView,
    BookingChangeStatus,
)

app_name = "location"

urlpatterns = [
    path("create/", LocationCreateAPIView.as_view(), name="location-create"),
    path("owner/", LocationOwnerListAPIVIew.as_view(), name="location-owner"),
    path(
        "change/status/<int:pk>",
        LocationOwnerChangeStatusUpdateAPIView.as_view(),
        name="location-change-status",
    ),
    path(
        "owner/<int:pk>",
        LocationOwnerRetrieveAPIView.as_view(),
        name="location-owner-retrieve",
    ),
    path(
        "list/user/view/",
        LocationUserMapListAPIView.as_view(),
        name="location-list-user-view",
    ),
    path("check/date/<int:pk>", LocationCheckCalendarDate.as_view(), name="check-date"),
    path("check/time/<int:pk>", LocationCheckTimeEnroll.as_view(), name="check-time"),
    path(
        "booking/<int:pk>",
        BookingLocationCreateAPIView.as_view(),
        name="booking-location",
    ),
    path("booking/list/", BookingUserListAPIView.as_view(), name="booking-list"),
    path(
        "booking/change/status/<int:pk>",
        BookingChangeStatus.as_view(),
        name="booking-change-status",
    ),
]
