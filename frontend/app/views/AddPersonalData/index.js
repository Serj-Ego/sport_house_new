import React, { useRef, useState } from "react";
import { WIDTH } from "../../modules/Theme/dimensions";
import { ActivityIndicator, FlatList, InputAccessoryView } from "react-native";
import PersonalDataCardItem from "./components/PersonalDataCardItem";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import {
  COLORS_DARK_THEME,
  COLORS_FORM,
  COLORS_LIGHT_THEME,
} from "../../modules/Theme/colors";
import { Box, CheckIcon, Input, Progress, Select, Switch } from "native-base";
import ScreenHeader from "../../components/ScreenHeader";
import { PADDING_LR_MAIN } from "../../modules/Theme/padding";
import NextButton from "../Onboarding/components/NextButton";
import FinishButton from "./components/FinishButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import NextAccessoryButton from "./components/NextAccessoryButton";

export default function AddPersonalData({ route }) {
  const refSlider = useRef(null);
  const [loading, setLoading] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [personalData, setPersonalData] = useState({
    gender: 0,
    age: null,
    weight: 50,
    height: 50,
    physical_training: "Средний",
    meat: false,
    fish: false,
    milk: false,
    egg: false,
    allergy_citrus: false,
    allergy_nut: false,
    allergy_honey: false,
    musculoskeletal_system: false,
    diabetes: false,
    health: false,
    varicose: false,
    epilepsy: false,
    myopia: false,
    breath: false,
    digestion: false,
    sport_type: "Игровой",
    training_type: "Индивидуальная",
  });
  const updateCurrentSlideIndex = (e) => {
    const currentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(currentOffsetX / WIDTH);
    setCurrentSlideIndex(currentIndex);
  };
  const SlidersData = [
    {
      image: require("../../assets/personal_data/gender.png"),
      title: "Укажите Ваш пол",
      components: (
        <SegmentedControl
          values={["Мужской", "Женский"]}
          selectedIndex={personalData.gender}
          style={{ height: 40, marginBottom: 18 }}
          onChange={(event) => {
            setPersonalData({
              ...personalData,
              gender: event.nativeEvent.selectedSegmentIndex,
            });
          }}
        />
      ),
    },
    {
      image: require("../../assets/personal_data/age-group.png"),
      title: "Укажите Ваш возраст",
      components: (
        <Input
          height={55}
          marginBottom={4}
          width={"100%"}
          borderRadius={12}
          variant="filled"
          value={personalData.age}
          textAlign={"left"}
          fontWeight={"bold"}
          fontSize={16}
          placeholder={"Возраст"}
          keyboardType={"number-pad"}
          placeholderTextColor={COLORS_FORM.PLACEHOLDER}
          clearButtonMode="always"
          _focus={{
            borderColor: "rgba(255,255,255,0)",
          }}
          inputAccessoryViewID={"next"}
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
            setPersonalData({
              ...personalData,
              age: value,
            });
          }}
        />
      ),
    },
    {
      image: require("../../assets/personal_data/001-height.png"),
      title: "Укажите Ваш рост",
      components: (
        <Input
          height={55}
          marginBottom={4}
          width={"100%"}
          borderRadius={12}
          variant="filled"
          value={personalData.height}
          textAlign={"left"}
          fontWeight={"bold"}
          fontSize={16}
          placeholder={"Рост"}
          keyboardType={"number-pad"}
          placeholderTextColor={COLORS_FORM.PLACEHOLDER}
          clearButtonMode="always"
          inputAccessoryViewID={"next"}
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
            setPersonalData({
              ...personalData,
              height: value,
            });
          }}
        />
      ),
    },
    {
      image: require("../../assets/personal_data/002-body-scale.png"),
      title: "Укажите Ваш вес",
      components: (
        <Input
          height={55}
          marginBottom={4}
          width={"100%"}
          borderRadius={12}
          variant="filled"
          value={personalData.weight}
          textAlign={"left"}
          fontWeight={"bold"}
          fontSize={16}
          placeholder={"Вес"}
          keyboardType={"number-pad"}
          placeholderTextColor={COLORS_FORM.PLACEHOLDER}
          clearButtonMode="always"
          inputAccessoryViewID={"next"}
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
            setPersonalData({
              ...personalData,
              weight: value,
            });
          }}
        />
      ),
    },
    {
      image: require("../../assets/personal_data/physical_traning.png"),
      title: "Укажите Вашу физическую подготовку",
      components: (
        <Select
          selectedValue={personalData.physical_training}
          minWidth="100%"
          height="60"
          placeholder="..."
          _selectedItem={{
            endIcon: <CheckIcon size="5" />,
          }}
          onValueChange={(itemValue) =>
            setPersonalData({
              ...personalData,
              physical_training: itemValue,
            })
          }
        >
          <Select.Item label="Минимальный" value="Минимальный" />
          <Select.Item label="Слабый" value="Слабый" />
          <Select.Item label="Средний" value="Средний" />
          <Select.Item label="Высокий" value="Высокий" />
          <Select.Item label="Экстра" value="Экстра" />
        </Select>
      ),
    },
    {
      image: require("../../assets/personal_data/meat.png"),
      title: "Употребляете в пище мясо?",
      components: (
        <Switch
          style={{ alignSelf: "center" }}
          colorScheme="green"
          defaultIsChecked={personalData.meat}
          size="lg"
          onValueChange={(value) =>
            setPersonalData({
              ...personalData,
              meat: value,
            })
          }
        />
      ),
    },
    {
      image: require("../../assets/personal_data/fish.png"),
      title: "Употребляете в пище рыбу?",
      components: (
        <Switch
          style={{ alignSelf: "center" }}
          colorScheme="green"
          defaultIsChecked={personalData.fish}
          size="lg"
          onValueChange={(value) =>
            setPersonalData({
              ...personalData,
              fish: value,
            })
          }
        />
      ),
    },
    {
      image: require("../../assets/personal_data/milk.png"),
      title: "Употребляете молочную продукцию?",
      components: (
        <Switch
          style={{ alignSelf: "center" }}
          colorScheme="green"
          defaultIsChecked={personalData.milk}
          size="lg"
          onValueChange={(value) =>
            setPersonalData({
              ...personalData,
              milk: value,
            })
          }
        />
      ),
    },
    {
      image: require("../../assets/personal_data/egg.png"),
      title: "Употребляете в пище яйца?",
      components: (
        <Switch
          style={{ alignSelf: "center" }}
          colorScheme="green"
          defaultIsChecked={personalData.egg}
          size="lg"
          onValueChange={(value) =>
            setPersonalData({
              ...personalData,
              egg: value,
            })
          }
        />
      ),
    },
    {
      image: require("../../assets/personal_data/citrus.png"),
      title: "Имеется ли аллергия на цитрусовые?",
      components: (
        <Switch
          style={{ alignSelf: "center" }}
          colorScheme="green"
          defaultIsChecked={personalData.allergy_citrus}
          size="lg"
          onValueChange={(value) =>
            setPersonalData({
              ...personalData,
              allergy_citrus: value,
            })
          }
        />
      ),
    },
    {
      image: require("../../assets/personal_data/nut.png"),
      title: "Имеется ли аллергия на орехи?",
      components: (
        <Switch
          style={{ alignSelf: "center" }}
          colorScheme="green"
          defaultIsChecked={personalData.allergy_nut}
          size="lg"
          onValueChange={(value) =>
            setPersonalData({
              ...personalData,
              allergy_nut: value,
            })
          }
        />
      ),
    },
    {
      image: require("../../assets/personal_data/honey.png"),
      title: "Имеется ли аллергия на мед?",
      components: (
        <Switch
          style={{ alignSelf: "center" }}
          colorScheme="green"
          defaultIsChecked={personalData.allergy_honey}
          size="lg"
          onValueChange={(value) =>
            setPersonalData({
              ...personalData,
              allergy_honey: value,
            })
          }
        />
      ),
    },
    {
      image: require("../../assets/personal_data/musculo.png"),
      title: "Имеются ли заболевания опорно-двигательного аппарата?",
      components: (
        <Switch
          style={{ alignSelf: "center" }}
          colorScheme="green"
          defaultIsChecked={personalData.musculoskeletal_system}
          size="lg"
          onValueChange={(value) =>
            setPersonalData({
              ...personalData,
              musculoskeletal_system: value,
            })
          }
        />
      ),
    },
    {
      image: require("../../assets/personal_data/diabetes.png"),
      title: "Имеются ли заболевания диабетом?",
      components: (
        <Switch
          style={{ alignSelf: "center" }}
          colorScheme="green"
          defaultIsChecked={personalData.diabetes}
          size="lg"
          onValueChange={(value) =>
            setPersonalData({
              ...personalData,
              diabetes: value,
            })
          }
        />
      ),
    },
    {
      image: require("../../assets/personal_data/health.png"),
      title: "Имеются ли заболевания сердечно-сосудистого аппарата?",
      components: (
        <Switch
          style={{ alignSelf: "center" }}
          colorScheme="green"
          defaultIsChecked={personalData.health}
          size="lg"
          onValueChange={(value) =>
            setPersonalData({
              ...personalData,
              health: value,
            })
          }
        />
      ),
    },
    {
      image: require("../../assets/personal_data/varicose.png"),
      title: "Имеется ли варикозное расширение вен?",
      components: (
        <Switch
          style={{ alignSelf: "center" }}
          colorScheme="green"
          defaultIsChecked={personalData.varicose}
          size="lg"
          onValueChange={(value) =>
            setPersonalData({
              ...personalData,
              varicose: value,
            })
          }
        />
      ),
    },
    {
      image: require("../../assets/personal_data/epilepsy.png"),
      title: "Имеется ли признаки эпилепсии?",
      components: (
        <Switch
          style={{ alignSelf: "center" }}
          colorScheme="green"
          defaultIsChecked={personalData.epilepsy}
          size="lg"
          onValueChange={(value) =>
            setPersonalData({
              ...personalData,
              epilepsy: value,
            })
          }
        />
      ),
    },
    {
      image: require("../../assets/personal_data/myopia.png"),
      title: "Имеется ли признаки близорукости?",
      components: (
        <Switch
          style={{ alignSelf: "center" }}
          colorScheme="green"
          defaultIsChecked={personalData.myopia}
          size="lg"
          onValueChange={(value) =>
            setPersonalData({
              ...personalData,
              myopia: value,
            })
          }
        />
      ),
    },
    {
      image: require("../../assets/personal_data/breath.png"),
      title: "Имеются ли заболевания органов дыхания?",
      components: (
        <Switch
          style={{ alignSelf: "center" }}
          colorScheme="green"
          defaultIsChecked={personalData.breath}
          size="lg"
          onValueChange={(value) =>
            setPersonalData({
              ...personalData,
              breath: value,
            })
          }
        />
      ),
    },
    {
      image: require("../../assets/personal_data/digestion.png"),
      title: "Имеются ли заболевания органов пищеварения?",
      components: (
        <Switch
          style={{ alignSelf: "center" }}
          colorScheme="green"
          defaultIsChecked={personalData.digestion}
          size="lg"
          onValueChange={(value) =>
            setPersonalData({
              ...personalData,
              digestion: value,
            })
          }
        />
      ),
    },
    {
      image: require("../../assets/personal_data/sports.png"),
      title: "Укажите вид спорта",
      components: (
        <Select
          selectedValue={personalData.sport_type}
          minWidth="100%"
          height="60"
          placeholder="..."
          _selectedItem={{
            endIcon: <CheckIcon size="5" />,
          }}
          onValueChange={(itemValue) =>
            setPersonalData({
              ...personalData,
              sport_type: itemValue,
            })
          }
        >
          <Select.Item label="Игровой" value="Игровой" />
          <Select.Item label="Неигровой" value="Неигровой" />
        </Select>
      ),
    },
    {
      image: require("../../assets/personal_data/coach.png"),
      title: "Укажите вид тренировки",
      components: (
        <Select
          selectedValue={personalData.training_type}
          minWidth="100%"
          height="60"
          placeholder="..."
          _selectedItem={{
            endIcon: <CheckIcon size="5" />,
          }}
          onValueChange={(itemValue) =>
            setPersonalData({
              ...personalData,
              training_type: itemValue,
            })
          }
        >
          <Select.Item label="Индивидуальная" value="Индивидуальная" />
          <Select.Item label="Командная" value="Командная" />
        </Select>
      ),
    },
  ];
  return (
    <Box
      _light={{
        backgroundColor: COLORS_LIGHT_THEME.BACKGROUND,
      }}
      _dark={{
        backgroundColor: COLORS_DARK_THEME.BACKGROUND,
      }}
      style={{
        flex: 1,
        paddingTop: 24,
      }}
    >
      <Box
        style={{ paddingLeft: PADDING_LR_MAIN, paddingRight: PADDING_LR_MAIN }}
      >
        <ScreenHeader title={route.params.header} />
      </Box>
      <KeyboardAwareScrollView
        extraScrollHeight={55}
        contentContainerStyle={{ height: "100%" }}
      >
        <FlatList
          ref={refSlider}
          pagingEnabled
          data={SlidersData}
          onMomentumScrollEnd={updateCurrentSlideIndex}
          contentContainerStyle={{ height: "100%" }}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={({ item }) => <PersonalDataCardItem item={item} />}
        />
      </KeyboardAwareScrollView>
      {currentSlideIndex === SlidersData.length - 1 ? (
        loading ? (
          <ActivityIndicator />
        ) : (
          <FinishButton data={personalData} setLoading={setLoading} />
        )
      ) : (
        <>
          <Progress
            colorScheme="warning"
            value={(currentSlideIndex / (SlidersData.length - 1)) * 100}
          />
          <NextButton
            setCurrentSlideIndex={setCurrentSlideIndex}
            currentSlideIndex={currentSlideIndex}
            refSlider={refSlider}
          />
          <InputAccessoryView nativeID={"next"}>
            <NextAccessoryButton
              setCurrentSlideIndex={setCurrentSlideIndex}
              currentSlideIndex={currentSlideIndex}
              refSlider={refSlider}
            />
          </InputAccessoryView>
        </>
      )}
    </Box>
  );
}
