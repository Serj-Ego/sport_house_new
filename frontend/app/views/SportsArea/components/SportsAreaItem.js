import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Box, HStack, Text, View } from "native-base";
import {
  COLOR_ACCENT,
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
} from "../../../modules/Theme/colors";
import { Spacer } from "native-base/src/components/primitives/Flex";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInUp, FadeOutUp, Layout } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { SPORT_AREA } from "../../../modules/NavigationRoutes/sportArea";
import { statusColorSwitch } from "../../../modules/StatusColorSwitch";

export default function SportsAreaItem({ item }) {
  const [click, setClick] = useState(false);
  const navigation = useNavigation();
  return (
    <Animated.View layout={Layout} entering={FadeInUp} exiting={FadeOutUp}>
      <TouchableOpacity
        disabled={false}
        onPress={() => {
          navigation.navigate(SPORT_AREA.SPORT_AREA_OWNER_DETAIL.route, {
            id: item.id,
          });
        }}
        onPressIn={() => setClick(true)}
        onPressOut={() => setClick(false)}
      >
        <Box
          style={{ height: 75, borderRadius: 12, paddingHorizontal: 16 }}
          _light={{
            backgroundColor: click
              ? COLOR_ACCENT.ACCENT
              : COLORS_LIGHT_THEME.WHITE_BLOCK,
          }}
          _dark={{
            backgroundColor: click
              ? COLOR_ACCENT.ACCENT
              : COLORS_DARK_THEME.DARK_BLOCK,
          }}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <HStack justifyContent={"center"} alignItems={"center"} space={4}>
            <Box
              style={{
                height: 10,
                width: 10,
                backgroundColor: statusColorSwitch(item.last_status),
                borderRadius: 100,
              }}
            />
            <View maxW={"70%"}>
              <Text
                style={{ fontWeight: "400", fontSize: 17 }}
                ellipsizeMode={"tail"}
                numberOfLines={1}
              >
                {item.short_name ? item.short_name : item.full_name}
              </Text>
              <Text
                style={{ fontWeight: "300" }}
                color={"gray.500"}
                ellipsizeMode={"tail"}
                numberOfLines={1}
              >
                {item.description}
              </Text>
            </View>
            <Spacer />
            <Ionicons name="ios-chevron-forward" size={24} color={"gray"} />
          </HStack>
        </Box>
      </TouchableOpacity>
    </Animated.View>
  );
}
