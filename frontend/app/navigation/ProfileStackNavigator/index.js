import { PROFILE_ROUTE } from "../../modules/NavigationRoutes/profile";
import Profile from "../../views/Profile";
import Recommendation from "../../views/Recomendation";
import {
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
} from "../../modules/Theme/colors";
import { useColorScheme } from "react-native";
import React from "react";
import UpdateRecomendationButton from "../components/updateRecomendationButton";
import Notification from "../../views/Notification";
import { createNativeStackNavigator } from "react-native-screens/native-stack";

const ProfileStack = createNativeStackNavigator();

export default function ProfileStackNavigator() {
  const colorScheme = useColorScheme();
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name={PROFILE_ROUTE.MAIN.route}
        component={Profile}
        initialParams={{ header: PROFILE_ROUTE.MAIN.title }}
        options={{
          headerShown: false,
          // gestureEnabled: false,
          // headerLargeTitle: true,
        }}
      />
      <ProfileStack.Screen
        name={PROFILE_ROUTE.RECOMMENDATION.route}
        component={Recommendation}
        initialParams={{ header: PROFILE_ROUTE.RECOMMENDATION.title }}
        options={{
          headerShown: true,
          title: PROFILE_ROUTE.RECOMMENDATION.title,
          headerBackTitle: "Назад",
          headerRight: () => <UpdateRecomendationButton />,
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
      <ProfileStack.Screen
        name={PROFILE_ROUTE.NOTIFICATION.route}
        component={Notification}
        initialParams={{ header: PROFILE_ROUTE.NOTIFICATION.title }}
        options={{
          headerShown: true,
          title: PROFILE_ROUTE.NOTIFICATION.title,
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
      {/*<ProfileStack.Screen*/}
      {/*  name={PROFILE_ROUTE.SPORT_AREA_ITEMS.route}*/}
      {/*  component={SportsArea}*/}
      {/*  initialParams={{ header: PROFILE_ROUTE.SPORT_AREA_ITEMS.title }}*/}
      {/*  options={{*/}
      {/*    headerShown: true,*/}
      {/*    headerLargeTitle: true,*/}
      {/*    title: PROFILE_ROUTE.SPORT_AREA_ITEMS.title,*/}
      {/*    // headerBackTitle: "Назад",*/}
      {/*    // headerRight: () => <AddSportArea />,*/}
      {/*    headerTitleStyle: {*/}
      {/*      color:*/}
      {/*        colorScheme === "light"*/}
      {/*          ? COLORS_LIGHT_THEME.TEXT*/}
      {/*          : COLORS_DARK_THEME.TEXT,*/}
      {/*    },*/}
      {/*    headerStyle: {*/}
      {/*      backgroundColor:*/}
      {/*        colorScheme === "light"*/}
      {/*          ? COLORS_LIGHT_THEME.BACKGROUND*/}
      {/*          : COLORS_DARK_THEME.BACKGROUND,*/}
      {/*    },*/}
      {/*  }}*/}
      {/*/>*/}
    </ProfileStack.Navigator>
  );
}
