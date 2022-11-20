import {
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
} from "../../../modules/Theme/colors";
import { HStack } from "native-base";
import BottomSheet from "@gorhom/bottom-sheet";
import React, { useRef } from "react";
import { useColorScheme } from "react-native";
import SearchInputBottomSheet from "./SearchInputBottomSheet";
import FilterButtonBottomSheet from "./FilterButtonBottomSheet";
import MyFavoritesArea from "./MyFavoritesArea";
import SportAreaListBottomSheet from "./SportAreaListBottomSheet";
import FastFiltersBottomSheet from "./FastFiltersBottomSheet";

export default function CustomBottomSheet() {
  const colorScheme = useColorScheme();
  const bottomSheetRef = useRef(null);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      handleIndicatorStyle={{
        backgroundColor:
          colorScheme === "light"
            ? COLORS_LIGHT_THEME.SUBTEXT
            : COLORS_DARK_THEME.SUBTEXT,
        width: 50,
      }}
      snapPoints={["10%", "30%", "90%"]}
      keyboardBehavior="extend"
      backgroundStyle={{
        opacity: 0.95,
        backgroundColor:
          colorScheme === "light"
            ? COLORS_LIGHT_THEME.BACKGROUND
            : COLORS_DARK_THEME.BACKGROUND,
      }}
    >
      <HStack>
        <SearchInputBottomSheet />
        <FilterButtonBottomSheet />
      </HStack>
      <FastFiltersBottomSheet />
      <MyFavoritesArea />
      <SportAreaListBottomSheet />
    </BottomSheet>
  );
}
