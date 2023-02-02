import DefaultBackground from "../../components/DefaultBackground";
import React from "react";
import UserAvatar from "./components/UserAvatar";
import UserSettingsForm from "./components/form";
import { ScrollView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Settings() {
  return (
    <DefaultBackground paddingTop={16}>
      <ScrollView>
        <UserAvatar />
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <UserSettingsForm />
        </KeyboardAwareScrollView>
      </ScrollView>
    </DefaultBackground>
  );
}
