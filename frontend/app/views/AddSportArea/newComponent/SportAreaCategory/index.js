import { Heading, HStack, Image, Text, View } from "native-base";
import { HEIGHT, WIDTH } from "../../../../modules/Theme/dimensions";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addSportAreaContext } from "../../../../navigation/AdditionalStack";
import { unwrapResult } from "@reduxjs/toolkit";
import { SportAreaTypesApiRequest } from "../../../../services/redux/slices/sportAreaSlice";
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

export default function SportAreaCategory() {
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const { category, setCategory } = useContext(addSportAreaContext);
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    dispatch(SportAreaTypesApiRequest())
      .then(unwrapResult)
      .then((res) => {
        let data = ["Отменить"];
        res.map((value) => {
          data = [...data, value.name];
        });
        setCategoryList(data);
      });
  }, []);

  const onPress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: categoryList,
        cancelButtonIndex: 0,
        userInterfaceStyle: colorScheme,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          setCategory("");
        } else {
          setCategory(categoryList[buttonIndex]);
        }
      }
    );
  };
  return (
    <View justifyContent={"space-around"}>
      <Image
        alt={"location"}
        style={{ resizeMode: "contain", alignSelf: "center" }}
        source={require("../../../../assets/add_sport_area/category.png")}
        size={HEIGHT / 4}
      />
      <View style={{ width: WIDTH, paddingHorizontal: 12 }}>
        <Heading>Категория объекта</Heading>
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
                  color: category
                    ? COLORS_LIGHT_THEME.TEXT
                    : COLORS_FORM.PLACEHOLDER,
                }}
                _dark={{
                  color: category
                    ? COLORS_DARK_THEME.TEXT
                    : COLORS_FORM.PLACEHOLDER,
                }}
                fontWeight={"bold"}
              >
                {category ? category : "Категория"}
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
