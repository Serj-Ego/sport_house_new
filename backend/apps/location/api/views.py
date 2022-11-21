# Create your views here.

# class LocationCreateAPIView(APIView):
#     """Создание новой спортивной площадки"""
#
#     permission_classes = (IsAuthenticated,)
#
#     def post(self, request, *args, **kwargs):
#         if request.data.__len__() == 2:
#             data = json.loads(request.data.pop("data")[0])
#             data["images"] = request.data.pop("images", None)
#         else:
#             data = request.data
#         serializer = LocationCreateSerializer(
#             data=data,
#             context={
#                 "user": self.request.user,
#             },
#         )
#         if serializer.is_valid(raise_exception=True):
#             serializer.save()
#         return Response({}, status=status.HTTP_200_OK)


# class LocationListAPIView(ListAPIView, UpdateAPIView):
#     """Вывод спортивных площадок"""
#
#     permission_classes = (IsAuthenticated,)
#     pagination_class = None
#     queryset = Location.objects.all()
#     serializer_class = LocationOwnerListSerializer
#
#     def get_queryset(self):
#         return Location.objects.filter(owner=self.request.user).order_by("-id")
#
#     def get_serializer_context(self):
#         """Проставляем в контекст сериализатора пользователя"""
#         return {
#             "user": self.request.user,
#         }


# class LocationForUserListAPIView(ListAPIView):
#     """Список спортивных площадок для пользователя на карте"""
#
#     permission_classes = (IsAuthenticated,)
#     pagination_class = None
#     queryset = Location.objects.all()
#     serializer_class = LocationForUserSerializer
