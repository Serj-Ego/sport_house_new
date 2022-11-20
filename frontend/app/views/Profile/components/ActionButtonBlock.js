import { TouchableOpacity } from "react-native";
import {
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
} from "../../../modules/Theme/colors";
import { Box, Heading } from "native-base";
import { useNavigation } from "@react-navigation/native";

export default function ActionButtonBlock({ title, routeTo }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(routeTo);
      }}
    >
      <Box
        style={{
          width: "100%",
          height: 60,
          borderRadius: 12,
          marginBottom: 16,
          alignItems: "center",
          justifyContent: "center",
        }}
        _light={{ backgroundColor: COLORS_LIGHT_THEME.WHITE_BLOCK }}
        _dark={{ backgroundColor: COLORS_DARK_THEME.DARK_BLOCK }}
      >
        <Heading
          size={"sm"}
          fontWeight={"normal"}
          _light={{ color: COLORS_LIGHT_THEME.TEXT }}
          _dark={{ color: COLORS_DARK_THEME.TEXT }}
        >
          {title}
        </Heading>
      </Box>
    </TouchableOpacity>
  );
}
