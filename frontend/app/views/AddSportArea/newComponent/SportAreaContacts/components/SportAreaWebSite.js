import { Heading, Input } from "native-base";
import {
  COLORS_DARK_THEME,
  COLORS_FORM,
  COLORS_LIGHT_THEME,
} from "../../../../../modules/Theme/colors";
import React, { useContext } from "react";
import { addSportAreaContext } from "../../../../../navigation/AdditionalStack";

export default function SportAreaWebSite() {
  const { webSite, setWebSite } = useContext(addSportAreaContext);
  return (
    <>
      <Heading size={"sm"} marginY={2}>
        Веб-сайт:
      </Heading>
      <Input
        value={webSite}
        height={55}
        maxWidth={"100%"}
        width={"100%"}
        borderRadius={12}
        variant="filled"
        textAlign={"left"}
        fontWeight={"bold"}
        fontSize={16}
        placeholder={"https://XXXXXXXXXX.XX"}
        placeholderTextColor={COLORS_FORM.PLACEHOLDER}
        clearButtonMode="always"
        keyboardType={"url"}
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
          setWebSite(value);
        }}
      />
    </>
  );
}
