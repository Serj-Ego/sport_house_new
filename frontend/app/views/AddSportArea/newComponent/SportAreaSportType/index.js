import { Heading, HStack, Image, Text, View } from "native-base";
import { HEIGHT, WIDTH } from "../../../../modules/Theme/dimensions";
import React, { useContext, useEffect, useState } from "react";
import { addSportAreaContext } from "../../../../navigation/AdditionalStack";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  ActionSheetIOS,
  TouchableWithoutFeedback,
  useColorScheme,
} from "react-native";
import {
  COLORS_DARK_THEME,
  COLORS_FORM,
  COLORS_LIGHT_THEME,
} from "../../../../modules/Theme/colors";
import { Spacer } from "native-base/src/components/primitives/Flex";
import { Octicons } from "@expo/vector-icons";
import { BaseDirectoryApiRequest } from "../../../../services/redux/slices/baseSlice";
import { DirectoryTypeConst } from "../../../../modules/DirectoryTypeConst";

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
          setSportTypes("");
        } else {
          setSportTypes(sportTypeList[buttonIndex]);
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
        <Heading>Вид спорта на объекте</Heading>
        <TouchableWithoutFeedback onPress={onPress}>
          <View
            height={55}
            marginBottom={4}
            marginTop={4}
            width={"100%"}
            borderRadius={12}
            paddingLeft={6}
            paddingRight={6}
            justifyContent={"center"}
            _light={{
              backgroundColor: COLORS_FORM.INPUT,
              color: COLORS_LIGHT_THEME.TEXT,
            }}
            _dark={{
              color: COLORS_DARK_THEME.TEXT,
              backgroundColor: COLORS_FORM.DARK_INPUT,
            }}
          >
            <HStack space={2}>
              <Text
                fontSize={16}
                _light={{
                  color: sportTypes
                    ? COLORS_LIGHT_THEME.TEXT
                    : COLORS_FORM.PLACEHOLDER,
                }}
                _dark={{
                  color: sportTypes
                    ? COLORS_DARK_THEME.TEXT
                    : COLORS_FORM.PLACEHOLDER,
                }}
                fontWeight={"bold"}
              >
                {sportTypes ? sportTypes : "Вид спорта"}
              </Text>
              <Spacer />
              <Octicons
                name="chevron-down"
                size={24}
                color={COLORS_FORM.PLACEHOLDER}
              />
            </HStack>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}
