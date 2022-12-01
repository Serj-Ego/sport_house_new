import DefaultBackground from "../../components/DefaultBackground";
import ProfileHeader from "./components/ProfileHeader";
import ProfileAvatarName from "./components/ProfileAvatarName";
import { useEffect, useState } from "react";
import {
  RetrieveUserInfoApiRequest,
  userInfoData,
  userLoginData,
} from "../../services/redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import SportsMan from "./SportsMan";
import { RoleConst } from "../../modules/RoleConst";
import SportArea from "./SportArea";
import { Skeleton, Text } from "native-base";
import * as Location from "expo-location";
import { setUserLocation } from "../../services/redux/slices/baseSlice";
import { HEIGHT } from "../../modules/Theme/dimensions";

export default function Profile({ route }) {
  const dispatch = useDispatch();
  const userId = useSelector(userLoginData);
  const userDataState = useSelector(userInfoData);
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (isFocused) {
      setIsLoading(true);
      dispatch(RetrieveUserInfoApiRequest({ id: userId.user_id })).finally(
        () => {
          setIsLoading(false);
        }
      );
    }
  }, [route, isFocused]);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      dispatch(setUserLocation(location.coords));
    })();
  }, [isFocused, route]);
  return (
    <DefaultBackground>
      <ProfileHeader route={route} />
      <Text fontSize={"2xs"}>{userDataState.role}</Text>
      <ScrollView>
        <Skeleton
          style={{ borderRadius: 12 }}
          minH={HEIGHT / 3}
          mt={4}
          isLoaded={!isLoading}
        >
          <ProfileAvatarName />
        </Skeleton>
        <Skeleton
          style={{ borderRadius: 12 }}
          lines={4}
          h={16}
          mt={4}
          isLoaded={!isLoading}
        >
          {userDataState.role === RoleConst.SPORTSMAN && <SportsMan />}
          {userDataState.role === RoleConst.SPORT_AREA && <SportArea />}
        </Skeleton>
      </ScrollView>
    </DefaultBackground>
  );
}
