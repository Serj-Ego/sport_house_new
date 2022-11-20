import { COLORS_FORM } from "../../../modules/Theme/colors";
import { Box, Heading } from "native-base";
import React, { useContext } from "react";
import { WIDTH } from "../../../modules/Theme/dimensions";
import { FastFilterConst } from "../../../modules/FastFilterConst";
import { FilterSportAreaContext } from "../index";

export default function SportAreaListBottomSheet() {
  const { filterType } = useContext(FilterSportAreaContext);
  return (
    <>
      <Heading
        size={"sm"}
        style={{ marginLeft: 10, marginTop: 10 }}
        _light={{ color: COLORS_FORM.PLACEHOLDER }}
        _dark={{ color: COLORS_FORM.PLACEHOLDER }}
      >
        Рекомендованные{" "}
        {filterType === FastFilterConst.SPORT_AREA
          ? "площадки"
          : filterType === FastFilterConst.COACH
          ? "тренеры"
          : "команды"}
      </Heading>
      <Box
        style={{
          borderRadius: 12,
          height: 255,
          width: WIDTH - 20,
          marginLeft: 10,
          marginRight: 10,
          marginTop: 10,
        }}
        _light={{ backgroundColor: COLORS_FORM.INPUT }}
        _dark={{ backgroundColor: COLORS_FORM.DARK_INPUT }}
      ></Box>
    </>
  );
}
