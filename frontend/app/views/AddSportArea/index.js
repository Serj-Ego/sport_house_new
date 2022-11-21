import DefaultBackground from "../../components/DefaultBackground";
import { FlatList, KeyboardAvoidingView, SafeAreaView } from "react-native";
import React, { useRef, useState } from "react";
import ButtonControlSlider from "./components/ButtonControlSlider/ButtonControlSlider";
import { WIDTH } from "../../modules/Theme/dimensions";
import SportAreaName from "./components/SportAreaName";
import SportAreaPhoto from "./components/SportAreaPhoto";
import SportAreaAddress from "./components/SportAreaAddress";
import SportAreaWorkTime from "./components/SportAreaWorkTime";
import SportAreaPrice from "./components/SportAreaPrice";
import SportAreaSquad from "./components/SportAreaSquad";
import SportAreaFlatLight from "./components/SportAreaFlatLight";
import SportAreaCategory from "./components/SportAreaCategory";
import SportAreaSportType from "./components/SportAreaSportType";
import SportAreaCovered from "./components/SportAreaCovered";
import SportAreaOptions from "./components/SportAreaOptions";
import SportAreaContacts from "./components/SportAreaContacts";
import SportAreaKeyWords from "./components/SportAreaKeyWords";

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
