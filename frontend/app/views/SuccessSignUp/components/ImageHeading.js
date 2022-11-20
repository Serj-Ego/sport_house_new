import { Image } from "react-native";
import { WIDTH } from "../../../modules/Theme/dimensions";
import { Heading } from "native-base";
import {
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
} from "../../../modules/Theme/colors";
import React from "react";

export default function ImageHeading() {
  return (
    <>
      <Image
        source={require("../../../assets/signup/welcome.png")}
        style={{
          height: "60%",
          width: WIDTH / 1.5,
          resizeMode: "contain",
          alignSelf: "center",
          marginTop: 16,
          marginBottom: 16,
        }}
      />
      <Heading
        size={"md"}
        textAlign={"center"}
        _light={{
          color: COLORS_LIGHT_THEME.TEXT,
        }}
        _dark={{
          color: COLORS_DARK_THEME.TEXT,
        }}
      >
        Поздравляем с успешной регистрацией!
      </Heading>
    </>
  );
}
