from django.urls import path, include

app_name = "api"

urlpatterns = [
    path("base/", include("apps.base.api.api_router", namespace="base")),
    path("user/", include("apps.user.api.api_router", namespace="user")),
    path("location/", include("apps.location.api.api_router", namespace="location")),
    path(
        "recomendation/",
        include("apps.recomendation.api.api_router", namespace="recomendation"),
    ),
]
