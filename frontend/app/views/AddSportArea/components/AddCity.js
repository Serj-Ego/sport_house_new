import { Heading, Input } from "native-base";
import {
  COLORS_DARK_THEME,
  COLORS_FORM,
  COLORS_LIGHT_THEME,
} from "../../../modules/Theme/colors";
import React from "react";

export default function AddCity({ value }) {
  return (
    <>
      <Heading
        size={"sm"}
        style={{ marginBottom: 5 }}
        _light={{ color: COLORS_FORM.LABEL }}
        _dark={{ color: COLORS_FORM.LABEL }}
      >
        Город
      </Heading>
      <Input
        isDisabled
        value={value !== "(null)" ? value : "Отсутствует"}
        height={55}
        marginBottom={4}
        width={"100%"}
        borderRadius={12}
        variant="filled"
        textAlign={"left"}
        fontWeight={"bold"}
        fontSize={16}
        placeholder={"Город"}
        placeholderTextColor={COLORS_FORM.PLACEHOLDER}
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
      />
    </>
  );
}
