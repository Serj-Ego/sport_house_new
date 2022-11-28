import DefaultBackground from "../../components/DefaultBackground";
import { Box, HStack, Text, View } from "native-base";
import { FlatList } from "react-native";
import { statusColorSwitch } from "../../modules/StatusColorSwitch";
import React from "react";
import { Spacer } from "native-base/src/components/primitives/Flex";
import moment from "moment";

export default function SportAreaStatusHistory({ route, navigation }) {
  return (
    <DefaultBackground paddingTop={0}>
      <FlatList
        style={{ marginTop: 32, width: "100%" }}
        data={route.params.data}
        ItemSeparatorComponent={() => <Box style={{ height: 32 }} />}
        renderItem={({ item, index }) => {
          return (
            <HStack space={4} alignItems={"center"}>
              <Box
                style={{
                  height: 10,
                  width: 10,
                  backgroundColor: statusColorSwitch(item.status),
                  borderRadius: 100,
                }}
              />
              <View w={"90%"}>
                <HStack justifyContent={"space-between"}>
                  <Text style={{ fontWeight: "400", fontSize: 17 }}>
                    {item.status}
                  </Text>
                  <Spacer />
                  <Text style={{ fontWeight: "300" }} color={"gray.500"}>
                    {moment(item.created_date).format("DD-MM-YYYY hh:mm")}
                  </Text>
                </HStack>
                {item.commentary && (
                  <Text
                    style={{ fontWeight: "300" }}
                    color={"gray.500"}
                    ellipsizeMode={"tail"}
                    numberOfLines={3}
                  >
                    {item.commentary}
                  </Text>
                )}
              </View>
            </HStack>
          );
        }}
      />
    </DefaultBackground>
  );
}
