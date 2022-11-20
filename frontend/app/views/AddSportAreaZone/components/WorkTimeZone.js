import { Box, Heading, HStack, Text } from "native-base";
import React from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { COLOR_ACCENT, COLORS_FORM } from "../../../modules/Theme/colors";
import DateTimePicker from "@react-native-community/datetimepicker";

const WorkTimeWeek = [
  { id: 1, value: "Пн" },
  { id: 2, value: "Вт" },
  { id: 3, value: "Ср" },
  { id: 4, value: "Чт" },
  { id: 5, value: "Пт" },
  { id: 6, value: "Сб" },
  { id: 7, value: "Вс" },
];
export default function WorkTimeZone({
  setWeekName,
  weekName,
  endWorkTime,
  setEndWorkTime,
  startWorkTime,
  setStartWorkTime,
}) {
  return (
    <>
      <Heading fontSize={22}>Режим работы</Heading>
      <HStack space={"1.5%"} mt={4}>
        {WorkTimeWeek.map((value, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => {
                if (weekName.find((el) => el === value.value)) {
                  setWeekName(weekName.filter((el) => el !== value.value));
                } else {
                  setWeekName([...weekName, value.value]);
                }
              }}
            >
              <Box
                key={index}
                style={styles.workWeekContainer}
                _light={{
                  backgroundColor: weekName.find((el) => el === value.value)
                    ? COLOR_ACCENT.ACCENT
                    : COLORS_FORM.INPUT,
                }}
                _dark={{
                  backgroundColor: weekName.find((el) => el === value.value)
                    ? COLOR_ACCENT.ACCENT
                    : COLORS_FORM.DARK_INPUT,
                }}
              >
                <Text style={styles.workWeekName}>{value.value}</Text>
              </Box>
            </TouchableWithoutFeedback>
          );
        })}
      </HStack>
      <HStack>
        <HStack
          width={"50%"}
          alignItems={"center"}
          justifyContent={"center"}
          space={2}
        >
          <Heading size={"sm"}>C</Heading>
          <DateTimePicker
            locale="ru-RU"
            display={"default"}
            style={{ minHeight: 45, minWidth: "20%" }}
            testID="dateTimePicker"
            value={new Date(startWorkTime)}
            confirmBtnText={"test"}
            maximumDate={new Date(endWorkTime)}
            mode={"time"}
            is24Hour={true}
            minuteInterval={5}
            onChange={(event, date) => {
              setStartWorkTime(date);
            }}
          />
        </HStack>
        <HStack
          width={"50%"}
          alignItems={"center"}
          justifyContent={"center"}
          space={2}
        >
          <Heading size={"sm"}>До</Heading>
          <DateTimePicker
            locale="ru-RU"
            display={"default"}
            style={{ minHeight: 45, minWidth: "20%" }}
            testID="dateTimePicker1"
            value={new Date(endWorkTime)}
            minimumDate={new Date(startWorkTime)}
            confirmBtnText={"test"}
            mode={"time"}
            is24Hour={true}
            minuteInterval={5}
            onChange={(event, date) => {
              setEndWorkTime(date);
            }}
          />
        </HStack>
      </HStack>
    </>
  );
}

const styles = StyleSheet.create({
  workWeekContainer: {
    height: 50,
    width: "13%",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  workWeekName: {
    fontSize: 16,
  },
});
