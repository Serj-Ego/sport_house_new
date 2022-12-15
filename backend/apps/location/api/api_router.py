from django.urls import path

from apps.location.api.views import (
    LocationCreateAPIView,
    LocationOwnerListAPIVIew,
    LocationOwnerChangeStatusUpdateAPIView,
    LocationOwnerRetrieveAPIView,
    LocationUserMapListAPIView,
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
]
