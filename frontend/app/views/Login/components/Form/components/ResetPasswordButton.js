import { Text } from "native-base";
import {
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
} from "../../../../../modules/Theme/colors";
import { TouchableOpacity } from "react-native";

export default function ResetPasswordButton() {
  return (
    <TouchableOpacity
    // onPress={goToInitialPage}
    >
      <Text
        textAlign={"center"}
        style={{ marginTop: 16, fontWeight: "bold" }}
        _light={{
          color: COLORS_LIGHT_THEME.SUBTEXT,
        }}
        _dark={{
          color: COLORS_DARK_THEME.SUBTEXT,
        }}
      >
        Забыли пароль?
      </Text>
    </TouchableOpacity>
  );
}
