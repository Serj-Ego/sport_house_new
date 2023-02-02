import {
  COLORS_DARK_THEME,
  COLORS_FORM,
  COLORS_LIGHT_THEME,
  ERROR,
} from "../../../../../modules/Theme/colors";
import { Input } from "native-base";

export default function EmailInput({ emailError, email, setEmail }) {
  return (
    <Input
      height={55}
      marginBottom={4}
      width={"100%"}
      borderRadius={12}
      variant="filled"
      value={email}
      textAlign={"left"}
      fontWeight={"bold"}
      fontSize={16}
      autoCapitalize="none"
      placeholder={"E-mail..."}
      placeholderTextColor={COLORS_FORM.PLACEHOLDER}
      clearButtonMode="always"
      _focus={{
        borderColor: "rgba(255,255,255,0)",
      }}
      paddingLeft={6}
      paddingRight={6}
      style={
        emailError && {
          borderColor: ERROR.FLAT,
          borderStyle: "solid",
          borderWidth: 1,
          borderRadius: 12,
        }
      }
      _light={{
        backgroundColor: COLORS_FORM.INPUT,
        color: COLORS_LIGHT_THEME.TEXT,
      }}
      _dark={{
        color: COLORS_DARK_THEME.TEXT,
        backgroundColor: COLORS_FORM.DARK_INPUT,
      }}
      onChangeText={(value) => {
        setEmail(value);
      }}
    />
  );
}
