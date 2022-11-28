import { Text } from "native-base";
import DetailBlock from "./DetailBlock";
import React from "react";

export default function Description({ data }) {
  return (
    <DetailBlock title={"Описание"}>
      <Text fontWeight={400} fontSize={15}>
        {data}
      </Text>
    </DetailBlock>
  );
}
