import DefaultBackground from "../../components/DefaultBackground";
import { Box, Button, Heading, Image, Text, View } from "native-base";
import { HEIGHT, WIDTH } from "../../modules/Theme/dimensions";
import React, { useEffect, useState } from "react";
import {
  SportAreaBookingApiRequest,
  SportAreaCheckTimeApiRequest,
} from "../../services/redux/slices/sportAreaSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { COLOR_ACCENT } from "../../modules/Theme/colors";
import { PADDING_LR_MAIN } from "../../modules/Theme/padding";

export default function SelectTimeEnroll({ navigation, route }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [timeList, setTimeList] = useState([]);
  const [selectedTime, setSelectedTime] = useState([]);
  const [isLoadingBooking, setIsLoadingBooking] = useState(false);

  useEffect(() => {
    dispatch(
      SportAreaCheckTimeApiRequest({
        id: route.params.areaId,
        day: route.params.day,
      })
    )
      .then(unwrapResult)
      .then((res) => {
        setTimeList(res.time);
        setSelectedTime([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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
          <Heading marginBottom={2}>Время:</Heading>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={timeList}
              style={{ height: 400 }}
              numColumns={4}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  disabled={!item.isActive}
                  onPress={() => {
                    if (selectedTime.length === 0) {
                      setSelectedTime([
                        ...selectedTime,
                        { time: item.time, index },
                      ]);
                    } else
                      setSelectedTime(
                        selectedTime.filter((el) => el.time !== item.time)
                      );
                  }}
                >
                  <Box
                    style={{
                      width: WIDTH / 4 - PADDING_LR_MAIN / 2 - 4,
                      marginVertical: 2,
                      marginHorizontal: 2,
                      borderRadius: 12,
                      height: 55,
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 5,
                      borderStyle: "solid",
                      borderWidth: 1,
                      borderColor: selectedTime.find(
                        (el) => el.time === item.time
                      )
                        ? "red"
                        : item.isActive
                        ? COLOR_ACCENT.ACCENT
                        : "gray",
                    }}
                  >
                    <Text>{item.time}</Text>
                  </Box>
                </TouchableOpacity>
              )}
            />
          )}
        </Box>
        {selectedTime.length > 0 && (
          <Button
            style={[
              {
                color: "white",
                borderRadius: 12,
                backgroundColor: COLOR_ACCENT.ACCENT,
                width: "100%",
                minHeight: 55,
                marginBottom: 14,
              },
            ]}
            onPress={() => {
              setIsLoadingBooking(true);
              dispatch(
                SportAreaBookingApiRequest({
                  id: route.params.areaId,
                  day: route.params.day,
                  start_event: selectedTime[0].time,
                })
              )
                .then(unwrapResult)
                .then(() => {
                  Alert.alert(
                    "Успешно",
                    "Заявка на бронирование спортивной площадки отправлена, ожидайте подтверждения со стороны площадки."
                  );
                  navigation.pop(2);
                })
                .finally(() => {
                  setIsLoadingBooking(false);
                });
            }}
          >
            {isLoadingBooking && <ActivityIndicator />}
            <Text color={"white"}>Далее</Text>
          </Button>
        )}
      </View>
    </DefaultBackground>
  );
}
