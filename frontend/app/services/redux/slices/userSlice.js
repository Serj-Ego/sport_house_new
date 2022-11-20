import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import {
  ApiRequestError,
  ApiRequestLoading,
  ApiRequestSuccess,
} from "../../api/ApiStatusConst";
import AsyncStorage from "@react-native-async-storage/async-storage";

let initialState = {
  /**
   * Получить токен авторизации.
   */
  loginData: { token: null, user_id: null, email: null },
  loginStatus: "idle",
  loginError: null,
  /**
   * Регистрация данных пользователя.
   */
  registrationUserId: null,
  registrationUserIdStatus: "idle",
  registrationUserIdError: null,

  /**
   * Информация о пользователе.
   */
  userInfoData: {},
  userInfoStatus: "idle",
  userInfoError: null,

  /**
   * Список уведолмений пользователя.
   */
  userNotificationData: [],
  userNotificationStatus: "idle",
  userNotificationError: null,
};

/**
 * Получить токен авторизации.
 */
export const LoginApiRequest = createAsyncThunk(
  "user/LoginApiRequest",
  async (data, { rejectWithValue }) => {
    const response = await api.post(`user/login/`, {
      json: data,
    });
    const dataResponse = await response.json();
    if (!response.ok) {
      return rejectWithValue(dataResponse);
    }
    await AsyncStorage.setItem("token", dataResponse.token);
    return dataResponse;
  }
);

/**
 * Регистрация данных пользователя.
 */
export const RegistrationUserApiRequest = createAsyncThunk(
  "user/RegistrationUserApiRequest",
  async (data, { rejectWithValue }) => {
    const response = await api.post(`user/registration/`, {
      json: data,
    });
    const dataResponse = await response.json();
    if (!response.ok) {
      return rejectWithValue(dataResponse);
    }
    return dataResponse;
  }
);

/**
 * Повторно отправить код подтверждения регистрации.
 */
export const RetrySendCodeUserApiRequest = createAsyncThunk(
  "user/RetrySendCodeUserApiRequest",
  async ({ id }, { rejectWithValue }) => {
    const response = await api.get(`user/confirm/${id}`);
    const dataResponse = await response.json();
    if (!response.ok) {
      return rejectWithValue(dataResponse);
    }
    return dataResponse;
  }
);

/**
 * Проверка кода подтверждения регистрации.
 */
export const ConfirmUserApiRequest = createAsyncThunk(
  "user/ConfirmUserApiRequest",
  async ({ id, data }, { rejectWithValue }) => {
    const response = await api.post(`user/confirm/${id}`, {
      json: data,
    });
    const dataResponse = await response.json();
    if (!response.ok) {
      return rejectWithValue(dataResponse);
    }
    return dataResponse;
  }
);

/**
 * Информация о пользователе.
 */
export const RetrieveUserInfoApiRequest = createAsyncThunk(
  "user/RetrieveUserInfoApiRequest",
  async ({ id }, { rejectWithValue }) => {
    const response = await api.get(`user/info/${id}`);
    const dataResponse = await response.json();
    if (!response.ok) {
      return rejectWithValue(dataResponse);
    }
    return dataResponse;
  }
);

/**
 * Создать/Обновить входные данные пользователя.
 */
export const CreateUpdateRecUserInfoApiRequest = createAsyncThunk(
  "user/CreateUpdateRecUserInfoApiRequest",
  async (data, { rejectWithValue }) => {
    const response = await api.post(`user/update-rec-info/`, {
      json: data,
    });
    const dataResponse = await response.json();
    if (!response.ok) {
      return rejectWithValue(dataResponse);
    }
    return dataResponse;
  }
);

/**
 * Список уведолмений пользователя.
 */
export const ListUserNotificationApiRequest = createAsyncThunk(
  "user/ListUserNotificationApiRequest",
  async (_, { rejectWithValue }) => {
    const response = await api.get(`user/notification-list/`);
    const dataResponse = await response.json();
    if (!response.ok) {
      return rejectWithValue(dataResponse);
    }
    return dataResponse;
  }
);

/**
 * Прочитать уведомления.
 */
export const ReadUserNotificationApiRequest = createAsyncThunk(
  "user/ListUserNotificationApiRequest",
  async (_, { rejectWithValue }) => {
    const response = await api.get(`user/notification-check/`);
    const dataResponse = await response.json();
    if (!response.ok) {
      return rejectWithValue(dataResponse);
    }
    return dataResponse;
  }
);

/**
 * Загрузить новую автарку пользователя.
 */
export const UploadUserAvatarApiRequest = createAsyncThunk(
  "user/UploadUserAvatarApiRequest",
  async (data, { rejectWithValue }) => {
    const response = await api.post(`user/upload-avatar/`, { body: data });
    const dataResponse = await response.json();
    if (!response.ok) {
      return rejectWithValue(dataResponse);
    }
    return dataResponse;
  }
);

/**
 * Обновить информацию пользователя.
 */
export const UpdateUserDataApiRequest = createAsyncThunk(
  "user/RetrieveUserInfoApiRequest",
  async (data, { rejectWithValue }) => {
    const response = await api.post(`user/update-info/`, { json: data });
    const dataResponse = await response.json();
    if (!response.ok) {
      return rejectWithValue(dataResponse);
    }
    return dataResponse;
  }
);

/**
 * Обновить пароль пользователя.
 */
export const UpdateUserPasswordApiRequest = createAsyncThunk(
  "user/UpdateUserPasswordApiRequest",
  async (data, { rejectWithValue }) => {
    const response = await api.post(`user/update-password/`, { json: data });
    const dataResponse = await response.json();
    if (!response.ok) {
      return rejectWithValue(dataResponse);
    }
    return dataResponse;
  }
);

/**
 * Выход пользователя из системы.
 */
export const LogoutApiRequest = createAsyncThunk(
  "user/LogoutApiRequest",
  async (_, { rejectWithValue }) => {
    const response = await api.get(`user/logout/`);
    const dataResponse = await response.json();
    if (!response.ok) {
      return rejectWithValue(dataResponse);
    }
    await AsyncStorage.removeItem("token");
    return dataResponse;
  }
);

/**
 * Обновить токен уведомлений.
 */
export const UpdateNotificationTokenApiRequest = createAsyncThunk(
  "user/UpdateNotificationTokenApiRequest",
  async (data, { rejectWithValue }) => {
    const response = await api.post(`user/update-notification-token/`, {
      json: data,
    });
    const dataResponse = await response.json();
    if (!response.ok) {
      return rejectWithValue(dataResponse);
    }
    return dataResponse;
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    /**
     * Получить токен авторизации.
     */
    [LoginApiRequest.pending]: (state) => {
      state.loginStatus = ApiRequestLoading;
    },
    [LoginApiRequest.fulfilled]: (state, action) => {
      state.loginData = action.payload;
      state.loginStatus = ApiRequestSuccess;
    },
    [LoginApiRequest.rejected]: (state, action) => {
      state.loginError = action.payload.errors;
      state.loginStatus = ApiRequestError;
    },

    /**
     * Регистрация данных пользователя.
     */
    [RegistrationUserApiRequest.pending]: (state) => {
      state.registrationUserIdStatus = ApiRequestLoading;
    },
    [RegistrationUserApiRequest.fulfilled]: (state, action) => {
      state.registrationUserId = action.payload;
      state.registrationUserIdStatus = ApiRequestSuccess;
    },
    [RegistrationUserApiRequest.rejected]: (state, action) => {
      state.registrationUserIdError = action.payload.errors;
      state.registrationUserIdStatus = ApiRequestError;
    },

    /**
     * Информация о пользователе.
     */
    [RetrieveUserInfoApiRequest.pending]: (state) => {
      state.userInfoStatus = ApiRequestLoading;
    },
    [RetrieveUserInfoApiRequest.fulfilled]: (state, action) => {
      state.userInfoData = action.payload;
      state.userInfoStatus = ApiRequestSuccess;
    },
    [RetrieveUserInfoApiRequest.rejected]: (state, action) => {
      state.userInfoError = action.payload.errors;
      state.userInfoStatus = ApiRequestError;
    },

    /**
     * Создать/Обновить входные данные пользователя.
     */
    [CreateUpdateRecUserInfoApiRequest.pending]: (state) => {
      state.userInfoStatus = ApiRequestLoading;
    },
    [CreateUpdateRecUserInfoApiRequest.fulfilled]: (state, action) => {
      state.userInfoData = action.payload;
      state.userInfoStatus = ApiRequestSuccess;
    },
    [CreateUpdateRecUserInfoApiRequest.rejected]: (state, action) => {
      state.userInfoError = action.payload.errors;
      state.userInfoStatus = ApiRequestError;
    },

    /**
     * Список уведолмений пользователя.
     */
    [ListUserNotificationApiRequest.pending]: (state) => {
      state.userNotificationStatus = ApiRequestLoading;
    },
    [ListUserNotificationApiRequest.fulfilled]: (state, action) => {
      state.userNotificationData = action.payload;
      state.userNotificationStatus = ApiRequestSuccess;
    },
    [ListUserNotificationApiRequest.rejected]: (state, action) => {
      state.userNotificationError = action.payload.errors;
      state.userNotificationStatus = ApiRequestError;
    },
    /**
     * Выход пользователя из системы.
     */
    [LogoutApiRequest.fulfilled]: (state, action) => {
      state.loginData = { token: null, user_id: null, email: null };
    },
  },
});
export default userSlice.reducer;

/**
 * Получить токен авторизации.
 */
export const userLoginData = (state) => state.user.loginData;
export const userLoginStatus = (state) => state.user.loginStatus;
export const userLoginError = (state) => state.user.loginError;

/**
 * Регистрация данных пользователя.
 */
export const registrationUserId = (state) => state.user.registrationUserId;
export const registrationUserIdStatus = (state) =>
  state.user.registrationUserIdStatus;
export const registrationUserIdError = (state) =>
  state.user.registrationUserIdError;

/**
 * Информация о пользователе.
 */
export const userInfoData = (state) => state.user.userInfoData;
export const userInfoStatus = (state) => state.user.userInfoStatus;
export const userInfoError = (state) => state.user.userInfoError;

/**
 * Список уведолмений пользователя.
 */
export const userNotificationData = (state) => state.user.userNotificationData;
export const userNotificationStatus = (state) =>
  state.user.userNotificationStatus;
export const userNotificationError = (state) =>
  state.user.userNotificationError;
