import DefaultBackground from "../../components/DefaultBackground";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { addSportAreaContext } from "../../navigation/AdditionalStack";
import MapView, { Marker } from "react-native-maps";
import { WIDTH } from "../../modules/Theme/dimensions";
import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
} from "react-native";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { Box, Text } from "native-base";
import {
  COLOR_ACCENT,
  COLORS_DARK_THEME,
  COLORS_FORM,
  COLORS_LIGHT_THEME,
} from "../../modules/Theme/colors";
import { suggestionSearchFetch } from "../../modules/SuggestionSearch";
import { Ionicons } from "@expo/vector-icons";

export default function SelectAddressMap({ navigation }) {
  const { setAddress } = useContext(addSportAreaContext);
  const [coordinate, setCoordinate] = useState({
    latitude: 55.75321,
    longitude: 37.619055,
  });
  const mapRef = useRef();
  const getAddress = async (coord) => {
    let item = await mapRef.current.addressForCoordinate(coord);
    item["latitude"] = coord.latitude;
    item["longitude"] = coord.longitude;
    setAddress(item);
    navigation.goBack();
  };

  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["15%", "25%", "50%", "75%"], []);

  const colorScheme = useColorScheme();
  const [searchData, setSearchData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const data = suggestionSearchFetch(searchValue);
    data.then((res) => {
      if (res) {
        setSearchData(res);
        setIsLoading(false);
      }
    });
    if (searchValue.length === 0) {
      setIsLoading(false);
    }
  }, [searchValue]);
  return (
    <DefaultBackground paddingTop={1} paddingRight={0} paddingLeft={0}>
      <MapView
        ref={mapRef}
        showsUserLocation
        userLocationPriority={"passive"}
        userLocationCalloutEnabled
        showsMyLocationButton
        initialRegion={{
          latitude: 55.75321,
          longitude: 37.619055,
          latitudeDelta: 0.2,
          longitudeDelta: 0.1921,
        }}
        style={{ width: WIDTH, height: "100%", flex: 1 }}
      >
        <Marker
          key={1}
          onDragEnd={(e) => setCoordinate(e.nativeEvent.coordinate)}
          coordinate={coordinate}
          draggable={true}
          isPreselected={true}
        />
      </MapView>
      <TouchableWithoutFeedback
        onPress={() => {
          getAddress(coordinate);
        }}
      >
        <Ionicons
          style={{
            position: "absolute",
            borderRadius: 100,
            top: 10,
            left: 10,
          }}
          name="ios-checkmark-circle-outline"
          color={COLOR_ACCENT.ACCENT}
          size={55}
        />
      </TouchableWithoutFeedback>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        keyboardBehavior="fillParent"
        style={{ padding: 12 }}
      >
        <BottomSheetTextInput
          value={searchValue}
          clearButtonMode={"always"}
          placeholder={"Поиск"}
          style={{
            marginTop: 8,
            marginBottom: 10,
            borderRadius: 10,
            fontSize: 16,
            lineHeight: 20,
            padding: 8,
            height: 55,
            color:
              colorScheme === "light"
                ? COLORS_LIGHT_THEME.TEXT
                : COLORS_DARK_THEME.TEXT,
            backgroundColor:
              colorScheme === "light"
                ? COLORS_FORM.INPUT
                : COLORS_FORM.DARK_INPUT,
          }}
          onChangeText={(value) => {
            setSearchValue(value);
            setIsLoading(true);
          }}
        />
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <BottomSheetFlatList
            contentContainerStyle={{ paddingBottom: 50 }}
            data={searchData}
            keyExtractor={(i) => i}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  key={index + 32}
                  onPress={() => {
                    setSearchValue(item.GeoObject.name);
                    const point = item.GeoObject.Point.pos.split(" ");
                    setCoordinate({
                      latitude: point[1],
                      longitude: point[0],
                    });
                    bottomSheetRef.current?.snapToIndex(1);
                  }}
                >
                  <Box
                    key={index + 30}
                    style={{
                      height: 50,
                      padding: 5,
                      width: "100%",
                      justifyContent: "center",
                      borderStyle: "solid",
                      borderColor: COLORS_FORM.INPUT,
                      borderBottomWidth: 1,
                    }}
                  >
                    <Text
                      key={index + 20}
                      fontWeight={"semibold"}
                      fontSize={16}
                      _light={{
                        color: COLORS_LIGHT_THEME.TEXT,
                      }}
                      _dark={{
                        color: COLORS_DARK_THEME.TEXT,
                      }}
                    >
                      {item.GeoObject.name}
                    </Text>
                    <Text color={"gray.500"} width={"100%"}>
                      {item.GeoObject.description}
                    </Text>
                  </Box>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </BottomSheet>
    </DefaultBackground>
  );
}
