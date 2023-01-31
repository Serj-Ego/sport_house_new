import { Heading, HStack, View } from "native-base";
import {
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
} from "../../../../modules/Theme/colors";
import RegistrationButton from "./components/RegistrationButton";
import LoginButton from "./components/LoginButton";
import PasswordInput from "./components/PasswordInput";
import EmailInput from "./components/EmailInput";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { LoginApiRequest } from "../../../../services/redux/slices/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";

export default function Form() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);

  useEffect(() => {
    if (!email.length > 0 && (emailError === false || emailError === true)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    if (
      !password.length > 0 &&
      (passwordError === false || passwordError === true)
    ) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }, [email, password]);
  const onLogin = () => {
    if (email.length > 0 && password.length > 0) {
      setLoading(true);
      dispatch(LoginApiRequest({ username: email, password: password }))
        .then(unwrapResult)
        .then((res) => {
          setLoading(false);
        })
        .catch((err) => {
          Alert.alert("Ошибка авторизации", err?.non_field_errors[0]);
          console.log(err);
          // Alert.alert(err.non_field_errors[0]);
          setLoading(false);
        });
    } else {
      Alert.alert("Введите E-mail и Пароль для входа в систему!");
    }
  };
  return (
    <View>
      <Heading
        marginBottom={4}
        textAlign={"center"}
        _light={{
          color: COLORS_LIGHT_THEME.TEXT,
        }}
        _dark={{
          color: COLORS_DARK_THEME.TEXT,
        }}
      >
        Авторизация
      </Heading>
      <EmailInput emailError={emailError} email={email} setEmail={setEmail} />
      <PasswordInput
        passwordError={passwordError}
        password={password}
        setPassword={setPassword}
      />
      <HStack space={4}>
        <LoginButton onLogin={onLogin} loading={loading} />
        <RegistrationButton />
      </HStack>
      {/*<ResetPasswordButton />*/}
    </View>
  );
}
