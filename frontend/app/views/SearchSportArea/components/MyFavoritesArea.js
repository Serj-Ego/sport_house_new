import { Box, Heading, Icon, Text } from "native-base";
import {
  COLOR_ACCENT,
  COLORS_DARK_THEME,
  COLORS_FORM,
  COLORS_LIGHT_THEME,
} from "../../../modules/Theme/colors";
import { WIDTH } from "../../../modules/Theme/dimensions";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";

export default function MyFavoritesArea() {
  const colorScheme = useColorScheme();
  return (
    <>
      <Heading
        size={"sm"}
        style={{ marginLeft: 10, marginTop: 10 }}
        _light={{ color: COLORS_FORM.PLACEHOLDER }}
        _dark={{ color: COLORS_FORM.PLACEHOLDER }}
      >
        Избранное
      </Heading>
      <Box
        style={{
          borderRadius: 12,
          height: 105,
          width: WIDTH - 20,
          marginLeft: 10,
          marginRight: 10,
          marginTop: 10,
          padding: 15,
        }}
        _light={{ backgroundColor: COLORS_FORM.INPUT }}
        _dark={{ backgroundColor: COLORS_FORM.DARK_INPUT }}
      >
        <Box
          style={{
            width: 55,
            height: 55,
            textAlign: "center",
            padding: 5,
            borderRadius: 105,
            alignItems: "center",
            justifyContent: "center",
          }}
          _light={{ backgroundColor: COLORS_LIGHT_THEME.SUBTEXT }}
          _dark={{ backgroundColor: COLORS_DARK_THEME.BACKGROUND }}
        >
          <Icon
            as={Ionicons}
            size={8}
            name="ios-add"
            textAlign={"center"}
            color={
              colorScheme === "light"
                ? COLOR_ACCENT.ACCENT
                : COLOR_ACCENT.ACCENT
            }
          />
        </Box>
        <Text size={"sm"}>Добавить</Text>
      </Box>
    </>
  );
}
