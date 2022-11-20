import DefaultBackground from "../../components/DefaultBackground";
import Logo from "./components/Logo";
import Form from "./components/Form";
import { HEIGHT } from "../../modules/Theme/dimensions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Login() {
  return (
    <DefaultBackground>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          height: HEIGHT,
        }}
      >
        <Logo />
        <Form />
      </KeyboardAwareScrollView>
    </DefaultBackground>
  );
}
