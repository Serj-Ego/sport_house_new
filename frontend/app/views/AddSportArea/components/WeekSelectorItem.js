import {
  COLOR_ACCENT,
  COLORS_DARK_THEME,
  COLORS_FORM,
  COLORS_LIGHT_THEME,
} from "../../../modules/Theme/colors";
import { Box, Icon, Text } from "native-base";
import React, { useContext, useState } from "react";
import { addSportAreaContext } from "../../../navigation/AdditionalStack";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function WeekSelectorItem({ item, indexSelector, counter }) {
  const { workTime, setWorkTime } = useContext(addSportAreaContext);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isSelected, setIsSelected] = useState(
    workTime[indexSelector].weeks.find((el) => el.id === item.id)
  );

  const isDisabledFunc = () => {
    let obj = workTime.find((el) => {
      return el.weeks.find((vl) => {
        return vl.value === item.value;
      });
    });
    if (obj) {
      setIsDisabled(true);
      return true;
    } else {
      setIsDisabled(false);
      return false;
    }
  };
  const checkWeekDay = () => {
    if (workTime[indexSelector].weeks.find((el) => el.id === item.id)) {
      let el = workTime;
      el[indexSelector].weeks = workTime[indexSelector].weeks.filter(
        (el) => el.id !== item.id
      );
      setIsSelected(false);
      setWorkTime(el);
    } else {
      if (!isDisabledFunc()) {
        let el = workTime;
        el[indexSelector].weeks.push(item);
        setIsSelected(true);
        setWorkTime(el);
      }
    }
  };

  return (
    <TouchableOpacity
      key={item.id}
      style={{ width: "13%" }}
      onPress={checkWeekDay}
      // disabled={isDisabled}
    >
      <Box
        key={item.id}
        style={{
          height: 45,
          borderRadius: 12,
          padding: 4,
          alignItems: "center",
          justifyContent: "center",
        }}
        _light={{
          backgroundColor: isSelected ? COLOR_ACCENT.ACCENT : COLORS_FORM.INPUT,
        }}
        _dark={{
          backgroundColor: isSelected
            ? COLOR_ACCENT.ACCENT
            : COLORS_FORM.DARK_INPUT,
        }}
      >
        <Text
          _light={{ color: COLORS_LIGHT_THEME.TEXT }}
          _dark={{ color: COLORS_DARK_THEME.TEXT }}
          fontWeight={"bold"}
        >
          {!isDisabled ? (
            item.title
          ) : (
            <Icon
              as={Ionicons}
              size={7}
              alignSelf={"flex-end"}
              name={"ios-lock-closed-outline"}
              _light={{
                color: COLOR_ACCENT.ACCENT,
              }}
              _dark={{
                color: COLOR_ACCENT.ACCENT,
              }}
            />
          )}
        </Text>
      </Box>
    </TouchableOpacity>
  );
}
