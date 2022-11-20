import { MAIN_ROUTES } from "../../../modules/NavigationRoutes/main";
import { LinearGradient } from "expo-linear-gradient";
import { PRIMARY_GRADIENT } from "../../../modules/Theme/colors";
import { PADDING_LR_MAIN } from "../../../modules/Theme/padding";
import { HStack, Text } from "native-base";
import { TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function GoToLoginButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(MAIN_ROUTES.LOGIN);
      }}
    >
      <LinearGradient
        colors={[PRIMARY_GRADIENT.START, PRIMARY_GRADIENT.END]}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={{
          width: "100%",
          height: 55,
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
          padding: PADDING_LR_MAIN,
          marginTop: 16,
        }}
      >
        <HStack space={2}>
          <Text
            _light={{ color: "white" }}
            _dark={{ color: "white" }}
            fontWeight={"extrabold"}
          >
            Авторизоваться
          </Text>
        </HStack>
      </LinearGradient>
    </TouchableOpacity>
  );
}
