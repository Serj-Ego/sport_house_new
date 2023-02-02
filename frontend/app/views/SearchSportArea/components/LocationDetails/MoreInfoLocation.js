import { Box, Divider, Heading, Text } from "native-base";
import React from "react";
import WorkTimeLocationAccordion from "./components/WorkTimeLocationAccordion";
import {
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
} from "../../../../modules/Theme/colors";
import { Linking } from "react-native";

export default function MoreInfoLocation({ selectedLocation }) {
  return (
    <>
      <Heading size={"md"} mt={2} mb={2}>
        Подробнее
      </Heading>
      {selectedLocation?.work_time && (
        <WorkTimeLocationAccordion selectedLocation={selectedLocation} />
      )}
      <Box
        style={{
          borderRadius: 12,
          marginBottom: 12,
          paddingVertical: 12,
          paddingHorizontal: 12,
          minHeight: 80,
          marginTop: 12,
        }}
        _light={{ backgroundColor: COLORS_LIGHT_THEME.WHITE_BLOCK }}
        _dark={{ backgroundColor: COLORS_DARK_THEME.DARK_BLOCK }}
      >
        <Text fontSize={"md"} color={"gray.300"}>
          Телефон
        </Text>
        <Text
          fontSize={"md"}
          color={"blue.500"}
          onPress={() => {
            Linking.openURL(`tel:${selectedLocation?.phone}`);
          }}
        >
          {selectedLocation?.phone}
        </Text>
        <Divider mt={3} mb={2} />
        <Text fontSize={"md"} color={"gray.300"}>
          E-mail
        </Text>
        <Text
          fontSize={"md"}
          color={"blue.500"}
          onPress={() => {
            Linking.openURL(`mailto:${selectedLocation?.email}`);
          }}
        >
          {selectedLocation?.email}
        </Text>
        <Divider mt={3} mb={2} />
        <Text fontSize={"md"} color={"gray.300"}>
          Веб-сайт
        </Text>
        <Text
          fontSize={"md"}
          color={"blue.500"}
          onPress={() => {
            Linking.openURL(`${selectedLocation?.web_site}`);
          }}
        >
          {selectedLocation?.web_site}
        </Text>
        <Divider mt={3} mb={2} />
        <Text fontSize={"md"} color={"gray.300"}>
          Адрес
        </Text>
        <Text fontSize={"md"}>
          {selectedLocation?.address?.thoroughfare},
          {selectedLocation?.address?.subThoroughfare}
        </Text>
        <Text fontSize={"md"}>{selectedLocation?.address?.locality}</Text>
        <Text fontSize={"md"}>{selectedLocation?.address?.country}</Text>
        <Text fontSize={"md"}>{selectedLocation?.address?.postalCode}</Text>
      </Box>
    </>
  );
}
