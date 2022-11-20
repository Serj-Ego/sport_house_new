import { Box, Heading, HStack, Icon, Image, View } from "native-base";
import { HEIGHT, WIDTH } from "../../../../modules/Theme/dimensions";
import {
  COLOR_ACCENT,
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
} from "../../../../modules/Theme/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { addSportAreaContext } from "../../../../navigation/AdditionalStack";
import { TouchableWithoutFeedback } from "react-native";

export default function SportAreaType() {
  const { sportAreaType, setSportAreaType } = useContext(addSportAreaContext);
  return (
    <View justifyContent={"space-around"}>
      <Image
        alt={"location"}
        style={{ resizeMode: "contain", alignSelf: "center" }}
        source={require("../../../../assets/add_sport_area/category.png")}
        size={HEIGHT / 4}
      />
      <View style={{ width: WIDTH, paddingHorizontal: 12 }}>
        <Heading>Тип спортивного объекта</Heading>
        <HStack marginY={4} space={2}>
          <TouchableWithoutFeedback
            onPress={() => setSportAreaType("Сооружение")}
          >
            <Box
              style={{
                height: HEIGHT / 8,
                width: WIDTH / 2 - 4 - 12,
                borderStyle: "solid",
                borderWidth: 2,
                borderColor:
                  sportAreaType === "Сооружение" ? COLOR_ACCENT.ACCENT : "gray",
                borderRadius: 12,
              }}
              _light={{ backgroundColor: COLORS_LIGHT_THEME.WHITE_BLOCK }}
              _dark={{ backgroundColor: COLORS_DARK_THEME.DARK_BLOCK }}
            >
              <Icon
                as={MaterialCommunityIcons}
                size={8}
                name="stadium"
                textAlign={"center"}
                _light={{ color: COLOR_ACCENT.ACCENT }}
                _dark={{ color: COLOR_ACCENT.ACCENT }}
                style={{ position: "absolute", top: 12, left: 12 }}
              />
              <Heading
                size={"md"}
                style={{ position: "absolute", bottom: 12, right: 12 }}
              >
                Сооружение
              </Heading>
            </Box>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => setSportAreaType("Комплекс")}
          >
            <Box
              style={{
                height: HEIGHT / 8,
                width: WIDTH / 2 - 4 - 12,
                borderStyle: "solid",
                borderWidth: 2,
                borderColor:
                  sportAreaType === "Комплекс" ? COLOR_ACCENT.ACCENT : "gray",
                borderRadius: 12,
              }}
              _light={{ backgroundColor: COLORS_LIGHT_THEME.WHITE_BLOCK }}
              _dark={{ backgroundColor: COLORS_DARK_THEME.DARK_BLOCK }}
            >
              <Icon
                as={MaterialCommunityIcons}
                size={5}
                name="stadium"
                textAlign={"center"}
                _light={{ color: COLOR_ACCENT.ACCENT }}
                _dark={{ color: COLOR_ACCENT.ACCENT }}
                style={{ position: "absolute", top: 38, left: 32 }}
              />
              <Icon
                as={MaterialCommunityIcons}
                size={5}
                name="stadium"
                textAlign={"center"}
                _light={{ color: COLOR_ACCENT.ACCENT }}
                _dark={{ color: COLOR_ACCENT.ACCENT }}
                style={{ position: "absolute", top: 16, left: 48 }}
              />
              <Icon
                as={MaterialCommunityIcons}
                size={8}
                name="stadium"
                textAlign={"center"}
                _light={{ color: COLOR_ACCENT.ACCENT }}
                _dark={{ color: COLOR_ACCENT.ACCENT }}
                style={{ position: "absolute", top: 12, left: 12 }}
              />
              <Heading
                size={"md"}
                style={{ position: "absolute", bottom: 12, right: 12 }}
              >
                Комплекс
              </Heading>
            </Box>
          </TouchableWithoutFeedback>
        </HStack>
      </View>
    </View>
  );
}
