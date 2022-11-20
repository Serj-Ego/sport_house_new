import { Box, Container, Heading, Icon, Text } from "native-base";
import {
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
} from "../../../modules/Theme/colors";
import {
  FlatList,
  TouchableWithoutFeedback,
  useColorScheme,
} from "react-native";
import { WIDTH } from "../../../modules/Theme/dimensions";
import { useSelector } from "react-redux";
import { userInfoData } from "../../../services/redux/slices/userSlice";
import { useNavigation } from "@react-navigation/native";
import { PROFILE_ROUTE } from "../../../modules/NavigationRoutes/profile";
import { Ionicons } from "@expo/vector-icons";

const userPersonalDataList = [
  { title: "Мой рост", field: "height", update: false },
  { title: "Мой вес", field: "weight", update: false },
  { title: "Мой возраст", field: "age", update: false },
  { title: "Обновить", field: "update", update: true },
  // { title: "", field: null },
];

export default function ProfileInputPersonalData() {
  const userDataState = useSelector(userInfoData);
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  return (
    <Box>
      <Heading
        style={{ marginTop: 16, marginBottom: 16 }}
        _light={{ color: COLORS_LIGHT_THEME.TEXT }}
        _dark={{ color: COLORS_DARK_THEME.TEXT }}
      >
        Мои данные
      </Heading>
      <FlatList
        horizontal={true}
        // pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={userPersonalDataList}
        renderItem={({ item }) => {
          return (
            <TouchableWithoutFeedback
              onPress={() => {
                if (item.update) {
                  navigation.navigate(PROFILE_ROUTE.ADD_PERSONAL_DATA.route);
                }
              }}
            >
              <Container
                style={{
                  width: WIDTH / 2.25,
                  height: 90,
                  padding: 12,
                  borderRadius: 12,
                }}
                _light={
                  item.field
                    ? { backgroundColor: COLORS_LIGHT_THEME.WHITE_BLOCK }
                    : {
                        borderColor: COLORS_LIGHT_THEME.WHITE_BLOCK,
                        borderStyle: "dashed",
                        borderWidth: 3,
                      }
                }
                _dark={
                  item.field
                    ? { backgroundColor: COLORS_DARK_THEME.DARK_BLOCK }
                    : {
                        borderColor: COLORS_DARK_THEME.DARK_BLOCK,
                        borderStyle: "dashed",
                        borderWidth: 3,
                      }
                }
              >
                <Heading
                  style={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    fontWeight: "bold",
                  }}
                  _light={{ color: COLORS_LIGHT_THEME.TEXT }}
                  _dark={{ color: COLORS_DARK_THEME.TEXT }}
                >
                  {item.update ? (
                    <Icon
                      as={Ionicons}
                      textAlign={"center"}
                      size={6}
                      name="reload"
                      color={
                        colorScheme === "light"
                          ? COLORS_LIGHT_THEME.TEXT
                          : COLORS_DARK_THEME.TEXT
                      }
                    />
                  ) : (
                    userDataState.recomendation_info[item.field]
                  )}
                </Heading>
                <Text
                  style={{
                    position: "absolute",
                    bottom: 12,
                    right: 12,
                    fontWeight: "bold",
                  }}
                  _light={{ color: COLORS_LIGHT_THEME.SUBTEXT }}
                  _dark={{ color: COLORS_DARK_THEME.SUBTEXT }}
                >
                  {item.title}
                </Text>
              </Container>
            </TouchableWithoutFeedback>
          );
        }}
      />
    </Box>
  );
}
