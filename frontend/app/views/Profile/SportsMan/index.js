import ProfileNotInputPersonalData from "../components/ProfileNotInputPersonalData";
import ProfileInputPersonalData from "../components/ProfileInputPersonalData";
import { Heading } from "native-base";
import {
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
} from "../../../modules/Theme/colors";
import ActionButtonBlock from "../components/ActionButtonBlock";
import { PROFILE_ROUTE } from "../../../modules/NavigationRoutes/profile";
import { useSelector } from "react-redux";
import { userInfoData } from "../../../services/redux/slices/userSlice";

export default function SportsMan() {
  const userDataState = useSelector(userInfoData);
  return (
    <>
      {!userDataState?.recomendation_info ? (
        <ProfileNotInputPersonalData />
      ) : (
        <ProfileInputPersonalData />
      )}
      <Heading
        style={{ marginTop: 16, marginBottom: 16 }}
        _light={{ color: COLORS_LIGHT_THEME.TEXT }}
        _dark={{ color: COLORS_DARK_THEME.TEXT }}
      >
        Мои действия
      </Heading>
      <ActionButtonBlock
        title={PROFILE_ROUTE.RECOMMENDATION.title}
        routeTo={PROFILE_ROUTE.RECOMMENDATION.route}
      />
    </>
  );
}
