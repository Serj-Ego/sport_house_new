import { Box, HStack, Text } from "native-base";
import {
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
} from "../../../../modules/Theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import ActionButton from "./ActionButton";

export default function ActionPanel({ isBlocked, last_status, id }) {
  const colorScheme = useColorScheme();
  return (
    <HStack justifyContent={"space-between"} marginY={"1%"}>
      <Box
        style={{
          width: "49%",
          height: 65,
          borderRadius: 12,
          paddingHorizontal: 24,
        }}
        _light={{ backgroundColor: COLORS_LIGHT_THEME.WHITE_BLOCK }}
        _dark={{ backgroundColor: COLORS_DARK_THEME.DARK_BLOCK }}
        justifyContent={"center"}
      >
        <HStack justifyContent={"center"} space={2} alignItems={"center"}>
          <Ionicons name="pencil-sharp" size={24} color={"#007AFF"} />
          <Text color={"#007AFF"} fontWeight={600} fontSize={16}>
            Редактировать
          </Text>
        </HStack>
      </Box>
      <ActionButton last_status={last_status} id={id} isBlocked={isBlocked} />
    </HStack>
  );
}
