import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, useColorScheme } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Cover from "./components/SportAreaDetailComponents/Cover";
import Content from "./components/SportAreaDetailComponents/Content";
import Header from "./components/SportAreaDetailComponents/Header";
import DefaultBackground from "../../components/DefaultBackground";
import { useDispatch, useSelector } from "react-redux";
import {
  sportAreaDetailView,
  SportAreaRetrieveOwnerApiRequest,
} from "../../services/redux/slices/sportAreaSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { Box } from "native-base";

export default function SportAreaDetailView({ route, navigation }) {
  const colorScheme = useColorScheme();
  const scrollY = useSharedValue(0);
  const dispatch = useDispatch();
  const stateSportAreaDetailView = useSelector(sportAreaDetailView);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(SportAreaRetrieveOwnerApiRequest(route.params.id))
      .then(unwrapResult)
      .then((res) => {
        setIsLoading(false);
      })
      .catch((err) => {});
    // .finally(() => setIsLoading(false));
  }, []);
  return (
    <DefaultBackground paddingLeft={0} paddingRight={0} paddingTop={0}>
      {isLoading ? (
        <Box justifyContent={"center"} alignItems={"center"} height={"100%"}>
          <ActivityIndicator size={"large"} />
        </Box>
      ) : (
        <>
          <Cover y={scrollY} data={stateSportAreaDetailView} />
          <Header y={scrollY} data={stateSportAreaDetailView} />
          <Content y={scrollY} data={stateSportAreaDetailView} />
        </>
      )}
    </DefaultBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
