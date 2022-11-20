import { LinearGradient } from "expo-linear-gradient";
import { HStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { PADDING_LR_MAIN } from "../../../modules/Theme/padding";
import { WIDTH } from "../../../modules/Theme/dimensions";
import { PRIMARY_GRADIENT } from "../../../modules/Theme/colors";

export default function NextButton({
  currentSlideIndex,
  setCurrentSlideIndex,
  refSlider,
}) {
  const goNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    const offset = nextSlideIndex * WIDTH;
    refSlider?.current?.scrollToOffset({ offset });
    setCurrentSlideIndex(nextSlideIndex);
  };
  return (
    <TouchableOpacity
      onPress={goNextSlide}
      style={{ position: "absolute", bottom: 36, right: PADDING_LR_MAIN }}
    >
      <LinearGradient
        colors={[PRIMARY_GRADIENT.START, PRIMARY_GRADIENT.END]}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={{
          height: 56,
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
          padding: PADDING_LR_MAIN,
        }}
      >
        <HStack space={2}>
          <Entypo name="chevron-right" size={24} color="white" />
        </HStack>
      </LinearGradient>
    </TouchableOpacity>
  );
}
