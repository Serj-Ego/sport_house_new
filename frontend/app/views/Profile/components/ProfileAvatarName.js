import {
  COLORS_DARK_THEME,
  COLORS_FORM,
  COLORS_LIGHT_THEME,
} from "../../../modules/Theme/colors";
import { Avatar, Box, Heading, Icon } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { userInfoData } from "../../../services/redux/slices/userSlice";
import { MediaUrl } from "../../../modules/MediaUrl";

export default function ProfileAvatarName() {
  const userDataState = useSelector(userInfoData);
  return (
    <Box
      style={{ borderRadius: 12, marginTop: 16, padding: 16 }}
      _light={{ backgroundColor: COLORS_LIGHT_THEME.WHITE_BLOCK }}
      _dark={{ backgroundColor: COLORS_DARK_THEME.DARK_BLOCK }}
    >
      <Avatar
        _light={{ backgroundColor: COLORS_FORM.INPUT }}
        _dark={{ backgroundColor: COLORS_FORM.DARK_INPUT }}
        alignSelf="center"
        size="150"
        source={{
          uri: userDataState?.avatar && MediaUrl(userDataState.avatar),
        }}
      >
        <Icon
          as={FontAwesome}
          textAlign={"center"}
          size={16}
          name="user-o"
          color={"white"}
        />
      </Avatar>
      <Heading
        style={{ textAlign: "center", fontWeight: "normal", marginTop: 16 }}
        _light={{
          color: COLORS_LIGHT_THEME.TEXT,
        }}
        _dark={{
          color: COLORS_DARK_THEME.TEXT,
        }}
      >
        {userDataState?.full_name}
      </Heading>
    </Box>
  );
}
