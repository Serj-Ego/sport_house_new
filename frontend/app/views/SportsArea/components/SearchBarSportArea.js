import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { COLORS_FORM, PRIMARY_GRADIENT } from "../../../modules/Theme/colors";
import { HStack } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  FlipInYLeft,
  Layout,
  SlideOutRight,
} from "react-native-reanimated";
import { SportAreaOwnerListApiRequest } from "../../../services/redux/slices/sportAreaSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export default function SearchBarSportArea() {
  const [search, setSearch] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const searchFetch = () => {
    setIsLoading(true);
    dispatch(SportAreaOwnerListApiRequest(search))
      .then(unwrapResult)
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Animated.View layout={Layout}>
      <HStack>
        <View
          style={[
            styles.searchSection,
            {
              borderTopRightRadius: search ? 0 : 12,
              borderBottomRightRadius: search ? 0 : 12,
              backgroundColor:
                colorScheme === "light"
                  ? COLORS_FORM.INPUT
                  : COLORS_FORM.DARK_INPUT,
            },
          ]}
        >
          <Ionicons name="ios-search" size={20} color={"gray"} />
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor:
                  colorScheme === "light"
                    ? COLORS_FORM.INPUT
                    : COLORS_FORM.DARK_INPUT,
                color: colorScheme === "light" ? "black" : "white",
              },
            ]}
            placeholder="Поиск"
            underlineColorAndroid="transparent"
            clearButtonMode={"always"}
            onChangeText={(value) => {
              setSearch(value);
              if (value.length === 0) {
                dispatch(SportAreaOwnerListApiRequest());
              }
            }}
          />
        </View>
        {search && (
          <Animated.View
            layout={Layout}
            entering={FlipInYLeft}
            exiting={SlideOutRight}
            style={{ width: "15%" }}
          >
            <TouchableWithoutFeedback
              disabled={isLoading}
              onPress={searchFetch}
            >
              <LinearGradient
                colors={[PRIMARY_GRADIENT.START, PRIMARY_GRADIENT.END]}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={{
                  height: 40,
                  width: "100%",
                  borderTopRightRadius: 12,
                  borderBottomRightRadius: 12,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isLoading ? (
                  <ActivityIndicator />
                ) : (
                  <AntDesign name="enter" size={18} color="white" />
                )}
              </LinearGradient>
            </TouchableWithoutFeedback>
          </Animated.View>
        )}
      </HStack>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  searchSection: {
    flex: 1,
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
    marginBottom: 12,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    height: 40,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    borderRadius: 12,
  },
});
