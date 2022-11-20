import { Image } from "react-native";
import { WIDTH } from "../../../modules/Theme/dimensions";
import { Box, Heading, View } from "native-base";
import React from "react";
import { PADDING_LR_MAIN } from "../../../modules/Theme/padding";
import {
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
} from "../../../modules/Theme/colors";

export default function PersonalDataCardItem({ item }) {
  return (
    <View
      style={{
        alignItems: "center",
        width: WIDTH,
        padding: PADDING_LR_MAIN,
      }}
    >
      <Image
        source={item.image}
        style={{ height: "60%", width: WIDTH / 1.5, resizeMode: "contain" }}
      />
      <Box>
        <Heading
          _light={{ color: COLORS_LIGHT_THEME.TEXT }}
          _dark={{ color: COLORS_DARK_THEME.TEXT }}
          size={"md"}
          style={{ width: WIDTH - PADDING_LR_MAIN * 2, marginBottom: 16 }}
          textAlign={"center"}
        >
          {item.title}
        </Heading>
        {item.components}
      </Box>
    </View>
  );
}
