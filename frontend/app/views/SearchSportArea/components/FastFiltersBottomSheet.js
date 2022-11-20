import { Avatar, Box, Heading, HStack, Text, View } from "native-base";
import { COLOR_ACCENT, COLORS_FORM } from "../../../modules/Theme/colors";
import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { FastFilterConst } from "../../../modules/FastFilterConst";
import { FilterSportAreaContext } from "../index";

const FilterTypeConst = [
  {
    id: 1,
    name: "Площадка",
    slug: FastFilterConst.SPORT_AREA,
    img: require("../../../assets/fast_filter/003-place.png"),
  },
  {
    id: 2,
    name: "Тренер",
    slug: FastFilterConst.COACH,
    img: require("../../../assets/fast_filter/001-coach.png"),
  },
  {
    id: 3,
    name: "Команда",
    slug: FastFilterConst.TEAM,
    img: require("../../../assets/fast_filter/002-baseball-team.png"),
  },
];

export default function FastFiltersBottomSheet() {
  const { filterType, setFilterType } = useContext(FilterSportAreaContext);
  return (
    <View style={{ marginLeft: 10, marginRight: 10 }}>
      <Heading
        size={"sm"}
        style={{ marginTop: 14 }}
        _light={{ color: COLORS_FORM.PLACEHOLDER }}
        _dark={{ color: COLORS_FORM.PLACEHOLDER }}
      >
        Тип поиска
      </Heading>
      <HStack space={"2%"}>
        {FilterTypeConst.map((item) => {
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                setFilterType(item.slug);
              }}
              disabled={filterType === item.slug}
              style={{
                height: 95,
                width: "32%",
              }}
            >
              <Box
                key={item.id}
                style={[
                  {
                    borderRadius: 12,
                    marginTop: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  filterType === item.slug && {
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderColor: COLOR_ACCENT.ACCENT,
                  },
                ]}
                _light={{ backgroundColor: COLORS_FORM.INPUT }}
                _dark={{ backgroundColor: COLORS_FORM.DARK_INPUT }}
              >
                <Avatar
                  style={{ backgroundColor: "rgba(255,255,255,0)" }}
                  alignSelf="center"
                  size="lg"
                  source={item.img}
                ></Avatar>
                <Text>{item.name}</Text>
              </Box>
            </TouchableOpacity>
          );
        })}
      </HStack>
    </View>
  );
}
