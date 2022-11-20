import DefaultBackground from "../../components/DefaultBackground";
import { HEIGHT } from "../../modules/Theme/dimensions";
import { Box, Heading, HStack, Icon, Image, Text, View } from "native-base";
import React, { useState } from "react";
import {
  COLOR_ACCENT,
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
  PRIMARY_GRADIENT,
} from "../../modules/Theme/colors";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { userInfoData } from "../../services/redux/slices/userSlice";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { PADDING_LR_MAIN } from "../../modules/Theme/padding";

export default function EnrollLocation({ navigation, route }) {
  const userDataState = useSelector(userInfoData);
  const [trainingType, setTrainingType] = useState(
    userDataState.recomendation_info
      ? userDataState.recomendation_info.training_type
      : "Индивидуальная"
  );
  return (
    <DefaultBackground>
      <View justifyContent={"space-around"} height={"100%"}>
        <Image
          alt={"location"}
          style={{ resizeMode: "contain", alignSelf: "center" }}
          source={require("../../assets/add_sport_area/work_time.png")}
          size={HEIGHT / 4}
        />
        <Box>
          <Heading>Тип тренировки</Heading>
          <HStack space={"2%"} marginY={4}>
            <TouchableWithoutFeedback
              onPress={() => {
                setTrainingType("Индивидуальная");
              }}
            >
              <Box
                style={{
                  height: HEIGHT / 8,
                  width: "49%",
                  borderStyle: "solid",
                  borderWidth: 2,
                  borderColor:
                    trainingType === "Индивидуальная"
                      ? COLOR_ACCENT.ACCENT
                      : "gray",
                  borderRadius: 12,
                }}
                _light={{ backgroundColor: COLORS_LIGHT_THEME.WHITE_BLOCK }}
                _dark={{ backgroundColor: COLORS_DARK_THEME.DARK_BLOCK }}
              >
                <Icon
                  as={Ionicons}
                  size={8}
                  name="ios-person"
                  textAlign={"center"}
                  _light={{ color: COLOR_ACCENT.ACCENT }}
                  _dark={{ color: COLOR_ACCENT.ACCENT }}
                  style={{ position: "absolute", top: 12, left: 12 }}
                />
                <Heading
                  size={"md"}
                  style={{ position: "absolute", bottom: 12, right: 12 }}
                >
                  Индивидуальная
                </Heading>
              </Box>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                setTrainingType("Командная");
              }}
            >
              <Box
                style={{
                  height: HEIGHT / 8,
                  width: "49%",
                  borderStyle: "solid",
                  borderWidth: 2,
                  borderColor:
                    trainingType === "Командная" ? COLOR_ACCENT.ACCENT : "gray",
                  borderRadius: 12,
                }}
                _light={{ backgroundColor: COLORS_LIGHT_THEME.WHITE_BLOCK }}
                _dark={{ backgroundColor: COLORS_DARK_THEME.DARK_BLOCK }}
              >
                <Icon
                  as={Ionicons}
                  size={10}
                  name="ios-people"
                  textAlign={"center"}
                  _light={{ color: COLOR_ACCENT.ACCENT }}
                  _dark={{ color: COLOR_ACCENT.ACCENT }}
                  style={{ position: "absolute", top: 12, left: 12 }}
                />
                <Heading
                  size={"md"}
                  style={{ position: "absolute", bottom: 12, right: 12 }}
                >
                  Командная
                </Heading>
              </Box>
            </TouchableWithoutFeedback>
          </HStack>
          {userDataState.recomendation_info && (
            <Text textAlign={"center"} color={"gray.500"}>
              Начальное значение установлено на основе Ваших данных профиля
            </Text>
          )}
        </Box>
        <TouchableOpacity
        //style={{ position: "absolute", bottom: 36, right: PADDING_LR_MAIN }}
        >
          <LinearGradient
            colors={[PRIMARY_GRADIENT.START, PRIMARY_GRADIENT.END]}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={{
              height: 55,
              borderRadius: 12,
              alignItems: "center",
              justifyContent: "center",
              padding: PADDING_LR_MAIN,
            }}
          >
            <HStack space={2}>
              <Text color={"white"}>Далее</Text>
              <Entypo name="chevron-right" size={24} color="white" />
            </HStack>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </DefaultBackground>
  );
}
