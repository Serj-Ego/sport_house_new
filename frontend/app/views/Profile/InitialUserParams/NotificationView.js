import {
  ActionSheetIOS,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { Container, Heading, Icon, Text, View } from "native-base";
import { useMemo, useRef } from "react";
import {
  COLOR_ACCENT,
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
  PRIMARY_GRADIENT,
} from "../../../modules/Theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { registerForPushNotificationsAsync } from "../../../modules/registerForPushNotificationsAsync";

export default function NotificationView({ setNotificationToken, setSlide }) {
  const bottomSheetRef = useRef(null);
  const colorScheme = useColorScheme();
  const snapPoints = useMemo(() => ["45%"], []);
  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
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
            name={"ios-notifications"}
            size={54}
            color={"white"}
            textAlign={"center"}
          />
        </Container>
        <Heading textAlign={"center"} mt={4}>
          Разрешить отправлять уведомления
        </Heading>
        <View mt={4}>
          <TouchableOpacity
            onPress={async () => {
              const token = await registerForPushNotificationsAsync();
              setNotificationToken(token);
              setSlide("full_name");
            }}
          >
            <LinearGradient
              colors={[PRIMARY_GRADIENT.END, PRIMARY_GRADIENT.START]}
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={{
                minWidth: "100%",
                height: 55,
                borderRadius: 12,
                alignItems: "center",
                justifyContent: "center",
                padding: 12,
              }}
            >
              <Text
                fontSize={"md"}
                _light={{ color: "white" }}
                _dark={{ color: "white" }}
              >
                Разрешить
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              ActionSheetIOS.showActionSheetWithOptions(
                {
                  options: ["Отмена", "Не разрешать"],
                  destructiveButtonIndex: 1,
                  cancelButtonIndex: 0,
                  title: "Вы действительно хотите отключить уведомления?",
                },
                (buttonIndex) => {
                  if (buttonIndex === 0) {
                  }
                  if (buttonIndex === 1) {
                    setSlide("full_name");
                  }
                }
              );
            }}
          >
            <LinearGradient
              colors={["#eaeaea", "#eaeaea"]}
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={{
                minWidth: "100%",
                height: 56,
                borderRadius: 12,
                alignItems: "center",
                justifyContent: "center",
                padding: 12,
                marginTop: 12,
              }}
            >
              <Text
                fontSize={"md"}
                _light={{ color: "black" }}
                _dark={{ color: "black" }}
              >
                Не разрешать
              </Text>
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
