import { Heading, HStack, Text } from "native-base";
import { Spacer } from "native-base/src/components/primitives/Flex";
import { StyleSheet, Switch } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Animated, { FadeInUp, FadeOutUp, Layout } from "react-native-reanimated";
import DateTimePicker from "@react-native-community/datetimepicker";
import { COLOR_ACCENT } from "../../../../../modules/Theme/colors";
import { addSportAreaContext } from "../../../../../navigation/AdditionalStack";

export default function WeekItem({ item, index }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const { workTime, setWorkTime } = useContext(addSportAreaContext);
  const toggleSwitch = () => {
    if (isEnabled) {
      workTime[index].startWork = null;
      workTime[index].endWork = null;
      setWorkTime(workTime);
    }
    setIsEnabled((previousState) => !previousState);
  };
  const setStartWork = (value) => {
    workTime[index].startWork = value;
    setWorkTime(workTime);
  };
  const setEndWork = (value) => {
    workTime[index].endWork = value;
    setWorkTime(workTime);
  };
  useEffect(() => {
    if (item.startWork && item.endWork) {
      setIsEnabled(true);
    }
  }, []);
  return (
    <Animated.View
      layout={Layout}
      style={[
        styles.weekBox,
        { borderColor: isEnabled ? COLOR_ACCENT.ACCENT : "white" },
      ]}
    >
      <HStack key={index} alignItems={"center"}>
        <Heading size={"sm"}>{item.week}</Heading>
        <Spacer />
        <Switch onValueChange={toggleSwitch} value={isEnabled} />
      </HStack>
      {isEnabled && (
        <Animated.View
          style={{ overflow: "hidden" }}
          layout={Layout}
          entering={FadeInUp}
          exiting={FadeOutUp}
        >
          <HStack>
            <DateTimePicker
              locale="ru-RU"
              display={"default"}
              style={{ minHeight: 45, minWidth: "20%" }}
              testID="dateTimePicker"
              value={
                item.startWork
                  ? item.startWork
                  : new Date(2022, 1, 1, 5, 0, 0, 0)
              }
              confirmBtnText={"test"}
              mode={"time"}
              is24Hour={true}
              onChange={(event, date) => {
                setStartWork(date);
              }}
            />
            <Text
              textAlign={"center"}
              marginX={2}
              alignSelf={"center"}
              justifyContent={"center"}
            >
              —
            </Text>
            <DateTimePicker
              locale="ru-RU"
              display={"default"}
              style={{ minHeight: 45, minWidth: "20%" }}
              testID="dateTimePicker"
              value={
                item.endWork ? item.endWork : new Date(2022, 1, 1, 9, 0, 0, 0)
              }
              confirmBtnText={"test"}
              mode={"time"}
              is24Hour={true}
              onChange={(event, date) => {
                setEndWork(date);
              }}
            />
          </HStack>
        </Animated.View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  weekBox: {
    minHeight: 55,
    width: "100%",
    borderStyle: "solid",
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 4,
  },
});
