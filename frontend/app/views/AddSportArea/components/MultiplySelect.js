import { Alert, FlatList, TouchableWithoutFeedback } from "react-native";
import { Box, HStack, Icon, Text } from "native-base";
import {
  COLOR_ACCENT,
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
} from "../../../modules/Theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { Spacer } from "native-base/src/components/primitives/Flex";
import React from "react";

export default function MultiplySelect({ listData, onPressFunc, dataContext }) {
  return (
    <FlatList
      data={listData}
      renderItem={({ item }) => {
        return (
          <TouchableWithoutFeedback onPress={() => onPressFunc(item)}>
            <Box
              key={item.id}
              style={{
                borderStyle: "solid",
                borderRadius: 12,
                minHeight: 55,
                borderWidth: 1,
                justifyContent: "center",
                padding: 16,
                marginBottom: 16,
              }}
              _light={{
                borderColor: dataContext.find((el) => el === item.id)
                  ? COLOR_ACCENT.ACCENT
                  : COLORS_DARK_THEME.DARK_BLOCK,
              }}
              _dark={{
                borderColor: dataContext.find((el) => el === item.id)
                  ? COLOR_ACCENT.ACCENT
                  : COLORS_LIGHT_THEME.WHITE_BLOCK,
              }}
            >
              <HStack alignItems={"center"} space={2}>
                {item.description && (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      Alert.alert("Информация", item.description);
                    }}
                  >
                    <Icon
                      as={Ionicons}
                      size={7}
                      alignSelf={"flex-end"}
                      name={"ios-information-circle-outline"}
                      _light={{
                        color: COLOR_ACCENT.ACCENT,
                      }}
                      _dark={{
                        color: COLOR_ACCENT.ACCENT,
                      }}
                    />
                  </TouchableWithoutFeedback>
                )}
                <Text flexWrap={"wrap"} style={{ width: "70%" }}>
                  {item.name}
                </Text>
                <Spacer />
                {dataContext.find((el) => el === item.id) && (
                  <Icon
                    as={Ionicons}
                    size={7}
                    alignSelf={"flex-end"}
                    name={"ios-checkmark-sharp"}
                    _light={{
                      color: COLOR_ACCENT.ACCENT,
                    }}
                    _dark={{
                      color: COLOR_ACCENT.ACCENT,
                    }}
                  />
                )}
              </HStack>
            </Box>
          </TouchableWithoutFeedback>
        );
      }}
    />
  );
}
