import DefaultBackground from "../../components/DefaultBackground";
import { useDispatch, useSelector } from "react-redux";
import {
  sportAreaOwnerList,
  SportAreaOwnerListApiRequest,
} from "../../services/redux/slices/sportAreaSlice";
import React, { useEffect, useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { ActivityIndicator, RefreshControl, SafeAreaView } from "react-native";
import { Box, View } from "native-base";
import SportsAreaItem from "./components/SportsAreaItem";
import {
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
} from "../../modules/Theme/colors";
import SearchBarSportArea from "./components/SearchBarSportArea";
import ScreenHeader from "../../components/ScreenHeader";
import Animated, { FadeInUp, Layout } from "react-native-reanimated";

export default function SportsArea({ route, navigation }) {
  const dispatch = useDispatch();
  const sportAreaList = useSelector(sportAreaOwnerList);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(SportAreaOwnerListApiRequest())
      .then(unwrapResult)
      .then((res) => {
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(SportAreaOwnerListApiRequest())
      .then(unwrapResult)
      .finally(() => setRefreshing(false));
  };
  return (
    <DefaultBackground paddingTop={0}>
      <SafeAreaView>
        <ScreenHeader title={"Мои объекты"} />
        {isLoading ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <ActivityIndicator size={"large"} />
          </View>
        ) : (
          <Animated.FlatList
            layout={Layout}
            entering={FadeInUp}
            data={sportAreaList}
            style={{ height: "100%" }}
            ItemSeparatorComponent={() => (
              <Box
                style={{ height: 4 }}
                _light={{ backgroundColor: COLORS_LIGHT_THEME.BACKGROUND }}
                _dark={{ backgroundColor: COLORS_DARK_THEME.BACKGROUND }}
              />
            )}
            renderItem={({ item }) => <SportsAreaItem item={item} />}
            ListHeaderComponent={<SearchBarSportArea />}
            stickyHeaderIndices={[0]}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </SafeAreaView>
    </DefaultBackground>
  );
}
