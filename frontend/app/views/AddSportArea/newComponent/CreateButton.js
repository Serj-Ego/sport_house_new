import { LinearGradient } from "expo-linear-gradient";
import { COLOR_ACCENT, PRIMARY_GRADIENT } from "../../../modules/Theme/colors";
import { PADDING_LR_MAIN } from "../../../modules/Theme/padding";
import { Heading, HStack, Text, View } from "native-base";
import { TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function CreateButton() {
  return (
    <View>
      <TouchableOpacity style={{ width: "100%" }}>
        <LinearGradient
          colors={[PRIMARY_GRADIENT.START, PRIMARY_GRADIENT.END]}
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={{
            height: 55,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
            padding: PADDING_LR_MAIN,
          }}
        >
          <Heading size={"sm"} color={"white"}>
            Создать
          </Heading>
        </LinearGradient>
      </TouchableOpacity>
      <HStack alignItems={"center"} mt={2}>
        <Ionicons
          name="ios-information-circle"
          size={18}
          color={COLOR_ACCENT.ACCENT}
        />
        <Text textAlign={"start"} color={"gray.500"} fontSize={10} paddingX={4}>
          Карточка спортивного объекта создается со статусом "Ожидает отправки
          на проверку"
        </Text>
      </HStack>
    </View>
  );
}
