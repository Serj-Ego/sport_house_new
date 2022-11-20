import { Box, Divider, Heading, HStack, Icon } from "native-base";
import { TouchableWithoutFeedback } from "react-native";
import { WIDTH } from "../../../modules/Theme/dimensions";
import {
  COLOR_ACCENT,
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
} from "../../../modules/Theme/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Spacer } from "native-base/src/components/primitives/Flex";

export default function CoveredZone({ setIsCovered, isCovered }) {
  return (
    <>
      <Heading mt={4} fontSize={22}>
        Характеристика зоны
      </Heading>
      <HStack marginY={4} space={2}>
        <TouchableWithoutFeedback onPress={() => setIsCovered(true)}>
          <Box
            style={{
              height: 55,
              width: WIDTH / 2 - 4 - 12,
              borderStyle: "solid",
              borderWidth: 2,
              borderColor: isCovered ? COLOR_ACCENT.ACCENT : "gray",
              borderRadius: 12,
              padding: 12,
              justifyContent: "center",
              alignItems: "center",
            }}
            _light={{ backgroundColor: COLORS_LIGHT_THEME.WHITE_BLOCK }}
            _dark={{ backgroundColor: COLORS_DARK_THEME.DARK_BLOCK }}
          >
            <HStack justifyContent={"center"} alignItems={"center"}>
              <Icon
                as={MaterialCommunityIcons}
                size={6}
                name="bus-stop-covered"
                textAlign={"center"}
                _light={{ color: COLOR_ACCENT.ACCENT }}
                _dark={{ color: COLOR_ACCENT.ACCENT }}
              />
              <Spacer />
              <Heading fontSize={16}>Крытый</Heading>
            </HStack>
          </Box>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setIsCovered(false)}>
          <Box
            style={{
              height: 55,
              width: WIDTH / 2 - 4 - 12,
              borderStyle: "solid",
              borderWidth: 2,
              borderColor: !isCovered ? COLOR_ACCENT.ACCENT : "gray",
              borderRadius: 12,
              padding: 12,
              justifyContent: "center",
              alignItems: "center",
            }}
            _light={{ backgroundColor: COLORS_LIGHT_THEME.WHITE_BLOCK }}
            _dark={{ backgroundColor: COLORS_DARK_THEME.DARK_BLOCK }}
          >
            <HStack alignItems={"center"}>
              <Icon
                as={MaterialCommunityIcons}
                size={6}
                name="bus-stop-uncovered"
                textAlign={"center"}
                _light={{ color: COLOR_ACCENT.ACCENT }}
                _dark={{ color: COLOR_ACCENT.ACCENT }}
              />
              <Spacer />
              <Heading fontSize={16}>Открытый</Heading>
            </HStack>
          </Box>
        </TouchableWithoutFeedback>
      </HStack>
      <Divider mb={4} />
    </>
  );
}
