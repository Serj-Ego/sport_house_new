import { Box, HStack, View } from "native-base";
import React from "react";

export default function DotSliderControl({ activeIndex, indexCount }) {
  return (
    <View>
      <HStack space={1} justifyContent={"center"}>
        {indexCount.map((value, index) => {
          return (
            <Box
              key={index}
              style={{
                height: 10,
                width: 10,
                backgroundColor: index === activeIndex ? "#464650" : "#d0d0d0",
                borderRadius: 100,
              }}
            />
          );
        })}
      </HStack>
    </View>
  );
}
