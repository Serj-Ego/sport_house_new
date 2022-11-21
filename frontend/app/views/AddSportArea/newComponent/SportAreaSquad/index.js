import { Heading, HStack, Icon, Image, Input, View } from "native-base";
import { HEIGHT, WIDTH } from "../../../../modules/Theme/dimensions";
import React, { useContext, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  COLOR_ACCENT,
  COLORS_DARK_THEME,
  COLORS_FORM,
  COLORS_LIGHT_THEME,
} from "../../../../modules/Theme/colors";
import { Spacer } from "native-base/src/components/primitives/Flex";
import { addSportAreaContext } from "../../../../navigation/AdditionalStack";

export default function SportAreaSquad() {
  const { length, width, squad, setLength, setWidth, setSquad } =
    useContext(addSportAreaContext);

  useEffect(() => {
    setSquad(length * width);
  }, [length, width]);

  return (
    <View justifyContent={"space-around"}>
      <Image
        alt={"location"}
        style={{ resizeMode: "contain", alignSelf: "center" }}
        source={require("../../../../assets/add_sport_area/size.png")}
        size={HEIGHT / 4}
      />
      <View style={{ width: WIDTH, paddingHorizontal: 12 }}>
        <Heading>Размер объекта</Heading>
        <HStack alignItems={"center"}>
          <Heading size={"md"}>Длина (м):</Heading>
          <Spacer />
          <Input
            value={length}
            height={55}
            maxWidth={"60%"}
            rightElement={
              <Icon
                as={Ionicons}
                marginRight={6}
                size={5}
                name="ios-resize"
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
            placeholder={"Длина"}
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
              setLength(value);
            }}
          />
        </HStack>
        <HStack alignItems={"center"}>
          <Heading size={"md"}>Ширина (м):</Heading>
          <Spacer />
          <Input
            value={width}
            height={55}
            maxWidth={"60%"}
            rightElement={
              <Icon
                as={Ionicons}
                marginRight={6}
                size={5}
                name="ios-resize"
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
            placeholder={"Ширина"}
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
              setWidth(value);
            }}
          />
        </HStack>
        <HStack alignItems={"center"}>
          <Heading size={"md"}>Площадь:</Heading>
          <Spacer />
          <Input
            value={`${squad}`}
            height={55}
            maxWidth={"60%"}
            rightElement={
              <Icon
                as={Ionicons}
                marginRight={6}
                size={5}
                name="ios-resize"
                textAlign={"center"}
                _light={{ color: COLOR_ACCENT.ACCENT }}
                _dark={{ color: COLOR_ACCENT.ACCENT }}
              />
            }
            marginY={4}
            isDisabled={true}
            width={"100%"}
            borderRadius={12}
            variant="filled"
            textAlign={"left"}
            fontWeight={"bold"}
            fontSize={16}
            placeholder={"Площадь"}
            placeholderTextColor={COLORS_FORM.PLACEHOLDER}
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
          />
        </HStack>
      </View>
    </View>
  );
}
