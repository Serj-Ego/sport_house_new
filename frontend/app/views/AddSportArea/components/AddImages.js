import {
  AspectRatio,
  Box,
  Container,
  HStack,
  Icon,
  Image,
  Text,
} from "native-base";
import { FlatList, TouchableOpacity } from "react-native";
import { WIDTH } from "../../../modules/Theme/dimensions";
import { PADDING_LR_MAIN } from "../../../modules/Theme/padding";
import {
  COLOR_ACCENT,
  COLORS_DARK_THEME,
  COLORS_FORM,
  COLORS_LIGHT_THEME,
} from "../../../modules/Theme/colors";
import * as ImagePicker from "expo-image-picker";
import React, { useContext, useRef, useState } from "react";
import { addSportAreaContext } from "../../../navigation/AdditionalStack";
import { MaterialIcons } from "@expo/vector-icons";

export default function AddImages() {
  const { images, setImages } = useContext(addSportAreaContext);
  const refSlider = useRef(null);
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
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const updateCurrentSlideIndex = (e) => {
    const currentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(currentOffsetX / WIDTH);
    setCurrentSlideIndex(currentIndex);
  };
  return (
    <>
      <Box style={{ marginBottom: images.length > 0 ? 8 : 1, marginTop: 24 }}>
        <FlatList
          ref={refSlider}
          data={images}
          showsHorizontalScrollIndicator={false}
          horizontal
          pagingEnabled
          onMomentumScrollEnd={updateCurrentSlideIndex}
          style={{ width: WIDTH - PADDING_LR_MAIN - PADDING_LR_MAIN }}
          renderItem={({ index, item }) => {
            return (
              <Container key={index}>
                <AspectRatio
                  w={WIDTH - PADDING_LR_MAIN - PADDING_LR_MAIN}
                  ratio={16 / 9}
                >
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
      </Box>
      {images.length > 0 && (
        <HStack
          justifyContent={"center"}
          marginBottom={4}
          alignItems={"center"}
        >
          {images.map((value, index) => {
            return (
              <Box
                key={index}
                style={{
                  width: currentSlideIndex === index ? 7 : 5,
                  height: currentSlideIndex === index ? 7 : 5,
                  margin: 2,
                  borderRadius: 10,
                }}
                _light={{
                  backgroundColor:
                    currentSlideIndex === index
                      ? COLORS_DARK_THEME.DARK_BLOCK
                      : COLORS_FORM.PLACEHOLDER,
                }}
                _dark={{
                  backgroundColor:
                    currentSlideIndex === index
                      ? COLORS_LIGHT_THEME.WHITE_BLOCK
                      : COLORS_FORM.PLACEHOLDER,
                }}
              />
            );
          })}
        </HStack>
      )}
      <TouchableOpacity onPress={pickImage}>
        <Box
          style={{
            minWidth: "100%",
            height: images.length > 0 ? 55 : 175,
            borderRadius: 12,
            borderWidth: 1,
            borderStyle: "dashed",
            alignItems: "center",
            justifyContent: "center",
            padding: PADDING_LR_MAIN,
          }}
          _light={{
            borderColor: COLORS_DARK_THEME.DARK_BLOCK,
          }}
          _dark={{
            borderColor: COLORS_LIGHT_THEME.WHITE_BLOCK,
          }}
        >
          <HStack space={2}>
            <Text
              _light={{ color: COLORS_LIGHT_THEME.TEXT }}
              _dark={{ color: COLORS_DARK_THEME.TEXT }}
            >
              Добавить фото
            </Text>
          </HStack>
        </Box>
      </TouchableOpacity>
    </>
  );
}
