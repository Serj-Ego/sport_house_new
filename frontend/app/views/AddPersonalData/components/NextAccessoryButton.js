import { WIDTH } from "../../../modules/Theme/dimensions";
import { Keyboard, TouchableOpacity } from "react-native";
import { PADDING_LR_MAIN } from "../../../modules/Theme/padding";
import { LinearGradient } from "expo-linear-gradient";
import { PRIMARY_GRADIENT } from "../../../modules/Theme/colors";
import { HStack, Text } from "native-base";
import { Entypo } from "@expo/vector-icons";

export default function NextAccessoryButton({
  setCurrentSlideIndex,
  currentSlideIndex,
  refSlider,
}) {
  const goNextSlide = () => {
    Keyboard.dismiss();
    const nextSlideIndex = currentSlideIndex + 1;
    const offset = nextSlideIndex * WIDTH;
    refSlider?.current?.scrollToOffset({ offset });
    setCurrentSlideIndex(nextSlideIndex);
    // if (nextSlideIndex === 4) {
    //
    // }
  };
  return (
    <TouchableOpacity
      onPress={goNextSlide}
      //style={{ position: "absolute", bottom: 36, right: PADDING_LR_MAIN }}
    >
      <LinearGradient
        colors={[PRIMARY_GRADIENT.START, PRIMARY_GRADIENT.END]}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={{
          height: 55,
          // borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
          padding: PADDING_LR_MAIN,
        }}
      >
        <HStack space={2}>
          <Text color={"white"}>Далее</Text>
          <Entypo name="chevron-right" size={24} color="white" />
        </HStack>
      </LinearGradient>
    </TouchableOpacity>
  );
}
