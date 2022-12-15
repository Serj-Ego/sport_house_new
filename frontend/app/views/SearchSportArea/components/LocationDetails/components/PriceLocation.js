import { Heading, VStack } from "native-base";
import React from "react";

export default function PriceLocation({ selectedLocation }) {
  return (
    <VStack>
      <Heading size={"xs"} color={"gray.500"}>
        Стоимость
      </Heading>
      <Heading size={"sm"}>от {selectedLocation?.price} ₽</Heading>
    </VStack>
  );
}
