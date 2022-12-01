import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

let initialState = {
  completeOnboarding: false,
  userLocation: {
    latitude: 55.75321,
    longitude: 37.619055,
  },
  userAddAllInfo: false,
};

/**
 * Получить список объектов из справочника по типу.
 */
export const BaseDirectoryApiRequest = createAsyncThunk(
  "base/BaseDirectoryApiRequest",
  async (typeDirectory, { rejectWithValue }) => {
    const response = await api.get(`base/directory/${typeDirectory}`);
    const dataResponse = await response.json();
    if (!response.ok) {
      return rejectWithValue(dataResponse);
    }
    return dataResponse;
  }
);

const baseSlice = createSlice({
  name: "base",
  initialState,
  reducers: {
    /**
     * Проставляет просмотр Onboarding`а.
     */
    setCompleteOnboarding: (state, action) => {
      state.completeOnboarding = true;
    },
    setUserLocation: (state, action) => {
      state.userLocation = action.payload;
    },
    setUserAddAllInfo: (state, action) => {
      state.userAddAllInfo = action.payload;
    },
  },
  extraReducers: {},
});
export default baseSlice.reducer;

export const { setCompleteOnboarding, setUserLocation, setUserAddAllInfo } =
  baseSlice.actions;
export const completeOnboarding = (state) => state.base.completeOnboarding;
export const userLocation = (state) => state.base.userLocation;
export const userAddAllInfo = (state) => state.base.userAddAllInfo;
