import { Box, Heading, Image, Text, View } from "native-base";
import { HEIGHT } from "../../../modules/Theme/dimensions";
import {
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
} from "../../../modules/Theme/colors";
import React from "react";

export default function SectionHeader({ header, description = null, image }) {
  return (
    <View alignItems={"center"}>
      <Image
        alt={"location"}
        style={{ resizeMode: "contain" }}
        source={image}
        size={HEIGHT / 4}
      />
      <Box style={{ marginTop: 16, marginBottom: 16 }}>
        <Heading
          _light={{ color: COLORS_LIGHT_THEME.TEXT }}
          _dark={{ color: COLORS_DARK_THEME.TEXT }}
          size={"md"}
          textAlign={"center"}
        >
          {header}
        </Heading>
        {description && (
          <Text textAlign={"center"} fontSize={"2xs"}>
            {description}
          </Text>
        )}
      </Box>
    </View>
  );
}
