import {
  COLOR_ACCENT,
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
} from "../../../modules/Theme/colors";
import { Text } from "native-base";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  registrationUserId,
  RetrySendCodeUserApiRequest,
} from "../../../services/redux/slices/userSlice";

export default function TryAgainSendCode() {
  const [seconds, setSeconds] = useState(60);
  const [showButton, setShowButton] = useState(false);
  const dispatch = useDispatch();
  const registrationUserState = useSelector(registrationUserId);
  useEffect(() => {
    if (seconds === 0) {
      setShowButton(true);
    } else {
      const timer =
        seconds > 0 && setInterval(() => setSeconds(seconds - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [seconds]);
  return showButton ? (
    <TouchableOpacity
      onPress={() => {
        dispatch(RetrySendCodeUserApiRequest({ id: registrationUserState.id }));
        setShowButton(false);
        setSeconds(60);
      }}
    >
      <Text
        style={{ marginTop: 16, textAlign: "center" }}
        _light={{
          color: COLOR_ACCENT.LINK,
        }}
        _dark={{
          color: COLOR_ACCENT.LINK,
        }}
      >
        Отправить повторно
      </Text>
    </TouchableOpacity>
  ) : (
    <Text
      style={{ marginTop: 16, textAlign: "center" }}
      _light={{
        color: COLORS_LIGHT_THEME.TEXT,
      }}
      _dark={{
        color: COLORS_DARK_THEME.TEXT,
      }}
    >
      Отправить повторно через {seconds} сек
    </Text>
  );
}
