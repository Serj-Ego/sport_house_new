import { Heading, Image, View, VStack } from "native-base";
import { HEIGHT, WIDTH } from "../../../../modules/Theme/dimensions";
import React, { useContext } from "react";
import WeekItem from "./components/WeekItem";
import { ScrollView } from "react-native";
import { addSportAreaContext } from "../../../../navigation/AdditionalStack";

const weekNameConst = [
  { id: 1, value: "Понедельник" },
  { id: 2, value: "Вторник" },
  { id: 3, value: "Среда" },
  { id: 4, value: "Четверг" },
  { id: 5, value: "Пятница" },
  { id: 6, value: "Суббота" },
  { id: 7, value: "Воскресенье" },
];

export default function SportAreaWorkTime() {
  const { workTime } = useContext(addSportAreaContext);
  return (
    <View justifyContent={"space-around"}>
      <Image
        alt={"location"}
        style={{ resizeMode: "contain", alignSelf: "center" }}
        source={require("../../../../assets/add_sport_area/work_time1.png")}
        size={HEIGHT / 6}
      />
      <View style={{ width: WIDTH, paddingHorizontal: 12 }}>
        <Heading>Режим работы</Heading>
        <ScrollView style={{ height: "70%" }}>
          <VStack marginTop={4}>
            {workTime.map((value, index) => (
              <WeekItem item={value} index={index} />
            ))}
          </VStack>
        </ScrollView>
      </View>
    </View>
  );
}
