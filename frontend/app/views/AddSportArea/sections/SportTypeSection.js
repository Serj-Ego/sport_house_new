import { HEIGHT, WIDTH } from "../../../modules/Theme/dimensions";
import { PADDING_LR_MAIN } from "../../../modules/Theme/padding";
import { Box, View } from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  SportAreaSportTypesApiRequest,
  sportAreaSportTypesList,
} from "../../../services/redux/slices/sportAreaSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { addSportAreaContext } from "../../../navigation/AdditionalStack";
import SectionHeader from "../components/SectionHeader";
import MultiplySelect from "../components/MultiplySelect";

export default function SportTypeSection() {
  const dispatch = useDispatch();
  const { sportTypes, setSportTypes } = useContext(addSportAreaContext);
  const [loading, setLoading] = useState(true);
  const sportAreaSportTypesListState = useSelector(sportAreaSportTypesList);
  useEffect(() => {
    dispatch(SportAreaSportTypesApiRequest())
      .then(unwrapResult)
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        Alert.alert(
          "Ошибка!",
          "При загрузке видов спорта произошла ошибка, попробуйте позже!"
        );
      });
  }, []);

  const selectSportType = (item) => {
    if (sportTypes.find((el) => el === item.id)) {
      setSportTypes(
        sportTypes.filter((f) => {
          return f !== item.id;
        })
      );
    } else {
      setSportTypes([...sportTypes, ...[item.id]]);
    }
  };
  return (
    <View
      style={{
        width: WIDTH - PADDING_LR_MAIN - PADDING_LR_MAIN,
        height: HEIGHT,
      }}
    >
      <SectionHeader
        header={"Виды спорта на площадке"}
        description={
          "Выберите виды спорта, которые доступны на вашей спортивной площадке"
        }
        image={require("../../../assets/add_sport_area/sport_type.png")}
      />
      <Box style={{ height: HEIGHT / 2 }}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <MultiplySelect
            dataContext={sportTypes}
            listData={sportAreaSportTypesListState}
            onPressFunc={selectSportType}
          />
        )}
      </Box>
    </View>
  );
}
