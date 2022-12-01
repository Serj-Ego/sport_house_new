import { Heading, HStack, Icon, Image, Input, View } from "native-base";
import { HEIGHT, WIDTH } from "../../../../modules/Theme/dimensions";
import React, { useContext } from "react";
import { addSportAreaContext } from "../../../../navigation/AdditionalStack";
import { Spacer } from "native-base/src/components/primitives/Flex";
import { Ionicons } from "@expo/vector-icons";
import {
  COLOR_ACCENT,
  COLORS_DARK_THEME,
  COLORS_FORM,
  COLORS_LIGHT_THEME,
} from "../../../../modules/Theme/colors";

export default function SportAreaMaxPeople() {
  const { maxMembers, maxViewer, setMaxMembers, setMaxViewer } =
    useContext(addSportAreaContext);
  return (
    <View justifyContent={"space-around"}>
      <Image
        alt={"location"}
        style={{ resizeMode: "contain", alignSelf: "center" }}
        source={require("../../../../assets/add_sport_area/team.png")}
        size={HEIGHT / 4}
      />
      <View style={{ width: WIDTH, paddingHorizontal: 12 }}>
        <Heading>Вместимость площадки</Heading>
        <HStack alignItems={"center"}>
          <Heading size={"md"}>Участников:</Heading>
          <Spacer />
          <Input
            value={maxMembers}
            height={55}
            maxWidth={"60%"}
            rightElement={
              <Icon
                as={Ionicons}
                marginRight={6}
                size={5}
                name="ios-person"
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
            placeholder={"Участников"}
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
              setMaxMembers(value);
            }}
          />
        </HStack>
        <HStack alignItems={"center"}>
          <Heading size={"md"}>Зрителей:</Heading>
          <Spacer />
          <Input
            value={maxViewer}
            height={55}
            maxWidth={"60%"}
            rightElement={
              <Icon
                as={Ionicons}
                marginRight={6}
                size={5}
                name="ios-person"
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
            placeholder={"Зрители"}
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
              setMaxViewer(value);
            }}
          />
        </HStack>
      </View>
    </View>
  );
}
