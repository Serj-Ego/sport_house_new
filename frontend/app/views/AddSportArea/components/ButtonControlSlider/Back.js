import { LinearGradient } from "expo-linear-gradient";
import { PRIMARY_GRADIENT } from "../../../../modules/Theme/colors";
import { PADDING_LR_MAIN } from "../../../../modules/Theme/padding";
import { HStack } from "native-base";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import React from "react";
import { WIDTH } from "../../../../modules/Theme/dimensions";

export default function Back({
  refSlider,
  currentSlideIndex,
  setCurrentSlideIndex,
}) {
  const goBackSlide = () => {
    if (currentSlideIndex !== 0) {
      const backSlideIndex = currentSlideIndex - 1;
      const offset = backSlideIndex * WIDTH;
      refSlider?.current?.scrollToOffset({ offset });
      setCurrentSlideIndex(backSlideIndex);
    }
  };
  return (
    <TouchableOpacity
      style={{ width: "15%" }}
      onPress={goBackSlide}
      disabled={currentSlideIndex === 0}
    >
      <LinearGradient
        colors={[
          currentSlideIndex === 0 ? "#e0e0e0" : PRIMARY_GRADIENT.START,
          currentSlideIndex === 0 ? "#c4c4c4" : PRIMARY_GRADIENT.END,
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
          <Entypo name="chevron-left" size={24} color="white" />
        </HStack>
      </LinearGradient>
    </TouchableOpacity>
  );
}
