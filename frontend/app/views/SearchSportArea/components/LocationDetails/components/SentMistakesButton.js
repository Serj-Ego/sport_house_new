import { Box, HStack, Icon, Text } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { COLOR_ACCENT } from "../../../../../modules/Theme/colors";
import React from "react";

export default function SentMistakesButton() {
  return (
    <HStack space={4} alignItems={"center"}>
      <Box
        _light={{ bg: "gray.100" }}
        _dark={{ bg: "gray.600" }}
        style={{
          borderRadius: 100,
          justifyContent: "center",
          alignItems: "center",
        }}
        size={8}
      >
        <Icon
          as={Ionicons}
          size={5}
          alignSelf={"center"}
          name={"ios-chatbox-ellipses"}
          color={COLOR_ACCENT.ACCENT}
        />
      </Box>
      <Text fontSize={16} color={COLOR_ACCENT.ACCENT}>
        Сообщить о проблеме
      </Text>
    </HStack>
  );
}
