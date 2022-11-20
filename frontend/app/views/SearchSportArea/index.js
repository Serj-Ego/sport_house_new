import MapView from "react-native-maps";
import { HEIGHT, WIDTH } from "../../modules/Theme/dimensions";
import React, {
  createContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import DefaultBackground from "../../components/DefaultBackground";
import { useMap } from "./components/hook/useMap";
import { userLocation } from "../../services/redux/slices/baseSlice";
import { useDispatch, useSelector } from "react-redux";
import CustomBottomSheet from "./components/CustomBottomSheet";
import { FastFilterConst } from "../../modules/FastFilterConst";
import {
  sportAreaUserList,
  SportAreaUserListApiRequest,
} from "../../services/redux/slices/sportAreaSlice";
import CustomMarker from "./components/CustomMarker";
import {
  BottomSheetModalProvider,
  useBottomSheetSpringConfigs,
} from "@gorhom/bottom-sheet";
import { useSharedValue } from "react-native-reanimated";
import { View } from "react-native";
import AreaViewBottomSheet from "./components/AreaViewBottomSheet";

export const FilterSportAreaContext = createContext();

export default function SearchSportArea() {
  const stateUserLocation = useSelector(userLocation);
  const [filterType, setFilterType] = useState(FastFilterConst.SPORT_AREA);
  const [selectedLocation, setSelectedLocation] = useState(undefined);
  const state = {
    filterType,
    setFilterType,
    selectedLocation,
    setSelectedLocation,
  };
  const dispatch = useDispatch();
  const stateLocationData = useSelector(sportAreaUserList);
  const {
    mapRef,
    selectedMarker,
    handleNavigateToPoint,
    handelResetInitialPosition,
  } = useMap();

  useEffect(() => {
    dispatch(SportAreaUserListApiRequest());
  }, [filterType]);
  const poiDetailsModalRef = useRef(null);
  const handlePresentLocationDetails = () => {
    requestAnimationFrame(() => poiDetailsModalRef.current?.snapToIndex(0));
  };
  //#region animated variables
  const animatedPOIListIndex = useSharedValue(0);
  const animatedPOIListPosition = useSharedValue(HEIGHT);
  const animatedPOIDetailsIndex = useSharedValue(0);
  const animatedPOIDetailsPosition = useSharedValue(HEIGHT);
  useLayoutEffect(() => {
    requestAnimationFrame(() => poiDetailsModalRef.current?.present());
    // poiDetailsModalRef.current?.collapse();
  }, []);

  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500,
  });

  return (
    <BottomSheetModalProvider>
      <DefaultBackground paddingTop={1} paddingRight={0} paddingLeft={0}>
        <FilterSportAreaContext.Provider value={state}>
          <View style={{ flex: 1 }}>
            <MapView
              ref={mapRef}
              showsUserLocation
              userLocationPriority={"passive"}
              mapType={"terrain"}
              loadingEnabled={true}
              userLocationCalloutEnabled
              showsMyLocationButton
              initialRegion={{
                latitude: stateUserLocation?.latitude,
                longitude: stateUserLocation?.longitude,
                latitudeDelta: 0.2,
                longitudeDelta: 0.1921,
              }}
              style={{ width: WIDTH, height: "100%", flex: 1 }}
            >
              {stateLocationData.map((marker) => (
                <CustomMarker
                  handlePresentLocationDetails={handlePresentLocationDetails}
                  key={marker.id}
                  id={marker.id}
                  selectedMarker={selectedMarker}
                  item={marker}
                  latitude={marker.address.latitude}
                  longitude={marker.address.longitude}
                ></CustomMarker>
              ))}
            </MapView>
            <CustomBottomSheet />
            <AreaViewBottomSheet
              selectedLocation={selectedLocation}
              refBottom={poiDetailsModalRef}
            />
          </View>
        </FilterSportAreaContext.Provider>
      </DefaultBackground>
    </BottomSheetModalProvider>
  );
}
