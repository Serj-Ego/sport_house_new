import React from "react";
import { useSelector } from "react-redux";
import { userLocation } from "../../../services/redux/slices/baseSlice";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import HeaderInfo from "./LocationDetails/HeaderInfo";
import ActionButtons from "./LocationDetails/ActionButtons";
import CheckInToLocation from "./LocationDetails/components/CheckInToLocation";
import ShortInfoLocation from "./LocationDetails/ShortInfoLocation";
import ImageList from "./LocationDetails/ImageList";
import AboutLocation from "./LocationDetails/AboutLocation";
import MoreInfoLocation from "./LocationDetails/MoreInfoLocation";
import AdditionalButtons from "./LocationDetails/AdditionalButtons";

export default function LocationDetails({ selectedLocation, refBottom }) {
  const stateUserLocation = useSelector(userLocation);

  return (
    <>
      <HeaderInfo selectedLocation={selectedLocation} refBottom={refBottom} />
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        // stickyHeaderIndices={[0]}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      >
        <ActionButtons selectedLocation={selectedLocation} />
        <CheckInToLocation selectedLocation={selectedLocation} />
        <ShortInfoLocation
          selectedLocation={selectedLocation}
          stateUserLocation={stateUserLocation}
        />
        <ImageList selectedLocation={selectedLocation} />
        <AboutLocation selectedLocation={selectedLocation} />
        <MoreInfoLocation selectedLocation={selectedLocation} />
        <AdditionalButtons />
      </BottomSheetScrollView>
    </>
  );
}
