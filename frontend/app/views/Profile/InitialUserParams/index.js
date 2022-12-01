import { Alert, StyleSheet, View } from "react-native";
import NotificationView from "./NotificationView";
import { useState } from "react";
import FullNameView from "./FullNameView";
import { useDispatch } from "react-redux";
import { setUserAddAllInfo } from "../../../services/redux/slices/baseSlice";
import { UpdateUserDataApiRequest } from "../../../services/redux/slices/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const InitialRoutes = {
  Notification: "notification",
  FullName: "full_name",
};

export default function InitialUserParams({ navigation }) {
  const [notificationToken, setNotificationToken] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [slide, setSlide] = useState(InitialRoutes.Notification);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const onFinish = () => {
    setIsLoading(true);
    dispatch(
      UpdateUserDataApiRequest({
        first_name: firstName,
        last_name: lastName,
        notification_token: notificationToken,
      })
    )
      .then(unwrapResult)
      .then((res) => {
        navigation.pop();
        dispatch(setUserAddAllInfo(true));
      })
      .catch((err) => Alert.alert("Ошибка", "Произошла непредвиденная ошибка!"))
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <View style={styles.container}>
      {slide === InitialRoutes.Notification && (
        <NotificationView
          setNotificationToken={setNotificationToken}
          setSlide={setSlide}
        />
      )}
      {slide === InitialRoutes.FullName && (
        <FullNameView
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          setSlide={setSlide}
          onFinish={onFinish}
          isLoading={isLoading}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "rgba(44,44,44,0.50)",
  },
});
