import { Box, HStack, Text } from "native-base";
import { WIDTH } from "../../../../../modules/Theme/dimensions";
import { PADDING_LR_MAIN } from "../../../../../modules/Theme/padding";
import { COLOR_ACCENT } from "../../../../../modules/Theme/colors";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MAIN_ROUTES } from "../../../../../modules/NavigationRoutes/main";

export default function RegistrationButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(MAIN_ROUTES.SET_ROLE);
      }}
    >
      <Box
        style={{
          borderStyle: "solid",
          borderWidth: 1,
          width: WIDTH / 2 - PADDING_LR_MAIN - PADDING_LR_MAIN / 2,
          height: 55,
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
          padding: PADDING_LR_MAIN,
        }}
        _light={{
          borderColor: COLOR_ACCENT.ACCENT,
        }}
        _dark={{
          borderColor: "white",
        }}
      >
        <HStack space={2}>
          <Text
            _light={{ color: COLOR_ACCENT.ACCENT }}
            _dark={{ color: "white" }}
          >
            Регистрация
          </Text>
        </HStack>
      </Box>
    </TouchableOpacity>
  );
}
