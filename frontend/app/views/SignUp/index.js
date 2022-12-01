import DefaultBackground from "../../components/DefaultBackground";
import { WIDTH } from "../../modules/Theme/dimensions";
import { ActivityIndicator, Image, KeyboardAvoidingView } from "react-native";
import Email from "./components/Email";
import Password from "./components/Password";
import RegButton from "./components/RegButton";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { MAIN_ROUTES } from "../../modules/NavigationRoutes/main";
import { useDispatch } from "react-redux";
import { RegistrationUserApiRequest } from "../../services/redux/slices/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";

export default function SignUp({ route }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState();

  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState();

  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState();

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState();

  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [passwordRepeatError, setPasswordRepeatError] = useState();

  const onRegistration = () => {
    let regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (
      email.length > 0 &&
      regEmail.test(email) &&
      // lastName.length > 0 &&
      // firstName.length > 0 &&
      password.length > 7 &&
      password === passwordRepeat
    ) {
      setEmailError(false);
      // setLastNameError(false);
      // setFirstNameError(false);
      setPasswordError(false);
      setLoading(true);
      dispatch(
        RegistrationUserApiRequest({
          email: email,
          // last_name: lastName,
          // first_name: firstName,
          password: password,
          role: route.params.role,
        })
      )
        .then(unwrapResult)
        .then((res) => {
          navigation.navigate(MAIN_ROUTES.CONFIRMED_SIGNUP);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      if (email.length === 0 || !regEmail.test(email)) {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
      if (password.length < 8) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
      if (password !== passwordRepeat) {
        setPasswordRepeatError(true);
        setPasswordError(true);
      } else {
        setPasswordRepeatError(false);
        setPasswordError(false);
      }
    }
  };
  return (
    <DefaultBackground>
      <KeyboardAvoidingView
        behavior={"padding"}
        keyboardVerticalOffset={120}
        style={{ flex: 1, justifyContent: "center" }}
      >
        <Image
          source={require("../../assets/signup/signup_light.png")}
          style={{
            height: "40%",
            width: WIDTH / 1.5,
            resizeMode: "contain",
            alignSelf: "center",
            marginTop: 16,
          }}
        />
        <Email email={email} setEmail={setEmail} emailError={emailError} />
        {/*<LastName*/}
        {/*  lastName={lastName}*/}
        {/*  setLastName={setLastName}*/}
        {/*  lastNameError={lastNameError}*/}
        {/*/>*/}
        {/*<FirstName*/}
        {/*  firstName={firstName}*/}
        {/*  setFirstName={setFirstName}*/}
        {/*  firstNameError={firstNameError}*/}
        {/*/>*/}
        <Password
          password={password}
          setPassword={setPassword}
          passwordError={passwordError}
        />
        <Password
          password={passwordRepeat}
          setPassword={setPasswordRepeat}
          passwordError={passwordRepeatError}
          placeholder={"Подтверждение пароля"}
        />
        {/*<RegistrationAs role={role} setRole={setRole} roleError={roleError} />*/}
        {loading ? (
          <ActivityIndicator />
        ) : (
          <RegButton onRegistration={onRegistration} loading={loading} />
        )}
      </KeyboardAvoidingView>
    </DefaultBackground>
  );
}
