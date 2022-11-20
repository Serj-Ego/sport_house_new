import { TouchableOpacity } from "react-native";
import { Text } from "native-base";
import { WIDTH } from "../../../modules/Theme/dimensions";
import {
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
} from "../../../modules/Theme/colors";
import { PADDING_LR_MAIN } from "../../../modules/Theme/padding";

export default function SkipButton({ setCurrentSlideIndex, refSlider, data }) {
  const skipSliders = () => {
    const lastSlideIndex = data.length - 1;
    const offset = lastSlideIndex * WIDTH;
    refSlider?.current?.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  };
  return (
    <TouchableOpacity
      onPress={skipSliders}
      style={{ position: "absolute", top: 66, right: PADDING_LR_MAIN }}
    >
      <Text
        _light={{ color: COLORS_LIGHT_THEME.SUBTEXT }}
        _dark={{ color: COLORS_DARK_THEME.SUBTEXT }}
      >
        Пропустить
      </Text>
    </TouchableOpacity>
  );
}
