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
import AddSportAreaZone from "../../views/AddSportAreaZone";

export const addSportAreaContext = createContext();

const Index = createStackNavigator();
export default function AdditionalStackNavigator() {
  const colorScheme = useColorScheme();
  const [sportAreaType, setSportAreaType] = useState(null);
  const [fullName, setFullName] = useState("");
  const [shortName, setShortName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [isCovered, setIsCovered] = useState(true);
  const [address, setAddress] = useState({});

  const state = {
    sportAreaType,
    fullName,
    shortName,
    description,
    images,
    isCovered,
    address,
    setSportAreaType,
    setFullName,
    setShortName,
    setDescription,
    setImages,
    setIsCovered,
    setAddress,
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
          name={PROFILE_ROUTE.SPORT_AREA_ZONE_ADD.route}
          component={AddSportAreaZone}
          initialParams={{ header: PROFILE_ROUTE.SPORT_AREA_ZONE_ADD.title }}
          options={{
            headerShown: true,
            presentation: "modal",
            title: PROFILE_ROUTE.SPORT_AREA_ZONE_ADD.title,
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
