import { Box, Heading, HStack, Icon, Image, Text, View } from "native-base";
import { HEIGHT, WIDTH } from "../../../../modules/Theme/dimensions";
import React, { useContext, useEffect, useState } from "react";
import { addSportAreaContext } from "../../../../navigation/AdditionalStack";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  ActionSheetIOS,
  Alert,
  TouchableWithoutFeedback,
  useColorScheme,
} from "react-native";
import { COLOR_ACCENT, ERROR } from "../../../../modules/Theme/colors";
import { BaseDirectoryApiRequest } from "../../../../services/redux/slices/baseSlice";
import { DirectoryTypeConst } from "../../../../modules/DirectoryTypeConst";
import { PADDING_LR_MAIN } from "../../../../modules/Theme/padding";
import { Spacer } from "native-base/src/components/primitives/Flex";
import { Ionicons } from "@expo/vector-icons";

export default function SportAreaSportType() {
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const { sportTypes, setSportTypes } = useContext(addSportAreaContext);
  const [sportTypeList, setSportTypeList] = useState([]);
  useEffect(() => {
    dispatch(BaseDirectoryApiRequest(DirectoryTypeConst.LOCATION_SPORT_TYPE))
      .then(unwrapResult)
      .then((res) => {
        let data = ["Отменить"];
        res.map((value) => {
          data = [...data, value.name];
        });
        setSportTypeList(data);
      });
  }, []);

  const onPress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: sportTypeList,
        cancelButtonIndex: 0,
        userInterfaceStyle: colorScheme,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          setSportTypes(sportTypes);
        } else {
          if (sportTypes.length === 3) {
            Alert.alert(
              "Внимание!",
              "Вы выбрали максимальное количество видов спорта!"
            );
          } else {
            if (sportTypes.includes(sportTypeList[buttonIndex])) {
              Alert.alert(
                "Внимание!",
                `Вы уже добавили "${sportTypeList[buttonIndex]}"!`
              );
            } else setSportTypes([...sportTypes, sportTypeList[buttonIndex]]);
          }
        }
      }
    );
  };
  return (
    <View justifyContent={"space-around"}>
      <Image
        alt={"location"}
        style={{ resizeMode: "contain", alignSelf: "center" }}
        source={require("../../../../assets/add_sport_area/sport_zone.png")}
        size={HEIGHT / 4}
      />
      <View style={{ width: WIDTH, paddingHorizontal: 12 }}>
        <Heading>Виды спорта на объекте</Heading>
        <Text color={"gray.500"}>Максимальное для выбора количество: 3</Text>
        {sportTypes.length < 3 && (
          <TouchableWithoutFeedback onPress={onPress}>
            <Box
              style={{
                marginTop: 12,
                borderStyle: "solid",
                borderWidth: 1,
                width: "100%",
                height: 55,
                borderRadius: 12,
                alignItems: "center",
                justifyContent: "center",
                padding: PADDING_LR_MAIN,
              }}
              _light={{
                borderColor: COLOR_ACCENT.ACCENT,
              }}
              _dark={{
                borderColor: "white",
              }}
            >
              <HStack space={2}>
                <Text
                  _light={{ color: COLOR_ACCENT.ACCENT }}
                  _dark={{ color: "white" }}
                >
                  Добавить
                </Text>
              </HStack>
            </Box>
          </TouchableWithoutFeedback>
        )}
        {sportTypes.map((value, index) => {
          return (
            <Box
              style={{
                borderStyle: "solid",
                borderRadius: 12,
                borderColor: "gray",
                borderWidth: 1,
                height: 55,
                justifyContent: "center",
                marginVertical: 4,
                paddingHorizontal: 12,
              }}
              key={index}
            >
              <HStack alignItems={"center"}>
                <Heading size={"sm"} textAlign={"center"}>
                  {value}
                </Heading>
                <Spacer />
                <TouchableWithoutFeedback
                  onPress={() => {
                    setSportTypes(sportTypes.filter((el) => el !== value));
                  }}
                >
                  <Icon
                    as={Ionicons}
                    textAlign={"center"}
                    size={7}
                    name="ios-remove-circle"
                    color={ERROR.FLAT}
                  />
                </TouchableWithoutFeedback>
              </HStack>
            </Box>
          );
        })}
      </View>
    </View>
  );
}
