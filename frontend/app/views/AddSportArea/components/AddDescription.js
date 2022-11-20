import { Heading, Input } from "native-base";
import {
  COLORS_DARK_THEME,
  COLORS_FORM,
  COLORS_LIGHT_THEME,
} from "../../../modules/Theme/colors";
import React, { useContext } from "react";
import { addSportAreaContext } from "../../../navigation/AdditionalStack";

export default function AddDescription() {
  const { description, setDescription } = useContext(addSportAreaContext);
  return (
    <>
      <Heading
        size={"sm"}
        style={{ marginBottom: 5 }}
        _light={{ color: COLORS_FORM.LABEL }}
        _dark={{ color: COLORS_FORM.LABEL }}
      >
        Описание площадки
      </Heading>
      <Input
        value={description}
        numberOfLines={10}
        multiline={true}
        height={185}
        marginBottom={4}
        width={"100%"}
        borderRadius={12}
        variant="filled"
        textAlign={"left"}
        fontWeight={"bold"}
        fontSize={16}
        placeholder={"Описание площадки"}
        placeholderTextColor={COLORS_FORM.PLACEHOLDER}
        clearButtonMode="always"
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
          setDescription(value);
        }}
      />
    </>
  );
}
