import { LinearGradient } from "expo-linear-gradient";
import { PRIMARY_GRADIENT } from "../../../modules/Theme/colors";
import { PADDING_LR_MAIN } from "../../../modules/Theme/padding";
import { HStack, Text } from "native-base";
import { ActivityIndicator, TouchableOpacity } from "react-native";

export default function RegButton({ onRegistration, loading }) {
  return (
    <TouchableOpacity onPress={onRegistration} disabled={loading}>
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
        }}
      >
        {loading ? (
          <ActivityIndicator />
        ) : (
          <HStack space={2}>
            <Text
              _light={{ color: "white" }}
              _dark={{ color: "white" }}
              fontWeight={"extrabold"}
            >
              Регистрация
            </Text>
          </HStack>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}
