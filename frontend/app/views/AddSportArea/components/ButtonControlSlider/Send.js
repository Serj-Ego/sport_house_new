import { LinearGradient } from "expo-linear-gradient";
import { PRIMARY_GRADIENT } from "../../../../modules/Theme/colors";
import { PADDING_LR_MAIN } from "../../../../modules/Theme/padding";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import React from "react";

export default function Send() {
  return (
    <TouchableOpacity style={{ width: "15%" }}>
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
        <Entypo name="check" size={26} color="white" />
      </LinearGradient>
    </TouchableOpacity>
  );
}
