import React from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from "react-native";
import { ShowcaseLabel } from "@gorhom/showcase-template";
import {
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
} from "../../../../modules/Theme/colors";
import { Box, HStack, Icon, Text } from "native-base";
import { Ionicons } from "@expo/vector-icons";

export default function HeaderInfo({ selectedLocation, refBottom }) {
  const colorScheme = useColorScheme();
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContentContainer}>
        <ShowcaseLabel
          style={[
            styles.name,
            {
              color:
                colorScheme === "light"
                  ? COLORS_LIGHT_THEME.TEXT
                  : COLORS_DARK_THEME.TEXT,
            },
          ]}
        >
          {selectedLocation?.short_name
            ? selectedLocation?.short_name
            : selectedLocation?.full_name}
        </ShowcaseLabel>
        <HStack space={1}>
          <Text
            style={[
              styles.address,
              {
                color:
                  colorScheme === "light"
                    ? COLORS_LIGHT_THEME.TEXT
                    : COLORS_DARK_THEME.TEXT,
              },
            ]}
          >
            {selectedLocation?.category}
          </Text>
        </HStack>
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          refBottom.current.dismiss();
        }}
      >
        <Box
          _light={{ bg: "gray.200" }}
          _dark={{ bg: "dark.200" }}
          style={{
            borderRadius: 12,
            justifyContent: "center",
            alignItems: "center",
          }}
          size={7}
        >
          <Icon
            as={Ionicons}
            size={6}
            alignSelf={"center"}
            name={"ios-close"}
            color={"gray.400"}
          />
        </Box>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    paddingBottom: 8,
    paddingHorizontal: 10,
  },
  headerContentContainer: {
    flexGrow: 1,
  },
  name: {
    fontSize: 26,
    lineHeight: 26,
    fontWeight: "700",
  },
  address: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "400",
  },
});
