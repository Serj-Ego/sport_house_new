import { WIDTH } from "../../../modules/Theme/dimensions";
import {
  COLORS_DARK_THEME,
  COLORS_FORM,
  COLORS_LIGHT_THEME,
} from "../../../modules/Theme/colors";
import { Box, Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useColorScheme } from "react-native";

export default function FilterButtonBottomSheet() {
  const colorScheme = useColorScheme();
  return (
    <Box
      style={{
        borderRadius: 10,
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        width: WIDTH / 8,
        color:
          colorScheme === "light"
            ? COLORS_LIGHT_THEME.TEXT
            : COLORS_DARK_THEME.TEXT,
        backgroundColor:
          colorScheme === "light" ? COLORS_FORM.INPUT : COLORS_FORM.DARK_INPUT,
      }}
    >
      <Icon
        as={Ionicons}
        size={6}
        name="ios-filter"
        color={
          colorScheme === "light"
            ? COLORS_LIGHT_THEME.TEXT
            : COLORS_DARK_THEME.TEXT
        }
      />
    </Box>
  );
}
