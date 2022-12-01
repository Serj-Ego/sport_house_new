import { LinearGradient } from "expo-linear-gradient";
import { COLOR_ACCENT, PRIMARY_GRADIENT } from "../../../modules/Theme/colors";
import { PADDING_LR_MAIN } from "../../../modules/Theme/padding";
import { Heading, HStack, Text, View } from "native-base";
import { ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { addSportAreaContext } from "../../../navigation/AdditionalStack";
import { useDispatch } from "react-redux";
import { SportAreaCreateApiRequest } from "../../../services/redux/slices/sportAreaSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigation } from "@react-navigation/native";
import { TAB_ROUTES } from "../../../modules/NavigationRoutes/tab";

export default function CreateButton() {
  const context = useContext(addSportAreaContext);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const createData = () => {
    return {
      full_name: context.fullName,
      short_name: context.shortName,
      description: context.description,
      address: context.address,
      work_time: context.workTime,
      price: context.price,
      length: context.length,
      width: context.width,
      squad: context.squad,
      lighting: context.lighting,
      coating: context.coating,
      category: context.category,
      sport_type: context.sportTypes,
      is_covered: context.isCovered,
      options: context.optionsZone,
      phone: context.phoneNumber,
      additional_phone: context.additionalPhoneNumber,
      additional_phone_code: context.additionalPhoneNumberCode,
      email: context.email,
      web_site: context.webSite,
      keywords: context.keywords,
      max_member: context.maxMembers,
      max_viewer: context.maxViewer,
    };
  };
  const clearContext = () => {
    context.setFullName("");
    context.setShortName("");
    context.setDescription("");
    context.setImages([]);
    context.setAddress({});
    context.setWorkTime([
      { week: "Понедельник", startWork: null, endWork: null },
      { week: "Вторник", startWork: null, endWork: null },
      { week: "Среда", startWork: null, endWork: null },
      { week: "Четверг", startWork: null, endWork: null },
      { week: "Пятница", startWork: null, endWork: null },
      { week: "Суббота", startWork: null, endWork: null },
      { week: "Воскресенье", startWork: null, endWork: null },
    ]);
    context.setPrice(null);
    context.setLength(0);
    context.setWidth(0);
    context.setSquad(0);
    context.setLighting("");
    context.setCoating("");
    context.setCategory("");
    context.setSportTypes("");
    context.setIsCovered(false);
    context.setOptionsZone([]);
    context.setPhoneNumber("");
    context.setAdditionalPhoneNumber("");
    context.setAdditionalPhoneNumberCode("");
    context.setEmail("");
    context.setWebSite("");
    context.setKeyWords([]);
    context.setMaxViewer(0);
    context.setMaxMembers(0);
  };
  return (
    <View>
      <TouchableOpacity
        disabled={isLoading}
        style={{ width: "100%" }}
        onPress={() => {
          setIsLoading(true);
          const data = createData();
          dispatch(
            SportAreaCreateApiRequest({ data: data, images: context.images })
          )
            .then(unwrapResult)
            .then((res) => {
              clearContext();
              navigation.navigate(TAB_ROUTES.PROFILE);
            })
            .catch((err) => {
              Alert.alert("Ошибка", "Произошла непредвиденная ошибка!");
            })
            .finally(() => {
              setIsLoading(false);
            });
        }}
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
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Heading size={"sm"} color={"white"}>
              Создать
            </Heading>
          )}
        </LinearGradient>
      </TouchableOpacity>
      <HStack alignItems={"center"} mt={2}>
        <Ionicons
          name="ios-information-circle"
          size={18}
          color={COLOR_ACCENT.ACCENT}
        />
        <Text textAlign={"start"} color={"gray.500"} fontSize={10} paddingX={4}>
          Карточка спортивного объекта создается со статусом "Ожидает отправки
          на проверку"
        </Text>
      </HStack>
    </View>
  );
}
