import { Box, Heading, HStack, Icon, Image, View } from "native-base";
import { HEIGHT, WIDTH } from "../../../../modules/Theme/dimensions";
import React, { useContext } from "react";
import {
  COLOR_ACCENT,
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
} from "../../../../modules/Theme/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { addSportAreaContext } from "../../../../navigation/AdditionalStack";
import { TouchableWithoutFeedback } from "react-native";

export default function SportAreaCovered() {
  const { isCovered, setIsCovered } = useContext(addSportAreaContext);
  return (
    <View justifyContent={"space-around"}>
      <Image
        alt={"location"}
        style={{ resizeMode: "contain", alignSelf: "center" }}
        source={require("../../../../assets/add_sport_area/covered.png")}
        size={HEIGHT / 4}
      />
      <View style={{ width: WIDTH, paddingHorizontal: 12 }}>
        <Heading>Характеристика объекта</Heading>
        <HStack marginY={4} space={2}>
          <TouchableWithoutFeedback onPress={() => setIsCovered(true)}>
            <Box
              style={{
                height: HEIGHT / 8,
                width: WIDTH / 2 - 4 - 12,
                borderStyle: "solid",
                borderWidth: 2,
                borderColor: isCovered ? COLOR_ACCENT.ACCENT : "gray",
                borderRadius: 12,
              }}
              _light={{ backgroundColor: COLORS_LIGHT_THEME.WHITE_BLOCK }}
              _dark={{ backgroundColor: COLORS_DARK_THEME.DARK_BLOCK }}
            >
              <Icon
                as={MaterialCommunityIcons}
                size={8}
                name="bus-stop-covered"
                textAlign={"center"}
                _light={{ color: COLOR_ACCENT.ACCENT }}
                _dark={{ color: COLOR_ACCENT.ACCENT }}
                style={{ position: "absolute", top: 12, left: 12 }}
              />
              <Heading
                size={"md"}
                style={{ position: "absolute", bottom: 12, right: 12 }}
              >
                Крытый
              </Heading>
            </Box>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setIsCovered(false)}>
            <Box
              style={{
                height: HEIGHT / 8,
                width: WIDTH / 2 - 4 - 12,
                borderStyle: "solid",
                borderWidth: 2,
                borderColor: !isCovered ? COLOR_ACCENT.ACCENT : "gray",
                borderRadius: 12,
              }}
              _light={{ backgroundColor: COLORS_LIGHT_THEME.WHITE_BLOCK }}
              _dark={{ backgroundColor: COLORS_DARK_THEME.DARK_BLOCK }}
            >
              <Icon
                as={MaterialCommunityIcons}
                size={8}
                name="bus-stop-uncovered"
                textAlign={"center"}
                _light={{ color: COLOR_ACCENT.ACCENT }}
                _dark={{ color: COLOR_ACCENT.ACCENT }}
                style={{ position: "absolute", top: 12, left: 12 }}
              />
              <Heading
                size={"md"}
                style={{ position: "absolute", bottom: 12, right: 12 }}
              >
                Открытый
              </Heading>
            </Box>
          </TouchableWithoutFeedback>
        </HStack>
      </View>
    </View>
  );
}
