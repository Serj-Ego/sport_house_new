import DefaultBackground from "../../components/DefaultBackground";
import ProfileHeader from "./components/ProfileHeader";
import ProfileAvatarName from "./components/ProfileAvatarName";
import { useEffect } from "react";
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
import { Text } from "native-base";
import * as Location from "expo-location";
import { setUserLocation } from "../../services/redux/slices/baseSlice";

export default function Profile({ route }) {
  const dispatch = useDispatch();
  const userId = useSelector(userLoginData);
  const userDataState = useSelector(userInfoData);
  const isFocused = useIsFocused();
  useEffect(() => {
    dispatch(RetrieveUserInfoApiRequest({ id: userId.user_id }));
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
        <ProfileAvatarName />
        {userDataState.role === RoleConst.SPORTSMAN ? (
          <SportsMan />
        ) : (
          <SportArea />
        )}
      </ScrollView>
    </DefaultBackground>
  );
}
