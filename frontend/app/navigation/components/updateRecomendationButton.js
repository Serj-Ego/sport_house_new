import { ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import { Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { COLOR_ACCENT } from "../../modules/Theme/colors";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userInfoData } from "../../services/redux/slices/userSlice";
import { CalculateRecommendationApiRequest } from "../../services/redux/slices/recommendationSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigation } from "@react-navigation/native";
import { PROFILE_ROUTE } from "../../modules/NavigationRoutes/profile";

export default function UpdateRecomendationButton() {
  const userDataState = useSelector(userInfoData);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const onPress = () => {
    if (userDataState.recomendation_info) {
      setLoading(true);
      dispatch(CalculateRecommendationApiRequest())
        .then(unwrapResult)
        .then((res) => {
          setLoading(false);
          Alert.alert(
            "Расчет успешно запущен",
            "Ожидайте уведомления для просмотра расчета"
          );
          navigation.goBack();
        })
        .catch((err) => {
          setLoading(false);
          Alert.alert("При запуске расчета произошла ошибка!");
        });
    } else {
      Alert.alert("Для расчета рекомендаций требуется заполнить анкету");
      navigation.navigate(PROFILE_ROUTE.ADD_PERSONAL_DATA.route);
    }
  };
  return loading ? (
    <ActivityIndicator style={{ alignSelf: "center" }} />
  ) : (
    <TouchableOpacity style={{ width: "100%" }} onPress={onPress}>
      <Icon
        as={MaterialIcons}
        size={7}
        alignSelf={"center"}
        name={"update"}
        _light={{
          color: COLOR_ACCENT.ACCENT,
        }}
        _dark={{
          color: COLOR_ACCENT.ACCENT,
        }}
      />
    </TouchableOpacity>
  );
}
