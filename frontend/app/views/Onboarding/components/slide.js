import { Box, Heading, View } from "native-base";
import { Image } from "react-native";
import {
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
} from "../../../modules/Theme/colors";
import { WIDTH } from "../../../modules/Theme/dimensions";
import { PADDING_LR_MAIN } from "../../../modules/Theme/padding";

export default function Slide({ item }) {
  return (
    <View
      style={{
        alignItems: "center",
        width: WIDTH,
        padding: PADDING_LR_MAIN,
      }}
    >
      <Image
        source={item.image}
        style={{ height: "60%", width: WIDTH / 1.5, resizeMode: "contain" }}
      />
      <Box>
        <Heading
          _light={{ color: COLORS_LIGHT_THEME.TEXT }}
          _dark={{ color: COLORS_DARK_THEME.TEXT }}
          size={"xl"}
          style={{ width: WIDTH - PADDING_LR_MAIN * 2 }}
          textAlign={"left"}
        >
          {item.title}
        </Heading>
      </Box>
    </View>
  );
}
