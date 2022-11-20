import { TouchableWithoutFeedback, useColorScheme } from "react-native";
import React, { useState } from "react";
import Animated, { FadeInUp, FadeOutUp, Layout } from "react-native-reanimated";
import { Container, HStack, Icon, Text, View } from "native-base";
import { Spacer } from "native-base/src/components/primitives/Flex";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
} from "../../../../../modules/Theme/colors";

export default function WorkTimeLocationAccordion({ selectedLocation }) {
  const [open, setOpen] = useState(false);
  const colorScheme = useColorScheme();
  return (
    <Animated.View
      style={{
        backgroundColor:
          colorScheme === "light"
            ? COLORS_LIGHT_THEME.WHITE_BLOCK
            : COLORS_DARK_THEME.DARK_BLOCK,
        padding: 10,
        borderRadius: 12,
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          setOpen(!open);
        }}
      >
        <Animated.View layout={Layout}>
          <HStack>
            <Container>
              <Text fontSize={"md"} color={"gray.300"}>
                Часы работы
              </Text>
              {!open && (
                <Animated.View layout={Layout} exiting={FadeOutUp}>
                  <Text fontSize={18}>{selectedLocation?.work_time_today}</Text>
                </Animated.View>
              )}
              <Text
                fontSize={15}
                color={selectedLocation?.is_open ? "green.500" : "red.500"}
              >
                {selectedLocation?.is_open ? "открыто" : "закрыто"}
              </Text>
            </Container>
            <Spacer />
            <Icon
              as={Ionicons}
              size={7}
              alignSelf={"center"}
              name={open ? "ios-chevron-up" : "ios-chevron-down"}
              color={"gray.500"}
            />
          </HStack>
        </Animated.View>
      </TouchableWithoutFeedback>
      {open && (
        <Animated.View
          style={{ overflow: "hidden" }}
          layout={Layout}
          entering={FadeInUp}
          exiting={FadeOutUp}
        >
          <View collapsable={false}>
            {selectedLocation?.work_time.map((item, key) => (
              <HStack key={key}>
                <Text fontSize={16}>{item.name}</Text>
                <Spacer />
                <Text fontSize={16}>{item.time}</Text>
              </HStack>
            ))}
          </View>
        </Animated.View>
      )}
    </Animated.View>
  );
}
