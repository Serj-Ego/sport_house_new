import { Box, Heading, Image, View } from "native-base";
import { HEIGHT, WIDTH } from "../../../../modules/Theme/dimensions";
import React from "react";
import { COLOR_ACCENT } from "../../../../modules/Theme/colors";
import { TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PROFILE_ROUTE } from "../../../../modules/NavigationRoutes/profile";

export default function ComplexSportAreaSportZones() {
  const navigation = useNavigation();
  return (
    <View justifyContent={"space-around"}>
      <Image
        alt={"location"}
        style={{ resizeMode: "contain", alignSelf: "center" }}
        source={require("../../../../assets/add_sport_area/sport_zone.png")}
        size={HEIGHT / 4}
      />
      <View style={{ width: WIDTH, paddingHorizontal: 12 }}>
        <Heading>Добавьте спортивные зоны</Heading>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate(PROFILE_ROUTE.SPORT_AREA_ZONE_ADD.route);
          }}
        >
          <Box
            style={{
              height: 55,
              marginVertical: 12,
              borderRadius: 12,
              borderStyle: "dashed",
              borderWidth: 1,
              borderColor: COLOR_ACCENT.ACCENT,
              justifyContent: "center",
            }}
          >
            <Heading
              fontSize={"md"}
              textAlign={"center"}
              color={COLOR_ACCENT.ACCENT}
            >
              Добавить
            </Heading>
          </Box>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}
