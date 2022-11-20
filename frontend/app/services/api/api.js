import ky from "ky";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiUrl } from "./ApiUrl";

/**
 * Настройки для ky
 * (https://github.com/sindresorhus/ky)
 */
const api = ky.create({
  prefixUrl: `${ApiUrl()}/api/`,
  throwHttpErrors: false,
  credentials: "include",
  timeout: 30000,
  hooks: {
    beforeRequest: [
      async (request) => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          request.headers.set("Authorization", `Token ${token}`);
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status >= 500) {
          const obj = {
            errors: [
              {
                message: "Сервер не доступен",
                code: "error",
              },
            ],
          };
          const blob = new Blob([JSON.stringify(obj, null, 2)], {
            type: "application/json",
          });
          const init = {
            status: response.status,
          };
          return new Response(blob, init);
        }
        if (response.ok) {
          return response;
        }
        if (response.status === 403) {
          await AsyncStorage.removeItem("token");
        }
        return response;
      },
    ],
  },
});

export default api;
