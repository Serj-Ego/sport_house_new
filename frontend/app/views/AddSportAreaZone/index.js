import DefaultBackground from "../../components/DefaultBackground";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { HEIGHT } from "../../modules/Theme/dimensions";
import { HStack, Image, Text } from "native-base";
import React, { useState } from "react";
import WorkTimeZone from "./components/WorkTimeZone";
import NameZone from "./components/NameZone";
import CoveredZone from "./components/CoveredZone";
import OptionsZone from "./components/OptionsZone";
import PriceZone from "./components/PriceZone";
import SquareZone from "./components/SquareZone";
import { PADDING_LR_MAIN } from "../../modules/Theme/padding";
import { LinearGradient } from "expo-linear-gradient";
import { PRIMARY_GRADIENT } from "../../modules/Theme/colors";
import CoatingZone from "./components/CoatingZone";
import LightingZone from "./components/LightingZone";

export default function AddSportAreaZone() {
  const [zoneName, setZoneName] = useState("");
  const [weekName, setWeekName] = useState([]);
  const [startWorkTime, setStartWorkTime] = useState(
    new Date(2023, 0, 1, 8, 0, 0, 0)
  );
  const [endWorkTime, setEndWorkTime] = useState(
    new Date(2023, 0, 1, 18, 0, 0, 0)
  );
  const [isCovered, setIsCovered] = useState(false);
  const [optionsZone, setOptionsZone] = useState([]);
  const [price, setPrice] = useState("");
  const [square, setSquare] = useState("");
  const [coating, setCoating] = useState("");
  const [lighting, setLighting] = useState("");

  const checkForm = () => {
    let errorText = "";
    if (zoneName.length === 0) {
      errorText = errorText + `\n- Имя`;
    }
    if (weekName.length === 0) {
      errorText = errorText + `\n- Режим работы`;
    }
    if (price.length === 0) {
      errorText = errorText + `\n- Стоимость`;
    }
    return errorText.length > 0 ? errorText : null;
  };
  return (
    <DefaultBackground paddingTop={0} paddingRight={12} paddingLeft={12}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, justifyContent: "center" }}
        keyboardVerticalOffset={120}
      >
        <SafeAreaView style={{ height: "100%" }}>
          <ScrollView contentContainerStyle={{ paddingBottom: 62 }}>
            <Image
              alt={"location"}
              style={{ resizeMode: "contain", alignSelf: "center" }}
              source={require("../../assets/add_sport_area/zone.png")}
              size={HEIGHT / 3}
            />

            <NameZone setZoneName={setZoneName} zoneName={zoneName} />
            <WorkTimeZone
              weekName={weekName}
              setWeekName={setWeekName}
              startWorkTime={startWorkTime}
              endWorkTime={endWorkTime}
              setStartWorkTime={setStartWorkTime}
              setEndWorkTime={setEndWorkTime}
            />
            <PriceZone price={price} setPrice={setPrice} />
            <SquareZone square={square} setSquare={setSquare} />
            <CoatingZone setCoating={setCoating} coating={coating} />
            <LightingZone lighting={lighting} setLighting={setLighting} />
            <CoveredZone isCovered={isCovered} setIsCovered={setIsCovered} />
            <OptionsZone
              optionsZone={optionsZone}
              setOptionsZone={setOptionsZone}
            />
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 34,
          right: 12,
          left: 12,
        }}
        onPress={() => {
          const checkErrors = checkForm();
          if (checkErrors) {
            Alert.alert("Заполните", checkErrors);
          }
        }}
      >
        <LinearGradient
          colors={[PRIMARY_GRADIENT.START, PRIMARY_GRADIENT.END]}
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={{
            minWidth: "100%",
            height: 55,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
            padding: PADDING_LR_MAIN,
          }}
        >
          <HStack space={2}>
            <Text _light={{ color: "white" }} _dark={{ color: "white" }}>
              Сохранить
            </Text>
          </HStack>
        </LinearGradient>
      </TouchableOpacity>
    </DefaultBackground>
  );
}
