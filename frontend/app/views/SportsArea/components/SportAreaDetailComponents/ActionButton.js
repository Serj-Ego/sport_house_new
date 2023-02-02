import {
  ActionSheetIOS,
  ActivityIndicator,
  TouchableWithoutFeedback,
  useColorScheme,
} from "react-native";
import {
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
} from "../../../../modules/Theme/colors";
import { Box, HStack, Text } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { StatusConst } from "../../../../modules/StatusConst";
import { useDispatch } from "react-redux";
import { SportAreaChangeStatusApiRequest } from "../../../../services/redux/slices/sportAreaSlice";
import { useState } from "react";

const actionConst = {
  SEND_TO_REVIEW: "Отправить на проверку",
  SEND_TO_ARCHIVE: "Отправить в архив",
  SEND_TO_PUBLIC: "Опубликовать",
};

const actionStatusesConst = {
  "Отправить на проверку": StatusConst.REVIEW,
  "Отправить в архив": StatusConst.ARCHIVE,
  Опубликовать: StatusConst.PUBLISHED,
};
export default function ActionButton({ id, last_status, isBlocked }) {
  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const createActionParams = () => {
    let actionData = ["Отменить"];
    switch (last_status) {
      case StatusConst.REJECTED:
        return [...actionData, actionConst.SEND_TO_REVIEW];
      case StatusConst.CREATED:
        return [
          ...actionData,
          actionConst.SEND_TO_REVIEW,
          actionConst.SEND_TO_ARCHIVE,
        ];
      case StatusConst.CONFIRMED:
        return [...actionData, actionConst.SEND_TO_PUBLIC];
      case StatusConst.PUBLISHED:
        return [...actionData, actionConst.SEND_TO_ARCHIVE];
      case StatusConst.ARCHIVE:
        return [...actionData, actionConst.SEND_TO_REVIEW];
      default:
        return actionData;
    }
  };
  const onPress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: createActionParams(),
        cancelButtonIndex: 0,
        userInterfaceStyle: colorScheme,
      },
      (buttonIndex) => {
        if (buttonIndex !== 0) {
          setIsLoading(true);
          dispatch(
            SportAreaChangeStatusApiRequest({
              id: id,
              status: actionStatusesConst[createActionParams()[buttonIndex]],
            })
          ).finally(() => {
            setIsLoading(false);
          });
        }
      }
    );
  };
  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      disabled={isLoading || isBlocked}
    >
      <Box
        style={{
          width: "49%",
          height: 65,
          borderRadius: 12,
          paddingHorizontal: 24,
        }}
        _light={{ backgroundColor: COLORS_LIGHT_THEME.WHITE_BLOCK }}
        _dark={{ backgroundColor: COLORS_DARK_THEME.DARK_BLOCK }}
        justifyContent={"center"}
      >
        <HStack justifyContent={"center"} space={2} alignItems={"center"}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Ionicons
              name="ios-list"
              size={24}
              color={isBlocked ? "rgba(224,224,224,0.8)" : "#007AFF"}
            />
          )}
          <Text
            color={isBlocked ? "rgba(224,224,224,0.8)" : "#007AFF"}
            fontWeight={600}
            fontSize={16}
          >
            Действия
          </Text>
        </HStack>
      </Box>
    </TouchableWithoutFeedback>
  );
}
