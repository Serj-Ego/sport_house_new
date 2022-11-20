import { Box } from "native-base";
import { PADDING_LR_MAIN } from "../modules/Theme/padding";
import { COLORS_DARK_THEME, COLORS_LIGHT_THEME } from "../modules/Theme/colors";
import { getStatusBarHeight } from "react-native-status-bar-height";

export default function DefaultBackground({
  paddingTop = false,
  paddingLeft = PADDING_LR_MAIN,
  paddingRight = PADDING_LR_MAIN,
  children,
}) {
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
        paddingLeft: paddingLeft,
        paddingRight: paddingRight,
        paddingTop:
          paddingTop >= 0 && paddingTop !== false
            ? paddingTop
            : getStatusBarHeight(),
      }}
    >
      {children}
    </Box>
  );
}
