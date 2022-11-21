import { Heading, Icon, Image, Input, View } from "native-base";
import { HEIGHT, WIDTH } from "../../../../modules/Theme/dimensions";
import React, { useContext } from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
  COLOR_ACCENT,
  COLORS_DARK_THEME,
  COLORS_FORM,
  COLORS_LIGHT_THEME,
} from "../../../../modules/Theme/colors";
import { addSportAreaContext } from "../../../../navigation/AdditionalStack";

export default function SportAreaPrice() {
  const { price, setPrice } = useContext(addSportAreaContext);
  return (
    <View justifyContent={"space-around"}>
      <Image
        alt={"location"}
        style={{ resizeMode: "contain", alignSelf: "center" }}
        source={require("../../../../assets/add_sport_area/price.png")}
        size={HEIGHT / 4}
      />
      <View style={{ width: WIDTH, paddingHorizontal: 12 }}>
        <Heading>Стоимость аренды в час</Heading>
        <Input
          value={price}
          height={55}
          maxWidth={"100%"}
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
          placeholder={"Стоимость"}
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
      </View>
    </View>
  );
}
