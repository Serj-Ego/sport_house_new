import { Heading, HStack, Text, View } from "native-base";
import {
  ActionSheetIOS,
  TouchableWithoutFeedback,
  useColorScheme,
} from "react-native";
import {
  COLORS_DARK_THEME,
  COLORS_FORM,
  COLORS_LIGHT_THEME,
} from "../../../modules/Theme/colors";
import React from "react";
import { Spacer } from "native-base/src/components/primitives/Flex";
import { Octicons } from "@expo/vector-icons";

const ActionSheetOption = [
  "Отменить",
  "Без дополнительного освещения",
  "Освещение газоразрядными лампами",
  "Освещение лампами накаливания",
  "Освещение светодиодными лампами",
  "Смешанное освещение",
];

export default function LightingZone({ lighting, setLighting }) {
  const colorScheme = useColorScheme();
  const onPress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ActionSheetOption,
        cancelButtonIndex: 0,
        userInterfaceStyle: colorScheme,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          setLighting("");
        } else {
          setLighting(ActionSheetOption[buttonIndex]);
        }
      }
    );
  };
  return (
    <>
      <Heading fontSize={22}>Освещение</Heading>
      <TouchableWithoutFeedback onPress={onPress}>
        <View
          height={55}
          marginBottom={4}
          marginTop={4}
          width={"100%"}
          borderRadius={12}
          paddingLeft={6}
          paddingRight={6}
          justifyContent={"center"}
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
                color: lighting
                  ? COLORS_LIGHT_THEME.TEXT
                  : COLORS_FORM.PLACEHOLDER,
              }}
              _dark={{
                color: lighting
                  ? COLORS_DARK_THEME.TEXT
                  : COLORS_FORM.PLACEHOLDER,
              }}
              fontWeight={"bold"}
            >
              {lighting ? lighting : "Тип освещения"}
            </Text>
            <Spacer />
            <Octicons
              name="chevron-down"
              size={24}
              color={COLORS_FORM.PLACEHOLDER}
            />
          </HStack>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}
