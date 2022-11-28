import { Box, HStack, Text } from "native-base";
import { statusColorSwitch } from "../../../../../modules/StatusColorSwitch";
import { Spacer } from "native-base/src/components/primitives/Flex";
import moment from "moment";
import React from "react";

export default function Statuses({ data }) {
  return data.statuses.slice(0, 3).map((value, index) => {
    return (
      <HStack space={4} marginY={1} alignItems={"center"} key={index}>
        <Box
          style={{
            height: 8,
            width: 8,
            backgroundColor: statusColorSwitch(value.status),
            borderRadius: 100,
          }}
        />
        <Text style={{ fontWeight: "400", fontSize: 14 }}>{value.status}</Text>
        <Spacer />
        <Text style={{ fontWeight: "300", fontSize: 12 }} color={"gray.500"}>
          {moment(value.created_date).format("DD-MM-YYYY hh:mm")}
        </Text>
      </HStack>
    );
  });
}
