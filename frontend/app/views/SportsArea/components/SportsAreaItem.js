import {
  AspectRatio,
  Badge,
  Box,
  Divider,
  Heading,
  HStack,
  Image,
  Text,
} from "native-base";
import {
  COLORS_DARK_THEME,
  COLORS_FORM,
  COLORS_LIGHT_THEME,
} from "../../../modules/Theme/colors";
import { PADDING_LR_MAIN } from "../../../modules/Theme/padding";
import { WIDTH } from "../../../modules/Theme/dimensions";
import React, { useRef, useState } from "react";
import { FlatList } from "react-native";
import { MediaUrl } from "../../../modules/MediaUrl";
import { StatusConst } from "../../../modules/StatusConst";
import SentToReviewButton from "./SentToReviewButton";

export default function SportsAreaItem({ item }) {
  const refSlider = useRef(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const updateCurrentSlideIndex = (e) => {
    const currentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(currentOffsetX / WIDTH);
    setCurrentSlideIndex(currentIndex);
  };

  const statusColor = (statusName) => {
    switch (statusName) {
      case StatusConst.CREATED:
        return "info";
      case StatusConst.REVIEW:
        return "warning";
      case StatusConst.CONFIRMED:
        return "success";
      case StatusConst.REJECTED:
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box
      style={{
        width: "100%",
        borderRadius: 12,
        // padding: PADDING_LR_MAIN,
        marginBottom: PADDING_LR_MAIN,
      }}
      _light={{ backgroundColor: COLORS_LIGHT_THEME.WHITE_BLOCK }}
      _dark={{ backgroundColor: COLORS_DARK_THEME.DARK_BLOCK }}
    >
      <FlatList
        ref={refSlider}
        data={item.images}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={updateCurrentSlideIndex}
        style={{ width: WIDTH - PADDING_LR_MAIN - PADDING_LR_MAIN }}
        renderItem={({ item }) => {
          return (
            <AspectRatio
              w={WIDTH - PADDING_LR_MAIN - PADDING_LR_MAIN}
              ratio={16 / 9}
            >
              <Image
                alt={"photo"}
                borderTopLeftRadius={12}
                borderTopRightRadius={12}
                source={{
                  uri: MediaUrl(item.uri),
                }}
              />
            </AspectRatio>
          );
        }}
      />
      {item.images.length > 0 && (
        <HStack
          justifyContent={"center"}
          marginBottom={2}
          marginTop={2}
          alignItems={"center"}
        >
          {item.images.map((value, index) => {
            return (
              <Box
                key={index}
                style={{
                  width: currentSlideIndex === index ? 7 : 5,
                  height: currentSlideIndex === index ? 7 : 5,
                  margin: 2,
                  borderRadius: 10,
                }}
                _light={{
                  backgroundColor:
                    currentSlideIndex === index
                      ? COLORS_DARK_THEME.DARK_BLOCK
                      : COLORS_FORM.PLACEHOLDER,
                }}
                _dark={{
                  backgroundColor:
                    currentSlideIndex === index
                      ? COLORS_LIGHT_THEME.WHITE_BLOCK
                      : COLORS_FORM.PLACEHOLDER,
                }}
              />
            );
          })}
        </HStack>
      )}
      <Box
        style={{
          paddingLeft: PADDING_LR_MAIN,
          paddingRight: PADDING_LR_MAIN,
          paddingBottom: PADDING_LR_MAIN,
        }}
      >
        <Heading
          _light={{ color: COLORS_LIGHT_THEME.TEXT }}
          _dark={{ color: COLORS_DARK_THEME.TEXT }}
          size={"md"}
        >
          {item.name}
        </Heading>
        <Text
          _light={{ color: COLORS_LIGHT_THEME.TEXT }}
          _dark={{ color: COLORS_DARK_THEME.TEXT }}
        >
          {item.description}
        </Text>

        <Badge
          borderRadius={12}
          height={10}
          marginTop={2}
          colorScheme={statusColor(item.last_status)}
        >
          {item.last_status}
        </Badge>
        {item.last_status === StatusConst.REJECTED && (
          <Text textAlign={"center"}>{item.last_status_commentary}</Text>
        )}
        {item.last_status !== StatusConst.REVIEW && <Divider marginTop={2} />}

        {item.last_status === StatusConst.CREATED && (
          <SentToReviewButton
            id={item.id}
            titleButton={"Отправить на проверку"}
            statusName={StatusConst.REVIEW}
          />
        )}
        {(item.last_status === StatusConst.CONFIRMED ||
          item.last_status === StatusConst.ARCHIVE) && (
          <SentToReviewButton
            id={item.id}
            titleButton={"Опубликовать"}
            statusName={StatusConst.PUBLISHED}
          />
        )}
        {item.last_status === StatusConst.PUBLISHED && (
          <SentToReviewButton
            id={item.id}
            titleButton={"Снять с публикации"}
            statusName={StatusConst.ARCHIVE}
          />
        )}
      </Box>
    </Box>
  );
}
