from rest_framework import serializers


class BaseDirectorySerializer(serializers.Serializer):
    """Сериализатор справочников"""

    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(read_only=True)
