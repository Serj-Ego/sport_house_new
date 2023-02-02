from rest_framework.exceptions import NotFound

from apps.base.models import (
    LocationCategory,
    LocationSportType,
    LocationLight,
    LocationCoating,
)


def get_directory_model_queryset(directory_type):
    if directory_type == "location-category":
        model = LocationCategory
    elif directory_type == "location-sport-type":
        model = LocationSportType
    elif directory_type == "location-lighting":
        model = LocationLight
    elif directory_type == "location-coating":
        model = LocationCoating
    else:
        raise NotFound(detail="Передан неверный тип справочника", code=404)
    return model.objects.all()
