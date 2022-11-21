import { TAB_ROUTES } from "../../modules/NavigationRoutes/tab";
import TabBarNavigator from "../TabBarNavigator";
import { PROFILE_ROUTE } from "../../modules/NavigationRoutes/profile";
import AddPersonalData from "../../views/AddPersonalData";
import Settings from "../../views/Settings";
import LogoutButton from "../components/LogoutButton";
import {
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
} from "../../modules/Theme/colors";
import React, { createContext, useState } from "react";
import { useColorScheme } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import AddSportArea from "../../views/AddSportArea";
import { MAP_ROUTE } from "../../modules/NavigationRoutes/map";
import EnrollLocation from "../../views/EnrollLocation";
import SelectAddressMap from "../../views/SelectAddressMap";

export const addSportAreaContext = createContext();

const Index = createStackNavigator();
export default function AdditionalStackNavigator() {
  const colorScheme = useColorScheme();
  const [fullName, setFullName] = useState("");
  const [shortName, setShortName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [address, setAddress] = useState({});
  const [workTime, setWorkTime] = useState([
    { week: "Понедельник", startWork: null, endWork: null },
    { week: "Вторник", startWork: null, endWork: null },
    { week: "Среда", startWork: null, endWork: null },
    { week: "Четверг", startWork: null, endWork: null },
    { week: "Пятница", startWork: null, endWork: null },
    { week: "Суббота", startWork: null, endWork: null },
    { week: "Воскресенье", startWork: null, endWork: null },
  ]);
  const [price, setPrice] = useState(0);
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [squad, setSquad] = useState(0);
  const [lighting, setLighting] = useState("");
  const [coating, setCoating] = useState("");
  const [category, setCategory] = useState("");
  const [sportTypes, setSportTypes] = useState("");
  const [isCovered, setIsCovered] = useState(false);
  const [optionsZone, setOptionsZone] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [additionalPhoneNumber, setAdditionalPhoneNumber] = useState("");
  const [additionalPhoneNumberCode, setAdditionalPhoneNumberCode] =
    useState("");
  const [email, setEmail] = useState("");
  const [webSite, setWebSite] = useState("");
  const [keywords, setKeyWords] = useState([]);
  const state = {
    fullName,
    shortName,
    description,
    images,
    address,
    workTime,
    price,
    length,
    width,
    squad,
    lighting,
    coating,
    category,
    sportTypes,
    isCovered,
    optionsZone,
    phoneNumber,
    additionalPhoneNumber,
    additionalPhoneNumberCode,
    email,
    webSite,
    keywords,
    setFullName,
    setShortName,
    setDescription,
    setImages,
    setAddress,
    setWorkTime,
    setPrice,
    setLength,
    setWidth,
    setSquad,
    setLighting,
    setCoating,
    setCategory,
    setSportTypes,
    setIsCovered,
    setOptionsZone,
    setPhoneNumber,
    setAdditionalPhoneNumber,
    setAdditionalPhoneNumberCode,
    setEmail,
    setWebSite,
    setKeyWords,
  };
  //___________________________________________//
  return (
    <addSportAreaContext.Provider value={state}>
      <Index.Navigator>
        <Index.Screen
          name={TAB_ROUTES.PROFILE_ADD}
          component={TabBarNavigator}
          options={{
            headerShown: false,
            // gestureEnabled: false,
            // headerLargeTitle: true,
          }}
        />
        <Index.Screen
          name={PROFILE_ROUTE.ADD_PERSONAL_DATA.route}
          component={AddPersonalData}
          initialParams={{ header: PROFILE_ROUTE.ADD_PERSONAL_DATA.title }}
          options={{
            headerShown: false,
            presentation: "modal",
            // gestureEnabled: false,
            // headerLargeTitle: true,
          }}
        />
        <Index.Screen
          name={PROFILE_ROUTE.SETTINGS.route}
          component={Settings}
          initialParams={{ header: PROFILE_ROUTE.SETTINGS.title }}
          options={{
            headerShown: true,
            presentation: "modal",
            title: PROFILE_ROUTE.SETTINGS.title,
            headerRight: () => <LogoutButton />,
            headerBackTitle: "Назад",
            headerTitleStyle: {
              color:
                colorScheme === "light"
                  ? COLORS_LIGHT_THEME.TEXT
                  : COLORS_DARK_THEME.TEXT,
            },
            headerStyle: {
              backgroundColor:
                colorScheme === "light"
                  ? COLORS_LIGHT_THEME.BACKGROUND
                  : COLORS_DARK_THEME.BACKGROUND,
            },
          }}
        />

        <Index.Screen
          name={PROFILE_ROUTE.SPORT_AREA_ADD.route}
          component={AddSportArea}
          initialParams={{ header: PROFILE_ROUTE.SPORT_AREA_ADD.title }}
          options={{
            headerShown: true,
            // presentation: "modal",
            title: PROFILE_ROUTE.SPORT_AREA_ADD.title,
            headerBackTitle: "Отмена",
            headerTitleStyle: {
              color:
                colorScheme === "light"
                  ? COLORS_LIGHT_THEME.TEXT
                  : COLORS_DARK_THEME.TEXT,
            },
            headerStyle: {
              backgroundColor:
                colorScheme === "light"
                  ? COLORS_LIGHT_THEME.BACKGROUND
                  : COLORS_DARK_THEME.BACKGROUND,
            },
          }}
        />
        <Index.Screen
          name={PROFILE_ROUTE.SELECT_SPORT_AREA_ADDRESS.route}
          component={SelectAddressMap}
          initialParams={{
            header: PROFILE_ROUTE.SELECT_SPORT_AREA_ADDRESS.title,
          }}
          options={{
            headerShown: true,
            presentation: "modal",
            title: PROFILE_ROUTE.SELECT_SPORT_AREA_ADDRESS.title,
            headerBackTitle: "Отмена",
            headerTitleStyle: {
              color:
                colorScheme === "light"
                  ? COLORS_LIGHT_THEME.TEXT
                  : COLORS_DARK_THEME.TEXT,
            },
            headerStyle: {
              backgroundColor:
                colorScheme === "light"
                  ? COLORS_LIGHT_THEME.BACKGROUND
                  : COLORS_DARK_THEME.BACKGROUND,
            },
          }}
        />
        <Index.Screen
          name={MAP_ROUTE.ENROLL.route}
          component={EnrollLocation}
          initialParams={{
            header: MAP_ROUTE.ENROLL.title,
          }}
          options={{
            headerShown: true,
            presentation: "modal",
            title: MAP_ROUTE.ENROLL.title,
            headerBackTitle: "Отмена",
            headerTitleStyle: {
              color:
                colorScheme === "light"
                  ? COLORS_LIGHT_THEME.TEXT
                  : COLORS_DARK_THEME.TEXT,
            },
            headerStyle: {
              backgroundColor:
                colorScheme === "light"
                  ? COLORS_LIGHT_THEME.BACKGROUND
                  : COLORS_DARK_THEME.BACKGROUND,
            },
          }}
        />
      </Index.Navigator>
    </addSportAreaContext.Provider>
  );
}
