import {
  FlatList,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import ImageView from "react-native-image-viewing";
import { COLORS_DARK_THEME } from "../../../../modules/Theme/colors";
import React, { useCallback, useState } from "react";

const keyExtractor = (item, index) => `${index}${item}`;
const photoSize = 180;

export default function ImageList({ selectedLocation }) {
  const [visible, setVisible] = useState(false);
  const [selectedIndexImage, setSelectedIndexImage] = useState(0);

  //#region renders
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
          height={photoSize / 0.7}
          resizeMode="cover"
          source={{ uri: item.uri }}
        />
      </TouchableWithoutFeedback>
    );
  }, []);
  const renderSeparator = useCallback(
    () => <View style={styles.separator} />,
    []
  );

  return (
    <>
      <FlatList
        data={selectedLocation?.images}
        horizontal={true}
        renderItem={renderPhoto}
        ItemSeparatorComponent={renderSeparator}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        style={styles.flatListContainer}
        // contentContainerStyle={styles.flatListContentContainer}
      />
      {selectedLocation?.images && (
        <ImageView
          images={selectedLocation?.images}
          imageIndex={selectedIndexImage}
          visible={visible}
          presentationStyle={"pageSheet"}
          backgroundColor={COLORS_DARK_THEME.BACKGROUND}
          onRequestClose={() => setVisible(false)}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  flatListContainer: {
    paddingVertical: 8,
    marginTop: 12,
  },

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
