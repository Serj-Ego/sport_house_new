import { LinearGradient } from "expo-linear-gradient";
import { PRIMARY_GRADIENT } from "../../../../modules/Theme/colors";
import { PADDING_LR_MAIN } from "../../../../modules/Theme/padding";
import { HStack } from "native-base";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import React from "react";
import { WIDTH } from "../../../../modules/Theme/dimensions";

export default function Next({
  refSlider,
  currentSlideIndex,
  setCurrentSlideIndex,
  indexCount,
}) {
  const goNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    const offset = nextSlideIndex * WIDTH;
    refSlider?.current?.scrollToOffset({ offset });
    setCurrentSlideIndex(nextSlideIndex);
  };
  return (
    <TouchableOpacity
      style={{ width: "15%" }}
      onPress={goNextSlide}
      disabled={indexCount - 1 === currentSlideIndex}
    >
      <LinearGradient
        colors={[
          currentSlideIndex === indexCount - 1
            ? "#e0e0e0"
            : PRIMARY_GRADIENT.START,
          currentSlideIndex === indexCount - 1
            ? "#c4c4c4"
            : PRIMARY_GRADIENT.END,
        ]}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={{
          height: 55,
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
          padding: PADDING_LR_MAIN,
        }}
      >
        <HStack space={2}>
          <Entypo name="chevron-right" size={24} color="white" />
        </HStack>
      </LinearGradient>
    </TouchableOpacity>
  );
}
