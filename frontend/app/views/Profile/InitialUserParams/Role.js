import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { WIDTH } from "../../../modules/Theme/dimensions";
import { Heading, HStack, Text } from "native-base";
import Animated, {
  FadeInDown,
  FadeInUp,
  Layout,
} from "react-native-reanimated";
import RoleItem from "./RoleItem";
import { RoleConst } from "../../../modules/RoleConst";
import { LinearGradient } from "expo-linear-gradient";
import { PRIMARY_GRADIENT } from "../../../modules/Theme/colors";
import { PADDING_LR_MAIN } from "../../../modules/Theme/padding";
import BottomSheet from "@gorhom/bottom-sheet";
import { useMemo, useRef } from "react";

export default function Role({ role, setRole }) {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["75%"], [role]);
  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={role ? ["75%"] : ["60%"]}
      // add bottom inset to elevate the sheet
      bottomInset={46}
      detached={true}
      style={styles.sheetContainer}
      backgroundStyle={{ borderRadius: 24 }}
      handleIndicatorStyle={{ backgroundColor: "lightgray", width: "12%" }}
    >
      <View justifyContent={"space-between"} style={{ paddingHorizontal: 12 }}>
        <Image
          source={require("../../../assets/adduserrole.png")}
          style={{
            height: "40%",
            width: WIDTH,
            resizeMode: "contain",
            alignSelf: "center",
            marginTop: 24,
          }}
        />
        <Heading textAlign={"left"}>Укажите роль:</Heading>
        <Animated.View layout={Layout} entering={FadeInDown}>
          <RoleItem
            role={role}
            setRole={setRole}
            roleName={RoleConst.SPORTSMAN}
          />
          <RoleItem
            role={role}
            setRole={setRole}
            roleName={RoleConst.TRAINER}
          />
          <RoleItem
            role={role}
            setRole={setRole}
            roleName={RoleConst.SPORT_AREA}
          />
          {role && (
            <Animated.View layout={Layout} entering={FadeInUp}>
              <TouchableOpacity>
                <LinearGradient
                  colors={[PRIMARY_GRADIENT.START, PRIMARY_GRADIENT.END]}
                  start={{ x: 1, y: 1 }}
                  end={{ x: 0, y: 0 }}
                  style={{
                    width: "100%",
                    height: 55,
                    borderRadius: 12,
                    alignItems: "center",
                    justifyContent: "center",
                    padding: PADDING_LR_MAIN,
                    marginVertical: 6,
                  }}
                >
                  <HStack space={2}>
                    <Text
                      _light={{ color: "white" }}
                      _dark={{ color: "white" }}
                      fontWeight={"extrabold"}
                    >
                      Далее
                    </Text>
                  </HStack>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          )}
        </Animated.View>
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
  sheetContainer: {
    marginHorizontal: 12,
  },
  contentContainer: {
    alignItems: "center",
  },
});
