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
          {selectedLocation?.name}
        </ShowcaseLabel>
        <HStack space={1}>
          {selectedLocation?.category.map((item, index) => {
            return (
              <Text
                key={item?.id}
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
                {item?.name}
                {index + 1 !== selectedLocation?.category.length && ","}
              </Text>
            );
          })}
        </HStack>
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          console.log(refBottom);
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
