import { Heading, Image, View } from "native-base";
import { HEIGHT, WIDTH } from "../../../../modules/Theme/dimensions";
import React from "react";
import SportAreaPhoneNumber from "./components/SportAreaPhoneNumber";
import SportAreaAdditionalPhoneNumber from "./components/SportAreaAdditionalPhoneNumber";
import SportAreaEmail from "./components/SportAreaEmail";
import SportAreaWebSite from "./components/SportAreaWebSite";

export default function SportAreaContacts() {
  return (
    <View justifyContent={"space-around"}>
      <Image
        alt={"location"}
        style={{ resizeMode: "contain", alignSelf: "center" }}
        source={require("../../../../assets/add_sport_area/contacts.png")}
        size={HEIGHT / 4}
      />
      <View style={{ width: WIDTH, paddingHorizontal: 12 }}>
        <Heading>Контактная информация объекта</Heading>
        <SportAreaPhoneNumber />
        <SportAreaAdditionalPhoneNumber />
        <SportAreaEmail />
        <SportAreaWebSite />
      </View>
    </View>
  );
}
