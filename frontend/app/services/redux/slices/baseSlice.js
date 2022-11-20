import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  completeOnboarding: false,
  userLocation: {
    latitude: 55.75321,
    longitude: 37.619055,
  },
};

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
  },
  extraReducers: {},
});
export default baseSlice.reducer;

export const { setCompleteOnboarding, setUserLocation } = baseSlice.actions;
export const completeOnboarding = (state) => state.base.completeOnboarding;
export const userLocation = (state) => state.base.userLocation;
