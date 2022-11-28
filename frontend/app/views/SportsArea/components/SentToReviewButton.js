import { Badge } from "native-base";
import {
  ActionSheetIOS,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { StatusConst } from "../../../modules/StatusConst";
import { unwrapResult } from "@reduxjs/toolkit";
import { SportAreaChangeStatusApiRequest } from "../../../services/redux/slices/sportAreaSlice";

const ActionConst = {
  SENT_TO_REVIEW: "Отправить на проверку",
  SENT_TO_ARCHIVE: "Отпрвить в архив",
  SENT_TO_PUBLISH: "Опубликовать",
};

export default function SentToReviewButton({ id, statusName }) {
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(false);
  const onPress = () => {
    const action = () => {
      switch (statusName) {
        case StatusConst.CREATED:
          return ["Отменить", ActionConst.SENT_TO_REVIEW];
        case StatusConst.CONFIRMED:
          return ["Отменить", ActionConst.SENT_TO_PUBLISH];
        case StatusConst.ARCHIVE:
          return ["Отменить", ActionConst.SENT_TO_PUBLISH];
        case StatusConst.PUBLISHED:
          return ["Отменить", ActionConst.SENT_TO_ARCHIVE];
        default:
          return ["Отменить"];
      }
    };
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: action(),
        cancelButtonIndex: 0,
        userInterfaceStyle: colorScheme,
      },
      (buttonIndex) => {
        let actionStatus = null;
        if (buttonIndex === 0) {
        } else if (
          buttonIndex === 1 &&
          action()[buttonIndex] === ActionConst.SENT_TO_REVIEW
        ) {
          actionStatus = StatusConst.REVIEW;
        } else if (
          buttonIndex === 1 &&
          action()[buttonIndex] === ActionConst.SENT_TO_PUBLISH
        ) {
          actionStatus = StatusConst.PUBLISHED;
        } else if (
          buttonIndex === 1 &&
          action()[buttonIndex] === ActionConst.SENT_TO_ARCHIVE
        ) {
          actionStatus = StatusConst.ARCHIVE;
        }
        if (actionStatus) {
          setIsLoading(true);
          dispatch(
            SportAreaChangeStatusApiRequest({
              id: id,
              status: actionStatus,
            })
          )
            .then(unwrapResult)
            .then((res) => {})
            .catch((err) => {
              console.log(err);
              Alert.alert("Ошибка", "Произошла ошибка");
            })
            .finally(() => {
              setIsLoading(false);
            });
        }
      }
    );
  };
  return (
    <TouchableOpacity onPress={onPress} disabled={isLoading}>
      <Badge
        borderRadius={12}
        height={12}
        marginTop={2}
        colorScheme="warning"
        variant={"outline"}
      >
        {isLoading ? <ActivityIndicator /> : "Действия"}
      </Badge>
    </TouchableOpacity>
  );
}
