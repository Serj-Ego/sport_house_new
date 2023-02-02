import MainStackNavigator from "./app/navigation/MainStackNavigator";
import { extendTheme, StatusBar } from "native-base";
import { NativeBaseProvider } from "native-base/src/core/NativeBaseProvider";
import { LinearGradient } from "expo-linear-gradient";
import { persistStore } from "redux-persist";
import store from "./app/services/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import moment from "moment";
import * as Sentry from "sentry-expo";

Sentry.init({
  dsn: "https://c80d03b7bf8b49f6a4959cba81f5bd16@o1361402.ingest.sentry.io/4504355690643456",
  enableInExpoDevelopment: true,
  // tracesSampleRate: 1.0,
  debug: false, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});

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
  // AsyncStorage.removeItem("token");
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
