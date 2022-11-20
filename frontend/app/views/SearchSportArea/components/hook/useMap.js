import { useCallback, useRef, useState } from "react";
import { userLocation } from "../../../../services/redux/slices/baseSlice";
import { useSelector } from "react-redux";

const DEVIATION = 0.0002;

export function useMap() {
  const mapRef = useRef(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const stateUserLocation = useSelector(userLocation);
  const handleNavigateToPoint = useCallback(
    (id, lat, long) => {
      if (mapRef) {
        mapRef.current.animateCamera(
          {
            center: {
              latitude: lat - DEVIATION,
              longitude: long,
            },
            altitude: 1500,
          },
          500
        );
      }
      setSelectedMarker(id);
    },
    [mapRef, setSelectedMarker]
  );

  const handelResetInitialPosition = useCallback(() => {
    if (mapRef) {
      mapRef.current.animateToRegion(
        {
          latitude: stateUserLocation.latitude,
          longitude: stateUserLocation.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1921,
        },
        500
      );
      setSelectedMarker(null);
    }
  }, [mapRef, setSelectedMarker]);

  return {
    mapRef,
    selectedMarker,
    handleNavigateToPoint,
    handelResetInitialPosition,
  };
}
