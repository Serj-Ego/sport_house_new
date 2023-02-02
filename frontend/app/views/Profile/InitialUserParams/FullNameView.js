import {
  COLOR_ACCENT,
  COLORS_DARK_THEME,
  COLORS_FORM,
  COLORS_LIGHT_THEME,
  ERROR,
  PRIMARY_GRADIENT,
} from "../../../modules/Theme/colors";
import { useMemo, useRef } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { Container, Heading, Icon, Text, View } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function FullNameView({
  firstName,
  lastName,
  setFirstName,
  setLastName,
  setSlide,
  onFinish,
  isLoading,
}) {
  const bottomSheetRef = useRef(null);
  const colorScheme = useColorScheme();
  const snapPoints = useMemo(() => ["50%"], []);
  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      detached={false}
      backgroundStyle={{
        borderRadius: 24,
        backgroundColor:
          colorScheme === "light"
            ? COLORS_LIGHT_THEME.WHITE_BLOCK
            : COLORS_DARK_THEME.DARK_BLOCK,
      }}
      handleIndicatorStyle={{ backgroundColor: "lightgray", width: "12%" }}
    >
      <View style={styles.contentContainer}>
        <Container
          style={{
            backgroundColor: COLOR_ACCENT.ACCENT,
            borderRadius: 100,
            padding: 16,
          }}
        >
          <Icon
            as={Ionicons}
            name={"ios-information-sharp"}
            size={54}
            color={"white"}
            textAlign={"center"}
          />
        </Container>
        <Heading textAlign={"center"} mt={4}>
          Заполните Фамилию и Имя
        </Heading>
        <View mt={4} style={{ width: "100%" }}>
          <BottomSheetTextInput
            value={lastName}
            placeholder={"Фамилия"}
            placeholderTextColor={COLORS_FORM.PLACEHOLDER}
            clearButtonMode="always"
            _light={{
              backgroundColor: COLORS_FORM.INPUT,
              color: COLORS_LIGHT_THEME.TEXT,
            }}
            _dark={{
              color: "white",
              backgroundColor: COLORS_FORM.DARK_INPUT,
            }}
            style={{
              borderColor: lastName.length === 0 && ERROR.FLAT,
              borderRadius: 12,
              paddingHorizontal: 12,
              borderStyle: lastName.length === 0 && "solid",
              borderWidth: lastName.length === 0 && 1,
              width: "100%",
              height: 60,
              fontSize: 16,
              fontWeight: "bold",
              marginBottom: 12,
              color:
                colorScheme === "light" ? COLORS_LIGHT_THEME.TEXT : "white",
              backgroundColor:
                colorScheme === "light"
                  ? COLORS_FORM.INPUT
                  : COLORS_FORM.DARK_INPUT,
            }}
            onChangeText={(value) => {
              setLastName(value);
            }}
          />
          <BottomSheetTextInput
            value={firstName}
            placeholder={"Имя"}
            placeholderTextColor={COLORS_FORM.PLACEHOLDER}
            clearButtonMode="always"
            _light={{
              backgroundColor: COLORS_FORM.INPUT,
              color: COLORS_LIGHT_THEME.TEXT,
            }}
            _dark={{
              color: "white",
              backgroundColor: COLORS_FORM.DARK_INPUT,
            }}
            style={{
              borderColor: firstName.length === 0 && ERROR.FLAT,
              borderRadius: 12,
              paddingHorizontal: 12,
              borderStyle: firstName.length === 0 && "solid",
              borderWidth: firstName.length === 0 && 1,
              width: "100%",
              height: 60,
              fontSize: 16,
              fontWeight: "bold",
              color:
                colorScheme === "light" ? COLORS_LIGHT_THEME.TEXT : "white",
              backgroundColor:
                colorScheme === "light"
                  ? COLORS_FORM.INPUT
                  : COLORS_FORM.DARK_INPUT,
            }}
            onChangeText={(value) => {
              setFirstName(value);
            }}
          />
        </View>
        <View mt={4}>
          <TouchableOpacity
            onPress={onFinish}
            disabled={
              firstName.length === 0 || lastName.length === 0 || isLoading
            }
          >
            <LinearGradient
              colors={[PRIMARY_GRADIENT.END, PRIMARY_GRADIENT.START]}
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={{
                minWidth: "100%",
                height: 60,
                borderRadius: 12,
                alignItems: "center",
                justifyContent: "center",
                padding: 12,
              }}
            >
              {isLoading ? (
                <ActivityIndicator />
              ) : (
                <Text
                  fontSize={"md"}
                  _light={{ color: "white" }}
                  _dark={{ color: "white" }}
                >
                  Далее
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "rgba(44,44,44,0.42)",
  },
  contentContainer: {
    height: "100%",
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
