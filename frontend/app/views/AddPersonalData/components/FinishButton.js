import { PADDING_LR_MAIN } from "../../../modules/Theme/padding";
import { LinearGradient } from "expo-linear-gradient";
import { PRIMARY_GRADIENT } from "../../../modules/Theme/colors";
import { HStack, Text } from "native-base";
import { Alert, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  CreateUpdateRecUserInfoApiRequest,
  userLoginData,
} from "../../../services/redux/slices/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { PROFILE_ROUTE } from "../../../modules/NavigationRoutes/profile";

export default function FinishButton({ data, setLoading }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userId = useSelector(userLoginData);

  return (
    <TouchableOpacity
      onPress={() => {
        setLoading(true);
        dispatch(CreateUpdateRecUserInfoApiRequest(data))
          .then(unwrapResult)
          .then((res) => {
            setLoading(false);
            navigation.navigate(PROFILE_ROUTE.MAIN.route);
          })
          .catch((err) => {
            Alert.alert("Произошла ошибка!");
            setLoading(false);
          });
      }}
      style={{
        position: "absolute",
        bottom: 36,
        right: PADDING_LR_MAIN,
        left: PADDING_LR_MAIN,
      }}
    >
      <LinearGradient
        colors={[PRIMARY_GRADIENT.START, PRIMARY_GRADIENT.END]}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={{
          minWidth: "100%",
          height: 56,
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
          padding: PADDING_LR_MAIN,
        }}
      >
        <HStack space={2}>
          <Text _light={{ color: "white" }} _dark={{ color: "white" }}>
            Отправить
          </Text>
        </HStack>
      </LinearGradient>
    </TouchableOpacity>
  );
}
