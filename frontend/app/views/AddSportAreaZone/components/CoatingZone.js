import { Heading, HStack, Text, View } from "native-base";
import React from "react";
import {
  COLORS_DARK_THEME,
  COLORS_FORM,
  COLORS_LIGHT_THEME,
} from "../../../modules/Theme/colors";
import {
  ActionSheetIOS,
  TouchableWithoutFeedback,
  useColorScheme,
} from "react-native";
import { Spacer } from "native-base/src/components/primitives/Flex";
import { Octicons } from "@expo/vector-icons";

const ActionSheetOption = [
  "Отменить",
  "Асфальтовое, бетонное покрытие",
  "Газонное покрытие (искусственное)",
  "Газонное покрытие (натуральное)",
  "Грунтовое покрытие",
  "Деревянное покрытие",
  "Заливное покрытие",
  "Искусственный лед",
  "Искусственный снег",
  "Натуральный лед",
  "Натуральный снег",
  "Отсыпное покрытие",
  "Рулонное покрытие",
  "Синтетический лед",
  "Специальное покрытие",
];
export default function CoatingZone({ coating, setCoating }) {
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
          setCoating("");
        } else {
          setCoating(ActionSheetOption[buttonIndex]);
        }
      }
    );
  };
  return (
    <>
      <Heading fontSize={22}>Покрытие</Heading>
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
                color: coating
                  ? COLORS_LIGHT_THEME.TEXT
                  : COLORS_FORM.PLACEHOLDER,
              }}
              _dark={{
                color: coating
                  ? COLORS_DARK_THEME.TEXT
                  : COLORS_FORM.PLACEHOLDER,
              }}
              fontWeight={"bold"}
            >
              {coating ? coating : "Тип покрытия"}
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
