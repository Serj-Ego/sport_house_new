import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import {
  ApiRequestError,
  ApiRequestLoading,
  ApiRequestSuccess,
} from "../../api/ApiStatusConst";

let initialState = {
  /**
   * Получить токен авторизации.
   */
  loginData: { token: null, user_id: null, email: null },
  loginStatus: "idle",
  loginError: null,
};

/**
 * Возвращает рекомендацию пользователя.
 */
export const RetrieveRecommendationApiRequest = createAsyncThunk(
  "recommendation/RetrySendCodeUserApiRequest",
  async (_, { rejectWithValue }) => {
    const response = await api.get(`recomendation/retrieve/`);
    const dataResponse = await response.json();
    if (!response.ok) {
      return rejectWithValue(dataResponse);
    }
    return dataResponse;
  }
);

/**
 * Запускает расчет рекомендаций пользователя.
 */
export const CalculateRecommendationApiRequest = createAsyncThunk(
  "recommendation/CalculateRecommendationApiRequest",
  async (_, { rejectWithValue }) => {
    const response = await api.get(`recomendation/calculate/`);
    const dataResponse = await response.json();
    if (!response.ok) {
      return rejectWithValue(dataResponse);
    }
    return dataResponse;
  }
);

const recommendationSlice = createSlice({
  name: "recommendation",
  initialState,
  reducers: {},
  extraReducers: {
    /**
     * Возвращает рекомендацию пользователя.
     */
    [RetrieveRecommendationApiRequest.pending]: (state) => {
      state.recommendationUserStatus = ApiRequestLoading;
    },
    [RetrieveRecommendationApiRequest.fulfilled]: (state, action) => {
      state.recommendationUserData = action.payload;
      state.recommendationUserStatus = ApiRequestSuccess;
    },
    [RetrieveRecommendationApiRequest.rejected]: (state, action) => {
      state.recommendationUserError = action.payload.errors;
      state.recommendationUserStatus = ApiRequestError;
    },
  },
});
export default recommendationSlice.reducer;

/**
 * Возвращает рекомендацию пользователя.
 */
export const recommendationUserData = (state) =>
  state.recommendation.recommendationUserData;
export const recommendationUserStatus = (state) =>
  state.recommendation.recommendationUserStatus;
export const recommendationUserError = (state) =>
  state.recommendation.recommendationUserError;
