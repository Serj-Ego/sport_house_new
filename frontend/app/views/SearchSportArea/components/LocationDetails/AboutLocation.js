import { Box, Heading, Text } from "native-base";
import {
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
} from "../../../../modules/Theme/colors";
import React from "react";

export default function AboutLocation({ selectedLocation }) {
  return (
    <>
      <Heading size={"md"} mt={2}>
        Об этом месте
      </Heading>
      <Box
        style={{
          borderRadius: 12,
          marginVertical: 12,
          paddingVertical: 12,
          paddingHorizontal: 12,
          minHeight: 80,
        }}
        _light={{ backgroundColor: COLORS_LIGHT_THEME.WHITE_BLOCK }}
        _dark={{ backgroundColor: COLORS_DARK_THEME.DARK_BLOCK }}
      >
        <Text fontSize={"md"}>{selectedLocation?.description}</Text>
      </Box>
    </>
  );
}
