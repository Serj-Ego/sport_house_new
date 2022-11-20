import { Icon } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { COLOR_ACCENT } from "../../../modules/Theme/colors";
import { TouchableOpacity } from "react-native";
import React from "react";

export default function DropInfoButton({ open, setOpen }) {
  return (
    <TouchableOpacity onPress={() => setOpen(!open)}>
      <Icon
        as={FontAwesome}
        size={7}
        style={{ marginTop: 12, width: "100%", textAlign: "center" }}
        alignSelf={"center"}
        name={open ? "angle-double-up" : "angle-double-down"}
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
