import { View } from "native-base";
import DetailBlock from "./DetailBlock";
import React, { useCallback, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import ImageView from "react-native-image-viewing";
import { COLORS_DARK_THEME } from "../../../../../modules/Theme/colors";

const dataImages = [
  {
    banner: require("../../../../../assets/img.png"),
  },
  {
    banner: require("../../../../../assets/img_1.png"),
  },
  {
    banner: require("../../../../../assets/img_2.png"),
  },
];
const keyExtractor = (item, index) => `${index}${item}`;
const photoSize = 170;
export default function Images({ images }) {
  const [visible, setVisible] = useState(false);
  const [selectedIndexImage, setSelectedIndexImage] = useState(0);

  const renderSeparator = useCallback(
    () => <View style={styles.separator} />,
    []
  );

  const renderPhoto = useCallback(({ item, index }) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          setVisible(true);
          setSelectedIndexImage(index);
        }}
      >
        <Image
          style={styles.photo}
          width={photoSize}
          height={photoSize / 0.65}
          resizeMode="cover"
          source={{ uri: item.uri }}
        />
      </TouchableWithoutFeedback>
    );
  }, []);
  return (
    <DetailBlock title={"Фото"}>
      <FlatList
        data={images}
        horizontal={true}
        renderItem={renderPhoto}
        ItemSeparatorComponent={renderSeparator}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
      />
      {dataImages && (
        <ImageView
          images={images}
          imageIndex={selectedIndexImage}
          visible={visible}
          presentationStyle={"pageSheet"}
          backgroundColor={COLORS_DARK_THEME.BACKGROUND}
          onRequestClose={() => setVisible(false)}
        />
      )}
    </DetailBlock>
  );
}

const styles = StyleSheet.create({
  photo: {
    borderRadius: 12,
    width: photoSize,
    height: photoSize / 1.5,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  },
  separator: {
    width: 8,
  },
});
