import {
  COLORS_DARK_THEME,
  COLORS_FORM,
  COLORS_LIGHT_THEME,
} from "../../../../modules/Theme/colors";
import { Heading, Input } from "native-base";
import React from "react";

export default function LastNameInput({ lastName, setLastName }) {
  return (
    <>
      <Heading
        size={"sm"}
        style={{ marginBottom: 5 }}
        _light={{ color: COLORS_FORM.LABEL }}
        _dark={{ color: COLORS_FORM.LABEL }}
      >
        Фамилия
      </Heading>
      <Input
        height={55}
        marginBottom={4}
        width={"100%"}
        borderRadius={12}
        variant="filled"
        value={lastName}
        textAlign={"left"}
        fontWeight={"bold"}
        fontSize={16}
        placeholder={"Фамилия"}
        placeholderTextColor={COLORS_FORM.PLACEHOLDER}
        clearButtonMode="always"
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
          setLastName(value);
        }}
      />
    </>
  );
}
