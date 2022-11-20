import {
  COLORS_DARK_THEME,
  COLORS_FORM,
  COLORS_LIGHT_THEME,
  ERROR,
} from "../../../modules/Theme/colors";
import { Input, Text } from "native-base";

export default function Password({ password, passwordError, setPassword }) {
  return (
    <>
      <Input
        height={55}
        marginBottom={4}
        width={"100%"}
        borderRadius={12}
        variant="filled"
        value={password}
        textAlign={"left"}
        fontWeight={"bold"}
        fontSize={16}
        secureTextEntry={true}
        placeholder={"Пароль"}
        placeholderTextColor={COLORS_FORM.PLACEHOLDER}
        clearButtonMode="always"
        _focus={{
          borderColor: "rgba(255,255,255,0)",
        }}
        paddingLeft={6}
        paddingRight={6}
        style={
          passwordError && {
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
          setPassword(value);
        }}
      />
      {passwordError && (
        <Text marginBottom={4} textAlign={"center"} color={ERROR.FLAT}>
          Пароль должен состоять минимум из 8 символов
        </Text>
      )}
    </>
  );
}
