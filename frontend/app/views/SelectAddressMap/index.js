import DefaultBackground from "../../components/DefaultBackground";
import React, { useContext, useMemo, useRef, useState } from "react";
import { addSportAreaContext } from "../../navigation/AdditionalStack";
import MapView, { Marker } from "react-native-maps";
import { WIDTH } from "../../modules/Theme/dimensions";
import { useColorScheme } from "react-native";

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
  const [searchData, setSearchData] = useState({ suggestions: [] });
  return (
    <DefaultBackground paddingTop={1} paddingRight={0} paddingLeft={0}>
      <MapView
        ref={mapRef}
        showsUserLocation
        userLocationPriority={"passive"}
        userLocationCalloutEnabled
        showsMyLocationButton
        onPress={(e) => {
          getAddress(e.nativeEvent.coordinate);
          setCoordinate(e.nativeEvent.coordinate);
        }}
        initialRegion={{
          latitude: 55.75321,
          longitude: 37.619055,
          latitudeDelta: 0.2,
          longitudeDelta: 0.1921,
        }}
        style={{ width: WIDTH, height: "100%", flex: 1 }}
      >
        <Marker key={1} coordinate={coordinate}></Marker>
      </MapView>

      {/*<BottomSheet*/}
      {/*  ref={bottomSheetRef}*/}
      {/*  index={0}*/}
      {/*  snapPoints={snapPoints}*/}
      {/*  keyboardBehavior="fillParent"*/}
      {/*  style={{ padding: 12 }}*/}
      {/*>*/}
      {/*  <BottomSheetTextInput*/}
      {/*    value={searchData}*/}
      {/*    clearButtonMode={"always"}*/}
      {/*    placeholder={"Поиск"}*/}
      {/*    style={{*/}
      {/*      marginTop: 8,*/}
      {/*      marginBottom: 10,*/}
      {/*      borderRadius: 10,*/}
      {/*      fontSize: 16,*/}
      {/*      lineHeight: 20,*/}
      {/*      padding: 8,*/}
      {/*      color:*/}
      {/*        colorScheme === "light"*/}
      {/*          ? COLORS_LIGHT_THEME.TEXT*/}
      {/*          : COLORS_DARK_THEME.TEXT,*/}
      {/*      backgroundColor:*/}
      {/*        colorScheme === "light"*/}
      {/*          ? COLORS_FORM.INPUT*/}
      {/*          : COLORS_FORM.DARK_INPUT,*/}
      {/*    }}*/}
      {/*    onChangeText={(value) => {*/}
      {/*      var url =*/}
      {/*        "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";*/}
      {/*      var token = "7c05c86fa921be9823bf2de92c7131e22e74061d";*/}

      {/*      var options = {*/}
      {/*        method: "POST",*/}
      {/*        mode: "cors",*/}
      {/*        headers: {*/}
      {/*          "Content-Type": "application/json",*/}
      {/*          Accept: "application/json",*/}
      {/*          Authorization: "Token " + token,*/}
      {/*        },*/}
      {/*        body: JSON.stringify({ query: value }),*/}
      {/*      };*/}

      {/*      fetch(url, options)*/}
      {/*        .then((response) => response.json())*/}
      {/*        .then((result) => setSearchData(result))*/}
      {/*        .catch((error) => console.log("error", error));*/}
      {/*    }}*/}
      {/*  />*/}
      {/*  <BottomSheetFlatList*/}
      {/*    contentContainerStyle={{ paddingBottom: 50 }}*/}
      {/*    data={searchData.suggestions}*/}
      {/*    keyExtractor={(i) => i}*/}
      {/*    renderItem={({ item }) => {*/}
      {/*      return (*/}
      {/*        <TouchableOpacity*/}
      {/*          onPress={() => {*/}
      {/*            setSearchData(item.value);*/}
      {/*            // bottomSheetRef.current?.snapToIndex(0);*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          <Box*/}
      {/*            style={{*/}
      {/*              height: 50,*/}
      {/*              padding: 5,*/}
      {/*              justifyContent: "center",*/}
      {/*              borderStyle: "solid",*/}
      {/*              borderColor: COLORS_FORM.INPUT,*/}
      {/*              borderBottomWidth: 1,*/}
      {/*            }}*/}
      {/*          >*/}
      {/*            <Text*/}
      {/*              _light={{*/}
      {/*                color: COLORS_LIGHT_THEME.TEXT,*/}
      {/*              }}*/}
      {/*              _dark={{*/}
      {/*                color: COLORS_DARK_THEME.TEXT,*/}
      {/*              }}*/}
      {/*            >*/}
      {/*              {item.value}*/}
      {/*            </Text>*/}
      {/*          </Box>*/}
      {/*        </TouchableOpacity>*/}
      {/*      );*/}
      {/*    }}*/}
      {/*  />*/}
      {/*</BottomSheet>*/}
    </DefaultBackground>
  );
}
