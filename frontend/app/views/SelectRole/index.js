import DefaultBackground from "../../components/DefaultBackground";
import { Image, TouchableOpacity } from "react-native";
import { WIDTH } from "../../modules/Theme/dimensions";
import { Heading, HStack, Text, View } from "native-base";
import Animated, {
  FadeInDown,
  FadeInUp,
  Layout,
} from "react-native-reanimated";
import RoleItem from "../Profile/InitialUserParams/RoleItem";
import { RoleConst } from "../../modules/RoleConst";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { PRIMARY_GRADIENT } from "../../modules/Theme/colors";
import { PADDING_LR_MAIN } from "../../modules/Theme/padding";
import { MAIN_ROUTES } from "../../modules/NavigationRoutes/main";

export default function SelectRole({ navigation }) {
  const [role, setRole] = useState();
  return (
    <DefaultBackground>
      <View justifyContent={"space-between"}>
        <Image
          source={require("../../assets/adduserrole.png")}
          style={{
            height: "40%",
            width: WIDTH,
            resizeMode: "contain",
            alignSelf: "center",
            marginTop: 24,
          }}
        />
        <Heading textAlign={"left"}>Укажите роль:</Heading>
        <Animated.View layout={Layout} entering={FadeInDown}>
          <RoleItem
            role={role}
            setRole={setRole}
            roleName={RoleConst.SPORTSMAN}
          />
          <RoleItem
            role={role}
            setRole={setRole}
            roleName={RoleConst.TRAINER}
          />
          <RoleItem
            role={role}
            setRole={setRole}
            roleName={RoleConst.SPORT_AREA}
          />
          {role && (
            <Animated.View layout={Layout} entering={FadeInUp}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(MAIN_ROUTES.SIGNUP, { role: role });
                }}
              >
                <LinearGradient
                  colors={[PRIMARY_GRADIENT.START, PRIMARY_GRADIENT.END]}
                  start={{ x: 1, y: 1 }}
                  end={{ x: 0, y: 0 }}
                  style={{
                    width: "100%",
                    height: 55,
                    borderRadius: 12,
                    alignItems: "center",
                    justifyContent: "center",
                    padding: PADDING_LR_MAIN,
                    marginVertical: 6,
                  }}
                >
                  <HStack space={2}>
                    <Text
                      _light={{ color: "white" }}
                      _dark={{ color: "white" }}
                      fontWeight={"extrabold"}
                    >
                      Далее
                    </Text>
                  </HStack>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          )}
        </Animated.View>
      </View>
    </DefaultBackground>
  );
}
