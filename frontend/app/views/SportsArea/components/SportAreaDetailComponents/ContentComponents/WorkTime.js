import { HStack, Text } from "native-base";
import { Spacer } from "native-base/src/components/primitives/Flex";
import moment from "moment";

export default function WorkTime({ data }) {
  return data.map((value, index) => {
    console.log(value);
    return (
      <HStack key={index}>
        <Text>{value.week_name}</Text>
        <Spacer />
        {value.start_date && value.end_date ? (
          <>
            <Text>{moment(value.start_date).format("hh:mm")}</Text>
            <Text>-</Text>
            <Text>{moment(value.end_date).format("hh:mm")}</Text>
          </>
        ) : (
          <Text>Выходной</Text>
        )}
      </HStack>
    );
  });
}
