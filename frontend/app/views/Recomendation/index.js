import DefaultBackground from "../../components/DefaultBackground";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  recommendationUserData,
  RetrieveRecommendationApiRequest,
} from "../../services/redux/slices/recommendationSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { ActivityIndicator, FlatList, ScrollView } from "react-native";
import { Box, Heading, View } from "native-base";
import {
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
} from "../../modules/Theme/colors";
import RecSportHeader from "./components/RecSportHeader";
import RecSportAdditionalInfo from "./components/RecSportAdditionalInfo";
import DropInfoButton from "./components/DropInfoButton";
import { MaterialIcons } from "@expo/vector-icons";
import SportListItem from "./components/SportListItem";

export default function Recommendation({ route }) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [openInfo, setOpenInfo] = useState(false);
  const [openNoRecSportInfo, setOpenNoRecSportInfo] = useState(false);
  const [openBreakfastInfo, setOpenBreakfastInfo] = useState(false);
  const [openLunchInfo, setOpenLunchInfo] = useState(false);
  const [openDinnerInfo, setOpenDinnerInfo] = useState(false);
  const recommendationUserDataState = useSelector(recommendationUserData);
  const [descriptionTextSport, setDescriptionTextSport] = useState(
    "Для просмотра описания выберите вид спорта из списка!"
  );
  const [selectedSportItem, setSelectedSportItem] = useState(null);

  const [descriptionTextSportNoRec, setDescriptionTextSportNoRec] = useState(
    "Для просмотра описания выберите вид спорта из списка!"
  );
  const [selectedSportItemNoRec, setSelectedSportItemNoRec] = useState(null);

  const [selectedBreakfastItem, setSelectedBreakfastItem] = useState(null);

  const [descriptionTextBreakfast, setDescriptionTextBreakfast] = useState(
    "Для просмотра описания выбирите блюдо из списка!"
  );

  const [selectedLunchItem, setSelectedLunchItem] = useState(null);

  const [descriptionTextLunch, setDescriptionTextLunch] = useState(
    "Для просмотра описания выбирите блюдо из списка!"
  );
  const [selectedDinnerItem, setSelectedDinnerItem] = useState(null);

  const [descriptionTextDinner, setDescriptionTextDinner] = useState(
    "Для просмотра описания выбирите блюдо из списка!"
  );
  useEffect(() => {
    setLoading(true);
    dispatch(RetrieveRecommendationApiRequest())
      .then(unwrapResult)
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [route]);
  return (
    <DefaultBackground paddingTop={1}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <>
            <Box
              style={{ borderRadius: 12, padding: 16, marginTop: 16 }}
              _light={{
                backgroundColor: COLORS_LIGHT_THEME.WHITE_BLOCK,
              }}
              _dark={{
                backgroundColor: COLORS_DARK_THEME.DARK_BLOCK,
              }}
            >
              <RecSportHeader
                icon={MaterialIcons}
                text={"Рекомендуемый спорт"}
                iconName={"sports-kabaddi"}
              />
              {recommendationUserDataState.sport.length > 0 ? (
                <>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={recommendationUserDataState.sport}
                    ItemSeparatorComponent={() => (
                      <View style={{ width: 16 }} />
                    )}
                    renderItem={({ item }) => (
                      <SportListItem
                        item={item}
                        setText={setDescriptionTextSport}
                        setSelectedSportItem={setSelectedSportItem}
                        selectedSportItem={selectedSportItem}
                      />
                    )}
                  />
                  {openInfo && (
                    <RecSportAdditionalInfo text={descriptionTextSport} />
                  )}
                  <DropInfoButton open={openInfo} setOpen={setOpenInfo} />
                </>
              ) : (
                <Heading
                  _dark={{ color: COLORS_DARK_THEME.TEXT }}
                  _light={{ color: COLORS_LIGHT_THEME.TEXT }}
                  size={"sm"}
                  alignSelf={"center"}
                  mb={4}
                >
                  Отсутствует
                </Heading>
              )}
            </Box>
            <Box
              style={{ borderRadius: 12, padding: 16, marginTop: 16 }}
              _light={{
                backgroundColor: COLORS_LIGHT_THEME.WHITE_BLOCK,
              }}
              _dark={{
                backgroundColor: COLORS_DARK_THEME.DARK_BLOCK,
              }}
            >
              <RecSportHeader
                icon={MaterialIcons}
                text={"Нeрекомендуемый спорт"}
                iconName={"close"}
              />
              {recommendationUserDataState.no_rec_sport.length > 0 ? (
                <>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={recommendationUserDataState.no_rec_sport}
                    ItemSeparatorComponent={() => (
                      <View style={{ width: 16 }} />
                    )}
                    renderItem={({ item }) => (
                      <SportListItem
                        item={item}
                        setText={setDescriptionTextSportNoRec}
                        setSelectedSportItem={setSelectedSportItemNoRec}
                        selectedSportItem={selectedSportItemNoRec}
                      />
                    )}
                  />
                  {openNoRecSportInfo && (
                    <RecSportAdditionalInfo text={descriptionTextSportNoRec} />
                  )}
                  <DropInfoButton
                    open={openNoRecSportInfo}
                    setOpen={setOpenNoRecSportInfo}
                  />
                </>
              ) : (
                <Heading
                  _dark={{ color: COLORS_DARK_THEME.TEXT }}
                  _light={{ color: COLORS_LIGHT_THEME.TEXT }}
                  size={"sm"}
                  alignSelf={"center"}
                  mb={4}
                >
                  Отсутствует
                </Heading>
              )}
            </Box>

            <Box
              style={{ borderRadius: 12, padding: 16, marginTop: 16 }}
              _light={{
                backgroundColor: COLORS_LIGHT_THEME.WHITE_BLOCK,
              }}
              _dark={{
                backgroundColor: COLORS_DARK_THEME.DARK_BLOCK,
              }}
            >
              <RecSportHeader
                icon={MaterialIcons}
                text={"Завтрак"}
                iconName={"breakfast-dining"}
              />
              {recommendationUserDataState.breakfast.length > 0 ? (
                <>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={recommendationUserDataState.breakfast}
                    ItemSeparatorComponent={() => (
                      <View style={{ width: 16 }} />
                    )}
                    renderItem={({ item }) => (
                      <SportListItem
                        item={item}
                        setText={setDescriptionTextBreakfast}
                        setSelectedSportItem={setSelectedBreakfastItem}
                        selectedSportItem={selectedBreakfastItem}
                      />
                    )}
                  />
                  {openBreakfastInfo && (
                    <RecSportAdditionalInfo text={descriptionTextBreakfast} />
                  )}
                  <DropInfoButton
                    open={openBreakfastInfo}
                    setOpen={setOpenBreakfastInfo}
                  />
                </>
              ) : (
                <Heading
                  _dark={{ color: COLORS_DARK_THEME.TEXT }}
                  _light={{ color: COLORS_LIGHT_THEME.TEXT }}
                  size={"sm"}
                  alignSelf={"center"}
                  mb={4}
                >
                  Отсутствует
                </Heading>
              )}
            </Box>
            <Box
              style={{ borderRadius: 12, padding: 16, marginTop: 16 }}
              _light={{
                backgroundColor: COLORS_LIGHT_THEME.WHITE_BLOCK,
              }}
              _dark={{
                backgroundColor: COLORS_DARK_THEME.DARK_BLOCK,
              }}
            >
              <RecSportHeader
                icon={MaterialIcons}
                text={"Обед"}
                iconName={"lunch-dining"}
              />
              {recommendationUserDataState.lunch.length > 0 ? (
                <>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={recommendationUserDataState.lunch}
                    ItemSeparatorComponent={() => (
                      <View style={{ width: 16 }} />
                    )}
                    renderItem={({ item }) => (
                      <SportListItem
                        item={item}
                        setText={setDescriptionTextLunch}
                        setSelectedSportItem={setSelectedLunchItem}
                        selectedSportItem={selectedLunchItem}
                      />
                    )}
                  />
                  {openLunchInfo && (
                    <RecSportAdditionalInfo text={descriptionTextLunch} />
                  )}
                  <DropInfoButton
                    open={openLunchInfo}
                    setOpen={setOpenLunchInfo}
                  />
                </>
              ) : (
                <Heading
                  _dark={{ color: COLORS_DARK_THEME.TEXT }}
                  _light={{ color: COLORS_LIGHT_THEME.TEXT }}
                  size={"sm"}
                  alignSelf={"center"}
                  mb={4}
                >
                  Отсутствует
                </Heading>
              )}
            </Box>
            <Box
              style={{ borderRadius: 12, padding: 16, marginTop: 16 }}
              _light={{
                backgroundColor: COLORS_LIGHT_THEME.WHITE_BLOCK,
              }}
              _dark={{
                backgroundColor: COLORS_DARK_THEME.DARK_BLOCK,
              }}
            >
              <RecSportHeader
                icon={MaterialIcons}
                text={"Ужин"}
                iconName={"dinner-dining"}
              />
              {recommendationUserDataState.dinner.length > 0 ? (
                <>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={recommendationUserDataState.dinner}
                    ItemSeparatorComponent={() => (
                      <View style={{ width: 16 }} />
                    )}
                    renderItem={({ item }) => (
                      <SportListItem
                        item={item}
                        setText={setDescriptionTextDinner}
                        setSelectedSportItem={setSelectedDinnerItem}
                        selectedSportItem={selectedDinnerItem}
                      />
                    )}
                  />
                  {openLunchInfo && (
                    <RecSportAdditionalInfo text={descriptionTextDinner} />
                  )}
                  <DropInfoButton
                    open={openDinnerInfo}
                    setOpen={setOpenDinnerInfo}
                  />
                </>
              ) : (
                <Heading
                  _dark={{ color: COLORS_DARK_THEME.TEXT }}
                  _light={{ color: COLORS_LIGHT_THEME.TEXT }}
                  size={"sm"}
                  alignSelf={"center"}
                  mb={4}
                >
                  Отсутствует
                </Heading>
              )}
            </Box>
          </>
        )}
      </ScrollView>
    </DefaultBackground>
  );
}
