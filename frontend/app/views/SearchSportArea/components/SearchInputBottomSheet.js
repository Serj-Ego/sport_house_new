import { WIDTH } from "../../../modules/Theme/dimensions";
import {
  COLORS_DARK_THEME,
  COLORS_FORM,
  COLORS_LIGHT_THEME,
} from "../../../modules/Theme/colors";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import React from "react";
import { useColorScheme } from "react-native";

export default function SearchInputBottomSheet() {
  const colorScheme = useColorScheme();
  return (
    <BottomSheetTextInput
      // value={searchData}
      clearButtonMode={"always"}
      placeholder={"Поиск"}
      style={{
        borderRadius: 10,
        marginLeft: 10,
        paddingLeft: 10,
        marginRight: 5,
        paddingRight: 10,
        height: 40,
        width: WIDTH - WIDTH / 8 - 20 - 5,
        color:
          colorScheme === "light"
            ? COLORS_LIGHT_THEME.TEXT
            : COLORS_DARK_THEME.TEXT,
        backgroundColor:
          colorScheme === "light" ? COLORS_FORM.INPUT : COLORS_FORM.DARK_INPUT,
      }}
    />
  );
}
