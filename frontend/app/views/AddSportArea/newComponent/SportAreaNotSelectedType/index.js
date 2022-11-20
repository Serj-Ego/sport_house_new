import { Heading, HStack, Image, Text, View } from "native-base";
import { HEIGHT, WIDTH } from "../../../../modules/Theme/dimensions";
import React from "react";
import { PADDING_LR_MAIN } from "../../../../modules/Theme/padding";
import { LinearGradient } from "expo-linear-gradient";
import { PRIMARY_GRADIENT } from "../../../../modules/Theme/colors";
import { TouchableOpacity } from "react-native";

export default function SportAreaNotSelectedType({
  refSlider,
  setCurrentSlideIndex,
}) {
  const goBackSlide = () => {
    const backSlideIndex = 0;
    const offset = backSlideIndex * WIDTH;
    refSlider?.current?.scrollToOffset({ offset });
    setCurrentSlideIndex(backSlideIndex);
  };
  return (
    <View justifyContent={"space-around"}>
      <Image
        alt={"location"}
        style={{ resizeMode: "contain", alignSelf: "center" }}
        source={require("../../../../assets/add_sport_area/warning.png")}
        size={HEIGHT / 4}
      />
      <View style={{ width: WIDTH, paddingHorizontal: 12 }}>
        <Heading>Не выбран тип спортивного объекта</Heading>
        <TouchableOpacity onPress={goBackSlide}>
          <LinearGradient
            colors={[PRIMARY_GRADIENT.START, PRIMARY_GRADIENT.END]}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={{
              minWidth: "100%",
              height: 56,
              marginTop: 24,
              borderRadius: 12,
              alignItems: "center",
              justifyContent: "center",
              padding: PADDING_LR_MAIN,
            }}
          >
            <HStack space={2}>
              <Text _light={{ color: "white" }} _dark={{ color: "white" }}>
                Указать
              </Text>
            </HStack>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}
