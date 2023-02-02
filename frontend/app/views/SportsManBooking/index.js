import DefaultBackground from "../../components/DefaultBackground";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SportAreaBookingChangeStatusApiRequest,
  sportAreaBookingList,
  SportAreaBookingListApiRequest,
} from "../../services/redux/slices/sportAreaSlice";
import { ActivityIndicator, Alert, FlatList } from "react-native";
import {
  Button,
  Divider,
  Heading,
  HStack,
  Spacer,
  Text,
  VStack,
} from "native-base";
import { StatusConst } from "../../modules/StatusConst";
import { userInfoData } from "../../services/redux/slices/userSlice";
import { RoleConst } from "../../modules/RoleConst";
import { unwrapResult } from "@reduxjs/toolkit";

export default function SportsManBooking({ route }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const bookingList = useSelector(sportAreaBookingList);
  const userDataState = useSelector(userInfoData);

  useEffect(() => {
    dispatch(SportAreaBookingListApiRequest()).finally(() => {
      setIsLoading(false);
    });
  }, [route]);

  const changeStatusBooking = ({ id, status, commentary }) => {
    dispatch(
      SportAreaBookingChangeStatusApiRequest({
        id: id,
        statusName: status,
        commentary: commentary,
      })
    )
      .then(unwrapResult)
      .then(() => {
        setIsLoading(true);
        dispatch(SportAreaBookingListApiRequest()).finally(() => {
          setIsLoading(false);
        });
      });
  };

  return (
    <DefaultBackground paddingTop={16}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          ItemSeparatorComponent={() => (
            <Divider style={{ marginVertical: 10 }} />
          )}
          data={bookingList}
          renderItem={({ item }) => {
            return (
              <HStack key={item.id}>
                <VStack style={{ width: "60%" }}>
                  <Heading size={"md"}>{item.location_name}</Heading>
                  <Text>{item.date}</Text>
                  <HStack>
                    <Text>{item.start_event}</Text>
                    <Text>-</Text>
                    <Text>{item.end_event}</Text>
                  </HStack>
                  <Heading size={"sm"}>{item.last_status}</Heading>
                  <Text>Комментарий:{item.last_commentary}</Text>
                </VStack>
                <Spacer />
                {item.last_status !== StatusConst.REJECTED &&
                  userDataState.role === RoleConst.SPORT_AREA &&
                  item.last_status !== StatusConst.CONFIRMED && (
                    <VStack justifyContent={"center"} space={2}>
                      <Button
                        colorScheme={"green"}
                        onPress={() =>
                          changeStatusBooking({
                            id: item.id,
                            status: StatusConst.CONFIRMED,
                            commentary: "",
                          })
                        }
                      >
                        Подтвердить
                      </Button>
                      <Button
                        colorScheme={"red"}
                        onPress={() => {
                          Alert.prompt("Title", "Subtitle", (text) =>
                            changeStatusBooking({
                              id: item.id,
                              status: StatusConst.REJECTED,
                              commentary: text,
                            })
                          );
                        }}
                      >
                        Отменить
                      </Button>
                    </VStack>
                  )}
              </HStack>
            );
          }}
        />
      )}
    </DefaultBackground>
  );
}
