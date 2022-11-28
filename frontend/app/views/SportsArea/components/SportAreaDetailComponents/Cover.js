import { StyleSheet, useColorScheme } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import {
  HEADER_DELTA,
  MAX_HEADER_HEIGHT,
} from "../../../../modules/Theme/dimensions";
import React from "react";
import { FlatListSlider } from "react-native-flatlist-slider";
import SliderImageItem from "./SliderImageItem";
import {
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
} from "../../../../modules/Theme/colors";

const dataImages = [
  {
    banner: require("../../../../assets/img.png"),
  },
  {
    banner: require("../../../../assets/img_1.png"),
  },
  {
    banner: require("../../../../assets/img_2.png"),
  },
];

export default function Cover({ y, data }) {
  const colorScheme = useColorScheme();
  const scale = useAnimatedStyle(() => {
    const scale = interpolate(
      y.value,
      [-MAX_HEADER_HEIGHT, 0],
      [4, 1],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ scale: scale }],
    };
  });
  const opacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      y.value,
      [-64, 0, HEADER_DELTA],
      [0, 0.2, 1],
      Extrapolate.CLAMP
    );

    return {
      opacity: opacity,
    };
  });

  return (
    <Animated.View style={[styles.container, scale]}>
      <FlatListSlider
        data={data.images}
        component={<SliderImageItem />}
        indicator={false}
        timer={8000}
      />
      <Animated.View
        style={[
          {
            ...StyleSheet.absoluteFillObject,
            backgroundColor:
              colorScheme === "light"
                ? COLORS_LIGHT_THEME.BACKGROUND
                : COLORS_DARK_THEME.BACKGROUND,
          },
          opacity,
        ]}
      />
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: MAX_HEADER_HEIGHT,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
});
