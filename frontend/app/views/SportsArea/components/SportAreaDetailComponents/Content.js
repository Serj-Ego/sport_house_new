import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
} from "react-native-reanimated";
import { StyleSheet, useColorScheme } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Box, Heading, HStack, Text, View } from "native-base";
import { MAX_HEADER_HEIGHT } from "../../../../modules/Theme/dimensions";
import React from "react";
import {
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
  ERROR,
} from "../../../../modules/Theme/colors";
import ActionPanel from "./ActionPanel";
import DetailBlock from "./ContentComponents/DetailBlock";
import Description from "./ContentComponents/Description";
import Images from "./ContentComponents/Images";
import { statusColorSwitch } from "../../../../modules/StatusColorSwitch";
import Options from "./ContentComponents/Options";
import { SPORT_AREA } from "../../../../modules/NavigationRoutes/sportArea";
import Statuses from "./ContentComponents/Statuses";
import WorkTime from "./ContentComponents/WorkTime";
import moment from "moment/moment";

export default function Content({ y, data }) {
  const colorScheme = useColorScheme();
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      y.value = e.contentOffset.y;
    },
  });
  const height = useAnimatedStyle(() => {
    const height = interpolate(
      y.value,
      [-MAX_HEADER_HEIGHT, 12],
      [0, MAX_HEADER_HEIGHT + 24],
      Extrapolate.CLAMP
    );

    return {
      height: height,
    };
  });
  const opacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      y.value,
      [-MAX_HEADER_HEIGHT / 2, 0, MAX_HEADER_HEIGHT / 2.5],
      [0, 1, 0],
      Extrapolate.CLAMP
    );

    return {
      opacity: opacity,
    };
  });
  return (
    <Animated.ScrollView
      onScroll={scrollHandler}
      style={styles.container}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={1}
    >
      <View style={styles.cover}>
        <Animated.View style={[styles.gradient, height]}>
          <LinearGradient
            style={StyleSheet.absoluteFill}
            start={[0, 0.1]}
            end={[0, 1]}
            colors={[
              "transparent",
              "rgba(0, 0, 0, 0.2)",
              colorScheme === "light"
                ? COLORS_LIGHT_THEME.BACKGROUND
                : COLORS_DARK_THEME.BACKGROUND,
            ]}
          />
        </Animated.View>
        <View style={styles.artistContainer}>
          <Animated.Text
            style={[
              styles.artist,
              opacity,
              { color: colorScheme === "light" ? "black" : "white" },
            ]}
            ellipsizeMode={"tail"}
            numberOfLines={2}
          >
            {data.short_name ? data.short_name : data.full_name}
          </Animated.Text>
          <Box
            style={[
              styles.statusContainer,
              {
                backgroundColor: data.is_blocked
                  ? ERROR.FLAT
                  : statusColorSwitch(data.last_status),
              },
            ]}
          >
            <Text color={"white"}>
              {data.is_blocked ? "Заблокирована" : data.last_status}
            </Text>
          </Box>
        </View>
      </View>
      <View
        style={[
          styles.tracks,
          {
            backgroundColor:
              colorScheme === "light"
                ? COLORS_LIGHT_THEME.BACKGROUND
                : COLORS_DARK_THEME.BACKGROUND,
          },
        ]}
      >
        <ActionPanel
          id={data.id}
          isBlocked={data.is_blocked}
          last_status={data.last_status}
        />
        <Description data={data.description} />
        <Images images={data.images} />
        <DetailBlock title={"Категория"}>
          <Heading size={"sm"}>{data.category}</Heading>
        </DetailBlock>
        <DetailBlock title={"Вид спорта"}>
          <Heading size={"sm"}>{data.sport_type}</Heading>
        </DetailBlock>
        <DetailBlock title={"Покрытие"}>
          <Heading size={"sm"}>{data.coating}</Heading>
        </DetailBlock>
        <DetailBlock title={"Освещение"}>
          <Heading size={"sm"}>{data.lighting}</Heading>
        </DetailBlock>
        <DetailBlock title={"Характеристика"}>
          <Options data={data} />
        </DetailBlock>
        <DetailBlock
          title={"История статусов"}
          viewAllButton={true}
          linkTo={SPORT_AREA.SPORT_AREA_OWNER_DETAIL_STATUSES.route}
          data={data.statuses}
        >
          <Statuses data={data} />
        </DetailBlock>
        <DetailBlock title={"Время работы"}>
          <WorkTime data={data.work_time} />
        </DetailBlock>
        <HStack space={"2%"}>
          <DetailBlock title={"Длина"} width={"49%"}>
            <Heading size={"sm"}>{data.length} м</Heading>
          </DetailBlock>
          <DetailBlock title={"Ширина"} width={"49%"}>
            <Heading size={"sm"}>{data.width} м</Heading>
          </DetailBlock>
        </HStack>
        <HStack space={"2%"}>
          <DetailBlock title={"Стоимость"} width={"49%"}>
            <Heading size={"sm"}>{data.price} ₽</Heading>
          </DetailBlock>
          <DetailBlock title={"Площадь"} width={"49%"}>
            <Heading size={"sm"}>{data.squad} м2</Heading>
          </DetailBlock>
        </HStack>
        <DetailBlock title={"Номер телефона"}>
          <Heading size={"sm"}>{data.phone}</Heading>
        </DetailBlock>
        <HStack space={"2%"}>
          <DetailBlock title={"Доп. Номер телефона"} width={"68%"}>
            <Heading size={"sm"}>{data.additional_phone}</Heading>
          </DetailBlock>
          <DetailBlock title={"Доб."} width={"30%"}>
            <Heading size={"sm"}>{data.additional_phone_code}</Heading>
          </DetailBlock>
        </HStack>
        <DetailBlock title={"E-mail"}>
          <Heading size={"sm"}>{data.email}</Heading>
        </DetailBlock>
        <DetailBlock title={"Веб-сайт"}>
          <Heading size={"sm"}>{data.web_site}</Heading>
        </DetailBlock>
        <DetailBlock title={"Адрес"}>
          <Text fontSize={"md"}>
            {data?.address?.thoroughfare},{data?.address?.subThoroughfare}
          </Text>
          <Text fontSize={"md"}>{data?.address?.locality}</Text>
          <Text fontSize={"md"}>{data?.address?.country}</Text>
          <Text fontSize={"md"}>{data?.address?.postalCode}</Text>
        </DetailBlock>
        <Text fontSize={"md"} textAlign={"center"} color={"gray.500"}>
          Создатель: {data.owner}
        </Text>
        <Text fontSize={"md"} textAlign={"center"} color={"gray.500"}>
          Дата создания:{" "}
          {moment(data.created_date).format("DD-MM-YYYY hh:mm:ss")}
        </Text>
      </View>
    </Animated.ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    marginBottom: 20,
  },
  cover: {
    height: MAX_HEADER_HEIGHT - 120,
  },
  gradient: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: "center",
  },
  artistContainer: {
    ...StyleSheet.absoluteFillObject,
    bottom: 0,
    left: 24,
    right: 24,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  artist: {
    // textAlign: "center",
    // color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
  tracks: {
    paddingTop: 32,
    paddingHorizontal: 12,
    height: "100%",
  },
  statusContainer: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 100,
    marginTop: 12,
  },
});
