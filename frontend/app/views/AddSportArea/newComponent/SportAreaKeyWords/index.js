import { Box, Heading, HStack, Icon, Image, Input, View } from "native-base";
import { HEIGHT, WIDTH } from "../../../../modules/Theme/dimensions";
import React, { useContext, useState } from "react";
import {
  COLORS_DARK_THEME,
  COLORS_FORM,
  COLORS_LIGHT_THEME,
  ERROR,
  PRIMARY_GRADIENT,
} from "../../../../modules/Theme/colors";
import { LinearGradient } from "expo-linear-gradient";
import { PADDING_LR_MAIN } from "../../../../modules/Theme/padding";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { ScrollView, TouchableWithoutFeedback } from "react-native";
import { addSportAreaContext } from "../../../../navigation/AdditionalStack";
import { Spacer } from "native-base/src/components/primitives/Flex";

export default function SportAreaKeyWords() {
  const { keywords, setKeyWords } = useContext(addSportAreaContext);
  const [word, setWord] = useState("");
  const addKeyWord = () => {
    if (word.length > 0) {
      setKeyWords([...keywords, word]);
      setWord("");
    }
  };
  return (
    <View justifyContent={"space-around"}>
      <Image
        alt={"location"}
        style={{ resizeMode: "contain", alignSelf: "center" }}
        source={require("../../../../assets/add_sport_area/keywords.png")}
        size={HEIGHT / 4}
      />
      <View style={{ width: WIDTH, paddingHorizontal: 12, height: "60%" }}>
        <Heading>Ключевые слова</Heading>
        <Heading size={"xs"}>Не более 10-ти</Heading>
        <HStack space={"2%"} marginY={4}>
          <Input
            value={word}
            height={55}
            maxWidth={"70%"}
            width={"100%"}
            borderRadius={12}
            variant="filled"
            textAlign={"left"}
            fontWeight={"bold"}
            isDisabled={keywords.length === 10}
            fontSize={16}
            placeholder={"Ключевое слово"}
            placeholderTextColor={COLORS_FORM.PLACEHOLDER}
            clearButtonMode="always"
            keyboardType={"default"}
            maxLength={11}
            _focus={{
              borderColor: "rgba(255,255,255,0)",
            }}
            paddingLeft={6}
            paddingRight={6}
            _light={{
              backgroundColor: COLORS_FORM.INPUT,
              color: COLORS_LIGHT_THEME.TEXT,
            }}
            _dark={{
              color: COLORS_DARK_THEME.TEXT,
              backgroundColor: COLORS_FORM.DARK_INPUT,
            }}
            onChangeText={(value) => {
              setWord(value);
            }}
          />
          <TouchableWithoutFeedback
            onPress={addKeyWord}
            disabled={keywords.length === 10 || word.length === 0}
          >
            <LinearGradient
              colors={[PRIMARY_GRADIENT.START, PRIMARY_GRADIENT.END]}
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={{
                height: 55,
                width: "28%",
                borderRadius: 12,
                alignItems: "center",
                justifyContent: "center",
                padding: PADDING_LR_MAIN,
              }}
            >
              <HStack space={2}>
                <AntDesign name="enter" size={24} color="white" />
              </HStack>
            </LinearGradient>
          </TouchableWithoutFeedback>
        </HStack>
        <ScrollView style={{ height: "30%", borderRadius: 12 }}>
          {keywords.map((value, index) => {
            return (
              <Box
                style={{
                  borderStyle: "solid",
                  borderRadius: 12,
                  borderColor: "gray",
                  borderWidth: 1,
                  height: 55,
                  justifyContent: "center",
                  marginVertical: 4,
                  paddingHorizontal: 12,
                }}
                key={index}
              >
                <HStack alignItems={"center"}>
                  <Heading size={"sm"} textAlign={"center"}>
                    {value}
                  </Heading>
                  <Spacer />
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setKeyWords(keywords.filter((el) => el !== value));
                    }}
                  >
                    <Icon
                      as={Ionicons}
                      textAlign={"center"}
                      size={7}
                      name="ios-remove-circle"
                      color={ERROR.FLAT}
                    />
                  </TouchableWithoutFeedback>
                </HStack>
              </Box>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}
