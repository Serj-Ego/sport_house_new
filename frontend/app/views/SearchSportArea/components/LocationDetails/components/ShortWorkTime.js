import { Heading, VStack } from "native-base";
import React from "react";

export default function ShortWorkTime({ selectedLocation }) {
  return (
    <VStack>
      <Heading size={"xs"} color={"gray.500"}>
        Часы работы
      </Heading>
      <Heading
        size={"sm"}
        color={selectedLocation?.is_open ? "green.500" : "red.500"}
      >
        {selectedLocation?.is_open ? "Открыто" : "Закрыто"}
      </Heading>
    </VStack>
  );
}
