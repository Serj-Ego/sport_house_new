import DefaultBackground from "../../components/DefaultBackground";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Box, Heading, HStack, Image, Text, View } from "native-base";
import { HEIGHT } from "../../modules/Theme/dimensions";
import React, { useContext, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ERROR, SUCCESS } from "../../modules/Theme/colors";
import { PADDING_LR_MAIN } from "../../modules/Theme/padding";
import { addSportAreaContext } from "../../navigation/AdditionalStack";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import CreateButton from "./newComponent/CreateButton";
import Animated, {
  FadeInUp,
  FadeOutDown,
  Layout,
} from "react-native-reanimated";

export default function CheckDataView({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [errorList, setErrorList] = useState([]);
  const {
    fullName,
    shortName,
    description,
    images,
    address,
    workTime,
    price,
    length,
    width,
    lighting,
    coating,
    category,
    sportTypes,
    optionsZone,
    phoneNumber,
    email,
    maxMembers,
    maxViewer,
  } = useContext(addSportAreaContext);
  useEffect(() => {
    let errors = [];
    if (fullName.length === 0) {
      errors.push("Полное наименование объекта");
    }
    if (description.length === 0) {
      errors.push("Описание объекта");
    }
    if (images.length === 0) {
      errors.push("Изображения объекта");
    }
    if (!address.name) {
      errors.push("Адрес объекта");
    }
    if (workTime.filter((el) => el.endWork && el.startWork).length === 0) {
      errors.push("Режим работы объекта");
    }
    if (!price) {
      errors.push("Стоимость аренды");
    }
    if (length === 0 && width === 0) {
      errors.push("Размер объекта");
    }
    if (lighting.length === 0) {
      errors.push("Освещение на объекте");
    }
    if (coating.length === 0) {
      errors.push("Покрытие на объекте");
    }
    if (category.length === 0) {
      errors.push("Категория объекта");
    }
    if (sportTypes.length === 0) {
      errors.push("Вид спорта");
    }
    if (optionsZone.length === 0) {
      errors.push("Укажите хотя бы одну характеристику объекта");
    }
    if (phoneNumber.length === 0) {
      errors.push("Укажите номер телефона");
    }
    if (phoneNumber.length === 0) {
      errors.push("Укажите номер телефона");
    }
    if (email.length === 0) {
      errors.push("Укажите электронный адрес");
    }
    if (maxMembers === 0) {
      errors.push("Укажите количество участников");
    }
    if (maxViewer === 0) {
      errors.push("Укажите количество зрителей");
    }
    setTimeout(() => {
      setErrorList(errors);
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <DefaultBackground>
      <SafeAreaView>
        <View justifyContent={"space-around"} height={"100%"}>
          <Image
            alt={"location"}
            style={{ resizeMode: "contain", alignSelf: "center" }}
            source={require("../../assets/add_sport_area/check_data.png")}
            size={HEIGHT / 4}
          />
          <Animated.View
            layout={Layout}
            style={{
              paddingHorizontal: 12,
              marginVertical: 12,
              alignItems: "center",
            }}
          >
            {errorList.length > 0 && !isLoading && (
              <Animated.View
                layout={Layout}
                entering={FadeInUp}
                alignItems={"center"}
              >
                <Ionicons
                  name="ios-close-circle"
                  size={"50%"}
                  color={ERROR.FLAT}
                />
                <Heading size={"md"} textAlign={"center"}>
                  Требуется доработка
                </Heading>
              </Animated.View>
            )}
            {errorList.length === 0 && !isLoading && (
              <Animated.View
                layout={Layout}
                entering={FadeInUp}
                alignItems={"center"}
              >
                <Ionicons
                  name="ios-checkmark-circle"
                  size={"100%"}
                  color={SUCCESS.FLAT}
                />
                <Heading textAlign={"center"} color={SUCCESS.FLAT}>
                  Данные успешно обработаны
                </Heading>
              </Animated.View>
            )}
            {isLoading && (
              <Animated.View
                layout={Layout}
                entering={FadeInUp}
                exiting={FadeOutDown}
                alignItems={"center"}
              >
                <Heading textAlign={"center"}>Ожидайте</Heading>
                <Heading size={"md"} textAlign={"center"}>
                  Проводим проверку данных
                </Heading>
              </Animated.View>
            )}
          </Animated.View>
          {isLoading ? (
            <ActivityIndicator size={"large"} />
          ) : (
            errorList.length > 0 && (
              <ScrollView style={{ height: "45%", marginVertical: 4 }}>
                {errorList.map((value, index) => {
                  return (
                    <Box
                      key={index}
                      style={{
                        width: "100%",
                        height: 30,
                        borderRadius: 12,
                        borderStyle: "solid",
                        borderWidth: 0,
                        borderColor: ERROR.FLAT,
                        justifyContent: "center",
                        //alignItems: "center",
                        marginVertical: 4,
                        paddingHorizontal: 12,
                      }}
                    >
                      <HStack space={4}>
                        <MaterialIcons
                          name="error"
                          size={24}
                          color={ERROR.FLAT}
                        />
                        {/*<Spacer />*/}
                        <Text>{value}</Text>
                      </HStack>
                    </Box>
                  );
                })}
              </ScrollView>
            )
          )}
          <Animated.View layout={Layout}>
            {errorList.length === 0 && !isLoading && (
              <Animated.View
                style={{ overflow: "hidden" }}
                layout={Layout}
                entering={FadeInUp}
                //exiting={FadeOutUp}
              >
                <CreateButton />
              </Animated.View>
            )}
            <TouchableOpacity
              style={{ width: "100%", marginTop: 12 }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <LinearGradient
                colors={["#4a4a4d", "#7e7e88"]}
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
                <Heading size={"sm"} color={"white"}>
                  Редактировать
                </Heading>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </SafeAreaView>
    </DefaultBackground>
  );
}
