import { Divider, Heading, HStack, Icon, VStack } from "native-base";
import React from "react";
import ShortWorkTime from "./components/ShortWorkTime";
import PriceLocation from "./components/PriceLocation";
import DistanceToLocation from "./components/DistanceToLocation";
import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLOR_ACCENT } from "../../../../modules/Theme/colors";

export default function ShortInfoLocation({
  stateUserLocation,
  selectedLocation,
}) {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <HStack
        space={4}
        alignItems={"center"}
        justifyContent={"center"}
        style={{
          borderTopWidth: 0.5,
          borderBottomWidth: 0.5,
          height: 65,
          paddingVertical: 4,
          paddingHorizontal: 4,
          borderStyle: "solid",
          borderTopColor: "white",
          borderBottomColor: "white",
        }}
      >
        <VStack>
          <Heading size={"xs"} color={"gray.500"}>
            101 оценка
          </Heading>
          <Heading size={"sm"} textAlign={"center"}>
            4.1
          </Heading>
          <HStack justifyContent={"center"}>
            <Icon
              as={Ionicons}
              size={3}
              alignSelf={"center"}
              name={"ios-star"}
              color={COLOR_ACCENT.ACCENT}
            />
            <Icon
              as={Ionicons}
              size={3}
              alignSelf={"center"}
              name={"ios-star"}
              color={COLOR_ACCENT.ACCENT}
            />
            <Icon
              as={Ionicons}
              size={3}
              alignSelf={"center"}
              name={"ios-star"}
              color={COLOR_ACCENT.ACCENT}
            />
            <Icon
              as={Ionicons}
              size={3}
              alignSelf={"center"}
              name={"ios-star"}
              color={COLOR_ACCENT.ACCENT}
            />
            <Icon
              as={Ionicons}
              size={3}
              alignSelf={"center"}
              name={"ios-star-outline"}
              color={COLOR_ACCENT.ACCENT}
            />
          </HStack>
        </VStack>
        <Divider orientation="vertical" bg={"white"} />
        <ShortWorkTime selectedLocation={selectedLocation} />
        <Divider orientation="vertical" bg={"white"} />
        <PriceLocation selectedLocation={selectedLocation} />
        <Divider orientation="vertical" bg={"white"} />
        <DistanceToLocation
          selectedLocation={selectedLocation}
          stateUserLocation={stateUserLocation}
        />
      </HStack>
    </ScrollView>
  );
}
