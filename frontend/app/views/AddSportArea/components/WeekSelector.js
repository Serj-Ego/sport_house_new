import { Box, Heading, HStack, Icon } from "native-base";
import { COLOR_ACCENT, COLORS_FORM } from "../../../modules/Theme/colors";
import React, { useContext } from "react";
import WeekSelectorItem from "./WeekSelectorItem";
import DateTimePicker from "@react-native-community/datetimepicker";
import { addSportAreaContext } from "../../../navigation/AdditionalStack";
import moment from "moment";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

function remove(arr, indexes) {
  var arrayOfIndexes = [].slice.call(arguments, 1); // (1)
  return arr.filter(function (item, index) {
    // (2)
    return arrayOfIndexes.indexOf(index) == -1; // (3)
  });
}

const weekSelectorData = [
  { id: 1, title: "Пн", value: "Понедельник" },
  { id: 2, title: "Вт", value: "Вторник" },
  { id: 3, title: "Ср", value: "Среда" },
  { id: 4, title: "Чт", value: "Четверг" },
  { id: 5, title: "Пт", value: "Пятница" },
  { id: 6, title: "Сб", value: "Суббота" },
  { id: 7, title: "Вс", value: "Воскресенье" },
];

export default function WeekSelector({
  key,
  indexSelector,
  counter,
  setCounter,
  value,
}) {
  const { workTime, setWorkTime } = useContext(addSportAreaContext);
  return (
    <Box
      key={key}
      style={{
        padding: 16,
        borderRadius: 12,
        borderStyle: "solid",
        borderWidth: 1,
        marginBottom: 16,
      }}
      _light={{ borderColor: COLORS_FORM.INPUT }}
      _dark={{ borderColor: COLORS_FORM.DARK_INPUT }}
    >
      {indexSelector !== 0 && (
        <TouchableOpacity
          onPress={() => {
            setWorkTime(remove(workTime, indexSelector));
            setCounter(remove(counter, indexSelector));
          }}
          style={{
            position: "absolute",
            top: -12,
            right: 0,
            backgroundColor: COLOR_ACCENT.ACCENT,
            padding: 2,
            borderRadius: "100%",
          }}
        >
          <Icon
            as={MaterialIcons}
            textAlign={"center"}
            size={5}
            name="delete-outline"
            color={"white"}
          />
        </TouchableOpacity>
      )}
      <HStack space={"1.5%"}>
        {weekSelectorData.map((value, index) => (
          <WeekSelectorItem
            item={value}
            indexSelector={indexSelector}
            counter={counter}
          />
        ))}
      </HStack>
      <HStack>
        <HStack
          width={"50%"}
          alignItems={"center"}
          justifyContent={"center"}
          space={2}
        >
          <Heading
            size={"sm"}
            _light={{ color: COLORS_FORM.LABEL }}
            _dark={{ color: COLORS_FORM.LABEL }}
          >
            C
          </Heading>
          <DateTimePicker
            locale="ru-RU"
            display={"default"}
            style={{ minHeight: 45, minWidth: "20%" }}
            testID="dateTimePicker"
            value={new Date(workTime[indexSelector].startTime)}
            confirmBtnText={"test"}
            mode={"time"}
            is24Hour={true}
            onChange={(event, date) => {
              let el = workTime;
              el[indexSelector].startTime = moment(date);
              setWorkTime(el);
            }}
          />
        </HStack>
        <HStack
          width={"50%"}
          alignItems={"center"}
          justifyContent={"center"}
          space={2}
        >
          <Heading
            size={"sm"}
            _light={{ color: COLORS_FORM.LABEL }}
            _dark={{ color: COLORS_FORM.LABEL }}
          >
            До
          </Heading>
          <DateTimePicker
            locale="ru-RU"
            display={"default"}
            style={{ minHeight: 45, minWidth: "20%" }}
            testID="dateTimePicker1"
            value={new Date(workTime[indexSelector].endTime)}
            confirmBtnText={"test"}
            mode={"time"}
            is24Hour={true}
            onChange={(event, date) => {
              let el = workTime;
              el[indexSelector].endTime = moment(date);
              setWorkTime(el);
            }}
          />
        </HStack>
      </HStack>
    </Box>
  );
}
