import { SportAreaOptionsConstList } from "../../../../../modules/SportAreaOptionsConstList";
import { useEffect, useState } from "react";
import { HStack, Icon, Text } from "native-base";

export default function Options({ data }) {
  const [dataList, setDataList] = useState([]);
  useEffect(() => {
    let dataList = [];
    data.options.map((value, index) => {
      let optionList = [];
      const item = SportAreaOptionsConstList.filter((el) => {
        const items = el.find((element) => element.value === value.name);
        if (items) {
          dataList = [...dataList, items];
        }
        return items;
      });
    });
    setDataList(dataList);
  }, []);
  console.log(dataList);
  return dataList.map((value, index) => {
    return (
      <HStack alignItems={"center"} space={4} marginY={1} key={index}>
        <Icon
          as={value.iconLib}
          textAlign={"center"}
          size={4}
          name={value.iconName}
          _light={{ color: "black" }}
          _dark={{ color: "white" }}
        />
        <Text>{value.value}</Text>
      </HStack>
    );
  });
}
