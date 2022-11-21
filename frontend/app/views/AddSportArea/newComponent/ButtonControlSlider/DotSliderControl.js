import { Box, HStack, View } from "native-base";
import React from "react";
import { TouchableWithoutFeedback, useColorScheme } from "react-native";
import { COLOR_ACCENT } from "../../../../modules/Theme/colors";
import { WIDTH } from "../../../../modules/Theme/dimensions";

export default function DotSliderControl({
  activeIndex,
  indexCount,
  refSlider,
  setCurrentSlideIndex,
}) {
  const colorScheme = useColorScheme();

  return (
    <View>
      <HStack space={1} justifyContent={"center"}>
        {indexCount.map((value, index) => {
          return (
            <TouchableWithoutFeedback
              onPress={() => {
                const nextSlideIndex = index;
                const offset = nextSlideIndex * WIDTH;
                refSlider?.current?.scrollToOffset({ offset });
                setCurrentSlideIndex(nextSlideIndex);
              }}
            >
              <Box
                key={index}
                style={{
                  height: 14,
                  width: 14,
                  backgroundColor:
                    index === activeIndex ? COLOR_ACCENT.ACCENT : "#d0d0d0",
                  borderRadius: 100,
                }}
              />
            </TouchableWithoutFeedback>
          );
        })}
      </HStack>
    </View>
  );
}
