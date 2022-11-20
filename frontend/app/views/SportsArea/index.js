import DefaultBackground from "../../components/DefaultBackground";
import { useDispatch, useSelector } from "react-redux";
import {
  sportAreaOwnerList,
  SportAreaOwnerListApiRequest,
  updatedStatusSportArea,
} from "../../services/redux/slices/sportAreaSlice";
import { useEffect, useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { ActivityIndicator, FlatList } from "react-native";
import SportsAreaItem from "./components/SportsAreaItem";
import { PADDING_LR_MAIN } from "../../modules/Theme/padding";

export default function SportsArea() {
  const dispatch = useDispatch();
  const sportAreaList = useSelector(sportAreaOwnerList);
  const [isLoading, setIsLoading] = useState(false);
  const stateChangeStatus = useSelector(updatedStatusSportArea);
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
  }, [stateChangeStatus]);
  return (
    <DefaultBackground paddingTop={PADDING_LR_MAIN}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={sportAreaList}
          renderItem={({ item }) => <SportsAreaItem item={item} />}
        />
      )}
    </DefaultBackground>
  );
}
