import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TAB_ROUTES } from "../../modules/NavigationRoutes/tab";
import ProfileStackNavigator from "../ProfileStackNavigator";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import {
  COLOR_ACCENT,
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
} from "../../modules/Theme/colors";
import { useSelector } from "react-redux";
import { userInfoData } from "../../services/redux/slices/userSlice";
import { RoleConst } from "../../modules/RoleConst";
import SearchSportArea from "../../views/SearchSportArea";

const Tab = createBottomTabNavigator();

export default function TabBarNavigator() {
  const colorScheme = useColorScheme();
  const userDataState = useSelector(userInfoData);
  return (
    <Tab.Navigator
      initialRouteName={TAB_ROUTES.PROFILE}
      screenOptions={({ route }) => ({
        headerShown: false,
        showLabel: false,
        // tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === TAB_ROUTES.PROFILE) {
            iconName = focused ? "ios-person" : "ios-person-outline";
          }
          if (route.name === TAB_ROUTES.SEARCH_SPORT_AREA) {
            iconName = focused ? "ios-search-sharp" : "ios-search-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          backgroundColor:
            colorScheme === "light"
              ? COLORS_LIGHT_THEME.WHITE_BLOCK
              : COLORS_DARK_THEME.DARK_BLOCK,
        },
        tabBarActiveTintColor: COLOR_ACCENT.ACCENT,
        tabBarInactiveTintColor:
          colorScheme === "light"
            ? COLORS_LIGHT_THEME.TEXT
            : COLORS_DARK_THEME.TEXT,
      })}
    >
      {userDataState.role === RoleConst.SPORTSMAN && (
        <Tab.Screen
          name={TAB_ROUTES.SEARCH_SPORT_AREA}
          options={{ tabBarLabel: "Поиск" }}
          component={SearchSportArea}
        />
      )}
      <Tab.Screen
        name={TAB_ROUTES.PROFILE}
        options={{ tabBarLabel: "Профиль" }}
        component={ProfileStackNavigator}
      />
    </Tab.Navigator>
  );
}
