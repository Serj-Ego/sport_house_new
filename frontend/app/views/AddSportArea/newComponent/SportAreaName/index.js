import { Heading, Image, Input, View } from "native-base";
import { HEIGHT, WIDTH } from "../../../../modules/Theme/dimensions";
import React, { useContext } from "react";
import {
  COLORS_DARK_THEME,
  COLORS_FORM,
  COLORS_LIGHT_THEME,
} from "../../../../modules/Theme/colors";
import { addSportAreaContext } from "../../../../navigation/AdditionalStack";

export default function SportAreaName() {
  const {
    fullName,
    shortName,
    setFullName,
    setShortName,
    setDescription,
    description,
  } = useContext(addSportAreaContext);
  return (
    <View justifyContent={"space-around"}>
      <Image
        alt={"location"}
        style={{ resizeMode: "contain", alignSelf: "center" }}
        source={require("../../../../assets/add_sport_area/name.png")}
        size={HEIGHT / 4}
      />
      <View style={{ width: WIDTH, paddingHorizontal: 12 }}>
        <Heading>Полное наименование объекта</Heading>
        <Input
          value={fullName}
          height={55}
          marginY={4}
          width={"100%"}
          borderRadius={12}
          variant="filled"
          textAlign={"left"}
          fontWeight={"bold"}
          fontSize={16}
          placeholder={"Полное наименование"}
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
            setFullName(value);
          }}
        />
        <Heading>Краткое наименование объекта</Heading>
        <Input
          value={shortName}
          height={55}
          marginY={4}
          width={"100%"}
          borderRadius={12}
          variant="filled"
          textAlign={"left"}
          fontWeight={"bold"}
          fontSize={16}
          placeholder={"Краткое наименование"}
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
            setShortName(value);
          }}
        />
        <Heading>Описание объекта</Heading>
        <Input
          value={description}
          height={HEIGHT / 8}
          numberOfLines={10}
          multiline={true}
          marginY={4}
          width={"100%"}
          borderRadius={12}
          variant="filled"
          textAlign={"left"}
          fontWeight={"bold"}
          fontSize={16}
          placeholder={"Описание объекта"}
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
            setDescription(value);
          }}
        />
      </View>
    </View>
  );
}
