import { Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { COLOR_ACCENT } from "../../modules/Theme/colors";
import { TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { PROFILE_ROUTE } from "../../modules/NavigationRoutes/profile";

export default function AddSportArea() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{ width: "100%", padding: 10 }}
      onPress={() => {
        navigation.navigate(PROFILE_ROUTE.SPORT_AREA_ADD.route);
      }}
    >
      <Icon
        as={MaterialIcons}
        size={7}
        alignSelf={"flex-end"}
        name={"add"}
        _light={{
          color: COLOR_ACCENT.ACCENT,
        }}
        _dark={{
          color: COLOR_ACCENT.ACCENT,
        }}
      />
    </TouchableOpacity>
  );
}
