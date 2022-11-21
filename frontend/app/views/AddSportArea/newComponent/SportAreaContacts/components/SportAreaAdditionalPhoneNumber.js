import { Heading, HStack, Input } from "native-base";
import {
  COLORS_DARK_THEME,
  COLORS_FORM,
  COLORS_LIGHT_THEME,
} from "../../../../../modules/Theme/colors";
import React, { useContext } from "react";
import { addSportAreaContext } from "../../../../../navigation/AdditionalStack";

export default function SportAreaAdditionalPhoneNumber() {
  const {
    additionalPhoneNumber,
    additionalPhoneNumberCode,
    setAdditionalPhoneNumberCode,
    setAdditionalPhoneNumber,
  } = useContext(addSportAreaContext);
  const formatMobileNumber = (text) => {
    let cleaned = ("" + text).replace(/\D/g, "");
    let match = cleaned.match(/^(7|8)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = match[1] ? "+7 " : "",
        number = [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join(
          ""
        );
      return number;
    }
    return text;
  };
  return (
    <>
      <Heading size={"sm"} marginY={2}>
        Дополнительный номер телефона:
      </Heading>
      <HStack space={"2%"}>
        <Input
          value={additionalPhoneNumber}
          height={55}
          maxWidth={"60%"}
          width={"100%"}
          borderRadius={12}
          variant="filled"
          textAlign={"left"}
          fontWeight={"bold"}
          fontSize={16}
          placeholder={"7 (XXX) XXX-XXXX"}
          placeholderTextColor={COLORS_FORM.PLACEHOLDER}
          clearButtonMode="always"
          keyboardType={"number-pad"}
          maxLength={11}
          _focus={{
            borderColor: "rgba(255,255,255,0)",
          }}
          paddingLeft={6}
          paddingRight={6}
          _light={{
            backgroundColor: COLORS_FORM.INPUT,
            color: COLORS_LIGHT_THEME.TEXT,
          }}
          _dark={{
            color: COLORS_DARK_THEME.TEXT,
            backgroundColor: COLORS_FORM.DARK_INPUT,
          }}
          onChangeText={(value) => {
            let number = formatMobileNumber(value);
            setAdditionalPhoneNumber(number);
          }}
        />
        <Input
          value={additionalPhoneNumberCode}
          height={55}
          maxWidth={"60%"}
          width={"38%"}
          borderRadius={12}
          variant="filled"
          textAlign={"left"}
          fontWeight={"bold"}
          fontSize={16}
          placeholder={"Доб. Код"}
          placeholderTextColor={COLORS_FORM.PLACEHOLDER}
          clearButtonMode="always"
          keyboardType={"number-pad"}
          _focus={{
            borderColor: "rgba(255,255,255,0)",
          }}
          paddingLeft={6}
          paddingRight={6}
          _light={{
            backgroundColor: COLORS_FORM.INPUT,
            color: COLORS_LIGHT_THEME.TEXT,
          }}
          _dark={{
            color: COLORS_DARK_THEME.TEXT,
            backgroundColor: COLORS_FORM.DARK_INPUT,
          }}
          onChangeText={(value) => {
            setAdditionalPhoneNumberCode(value);
          }}
        />
      </HStack>
    </>
  );
}
