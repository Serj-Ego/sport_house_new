import { HStack } from "native-base";
import React from "react";
import CallToLocation from "./components/CallToLocation";
import SentMailToLocation from "./components/SentMailToLocation";

export default function ActionButtons({ selectedLocation }) {
  return (
    <HStack space={"4%"} marginBottom={4} marginTop={2}>
      <CallToLocation selectedLocation={selectedLocation} />
      <SentMailToLocation selectedLocation={selectedLocation} />
    </HStack>
  );
}
