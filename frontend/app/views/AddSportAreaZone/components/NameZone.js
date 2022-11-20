import { Heading, Input } from "native-base";
import {
  COLORS_DARK_THEME,
  COLORS_FORM,
  COLORS_LIGHT_THEME,
} from "../../../modules/Theme/colors";
import React from "react";

export default function NameZone({ zoneName, setZoneName }) {
  return (
    <>
      <Heading fontSize={22}>Наименование зоны</Heading>
      <Input
        value={zoneName}
        height={55}
        marginY={4}
        width={"100%"}
        borderRadius={12}
        variant="filled"
        textAlign={"left"}
        fontWeight={"bold"}
        fontSize={16}
        placeholder={"Наименование зоны"}
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
          setZoneName(value);
        }}
      />
    </>
  );
}
