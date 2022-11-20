import { Heading, HStack, Icon, Input } from "native-base";
import { Spacer } from "native-base/src/components/primitives/Flex";
import { WIDTH } from "../../../modules/Theme/dimensions";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  COLOR_ACCENT,
  COLORS_DARK_THEME,
  COLORS_FORM,
  COLORS_LIGHT_THEME,
} from "../../../modules/Theme/colors";
import React from "react";

export default function SquareZone({ setSquare, square }) {
  return (
    <HStack justifyContent={"center"} alignItems={"center"}>
      <Heading fontSize={22}>Площадь зоны</Heading>
      <Spacer />
      <Input
        value={square}
        height={55}
        maxWidth={WIDTH / 2.5}
        rightElement={
          <Icon
            as={MaterialCommunityIcons}
            marginRight={6}
            size={5}
            name="vector-square"
            textAlign={"center"}
            _light={{ color: COLOR_ACCENT.ACCENT }}
            _dark={{ color: COLOR_ACCENT.ACCENT }}
          />
        }
        marginY={4}
        width={"100%"}
        borderRadius={12}
        variant="filled"
        textAlign={"left"}
        fontWeight={"bold"}
        fontSize={16}
        placeholder={"кв.м"}
        placeholderTextColor={COLORS_FORM.PLACEHOLDER}
        clearButtonMode="always"
        keyboardType={"numeric"}
        _focus={{
          borderColor: "rgba(255,255,255,0)",
        }}
        paddingLeft={6}
        paddingRight={6}
        _light={{
          backgroundColor: COLORS_FORM.INPUT,
          color: COLORS_LIGHT_THEME.TEXT,
        }}
        _dark={{
          color: COLORS_DARK_THEME.TEXT,
          backgroundColor: COLORS_FORM.DARK_INPUT,
        }}
        onChangeText={(value) => {
          setSquare(value);
        }}
      />
    </HStack>
  );
}
