import React, { useContext } from "react";
import { addSportAreaContext } from "../../../../navigation/AdditionalStack";
import {
  COLOR_ACCENT,
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
} from "../../../../modules/Theme/colors";
import { Box, Heading, HStack, Icon, View, VStack } from "native-base";
import { Spacer } from "native-base/src/components/primitives/Flex";
import { WIDTH } from "../../../../modules/Theme/dimensions";
import { ScrollView, TouchableOpacity } from "react-native";
import { SportAreaOptionsConstList } from "../../../../modules/SportAreaOptionsConstList";

export default function SportAreaOptions() {
  const { optionsZone, setOptionsZone } = useContext(addSportAreaContext);
  return (
    <View justifyContent={"space-around"}>
      <View style={{ width: WIDTH, paddingHorizontal: 12, height: "100%" }}>
        <Heading mt={2}>Характеристика объекта</Heading>
        <ScrollView style={{ borderRadius: 12, marginVertical: 12 }}>
          <VStack space={2}>
            {SportAreaOptionsConstList.map((value, index) => {
              return (
                <HStack space={2} key={index}>
                  {value.map((item) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          if (optionsZone.find((el) => el === item.value)) {
                            setOptionsZone(
                              optionsZone.filter((el) => el !== item.value)
                            );
                          } else {
                            setOptionsZone([...optionsZone, item.value]);
                          }
                        }}
                      >
                        <Box
                          key={index}
                          style={{
                            height: 55,
                            width:
                              value.length > 1
                                ? WIDTH / 2 - 4 - 12
                                : WIDTH - 24,
                            borderStyle: "solid",
                            borderWidth: 2,
                            borderColor: optionsZone.find(
                              (el) => el === item.value
                            )
                              ? COLOR_ACCENT.ACCENT
                              : "gray",
                            borderRadius: 12,
                            padding: 12,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          _light={{
                            backgroundColor: COLORS_LIGHT_THEME.WHITE_BLOCK,
                          }}
                          _dark={{
                            backgroundColor: COLORS_DARK_THEME.DARK_BLOCK,
                          }}
                        >
                          <HStack alignItems={"center"}>
                            <Icon
                              as={item.iconLib}
                              size={6}
                              name={item.iconName}
                              textAlign={"center"}
                              _light={{
                                color: optionsZone.find(
                                  (el) => el === item.value
                                )
                                  ? COLOR_ACCENT.ACCENT
                                  : "gray.400",
                              }}
                              _dark={{
                                color: optionsZone.find(
                                  (el) => el === item.value
                                )
                                  ? COLOR_ACCENT.ACCENT
                                  : "gray.400",
                              }}
                            />
                            <Spacer />
                            <Heading
                              fontSize={16}
                              _light={{
                                color: optionsZone.find(
                                  (el) => el === item.value
                                )
                                  ? COLOR_ACCENT.ACCENT
                                  : "gray.400",
                              }}
                              _dark={{
                                color: optionsZone.find(
                                  (el) => el === item.value
                                )
                                  ? COLOR_ACCENT.ACCENT
                                  : "gray.400",
                              }}
                            >
                              {item.value}
                            </Heading>
                          </HStack>
                        </Box>
                      </TouchableOpacity>
                    );
                  })}
                </HStack>
              );
            })}
          </VStack>
        </ScrollView>
      </View>
    </View>
  );
}
