import DefaultBackground from "../../components/DefaultBackground";
import { FlatList, KeyboardAvoidingView, SafeAreaView } from "react-native";
import React, { useRef, useState } from "react";
import ButtonControlSlider from "./newComponent/ButtonControlSlider/ButtonControlSlider";
import { WIDTH } from "../../modules/Theme/dimensions";
import SportAreaName from "./newComponent/SportAreaName";
import SportAreaPhoto from "./newComponent/SportAreaPhoto";
import SportAreaAddress from "./newComponent/SportAreaAddress";
import SportAreaWorkTime from "./newComponent/SportAreaWorkTime";
import SportAreaPrice from "./newComponent/SportAreaPrice";
import SportAreaSquad from "./newComponent/SportAreaSquad";
import SportAreaFlatLight from "./newComponent/SportAreaFlatLight";
import SportAreaCategory from "./newComponent/SportAreaCategory";
import SportAreaSportType from "./newComponent/SportAreaSportType";
import SportAreaCovered from "./newComponent/SportAreaCovered";
import SportAreaOptions from "./newComponent/SportAreaOptions";
import SportAreaContacts from "./newComponent/SportAreaContacts";
import SportAreaKeyWords from "./newComponent/SportAreaKeyWords";

export default function AddSportArea() {
  const refSlider = useRef(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const updateCurrentSlideIndex = (e) => {
    const currentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(currentOffsetX / WIDTH);
    setCurrentSlideIndex(currentIndex);
  };

  const AddSportAreaSliders = [
    { component: <SportAreaName /> },
    { component: <SportAreaPhoto /> },
    { component: <SportAreaAddress /> },
    { component: <SportAreaWorkTime /> },
    { component: <SportAreaPrice /> },
    { component: <SportAreaSquad /> },
    { component: <SportAreaFlatLight /> },
    { component: <SportAreaCategory /> },
    { component: <SportAreaSportType /> },
    { component: <SportAreaCovered /> },
    { component: <SportAreaOptions /> },
    { component: <SportAreaContacts /> },
    { component: <SportAreaKeyWords /> },
  ];
  return (
    <DefaultBackground paddingTop={0} paddingRight={0} paddingLeft={0}>
      <SafeAreaView style={{ height: "100%" }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "position" : "height"}
          style={{ flex: 1, justifyContent: "center" }}
          keyboardVerticalOffset={80}
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
