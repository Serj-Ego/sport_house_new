import React, { useMemo } from "react";
import { Platform, StyleSheet, useColorScheme, View } from "react-native";
import { useShowcaseTheme } from "@gorhom/showcase-template";
import { BlurView } from "expo-blur";

const BlurredBackground = () => {
  const { colors } = useShowcaseTheme();
  const colorScheme = useColorScheme();
  const containerStyle = useMemo(
    () => [
      styles.container,
      {
        backgroundColor: colors.background,
        opacity: 0.95,
      },
    ],
    [colors.background]
  );
  return Platform.OS === "ios" ? (
    <View style={styles.container}>
      <BlurView intensity={95} tint={colorScheme} style={styles.blurView} />
    </View>
  ) : (
    <View style={containerStyle} />
  );
};

const styles = StyleSheet.create({
  blurView: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
});

export default BlurredBackground;
