import { LinearGradient } from "expo-linear-gradient";
import { PRIMARY_GRADIENT } from "../../../../../modules/Theme/colors";
import { WIDTH } from "../../../../../modules/Theme/dimensions";
import { PADDING_LR_MAIN } from "../../../../../modules/Theme/padding";
import { HStack, Text } from "native-base";
import { TouchableOpacity } from "react-native";

export default function LoginButton({ onLogin }) {
  return (
    <TouchableOpacity onPress={onLogin}>
      <LinearGradient
        colors={[PRIMARY_GRADIENT.START, PRIMARY_GRADIENT.END]}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={{
          width: WIDTH / 2 - PADDING_LR_MAIN - PADDING_LR_MAIN / 2,
          height: 55,
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
          padding: PADDING_LR_MAIN,
        }}
      >
        <HStack space={2}>
          <Text
            _light={{ color: "white" }}
            _dark={{ color: "white" }}
            fontWeight={"extrabold"}
          >
            Войти
          </Text>
        </HStack>
      </LinearGradient>
    </TouchableOpacity>
  );
}
