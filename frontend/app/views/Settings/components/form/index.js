import LastNameInput from "./LastNameInput";
import FirstNameInput from "./FirstNameInput";
import SubmitButton from "./SubmitButton";
import { useSelector } from "react-redux";
import { userInfoData } from "../../../../services/redux/slices/userSlice";
import React, { useState } from "react";
import EmailInput from "./EmailInput";
import UsernameInput from "./UsernameInput";
import { Divider, Heading } from "native-base";
import PasswordInput from "./PasswordInput";
import OldPasswordInput from "./OldPasswordInput";
import { COLORS_FORM } from "../../../../modules/Theme/colors";
import SubmitChangePasswordButton from "./SubmitChangePasswordButton";
import { View } from "react-native";

export default function UserSettingsForm() {
  const userDataState = useSelector(userInfoData);
  const [lastName, setLastName] = useState(userDataState.last_name);
  const [firstName, setFirstName] = useState(userDataState.first_name);
  const [email, setEmail] = useState(userDataState.email);
  const [username, setUsername] = useState(userDataState.username);
  const [password, setPassword] = useState(null);
  const [oldPassword, setOldPassword] = useState(null);
  return (
    <View style={{ paddingBottom: 50 }}>
      <LastNameInput lastName={lastName} setLastName={setLastName} />
      <FirstNameInput firstName={firstName} setFirstName={setFirstName} />
      <EmailInput email={email} setEmail={setEmail} />
      <UsernameInput username={username} setUsername={setUsername} />
      <SubmitButton
        data={{
          last_name: lastName,
          first_name: firstName,
          email: email,
          username: username,
        }}
      />
      <Divider style={{ marginBottom: 16, marginTop: 16 }} />
      <Heading
        size={"sm"}
        style={{ marginBottom: 5 }}
        _light={{ color: COLORS_FORM.LABEL }}
        _dark={{ color: COLORS_FORM.LABEL }}
      >
        Изменить пароль
      </Heading>
      <OldPasswordInput
        oldPassword={oldPassword}
        setOldPassword={setOldPassword}
      />
      <PasswordInput password={password} setPassword={setPassword} />
      <SubmitChangePasswordButton
        data={{ password: password, old_password: oldPassword }}
        setOldPassword={setOldPassword}
        setPassword={setPassword}
      />
    </View>
  );
}
