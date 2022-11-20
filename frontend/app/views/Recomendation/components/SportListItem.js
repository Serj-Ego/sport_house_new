import {
  COLOR_ACCENT,
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
} from "../../../modules/Theme/colors";
import { Box, Heading } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";

export default function SportListItem({
  item,
  setText,
  selectedSportItem,
  setSelectedSportItem,
}) {
  return (
    <TouchableOpacity
      onPress={() => {
        setSelectedSportItem(item.id);
        setText(item.description ? item.description : "Описание отсутсвует!");
      }}
    >
      <Box
        style={[
          {
            borderRadius: 12,
            borderStyle: "solid",
            borderWidth: 1,
            borderColor: COLOR_ACCENT.ACCENT,
            padding: 12,
            marginBottom: 16,
          },
          selectedSportItem === item.id && {
            backgroundColor: COLOR_ACCENT.ACCENT,
          },
        ]}
      >
        <Heading
          size={"sm"}
          _light={{
            color: COLORS_LIGHT_THEME.TEXT,
          }}
          _dark={{
            color: COLORS_DARK_THEME.TEXT,
          }}
        >
          {item.name}
        </Heading>
      </Box>
    </TouchableOpacity>
  );
}
