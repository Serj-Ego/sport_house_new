import { HEIGHT, WIDTH } from "../../../modules/Theme/dimensions";
import { PADDING_LR_MAIN } from "../../../modules/Theme/padding";
import SectionHeader from "../components/SectionHeader";
import { Box, HStack, Text, View } from "native-base";
import WeekSelector from "../components/WeekSelector";
import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { addSportAreaContext } from "../../../navigation/AdditionalStack";
import { useDispatch } from "react-redux";
import {
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
} from "../../../modules/Theme/colors";
import { SportAreaCreateApiRequest } from "../../../services/redux/slices/sportAreaSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigation } from "@react-navigation/native";

export default function WorkTimeSection() {
  const context = useContext(addSportAreaContext);
  const [countSelector, setCountSelector] = useState([0]);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  return (
    <View
      style={{
        width: WIDTH - PADDING_LR_MAIN - PADDING_LR_MAIN,
        height: HEIGHT,
      }}
    >
      <SectionHeader
        header={"Режим работы"}
        description={
          "Выберите дни и часы работы/перерывов вашей спортивной площадки"
        }
        image={require("../../../assets/add_sport_area/work_time.png")}
      />
      <Box style={{ height: HEIGHT / 2.2 }}>
        <ScrollView>
          {countSelector.map((value, index) => {
            return (
              <WeekSelector
                key={index}
                indexSelector={index}
                counter={countSelector}
                setCounter={setCountSelector}
                value={value}
              />
            );
          })}
          {/*<TouchableOpacity*/}
          {/*  onPress={() => {*/}
          {/*    if (countSelector.length < 7) {*/}
          {/*      setCountSelector([...countSelector, ...[countSelector + 1]]);*/}
          {/*      context.setWorkTime([*/}
          {/*        ...context.workTime,*/}
          {/*        ...[*/}
          {/*          {*/}
          {/*            id: countSelector + 1,*/}
          {/*            weeks: [],*/}
          {/*            startTime: moment(),*/}
          {/*            endTime: moment(),*/}
          {/*          },*/}
          {/*        ],*/}
          {/*      ]);*/}
          {/*    }*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <Box*/}
          {/*    style={{*/}
          {/*      minWidth: "100%",*/}
          {/*      height: 55,*/}
          {/*      borderRadius: 12,*/}
          {/*      borderWidth: 1,*/}
          {/*      borderStyle: "dashed",*/}
          {/*      alignItems: "center",*/}
          {/*      justifyContent: "center",*/}
          {/*      padding: PADDING_LR_MAIN,*/}
          {/*    }}*/}
          {/*    _light={{*/}
          {/*      borderColor: COLORS_DARK_THEME.DARK_BLOCK,*/}
          {/*    }}*/}
          {/*    _dark={{*/}
          {/*      borderColor: COLORS_LIGHT_THEME.WHITE_BLOCK,*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    <HStack space={2}>*/}
          {/*      <Text*/}
          {/*        _light={{ color: COLORS_LIGHT_THEME.TEXT }}*/}
          {/*        _dark={{ color: COLORS_DARK_THEME.TEXT }}*/}
          {/*      >*/}
          {/*        +*/}
          {/*      </Text>*/}
          {/*    </HStack>*/}
          {/*  </Box>*/}
          {/*</TouchableOpacity>*/}
        </ScrollView>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <TouchableOpacity
            onPress={() => {
              setIsLoading(true);
              dispatch(SportAreaCreateApiRequest(context))
                .then(unwrapResult)
                .then((res) => {
                  setIsLoading(false);
                  navigation.goBack();
                })
                .catch((err) => {
                  Alert.alert("Ошибка! Заполните:", err?.error[0]);
                  setIsLoading(false);
                });
            }}
          >
            <Box
              style={{
                minWidth: "100%",
                height: 55,
                borderRadius: 12,
                borderWidth: 1,
                borderStyle: "solid",
                alignItems: "center",
                justifyContent: "center",
                padding: PADDING_LR_MAIN,
              }}
              _light={{
                borderColor: COLORS_DARK_THEME.DARK_BLOCK,
              }}
              _dark={{
                borderColor: COLORS_LIGHT_THEME.WHITE_BLOCK,
              }}
            >
              <HStack space={2}>
                <Text
                  _light={{ color: COLORS_LIGHT_THEME.TEXT }}
                  _dark={{ color: COLORS_DARK_THEME.TEXT }}
                >
                  Cоздать
                </Text>
              </HStack>
            </Box>
          </TouchableOpacity>
        )}
      </Box>
    </View>
  );
}
