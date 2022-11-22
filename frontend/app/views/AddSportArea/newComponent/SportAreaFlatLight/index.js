import { Heading, HStack, Image, Text, View } from "native-base";
import {
  ActionSheetIOS,
  TouchableWithoutFeedback,
  useColorScheme,
} from "react-native";
import { HEIGHT, WIDTH } from "../../../../modules/Theme/dimensions";
import React, { useContext, useEffect, useState } from "react";
import { Octicons } from "@expo/vector-icons";
import {
  COLORS_DARK_THEME,
  COLORS_FORM,
  COLORS_LIGHT_THEME,
} from "../../../../modules/Theme/colors";
import { Spacer } from "native-base/src/components/primitives/Flex";
import { addSportAreaContext } from "../../../../navigation/AdditionalStack";
import { BaseDirectoryApiRequest } from "../../../../services/redux/slices/baseSlice";
import { DirectoryTypeConst } from "../../../../modules/DirectoryTypeConst";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export default function SportAreaFlatLight() {
  const { lighting, coating, setLighting, setCoating } =
    useContext(addSportAreaContext);
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const [lightingList, setLightingList] = useState([]);
  const [coatingList, setCoatingList] = useState([]);
  useEffect(() => {
    dispatch(BaseDirectoryApiRequest(DirectoryTypeConst.LOCATION_LIGHTING_TYPE))
      .then(unwrapResult)
      .then((res) => {
        let data = ["Отменить"];
        res.map((value) => {
          data = [...data, value.name];
        });
        setLightingList(data);
      });
    dispatch(BaseDirectoryApiRequest(DirectoryTypeConst.LOCATION_COATING_TYPE))
      .then(unwrapResult)
      .then((res) => {
        let data = ["Отменить"];
        res.map((value) => {
          data = [...data, value.name];
        });
        setCoatingList(data);
      });
  }, []);
  const onPressLight = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: lightingList,
        cancelButtonIndex: 0,
        userInterfaceStyle: colorScheme,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          setLighting("");
        } else {
          setLighting(lightingList[buttonIndex]);
        }
      }
    );
  };
  const onPressCoating = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: coatingList,
        cancelButtonIndex: 0,
        userInterfaceStyle: colorScheme,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          setCoating("");
        } else {
          setCoating(coatingList[buttonIndex]);
        }
      }
    );
  };
  return (
    <View justifyContent={"space-around"}>
      <Image
        alt={"location"}
        style={{ resizeMode: "contain", alignSelf: "center" }}
        source={require("../../../../assets/add_sport_area/light.png")}
        size={HEIGHT / 4}
      />
      <View style={{ width: WIDTH, paddingHorizontal: 12 }}>
        <Heading>Освещение</Heading>
        <TouchableWithoutFeedback onPress={onPressLight}>
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
                  color: lighting
                    ? COLORS_LIGHT_THEME.TEXT
                    : COLORS_FORM.PLACEHOLDER,
                }}
                _dark={{
                  color: lighting
                    ? COLORS_DARK_THEME.TEXT
                    : COLORS_FORM.PLACEHOLDER,
                }}
                fontWeight={"bold"}
              >
                {lighting ? lighting : "Тип освещения"}
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
        <Heading>Покрытие</Heading>
        <TouchableWithoutFeedback onPress={onPressCoating}>
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
                  color: coating
                    ? COLORS_LIGHT_THEME.TEXT
                    : COLORS_FORM.PLACEHOLDER,
                }}
                _dark={{
                  color: coating
                    ? COLORS_DARK_THEME.TEXT
                    : COLORS_FORM.PLACEHOLDER,
                }}
                fontWeight={"bold"}
              >
                {coating ? coating : "Тип покрытия"}
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
