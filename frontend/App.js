import MainStackNavigator from "./app/navigation/MainStackNavigator";
import { extendTheme, StatusBar } from "native-base";
import { NativeBaseProvider } from "native-base/src/core/NativeBaseProvider";
import { LinearGradient } from "expo-linear-gradient";
import { persistStore } from "redux-persist";
import store from "./app/services/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import moment from "moment";

const config = {
  dependencies: {
    "linear-gradient": LinearGradient,
  },
  useSystemColorMode: true,
};
const customTheme = extendTheme({ config });

const persistor = persistStore(store);

moment().locale("ru");

export default function App() {
  // persistor.purge();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider theme={customTheme}>
          <StatusBar />
          <MainStackNavigator />
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
}
