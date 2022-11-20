import { HStack, Text, View } from "native-base";
import { ActionSheetIOS, TouchableOpacity, useColorScheme } from "react-native";
import {
  COLORS_DARK_THEME,
  COLORS_FORM,
  COLORS_LIGHT_THEME,
  ERROR,
} from "../../../modules/Theme/colors";
import { RoleConst } from "../../../modules/RoleConst";

export default function RegistrationAs({ role, setRole, roleError }) {
  const colorScheme = useColorScheme();
  const onPress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Отменить", RoleConst.SPORTSMAN, RoleConst.SPORT_AREA],
        cancelButtonIndex: 0,
        userInterfaceStyle: colorScheme,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          setRole("");
        } else if (buttonIndex === 1) {
          setRole(RoleConst.SPORTSMAN);
        } else if (buttonIndex === 2) {
          setRole(RoleConst.SPORT_AREA);
        }
      }
    );
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        height={55}
        marginBottom={4}
        width={"100%"}
        borderRadius={12}
        paddingLeft={6}
        paddingRight={6}
        justifyContent={"center"}
        borderStyle={"solid"}
        borderColor={
          roleError
            ? ERROR.FLAT
            : colorScheme === "light"
            ? "rgba(250,250,250,0.7)"
            : "rgba(255,255,255,0)"
        }
        borderWidth={1}
        _light={{
          backgroundColor: COLORS_FORM.INPUT,
          color: COLORS_LIGHT_THEME.TEXT,
        }}
        _dark={{
          color: COLORS_DARK_THEME.TEXT,
          backgroundColor: COLORS_FORM.DARK_INPUT,
        }}
      >
        <HStack space={2}>
          <Text
            fontSize={16}
            _light={{
              color: role ? COLORS_LIGHT_THEME.TEXT : COLORS_FORM.PLACEHOLDER,
            }}
            _dark={{
              color: role ? COLORS_DARK_THEME.TEXT : COLORS_FORM.PLACEHOLDER,
            }}
            fontWeight={"bold"}
          >
            {role ? role : "Зарегистрироваться как.."}
          </Text>
        </HStack>
      </View>
    </TouchableOpacity>
  );
}
