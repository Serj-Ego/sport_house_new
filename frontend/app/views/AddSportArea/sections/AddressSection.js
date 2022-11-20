import { Box, HStack, Text, View } from "native-base";
import { HEIGHT, WIDTH } from "../../../modules/Theme/dimensions";
import {
  COLORS_DARK_THEME,
  COLORS_LIGHT_THEME,
} from "../../../modules/Theme/colors";
import { ScrollView, TouchableOpacity } from "react-native";
import { PROFILE_ROUTE } from "../../../modules/NavigationRoutes/profile";
import { PADDING_LR_MAIN } from "../../../modules/Theme/padding";
import AddAdministrativeArea from "../components/AddAdministrativeArea";
import AddCity from "../components/AddCity";
import AddStreet from "../components/AddStreet";
import AddNumberArea from "../components/AddNumberArea";
import AddPostNumber from "../components/AddPostNumber";
import { useContext } from "react";
import { addSportAreaContext } from "../../../navigation/AdditionalStack";
import SectionHeader from "../components/SectionHeader";
import { useNavigation } from "@react-navigation/native";

export default function AddressSection() {
  const navigation = useNavigation();
  const { address } = useContext(addSportAreaContext);
  return (
    <View
      style={{
        width: WIDTH - PADDING_LR_MAIN - PADDING_LR_MAIN,
        height: HEIGHT,
      }}
    >
      <SectionHeader
        header={"Местоположениe"}
        description={
          "Перетяните метку туда, где находится вход на вашу площадку, наше приложение автоматически подтянет корректный формат адреса"
        }
        image={require("../../../assets/add_sport_area/location.png")}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(PROFILE_ROUTE.SELECT_SPORT_AREA_ADDRESS.route);
        }}
      >
        <Box
          style={{
            minWidth: "100%",
            height: 55,
            borderRadius: 12,
            borderWidth: 1,
            borderStyle: "dashed",
            alignItems: "center",
            justifyContent: "center",
            padding: PADDING_LR_MAIN,
            marginBottom: 16,
          }}
          _light={{
            borderColor: COLORS_DARK_THEME.DARK_BLOCK,
          }}
          _dark={{
            borderColor: COLORS_LIGHT_THEME.WHITE_BLOCK,
          }}
        >
          <HStack space={2}>
            <Text
              _light={{ color: COLORS_LIGHT_THEME.TEXT }}
              _dark={{ color: COLORS_DARK_THEME.TEXT }}
            >
              Указать на карте
            </Text>
          </HStack>
        </Box>
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 200 }}
        showsVerticalScrollIndicator={false}
      >
        <AddAdministrativeArea value={address.administrativeArea} />
        <AddCity value={address.locality} />
        <AddStreet value={address.thoroughfare} />
        <HStack>
          <AddNumberArea value={address.subThoroughfare} />
          <AddPostNumber value={address.postalCode} />
        </HStack>
      </ScrollView>
    </View>
  );
}
