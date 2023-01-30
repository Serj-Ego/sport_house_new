import DefaultBackground from "../../components/DefaultBackground";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SportAreaBookingChangeStatusApiRequest,
  sportAreaBookingList,
  SportAreaBookingListApiRequest,
} from "../../services/redux/slices/sportAreaSlice";
import { ActivityIndicator, FlatList } from "react-native";
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

export default function SportsManBooking({ route }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const bookingList = useSelector(sportAreaBookingList);
  useEffect(() => {
    dispatch(SportAreaBookingListApiRequest()).finally(() => {
      setIsLoading(false);
    });
  }, [route]);

  const cancelBooking = (id) => {
    dispatch(
      SportAreaBookingChangeStatusApiRequest({
        id: id,
        statusName: StatusConst.REJECTED,
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
                </VStack>
                <Spacer />
                {item.last_status !== StatusConst.REJECTED &&
                  item.last_status !== StatusConst.CONFIRMED && (
                    <Button
                      colorScheme={"red"}
                      onPress={() => cancelBooking(item.id)}
                    >
                      Отменить
                    </Button>
                  )}
              </HStack>
            );
          }}
        />
      )}
    </DefaultBackground>
  );
}
