import { LinearGradient } from "expo-linear-gradient";
import { PRIMARY_GRADIENT } from "../../../../modules/Theme/colors";
import { PADDING_LR_MAIN } from "../../../../modules/Theme/padding";
import { HStack, Text } from "native-base";
import { ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { UpdateUserDataApiRequest } from "../../../../services/redux/slices/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";

export default function SubmitButton({ data }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const onSubmitForm = () => {
    setIsLoading(true);
    dispatch(UpdateUserDataApiRequest(data))
      .then(unwrapResult)
      .then((res) => {
        Alert.alert("Успешно", "Данные пользователя обновлены");
        setIsLoading(false);
      })
      .catch((err) => {
        Alert.alert("Ошибка", err.message);
        setIsLoading(false);
      });
  };
  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <TouchableOpacity onPress={onSubmitForm}>
      <LinearGradient
        colors={[PRIMARY_GRADIENT.START, PRIMARY_GRADIENT.END]}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={{
          minWidth: "100%",
          height: 56,
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
          padding: PADDING_LR_MAIN,
        }}
      >
        <HStack space={2}>
          <Text _light={{ color: "white" }} _dark={{ color: "white" }}>
            Сохранить
          </Text>
        </HStack>
      </LinearGradient>
    </TouchableOpacity>
  );
}
