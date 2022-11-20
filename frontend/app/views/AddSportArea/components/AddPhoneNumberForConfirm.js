import { Heading } from "native-base";
import {
  COLORS_DARK_THEME,
  COLORS_FORM,
  COLORS_LIGHT_THEME,
} from "../../../modules/Theme/colors";
import React, { useContext } from "react";
import { addSportAreaContext } from "../../../navigation/AdditionalStack";
import { TextInputMask } from "react-native-masked-text";
import { useColorScheme } from "react-native";

export default function AddPhoneNumberForConfirm() {
  const { confirmedPhone, setConfirmedPhone } = useContext(addSportAreaContext);
  const colorScheme = useColorScheme();
  return (
    <>
      <Heading
        size={"sm"}
        style={{ marginBottom: 5 }}
        _light={{ color: COLORS_FORM.LABEL }}
        _dark={{ color: COLORS_FORM.LABEL }}
      >
        Телефон для подтверждения площадки
      </Heading>
      <TextInputMask
        type={"custom"}
        options={{
          mask: "+7 (999) 999-99-99",
        }}
        style={{
          height: 55,
          marginBottom: 16,
          width: "100%",
          borderRadius: 12,
          fontSize: 16,
          textAlign: "left",
          backgroundColor:
            colorScheme === "light"
              ? COLORS_FORM.INPUT
              : COLORS_FORM.DARK_INPUT,
          paddingLeft: 24,
          paddingRight: 24,
          fontWeight: "bold",
          color:
            colorScheme === "light"
              ? COLORS_LIGHT_THEME.TEXT
              : COLORS_DARK_THEME.TEXT,
        }}
        keyboardType={"number-pad"}
        placeholder={"+7 (123) 321-22-33"}
        clearButtonMode={"always"}
        placeholderTextColor={COLORS_FORM.PLACEHOLDER}
        value={confirmedPhone}
        onChangeText={(text) => {
          setConfirmedPhone(text);
        }}
      />
    </>
  );
}
