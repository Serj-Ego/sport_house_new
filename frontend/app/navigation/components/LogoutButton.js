import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLOR_ACCENT } from "../../modules/Theme/colors";
import { Icon } from "native-base";
import React from "react";
import { useDispatch } from "react-redux";
import { LogoutApiRequest } from "../../services/redux/slices/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";

export default function LogoutButton() {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(LogoutApiRequest())
      .then(unwrapResult)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <TouchableOpacity style={{ padding: 10 }} onPress={onLogout}>
      <Icon
        as={Ionicons}
        size={7}
        alignSelf={"flex-end"}
        name={"log-out-outline"}
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
