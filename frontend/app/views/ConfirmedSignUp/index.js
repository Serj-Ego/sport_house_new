import DefaultBackground from "../../components/DefaultBackground";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet } from "react-native";

import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { WIDTH } from "../../modules/Theme/dimensions";
import { COLOR_ACCENT } from "../../modules/Theme/colors";
import { Text } from "native-base";
import ImageHeading from "./components/ImageHeading";
import ConfirmButton from "./components/ConfirmButton";
import TryAgainSendCode from "./components/TryAgainSendCode";
import { useNavigation } from "@react-navigation/native";
import { MAIN_ROUTES } from "../../modules/NavigationRoutes/main";
import { useDispatch, useSelector } from "react-redux";
import {
  ConfirmUserApiRequest,
  registrationUserId,
} from "../../services/redux/slices/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const styles = StyleSheet.create({
  codeFieldRoot: { marginTop: 18, marginBottom: 18 },
  cell: {
    width: WIDTH / 7,
    height: WIDTH / 7,
    borderRadius: 12,
    lineHeight: WIDTH / 7 - 2,
    fontSize: 24,
    borderWidth: 2,
    borderColor: "rgba(199,199,199,0.19)",
    textAlign: "center",
  },
  focusCell: {
    borderColor: COLOR_ACCENT.ACCENT,
  },
});

const CELL_COUNT = 5;

export default function ConfirmedSignUp() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const registrationUserState = useSelector(registrationUserId);
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    onConfirm();
  }, [value]);

  const onConfirm = () => {
    if (value.length === CELL_COUNT) {
      setLoading(true);
      dispatch(
        ConfirmUserApiRequest({ data: value, id: registrationUserState.id })
      )
        .then(unwrapResult)
        .then((res) => {
          setLoading(false);
          navigation.navigate(MAIN_ROUTES.SUCCESS_SIGNUP);
        })
        .catch((err) => {
          setLoading(false);
          Alert.alert(err);
        });
    }
  };
  return (
    <DefaultBackground>
      <ImageHeading />
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        autoFocus={true}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            {symbol || (isFocused ? null : null)}
          </Text>
        )}
      />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <ConfirmButton onConfirm={onConfirm} />
          <TryAgainSendCode />
        </>
      )}
    </DefaultBackground>
  );
}
