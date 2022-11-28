import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { StyleSheet, useColorScheme } from "react-native";
import {
  HEADER_DELTA,
  MIN_HEADER_HEIGHT,
} from "../../../../modules/Theme/dimensions";
import {
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
} from "../../../../modules/Theme/colors";
import React from "react";

export default function Header({ y, data }) {
  const colorScheme = useColorScheme();
  const opacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      y.value,
      [HEADER_DELTA / 1.6 - 16, HEADER_DELTA / 1.6 - 8],
      [0, 1],
      Extrapolate.CLAMP
    );

    return {
      opacity: opacity,
    };
  });
  const textOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      y.value,
      [HEADER_DELTA / 1.6 - 16, HEADER_DELTA / 1.6 - 8],
      [0, 1],
      Extrapolate.CLAMP
    );

    return {
      opacity: opacity,
    };
  });

  return (
    <Animated.View
      style={[
        styles.container,
        opacity,
        {
          backgroundColor:
            colorScheme === "light"
              ? COLORS_LIGHT_THEME.BACKGROUND
              : COLORS_DARK_THEME.BACKGROUND,
        },
      ]}
    >
      <Animated.Text
        style={[
          styles.title,
          textOpacity,
          {
            color: colorScheme === "light" ? "black" : "white",
            width: "50%",
          },
        ]}
        ellipsizeMode={"middle"}
        numberOfLines={1}
      >
        {data.short_name ? data.short_name : data.full_name}
      </Animated.Text>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  container: {
    //flex: 1,
    height: MIN_HEADER_HEIGHT / 2.5,
    paddingTop: MIN_HEADER_HEIGHT / 2.5 / 4,
    borderStyle: "solid",
    borderBottomWidth: 0.2,
    borderColor: "gray",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "500",
  },
});
