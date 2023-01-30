import DefaultBackground from "../../components/DefaultBackground";
import { HEIGHT } from "../../modules/Theme/dimensions";
import { Box, Heading, Image, View } from "native-base";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Calendar } from "react-native-calendars/src/index";

import { SportAreaCheckDateApiRequest } from "../../services/redux/slices/sportAreaSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import moment from "moment";
import { MAP_ROUTE } from "../../modules/NavigationRoutes/map";

const INITIAL_DATE = moment().format("YYYY-MM-DD");

export default function EnrollLocation({ navigation, route }) {
  const [disabledDate, setDisabledDate] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(INITIAL_DATE);
  useEffect(() => {
    let dates = {};
    dispatch(SportAreaCheckDateApiRequest(route.params.areaId))
      .then(unwrapResult)
      .then((res) => {
        res.days.map((value) => {
          dates[value] = { disabled: true };
        });
      })
      .finally(() => {
        setDisabledDate(dates);
        setIsLoading(false);
      });
  }, []);

  const marked = useMemo(() => {
    return Object.assign({}, disabledDate, {
      [selected]: {
        selected: true,
        selectedColor: "blue",
      },
    });
  }, [selected, disabledDate]);

  const onDayPress = useCallback(
    (day) => {
      if (!isLoading) {
        setSelected(day.dateString);
        navigation.navigate(MAP_ROUTE.ENROLL_TIME.route, {
          day: day.dateString,
          areaId: route.params.areaId,
        });
      }
    },
    [isLoading]
  );
  return (
    <DefaultBackground>
      <View justifyContent={"space-around"} height={"100%"}>
        <Image
          alt={"location"}
          style={{ resizeMode: "contain", alignSelf: "center" }}
          source={require("../../assets/add_sport_area/work_time.png")}
          size={HEIGHT / 4}
        />
        <Box>
          <Heading marginBottom={2}>Дата:</Heading>
          <Calendar
            displayLoadingIndicator={isLoading}
            disableAllTouchEventsForDisabledDays={true}
            hideExtraDays={true}
            minDate={new Date()}
            markedDates={marked}
            style={{ marginBottom: 15, padding: 10, borderRadius: 12 }}
            firstDay={1}
            onDayPress={onDayPress}
          />
        </Box>
      </View>
    </DefaultBackground>
  );
}
