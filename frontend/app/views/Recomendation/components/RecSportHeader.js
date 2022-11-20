import { Divider, Heading, HStack, Icon, View } from "native-base";
import {
  COLOR_ACCENT,
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
} from "../../../modules/Theme/colors";
import React from "react";

export default function RecSportHeader({ icon, iconName, text }) {
  return (
    <View style={{ marginBottom: 16 }}>
      <HStack space={2}>
        <Icon
          as={icon}
          size={6}
          name={iconName}
          _light={{
            color: COLOR_ACCENT.ACCENT,
          }}
          _dark={{
            color: COLOR_ACCENT.ACCENT,
          }}
        />
        <Heading
          _dark={{ color: COLORS_DARK_THEME.TEXT }}
          _light={{ color: COLORS_LIGHT_THEME.TEXT }}
          size={"md"}
          mb={4}
        >
          {text}
        </Heading>
      </HStack>
      <Divider />
    </View>
  );
}
