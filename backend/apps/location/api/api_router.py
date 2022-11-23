from django.urls import path

from apps.location.api.views import LocationCreateAPIView

app_name = "location"

urlpatterns = [
    path("create/", LocationCreateAPIView.as_view(), name="location-create"),
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
