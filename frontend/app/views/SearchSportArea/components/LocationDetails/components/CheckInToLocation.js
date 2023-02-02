import { Button, Icon, Text } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import {
  COLOR_ACCENT,
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
} from "../../../../../modules/Theme/colors";
import { StyleSheet, useColorScheme } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { MAP_ROUTE } from "../../../../../modules/NavigationRoutes/map";

export default function CheckInToLocation({ selectedLocation }) {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  return (
    <Button
      leftIcon={
        <Icon
          as={Ionicons}
          size={7}
          alignSelf={"center"}
          name={"ios-create-outline"}
          _light={{
            color: COLOR_ACCENT.ACCENT,
          }}
          _dark={{
            color: COLOR_ACCENT.ACCENT,
          }}
        />
      }
      style={[
        styles.directionsButton,
        {
          backgroundColor:
            colorScheme === "light"
              ? COLORS_LIGHT_THEME.WHITE_BLOCK
              : COLORS_DARK_THEME.DARK_BLOCK,
          width: "100%",
          minHeight: 55,
          marginBottom: 14,
        },
      ]}
      onPress={() => {
        navigation.navigate(MAP_ROUTE.ENROLL.route, {
          areaId: selectedLocation.id,
        });
      }}
    >
      <Text>Записаться</Text>
    </Button>
  );
}
const styles = StyleSheet.create({
  directionsButton: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 70,
    width: "48%",
    borderRadius: 10,
  },
});
