import DefaultBackground from "../../components/DefaultBackground";
import Logo from "./components/Logo";
import Form from "./components/Form";
import { KeyboardAvoidingView } from "react-native";

export default function Login() {
  return (
    <DefaultBackground>
      <KeyboardAvoidingView
        behavior={"padding"}
        keyboardVerticalOffset={120}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Logo />
        <Form />
      </KeyboardAvoidingView>
    </DefaultBackground>
  );
}
