import { HEIGHT, WIDTH } from "../../../modules/Theme/dimensions";
import { PADDING_LR_MAIN } from "../../../modules/Theme/padding";
import { Box, View } from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  SportAreaTypesApiRequest,
  sportAreaTypesList,
} from "../../../services/redux/slices/sportAreaSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { addSportAreaContext } from "../../../navigation/AdditionalStack";
import SectionHeader from "../components/SectionHeader";
import MultiplySelect from "../components/MultiplySelect";

export default function CategorySection() {
  const dispatch = useDispatch();
  const { category, setCategory } = useContext(addSportAreaContext);
  const [loading, setLoading] = useState(true);
  const sportAreaCategoryList = useSelector(sportAreaTypesList);
  useEffect(() => {
    dispatch(SportAreaTypesApiRequest())
      .then(unwrapResult)
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        Alert.alert(
          "Ошибка!",
          "При загрузке категорий произошла ошибка, попробуйте позже!"
        );
      });
  }, []);

  const selectCategory = (item) => {
    if (category.find((el) => el === item.id)) {
      setCategory(
        category.filter((f) => {
          return f !== item.id;
        })
      );
    } else {
      if (category.length < 3) {
        setCategory([...category, ...[item.id]]);
      }
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
        header={"Категории площадки"}
        description={
          "Выберите не более трех категорий для вашей спортивной площадки"
        }
        image={require("../../../assets/add_sport_area/category.png")}
      />

      <Box style={{ height: HEIGHT / 2 }}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <MultiplySelect
            dataContext={category}
            listData={sportAreaCategoryList}
            onPressFunc={selectCategory}
          />
        )}
      </Box>
    </View>
  );
}
