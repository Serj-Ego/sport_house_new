import { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { COLOR_ACCENT } from "../../../modules/Theme/colors";
import { useContext } from "react";
import { FilterSportAreaContext } from "../index";

export default function CustomMarker({
  id,
  selectedMarker,
  item,
  latitude,
  longitude,
  handlePresentLocationDetails,
}) {
  const { setSelectedLocation } = useContext(FilterSportAreaContext);
  return (
    <Marker
      coordinate={{ latitude: latitude, longitude: longitude }}
      onPress={(v) => {
        setSelectedLocation(item);
        handlePresentLocationDetails();
      }}
      title={item.name}
      description={item.description}
      anchor={{ x: 0, y: 1 }}
    >
      <View style={styles.markerWrapper}>
        <View
          style={[
            styles.marker,
            {
              backgroundColor: COLOR_ACCENT.ACCENT,
            },
          ]}
        ></View>
      </View>
    </Marker>
  );
}

const styles = StyleSheet.create({
  markerWrapper: {
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    height: 22,
    width: 22,
    borderRadius: 20,
    borderColor: "white",
    borderWidth: 3,
  },
});
