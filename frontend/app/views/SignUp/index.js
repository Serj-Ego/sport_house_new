import DefaultBackground from "../../components/DefaultBackground";
import { HEIGHT, WIDTH } from "../../modules/Theme/dimensions";
import { ActivityIndicator, Image } from "react-native";
import Email from "./components/Email";
import LastName from "./components/LastName";
import FirstName from "./components/FirstName";
import Password from "./components/Password";
import RegButton from "./components/RegButton";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { MAIN_ROUTES } from "../../modules/NavigationRoutes/main";
import { useDispatch } from "react-redux";
import { RegistrationUserApiRequest } from "../../services/redux/slices/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RegistrationAs from "./components/RegistrationAs";

export default function SignUp() {
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

  const [role, setRole] = useState("");
  const [roleError, setRoleError] = useState();

  const onRegistration = () => {
    let regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (
      email.length > 0 &&
      regEmail.test(email) &&
      lastName.length > 0 &&
      firstName.length > 0 &&
      password.length > 7 &&
      role.length > 0
    ) {
      setEmailError(false);
      setLastNameError(false);
      setFirstNameError(false);
      setPasswordError(false);
      setLoading(true);
      dispatch(
        RegistrationUserApiRequest({
          email: email,
          last_name: lastName,
          first_name: firstName,
          password: password,
          role: role,
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
      if (lastName.length === 0) {
        setLastNameError(true);
      } else {
        setLastNameError(false);
      }
      if (firstName.length === 0) {
        setFirstNameError(true);
      } else {
        setFirstNameError(false);
      }
      if (password.length < 8) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
      if (role.length < 1) {
        setRoleError(true);
      } else {
        setRoleError(false);
      }
    }
  };
  return (
    <DefaultBackground>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          height: HEIGHT,
        }}
      >
        <Image
          source={require("../../assets/signup/signup_light.png")}
          style={{
            height: "30%",
            width: WIDTH / 1.5,
            resizeMode: "contain",
            alignSelf: "center",
            marginTop: 16,
          }}
        />
        <Email email={email} setEmail={setEmail} emailError={emailError} />
        <LastName
          lastName={lastName}
          setLastName={setLastName}
          lastNameError={lastNameError}
        />
        <FirstName
          firstName={firstName}
          setFirstName={setFirstName}
          firstNameError={firstNameError}
        />
        <Password
          password={password}
          setPassword={setPassword}
          passwordError={passwordError}
        />
        <RegistrationAs role={role} setRole={setRole} roleError={roleError} />
        {loading ? (
          <ActivityIndicator />
        ) : (
          <RegButton onRegistration={onRegistration} />
        )}
      </KeyboardAwareScrollView>
    </DefaultBackground>
  );
}
