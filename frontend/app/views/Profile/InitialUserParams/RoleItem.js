import { Box, Text } from "native-base";
import { TouchableOpacity } from "react-native";
import { COLOR_ACCENT } from "../../../modules/Theme/colors";

export default function RoleItem({ roleName, role, setRole }) {
  return (
    <TouchableOpacity
      onPress={() => {
        setRole(roleName);
      }}
    >
      <Box
        style={{
          height: 55,
          borderRadius: 12,
          borderColor: roleName === role ? COLOR_ACCENT.ACCENT : "gray",
          borderStyle: "solid",
          borderWidth: 2,
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 6,
        }}
      >
        <Text fontWeight={400} fontSize={16}>
          {roleName}
        </Text>
      </Box>
    </TouchableOpacity>
  );
}
