import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, useColorScheme } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Cover from "./components/SportAreaDetailComponents/Cover";
import Content from "./components/SportAreaDetailComponents/Content";
import Header from "./components/SportAreaDetailComponents/Header";
import DefaultBackground from "../../components/DefaultBackground";
import { useDispatch } from "react-redux";
import { SportAreaRetrieveOwnerApiRequest } from "../../services/redux/slices/sportAreaSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { Box } from "native-base";

export default function SportAreaDetailView({ route, navigation }) {
  const colorScheme = useColorScheme();
  const scrollY = useSharedValue(0);
  const dispatch = useDispatch();
  const [sportAreaDetail, setSportAreaDetail] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(SportAreaRetrieveOwnerApiRequest(route.params.id))
      .then(unwrapResult)
      .then((res) => {
        setSportAreaDetail(res);
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
          <Cover y={scrollY} data={sportAreaDetail} />
          <Header y={scrollY} data={sportAreaDetail} />
          <Content y={scrollY} data={sportAreaDetail} />
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
