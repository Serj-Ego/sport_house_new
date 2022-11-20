import { Avatar, Box, Container, Icon } from "native-base";
import { COLOR_ACCENT, COLORS_FORM } from "../../../modules/Theme/colors";
import { MediaUrl } from "../../../modules/MediaUrl";
import { FontAwesome, SimpleLineIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RetrieveUserInfoApiRequest,
  UploadUserAvatarApiRequest,
  userInfoData,
  userLoginData,
} from "../../../services/redux/slices/userSlice";
import * as ImagePicker from "expo-image-picker";
import { unwrapResult } from "@reduxjs/toolkit";

export default function UserAvatar() {
  const userDataState = useSelector(userInfoData);
  const userId = useSelector(userLoginData);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      postToServer(result);
      setImage(result.uri);
    }
  };

  const postToServer = (img) => {
    const formData = new FormData();
    formData.append("image", {
      uri: img.uri,
      type: "image/jpg",
      name: "Avatar.jpg",
    });

    dispatch(UploadUserAvatarApiRequest(formData))
      .then(unwrapResult)
      .then((res) => {
        dispatch(RetrieveUserInfoApiRequest({ id: userId.user_id }));
      })
      .catch((err) => {});
  };
  return (
    <Box alignItems={"center"} justifyContent={"center"} marginBottom={18}>
      <Container>
        <Avatar
          bg={COLORS_FORM.PLACEHOLDER}
          alignSelf="center"
          size="200"
          source={{
            uri: image ? image : MediaUrl(userDataState.avatar),
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
        <TouchableOpacity
          onPress={pickImage}
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            backgroundColor: COLOR_ACCENT.ACCENT,
            padding: 12,
            borderRadius: "100%",
          }}
        >
          <Icon
            as={SimpleLineIcons}
            textAlign={"center"}
            size={7}
            name="camera"
            color={"white"}
          />
        </TouchableOpacity>
      </Container>
    </Box>
  );
}
