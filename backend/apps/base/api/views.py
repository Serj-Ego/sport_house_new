from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated

from apps.base.api.serializers import BaseDirectorySerializer
from apps.base.api.utils import get_directory_model_queryset


class LocationDirectoryBase(ListAPIView):
    """Базовое представление для справочников спортивной площадки"""

    pagination_class = None
    permission_classes = (IsAuthenticated,)
    serializer_class = BaseDirectorySerializer
    queryset = None

    def get_queryset(self):
        return get_directory_model_queryset(self.kwargs.get("type", None))
