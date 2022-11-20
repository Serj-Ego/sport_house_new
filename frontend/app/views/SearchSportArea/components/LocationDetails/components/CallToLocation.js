import { Button, Icon, Text } from "native-base";
import {
  COLOR_ACCENT,
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
} from "../../../../../modules/Theme/colors";
import { Linking, StyleSheet, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

export default function CallToLocation({ selectedLocation }) {
  const colorScheme = useColorScheme();
  return (
    <Button
      style={[
        styles.directionsButton,
        {
          backgroundColor:
            colorScheme === "light"
              ? COLORS_LIGHT_THEME.WHITE_BLOCK
              : COLORS_DARK_THEME.DARK_BLOCK,
        },
      ]}
      onPress={() => {
        Linking.openURL(`tel:${selectedLocation?.phone}`);
      }}
    >
      <Icon
        as={Ionicons}
        size={7}
        alignSelf={"center"}
        name={"ios-call"}
        _light={{
          color: COLOR_ACCENT.ACCENT,
        }}
        _dark={{
          color: COLOR_ACCENT.ACCENT,
        }}
      />
      <Text>Позвонить</Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  directionsButton: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 70,
    width: "48%",
    borderRadius: 10,
  },
});
