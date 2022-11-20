import { HStack } from "native-base";
import React from "react";
import Next from "./Next";
import Back from "./Back";
import DotSliderControl from "./DotSliderControl";

export default function ButtonControlSlider({
  refSlider,
  currentSlideIndex,
  setCurrentSlideIndex,
  sliders,
}) {
  return (
    <HStack
      space={"2%"}
      alignItems={"center"}
      justifyContent={"center"}
      style={{ paddingHorizontal: 12 }}
    >
      <Back
        setCurrentSlideIndex={setCurrentSlideIndex}
        currentSlideIndex={currentSlideIndex}
        refSlider={refSlider}
      />
      <DotSliderControl indexCount={sliders} activeIndex={currentSlideIndex} />
      <Next
        setCurrentSlideIndex={setCurrentSlideIndex}
        currentSlideIndex={currentSlideIndex}
        refSlider={refSlider}
        indexCount={sliders.length}
      />
    </HStack>
  );
}
