import DefaultBackground from "../../components/DefaultBackground";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ListUserNotificationApiRequest,
  ReadUserNotificationApiRequest,
  userNotificationData,
} from "../../services/redux/slices/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { ActivityIndicator, FlatList } from "react-native";
import NotificationItem from "./components/NotificationItem";
import { View } from "native-base";

export default function Notification({ route }) {
  const dispatch = useDispatch();
  const userNotificationDataState = useSelector(userNotificationData);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(ListUserNotificationApiRequest())
      .then(unwrapResult)
      .then((res) => {
        setIsLoading(false);
        dispatch(ReadUserNotificationApiRequest());
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [route]);

  return (
    <DefaultBackground paddingTop={16}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          data={userNotificationDataState}
          renderItem={({ item }) => <NotificationItem item={item} />}
        />
      )}
    </DefaultBackground>
  );
}
