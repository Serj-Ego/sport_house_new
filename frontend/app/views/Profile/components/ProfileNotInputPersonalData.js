import { Box, Heading } from "native-base";
import {
  COLOR_ACCENT,
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
} from "../../../modules/Theme/colors";
import { TouchableOpacity } from "react-native";
import { PROFILE_ROUTE } from "../../../modules/NavigationRoutes/profile";
import { useNavigation } from "@react-navigation/native";

export default function ProfileNotInputPersonalData() {
  const navigation = useNavigation();
  return (
    <>
      <Heading
        style={{ marginTop: 16 }}
        _light={{ backgroundColor: COLORS_LIGHT_THEME.WHITE_BLOCK }}
        _dark={{ backgroundColor: COLORS_DARK_THEME.DARK_BLOCK }}
      >
        Мои данные
      </Heading>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(PROFILE_ROUTE.ADD_PERSONAL_DATA.route);
        }}
      >
        <Box
          style={{
            borderRadius: 12,
            marginTop: 16,
            padding: 16,
            borderStyle: "solid",
            borderWidth: 1,
            borderColor: COLOR_ACCENT.ACCENT,
          }}
          _light={{ backgroundColor: COLORS_LIGHT_THEME.WHITE_BLOCK }}
          _dark={{ backgroundColor: COLORS_DARK_THEME.DARK_BLOCK }}
        >
          <Heading
            size={"sm"}
            style={{
              fontWeight: "normal",
              textAlign: "center",
            }}
            _light={{ backgroundColor: COLORS_LIGHT_THEME.WHITE_BLOCK }}
            _dark={{ backgroundColor: COLORS_DARK_THEME.DARK_BLOCK }}
          >
            Заполнить
          </Heading>
        </Box>
      </TouchableOpacity>
    </>
  );
}
