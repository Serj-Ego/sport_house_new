import AddImages from "../components/AddImages";
import { Divider } from "native-base";
import AddName from "../components/AddName";
import AddDescription from "../components/AddDescription";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function MainSection() {
  return (
    <KeyboardAwareScrollView
      extraScrollHeight={65}
      contentContainerStyle={{ height: "100%" }}
    >
      <AddImages />
      <Divider style={{ marginTop: 16, marginBottom: 16 }} />
      <AddName />
      <AddDescription />
    </KeyboardAwareScrollView>
  );
}
