import { Box, Heading, HStack, Text, VStack } from "native-base";
import {
  COLOR_ACCENT,
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
} from "../../../modules/Theme/colors";
import { Spacer } from "native-base/src/components/primitives/Flex";
import moment from "moment";
import { Badge } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import { NotificationTypeConst } from "../../../modules/NotificationTypeConst";

export default function NotificationItem({ item }) {
  const notificationTypeIcon = (type) => {
    switch (type) {
      case NotificationTypeConst.RECOMMENDATION:
        return "description";
      default:
        return "notifications-none";
    }
  };
  return (
    <Box
      style={{ borderRadius: 12, padding: 16 }}
      _light={{ backgroundColor: COLORS_LIGHT_THEME.WHITE_BLOCK }}
      _dark={{ backgroundColor: COLORS_DARK_THEME.DARK_BLOCK }}
    >
      <HStack alignItems={"center"} space={4}>
        <Box
          style={{
            backgroundColor: COLOR_ACCENT.ACCENT,
            width: 30,
            height: 30,
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialIcons
            name={notificationTypeIcon(item.type)}
            size={22}
            style={{ textAlign: "center" }}
            color={"white"}
          />
          {!item.is_read && (
            <Badge
              status={"error"}
              containerStyle={{ position: "absolute", top: -2, right: -2 }}
            />
          )}
        </Box>
        <VStack space={2}>
          <Heading
            size={"xs"}
            flexWrap={"wrap"}
            style={{ width: "100%" }}
            _light={{ color: COLORS_LIGHT_THEME.TEXT }}
            _dark={{ color: COLORS_DARK_THEME.TEXT }}
          >
            {item.title}
          </Heading>
          <Text
            flexWrap={"wrap"}
            style={{ width: "80%" }}
            _light={{ color: COLORS_LIGHT_THEME.TEXT }}
            _dark={{ color: COLORS_DARK_THEME.TEXT }}
          >
            {item.body}
          </Text>
          <Text
            _light={{ color: COLORS_LIGHT_THEME.SUBTEXT }}
            _dark={{ color: COLORS_DARK_THEME.SUBTEXT }}
          >
            {moment(item.created_date).fromNow()}
          </Text>
        </VStack>
        <Spacer />
        {item.is_read && (
          <Box
            style={{
              backgroundColor: COLOR_ACCENT.ACCENT,
              width: 8,
              height: 8,
              borderRadius: 8,
            }}
          />
        )}
      </HStack>
    </Box>
  );
}
