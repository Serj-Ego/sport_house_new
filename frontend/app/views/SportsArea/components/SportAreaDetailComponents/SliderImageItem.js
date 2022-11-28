import { MAX_HEADER_HEIGHT, WIDTH } from "../../../../modules/Theme/dimensions";
import { Image } from "react-native";
import React from "react";

export default function SliderImageItem({ item }) {
  return (
    <Image
      source={{ uri: item.uri }}
      style={{
        width: WIDTH,
        height: MAX_HEADER_HEIGHT,
        resizeMode: "cover",
      }}
    />
  );
}
