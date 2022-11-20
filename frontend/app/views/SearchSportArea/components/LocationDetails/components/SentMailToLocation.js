import { Linking, StyleSheet, useColorScheme } from "react-native";
import {
  COLOR_ACCENT,
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
} from "../../../../../modules/Theme/colors";
import { Button, Icon, Text } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

export default function SentMailToLocation({ selectedLocation }) {
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
        Linking.openURL(`mailto:${selectedLocation?.email}`);
      }}
    >
      <Icon
        as={Ionicons}
        size={7}
        alignSelf={"center"}
        name={"ios-mail"}
        _light={{
          color: COLOR_ACCENT.ACCENT,
        }}
        _dark={{
          color: COLOR_ACCENT.ACCENT,
        }}
      />
      <Text>Написать</Text>
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
