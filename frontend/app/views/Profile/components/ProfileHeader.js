import { TouchableWithoutFeedback, useColorScheme } from "react-native";
import { Box } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { Badge } from "react-native-elements";
import ScreenHeader from "../../../components/ScreenHeader";
import {
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
} from "../../../modules/Theme/colors";
import { useSelector } from "react-redux";
import { userInfoData } from "../../../services/redux/slices/userSlice";
import { useNavigation } from "@react-navigation/native";
import { PROFILE_ROUTE } from "../../../modules/NavigationRoutes/profile";

export default function ProfileHeader({ route }) {
  const colorScheme = useColorScheme();
  const userDataState = useSelector(userInfoData);
  const navigation = useNavigation();
  return (
    <ScreenHeader title={route.params.header}>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate(PROFILE_ROUTE.NOTIFICATION.route);
        }}
      >
        <Box>
          <Ionicons
            name="ios-notifications-outline"
            size={28}
            color={
              colorScheme === "light"
                ? COLORS_LIGHT_THEME.TEXT
                : COLORS_DARK_THEME.TEXT
            }
          />
          {userDataState.notification_badge && (
            <Badge
              status={"warning"}
              containerStyle={{ position: "absolute", top: 5, right: 5 }}
            />
          )}
        </Box>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate(PROFILE_ROUTE.SETTINGS.route);
        }}
      >
        <Ionicons
          name="ios-settings-outline"
          size={28}
          color={
            colorScheme === "light"
              ? COLORS_LIGHT_THEME.TEXT
              : COLORS_DARK_THEME.TEXT
          }
          style={{ marginLeft: 22 }}
        />
      </TouchableWithoutFeedback>
    </ScreenHeader>
  );
}
