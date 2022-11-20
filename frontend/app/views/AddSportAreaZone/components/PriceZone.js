import { Heading, HStack, Icon, Input } from "native-base";
import React from "react";
import {
  COLOR_ACCENT,
  COLORS_DARK_THEME,
  COLORS_FORM,
  COLORS_LIGHT_THEME,
} from "../../../modules/Theme/colors";
import { FontAwesome } from "@expo/vector-icons";
import { WIDTH } from "../../../modules/Theme/dimensions";
import { Spacer } from "native-base/src/components/primitives/Flex";

export default function PriceZone({ setPrice, price }) {
  return (
    <HStack justifyContent={"center"} alignItems={"center"}>
      <Heading fontSize={22}>Стоимость зоны</Heading>
      <Spacer />
      <Input
        value={price}
        height={55}
        maxWidth={WIDTH / 2.5}
        rightElement={
          <Icon
            as={FontAwesome}
            marginRight={6}
            size={5}
            name="ruble"
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
        placeholder={"В час"}
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
          setPrice(value);
        }}
      />
    </HStack>
  );
}
