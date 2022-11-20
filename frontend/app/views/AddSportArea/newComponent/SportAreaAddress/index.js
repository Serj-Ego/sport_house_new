import { Box, Heading, HStack, Image, Input, Text, View } from "native-base";
import { HEIGHT, WIDTH } from "../../../../modules/Theme/dimensions";
import React, { useContext } from "react";
import { PROFILE_ROUTE } from "../../../../modules/NavigationRoutes/profile";
import { PADDING_LR_MAIN } from "../../../../modules/Theme/padding";
import {
  COLORS_DARK_THEME,
  COLORS_FORM,
  COLORS_LIGHT_THEME,
} from "../../../../modules/Theme/colors";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { addSportAreaContext } from "../../../../navigation/AdditionalStack";

export default function SportAreaAddress() {
  const { address } = useContext(addSportAreaContext);
  const navigation = useNavigation();
  return (
    <View justifyContent={"space-around"}>
      <Image
        alt={"location"}
        style={{ resizeMode: "contain", alignSelf: "center" }}
        source={require("../../../../assets/add_sport_area/location.png")}
        size={HEIGHT / 4}
      />
      <View style={{ width: WIDTH, paddingHorizontal: 12 }}>
        <Heading>Адрес объекта</Heading>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(PROFILE_ROUTE.SELECT_SPORT_AREA_ADDRESS.route);
          }}
        >
          <Box
            style={{
              minWidth: "100%",
              height: 55,
              borderRadius: 12,
              borderWidth: 1,
              marginTop: 12,
              borderStyle: "dashed",
              alignItems: "center",
              justifyContent: "center",
              padding: PADDING_LR_MAIN,
              marginBottom: 16,
            }}
            _light={{
              borderColor: COLORS_DARK_THEME.DARK_BLOCK,
            }}
            _dark={{
              borderColor: COLORS_LIGHT_THEME.WHITE_BLOCK,
            }}
          >
            <HStack space={2}>
              <Text
                _light={{ color: COLORS_LIGHT_THEME.TEXT }}
                _dark={{ color: COLORS_DARK_THEME.TEXT }}
              >
                Указать на карте
              </Text>
            </HStack>
          </Box>
        </TouchableOpacity>
        <Input
          isDisabled
          multiline={true}
          height={55}
          value={`${address.country ? address.country : "Страна"}, ${
            address.administrativeArea
              ? address.administrativeArea
              : "Город/Область"
          }, ${address.name ? address.name : "Улица"}`}
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
      </View>
    </View>
  );
}
