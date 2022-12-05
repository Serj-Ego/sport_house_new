import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MAIN_ROUTES } from "../../modules/NavigationRoutes/main";
import Onboarding from "../../views/Onboarding";
import { completeOnboarding } from "../../services/redux/slices/baseSlice";
import { useSelector } from "react-redux";
import Login from "../../views/Login";
import SignUp from "../../views/SignUp";
import { useColorScheme } from "react-native";
import {
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
} from "../../modules/Theme/colors";
import ConfirmedSignUp from "../../views/ConfirmedSignUp";
import SuccessSignUp from "../../views/SuccessSignUp";
import { userLoginData } from "../../services/redux/slices/userSlice";
import React from "react";
import * as Notifications from "expo-notifications";
import AdditionalStackNavigator from "../AdditionalStack";
import SelectRole from "../../views/SelectRole";

const MainStack = createStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function MainStackNavigator() {
  const userLoginDataSelector = useSelector(userLoginData);
  const colorScheme = useColorScheme();
  const viewOnboardingScreen = useSelector(completeOnboarding);

  return (
    <NavigationContainer>
      {userLoginDataSelector.token ? (
        <AdditionalStackNavigator />
      ) : (
        <MainStack.Navigator>
          {!viewOnboardingScreen && (
            <MainStack.Screen
              name={MAIN_ROUTES.ONBOARDING}
              component={Onboarding}
              options={{ headerShown: false, gestureEnabled: false }}
            />
          )}
          <MainStack.Screen
            name={MAIN_ROUTES.LOGIN}
            component={Login}
            options={{ headerShown: false, gestureEnabled: false }}
          />
          <MainStack.Screen
            name={MAIN_ROUTES.SET_ROLE}
            component={SelectRole}
            options={{
              headerShown: true,
              headerBackTitle: "Назад",
              title: "Выбор роли",
              // presentation: "modal",
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
          <MainStack.Screen
            name={MAIN_ROUTES.SIGNUP}
            component={SignUp}
            options={{
              headerShown: true,
              headerBackTitle: "Назад",
              title: "Регистрация",
              // presentation: "modal",
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
          <MainStack.Screen
            name={MAIN_ROUTES.CONFIRMED_SIGNUP}
            component={ConfirmedSignUp}
            options={{
              headerShown: true,
              gestureEnabled: false,
              headerLeft: null,
              title: "Подтверждение регистрации",
              // presentation: "modal",
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
          <MainStack.Screen
            name={MAIN_ROUTES.SUCCESS_SIGNUP}
            component={SuccessSignUp}
            options={{
              headerShown: true,
              gestureEnabled: false,
              headerLeft: null,
              title: "Успешная регистрация",
              // presentation: "modal",
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
        </MainStack.Navigator>
      )}
    </NavigationContainer>
  );
}
