import { Badge } from "native-base";
import { ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SportAreaChangeStatusApiRequest } from "../../../services/redux/slices/sportAreaSlice";
import { unwrapResult } from "@reduxjs/toolkit";

export default function SentToReviewButton({ id, statusName, titleButton }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <TouchableOpacity
      onPress={() => {
        setIsLoading(true);
        dispatch(
          SportAreaChangeStatusApiRequest({
            id: id,
            status: statusName,
          })
        )
          .then(unwrapResult)
          .then((res) => {
            setIsLoading(false);
          })
          .catch((err) => {
            setIsLoading(false);
            Alert.alert("Ошибка", "Произошла ошибка");
          });
      }}
    >
      <Badge
        borderRadius={12}
        height={10}
        marginTop={2}
        colorScheme="info"
        variant={"solid"}
      >
        {titleButton}
      </Badge>
    </TouchableOpacity>
  );
}
