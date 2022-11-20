import { Divider, Text } from "native-base";
import React from "react";

export default function RecSportAdditionalInfo({ text }) {
  return (
    <>
      <Divider />
      <Text style={{ paddingTop: 16 }}>{text}</Text>
    </>
  );
}
