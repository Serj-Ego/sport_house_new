from django.urls import path

from apps.recomendation.api.views import (
    RecomendationUserRetrieveAPIVIew,
    StartCalculationUserRecAPIView,
)

app_name = "recomendation"

urlpatterns = [
    path(
        "retrieve/",
        RecomendationUserRetrieveAPIVIew.as_view(),
        name="recomendation-retrieve",
    ),
    path(
        "calculate/",
        StartCalculationUserRecAPIView.as_view(),
        name="recomendation-calculate",
    ),
]
