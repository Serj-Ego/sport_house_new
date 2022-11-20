import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React from "react";
import LocationDetailsHandle from "./LocationDetailsHandle";
import LocationDetails from "./LocationDetails";
import { useColorScheme } from "react-native";
import BlurredBackground from "./BlurredBackground";

export default function AreaViewBottomSheet({ selectedLocation, refBottom }) {
  const colorScheme = useColorScheme();
  return (
    <BottomSheetModal
      ref={refBottom}
      key="PoiDetailsSheet"
      name="PoiDetailsSheet"
      snapPoints={["35%", "90%"]}
      stackBehavior={"push"}
      handleComponent={LocationDetailsHandle}
      backgroundComponent={BlurredBackground}
      index={-1}
      onDismiss={() => {
        refBottom.current?.present();
      }}
    >
      <LocationDetails
        selectedLocation={selectedLocation}
        refBottom={refBottom}
      />
    </BottomSheetModal>
  );
}
