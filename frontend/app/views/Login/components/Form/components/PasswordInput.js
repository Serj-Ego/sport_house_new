import {
  COLORS_DARK_THEME,
  COLORS_FORM,
  COLORS_LIGHT_THEME,
  ERROR,
} from "../../../../../modules/Theme/colors";
import { Input } from "native-base";

export default function PasswordInput({
  password,
  passwordError,
  setPassword,
}) {
  return (
    <Input
      height={55}
      paddingLeft={6}
      paddingRight={6}
      width={"100%"}
      borderRadius={12}
      marginBottom={4}
      variant="filled"
      value={password}
      textAlign={"left"}
      fontWeight={"bold"}
      fontSize={16}
      placeholder={"Пароль..."}
      secureTextEntry={true}
      placeholderTextColor={COLORS_FORM.PLACEHOLDER}
      clearButtonMode="always"
      style={
        passwordError && {
          borderColor: ERROR.FLAT,
          borderStyle: "solid",
          borderWidth: 1,
          borderRadius: 12,
        }
      }
      _focus={{
        borderColor: "rgba(255,255,255,0)",
      }}
      _light={{
        backgroundColor: COLORS_FORM.INPUT,
        color: COLORS_LIGHT_THEME.TEXT,
      }}
      _dark={{
        color: COLORS_DARK_THEME.TEXT,
        backgroundColor: COLORS_FORM.DARK_INPUT,
      }}
      onChangeText={(value) => {
        setPassword(value);
      }}
    />
  );
}
