import { Heading, HStack } from "native-base";
import { COLORS_DARK_THEME, COLORS_LIGHT_THEME } from "../modules/Theme/colors";
import { Spacer } from "native-base/src/components/primitives/Flex";

export default function ScreenHeader({ title, children = false }) {
  return children ? (
    <HStack alignItems={"center"}>
      <Heading
        _light={{
          color: COLORS_LIGHT_THEME.TEXT,
        }}
        _dark={{
          color: COLORS_DARK_THEME.TEXT,
        }}
      >
        {title}
      </Heading>
      <Spacer />
      {children}
    </HStack>
  ) : (
    <Heading
      _light={{
        color: COLORS_LIGHT_THEME.TEXT,
      }}
      _dark={{
        color: COLORS_DARK_THEME.TEXT,
      }}
      paddingBottom={4}
      size={"xl"}
    >
      {title}
    </Heading>
  );
}
