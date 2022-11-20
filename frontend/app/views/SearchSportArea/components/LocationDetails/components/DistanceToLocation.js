import { Heading, HStack, Icon, VStack } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { getDistance } from "geolib";
import React from "react";

export default function DistanceToLocation({
  selectedLocation,
  stateUserLocation,
}) {
  return (
    selectedLocation?.address && (
      <VStack>
        <Heading size={"xs"} color={"gray.500"}>
          Расстояние
        </Heading>
        <HStack alignItems={"center"} space={1}>
          <Icon as={Ionicons} size={4} name={"ios-navigate"} />
          <Heading size={"sm"}>
            {(
              getDistance(
                {
                  latitude: stateUserLocation?.latitude,
                  longitude: stateUserLocation?.longitude,
                },
                {
                  latitude: selectedLocation?.address?.latitude,
                  longitude: selectedLocation?.address?.longitude,
                },
                0.01
              ) / 1000
            ).toFixed(1)}{" "}
            км
          </Heading>
        </HStack>
      </VStack>
    )
  );
}
