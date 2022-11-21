from django.urls import path

# from apps.base.api.views import PreviewTestAPIView
from apps.location.api.views import (
    LocationSportTypeListAPIView,
    LocationCategoryListAPIView,
)

app_name = "location"

urlpatterns = [
    path("category/", LocationCategoryListAPIView.as_view(), name="location-category"),
    path("sport/type/", LocationSportTypeListAPIView.as_view(), name="sport-types"),
    # path("create/", LocationCreateAPIView.as_view(), name="location-create"),
    # path("list/view/", LocationListAPIView.as_view(), name="location-list-view"),
    # path(
    #     "change/status/<int:pk>",
    #     LocationListAPIView.as_view(),
    #     name="location-sent-review",
    # ),
    # path(
    #     "list/user/view/",
    #     LocationForUserListAPIView.as_view(),
    #     name="location-list-user-view",
    # ),
]
