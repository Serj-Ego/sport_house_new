import {
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
} from "../../../modules/Theme/colors";
import { Heading } from "native-base";
import { PROFILE_ROUTE } from "../../../modules/NavigationRoutes/profile";
import ActionButtonBlock from "../components/ActionButtonBlock";

export default function SportArea() {
  return (
    <>
      <Heading
        style={{ marginTop: 16, marginBottom: 16 }}
        _light={{ color: COLORS_LIGHT_THEME.TEXT }}
        _dark={{ color: COLORS_DARK_THEME.TEXT }}
      >
        Мои действия
      </Heading>
      <ActionButtonBlock
        title={PROFILE_ROUTE.SPORT_AREA_ADD.title}
        routeTo={PROFILE_ROUTE.SPORT_AREA_ADD.route}
      />
      <ActionButtonBlock
        title={PROFILE_ROUTE.BOOKING_AREA.title}
        routeTo={PROFILE_ROUTE.BOOKING_AREA.route}
      />
    </>
  );
}
