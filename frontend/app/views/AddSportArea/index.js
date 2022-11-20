import DefaultBackground from "../../components/DefaultBackground";
import {
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  useColorScheme,
} from "react-native";
import React, { useContext, useRef, useState } from "react";
import ButtonControlSlider from "./newComponent/ButtonControlSlider/ButtonControlSlider";
import SportAreaType from "./newComponent/SportAreaType";
import { WIDTH } from "../../modules/Theme/dimensions";
import SportAreaName from "./newComponent/SportAreaName";
import SportAreaPhoto from "./newComponent/SportAreaPhoto";
import SportAreaAddress from "./newComponent/SportAreaAddress";
import { addSportAreaContext } from "../../navigation/AdditionalStack";
import SportAreaNotSelectedType from "./newComponent/SportAreaNotSelectedType";
import ComplexSportAreaSportZones from "./newComponent/ComplexSportAreaSportZones";

export default function AddSportArea() {
  const colorScheme = useColorScheme();
  const refSlider = useRef(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const { sportAreaType } = useContext(addSportAreaContext);
  const updateCurrentSlideIndex = (e) => {
    const currentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(currentOffsetX / WIDTH);
    setCurrentSlideIndex(currentIndex);
  };
  const ComplexSportAreaSliders = [
    { component: <ComplexSportAreaSportZones /> },
  ];
  const BuildingSportAreaSliders = [];
  const AddSportAreaSliders = [
    ...[
      { component: <SportAreaType /> },
      { component: <SportAreaName /> },
      { component: <SportAreaPhoto /> },
      { component: <SportAreaAddress /> },
      // { component: <SportAreaCovered /> },
    ],
    ...(sportAreaType
      ? sportAreaType === "Комплекс"
        ? ComplexSportAreaSliders
        : BuildingSportAreaSliders
      : [
          {
            component: (
              <SportAreaNotSelectedType
                refSlider={refSlider}
                setCurrentSlideIndex={setCurrentSlideIndex}
              />
            ),
          },
        ]),
  ];
  return (
    <DefaultBackground paddingTop={0} paddingRight={0} paddingLeft={0}>
      <SafeAreaView style={{ height: "100%" }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "position" : "height"}
          style={{ flex: 1, justifyContent: "center" }}
        >
          <FlatList
            ref={refSlider}
            pagingEnabled
            data={AddSportAreaSliders}
            onMomentumScrollEnd={updateCurrentSlideIndex}
            contentContainerStyle={{
              width: WIDTH * AddSportAreaSliders.length,
            }}
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={({ item }) => item.component}
          />
        </KeyboardAvoidingView>
        <ButtonControlSlider
          refSlider={refSlider}
          currentSlideIndex={currentSlideIndex}
          setCurrentSlideIndex={setCurrentSlideIndex}
          sliders={AddSportAreaSliders}
        />
      </SafeAreaView>
    </DefaultBackground>
  );
}
