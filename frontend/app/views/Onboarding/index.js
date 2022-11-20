import { FlatList, useColorScheme } from "react-native";
import { useMemo, useRef, useState } from "react";
import { OnboardingLightData } from "./Data/OnboardingLightData";
import { HEIGHT, WIDTH } from "../../modules/Theme/dimensions";
import Slide from "./components/slide";
import {
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
} from "../../modules/Theme/colors";
import { Box } from "native-base";
import { OnboardingDarkData } from "./Data/OnboardingDarkData";
import NextButton from "./components/NextButton";
import FinishButton from "./components/FinishButton";
import SkipButton from "./components/SkipButton";

export default function Onboarding() {
  const refSlider = useRef(null);
  const colorScheme = useColorScheme();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const updateCurrentSlideIndex = (e) => {
    const currentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(currentOffsetX / WIDTH);
    setCurrentSlideIndex(currentIndex);
  };

  const data = useMemo(() => {
    if (colorScheme === "light") {
      return OnboardingLightData;
    } else {
      return OnboardingDarkData;
    }
  }, [colorScheme]);
  return (
    <Box
      _light={{
        backgroundColor: COLORS_LIGHT_THEME.BACKGROUND,
      }}
      _dark={{
        backgroundColor: COLORS_DARK_THEME.BACKGROUND,
      }}
      style={{
        flex: 1,
      }}
    >
      <FlatList
        ref={refSlider}
        pagingEnabled
        data={data}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{ height: HEIGHT }}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item }) => <Slide item={item} />}
      />
      {currentSlideIndex === data.length - 1 ? (
        <FinishButton />
      ) : (
        <>
          <SkipButton
            refSlider={refSlider}
            setCurrentSlideIndex={setCurrentSlideIndex}
            data={data}
          />
          <NextButton
            setCurrentSlideIndex={setCurrentSlideIndex}
            currentSlideIndex={currentSlideIndex}
            refSlider={refSlider}
          />
        </>
      )}
    </Box>
  );
}
