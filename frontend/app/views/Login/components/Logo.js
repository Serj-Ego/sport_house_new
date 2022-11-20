import { Image } from "react-native";
import { WIDTH } from "../../../modules/Theme/dimensions";

export default function Logo() {
  return (
    <Image
      source={require("../../../assets/login/logo.png")}
      style={{ height: "20%", width: WIDTH / 1.8, resizeMode: "contain" }}
    />
  );
}
