import {
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
} from "../../../../modules/Theme/colors";
import { Box, Divider } from "native-base";
import React from "react";
import SentMistakesButton from "./components/SentMistakesButton";
import AddToFavorite from "./components/AddToFavorite";

export default function AdditionalButtons() {
  return (
    <Box
      style={{
        borderRadius: 12,
        marginBottom: 12,
        paddingVertical: 12,
        paddingHorizontal: 12,
        minHeight: 40,
      }}
      _light={{ backgroundColor: COLORS_LIGHT_THEME.WHITE_BLOCK }}
      _dark={{ backgroundColor: COLORS_DARK_THEME.DARK_BLOCK }}
    >
      <SentMistakesButton />
      <Divider mt={4} mb={4} />
      <AddToFavorite />
    </Box>
  );
}
