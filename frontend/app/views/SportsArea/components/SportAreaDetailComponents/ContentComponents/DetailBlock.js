import { Box, Heading, HStack, Text, View } from "native-base";
import {
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
} from "../../../../../modules/Theme/colors";
import React from "react";
import { TouchableWithoutFeedback, useColorScheme } from "react-native";
import { Spacer } from "native-base/src/components/primitives/Flex";
import { useNavigation } from "@react-navigation/native";

const dataImages = [
  {
    banner: require("../../../../../assets/img.png"),
  },
  {
    banner: require("../../../../../assets/img_1.png"),
  },
  {
    banner: require("../../../../../assets/img_2.png"),
  },
];

export default function DetailBlock({
  title,
  viewAllButton = false,
  linkTo = null,
  data = [],
  children,
  width = "100%",
}) {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  return (
    <View marginY={2} width={width}>
      <HStack>
        <Heading size={"md"} marginBottom={1}>
          {title}
        </Heading>
        <Spacer />
        {viewAllButton && (
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate(linkTo, { data: data });
            }}
          >
            <Text color={"#007AFF"} fontWeight={500}>
              Смотреть все
            </Text>
          </TouchableWithoutFeedback>
        )}
      </HStack>

      <Box
        style={{
          width: "100%",
          backgroundColor:
            colorScheme === "light"
              ? COLORS_LIGHT_THEME.WHITE_BLOCK
              : COLORS_DARK_THEME.DARK_BLOCK,
          borderRadius: 12,
          padding: 16,
        }}
      >
        {children}
      </Box>
    </View>
  );
}
