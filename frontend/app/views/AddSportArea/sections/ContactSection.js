import { Box, Divider, View } from "native-base";
import { HEIGHT, WIDTH } from "../../../modules/Theme/dimensions";
import { PADDING_LR_MAIN } from "../../../modules/Theme/padding";
import SectionHeader from "../components/SectionHeader";
import AddPhoneNumberForConfirm from "../components/AddPhoneNumberForConfirm";
import AddPhoneNumber from "../components/AddPhoneNumber";
import AddAdditionalPhoneNumber from "../components/AddAdditionalPhoneNumber";
import AddEmail from "../components/AddEmail";
import AddAdditionalEmail from "../components/AddAdditionalEmail";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function ContactSection() {
  return (
    <View
      style={{
        width: WIDTH - PADDING_LR_MAIN - PADDING_LR_MAIN,
        height: HEIGHT,
      }}
    >
      <SectionHeader
        header={"Контактные данные"}
        description={
          "Укажите контакные данные вашей площадки для пользователей"
        }
        image={require("../../../assets/add_sport_area/contacts.png")}
      />
      <Box style={{ height: HEIGHT / 2 }}>
        <KeyboardAwareScrollView>
          <AddPhoneNumberForConfirm />
          <Divider marginBottom={2} />
          <AddPhoneNumber />
          <AddAdditionalPhoneNumber />
          <Divider marginBottom={2} />
          <AddEmail />
          <AddAdditionalEmail />
        </KeyboardAwareScrollView>
      </Box>
    </View>
  );
}
