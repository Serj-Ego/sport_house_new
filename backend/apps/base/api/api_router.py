from django.urls import path

from apps.base.api.views import LocationDirectoryBase

app_name = "base"

urlpatterns = [
    path(
        "directory/<str:type>",
        LocationDirectoryBase.as_view(),
        name="directory-base-url",
    ),
]
