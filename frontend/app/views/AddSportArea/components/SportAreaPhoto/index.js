import {
  AspectRatio,
  Box,
  Container,
  Heading,
  Icon,
  Image,
  View,
} from "native-base";
import { HEIGHT, WIDTH } from "../../../../modules/Theme/dimensions";
import React, { useContext } from "react";
import { addSportAreaContext } from "../../../../navigation/AdditionalStack";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { COLOR_ACCENT } from "../../../../modules/Theme/colors";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";

export default function SportAreaPhoto() {
  const { images, setImages } = useContext(addSportAreaContext);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      allowsMultipleSelection: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.cancelled) {
      setImages([...images, ...result.selected]);
    }
  };
  return (
    <View justifyContent={"space-around"}>
      <Image
        alt={"location"}
        style={{ resizeMode: "contain", alignSelf: "center" }}
        source={require("../../../../assets/add_sport_area/photo.png")}
        size={HEIGHT / 4}
      />
      <View style={{ width: WIDTH, paddingHorizontal: 12 }}>
        <Heading>Фотографии объекта</Heading>
        {images.length > 0 && (
          <FlatList
            data={images}
            pagingEnabled={false}
            style={{
              height: 240,
              borderRadius: 12,
              marginVertical: 24,
            }}
            renderItem={({ index, item }) => {
              return (
                <Container key={index}>
                  <AspectRatio w={WIDTH - 24} ratio={16 / 9}>
                    <Image
                      alt={"ds"}
                      borderRadius={12}
                      source={{
                        uri: item.uri,
                      }}
                    />
                  </AspectRatio>
                  <TouchableOpacity
                    onPress={() => {
                      setImages(
                        images.filter((f) => {
                          return f.assetId !== item.assetId;
                        })
                      );
                    }}
                    style={{
                      position: "absolute",
                      bottom: 10,
                      left: 10,
                      backgroundColor: COLOR_ACCENT.ACCENT,
                      padding: 8,
                      borderRadius: "100%",
                    }}
                  >
                    <Icon
                      as={MaterialIcons}
                      textAlign={"center"}
                      size={5}
                      name="delete-outline"
                      color={"white"}
                    />
                  </TouchableOpacity>
                </Container>
              );
            }}
          />
        )}
        <TouchableWithoutFeedback onPress={pickImage}>
          <Box
            style={
              images.length === 0 ? styles.addPhotoBox : styles.addPhotoButton
            }
          >
            <Heading fontSize={"md"}>Добавить фото</Heading>
          </Box>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  addPhotoBox: {
    height: HEIGHT / 4,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "dashed",
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 24,
    borderColor: COLOR_ACCENT.ACCENT,
  },
  addPhotoButton: {
    height: 55,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "dashed",
    borderWidth: 1,
    borderRadius: 12,
    borderColor: COLOR_ACCENT.ACCENT,
  },
});
