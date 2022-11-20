import { LinearGradient } from "expo-linear-gradient";
import { HStack, Text } from "native-base";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

import { PRIMARY_GRADIENT } from "../../../modules/Theme/colors";
import { PADDING_LR_MAIN } from "../../../modules/Theme/padding";
import { useDispatch } from "react-redux";
import { setCompleteOnboarding } from "../../../services/redux/slices/baseSlice";
import { MAIN_ROUTES } from "../../../modules/NavigationRoutes/main";

export default function FinishButton() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const goToInitialPage = async () => {
    dispatch(setCompleteOnboarding());
    navigation.navigate(MAIN_ROUTES.LOGIN);
  };
  return (
    <TouchableOpacity
      onPress={goToInitialPage}
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
            Вперед, к победам!
          </Text>
          <MaterialIcons name="sports-handball" size={24} color="white" />
        </HStack>
      </LinearGradient>
    </TouchableOpacity>
  );
}
