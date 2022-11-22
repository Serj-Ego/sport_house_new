import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import { Platform } from "react-native";

let initialState = {
  sportAreaOwnerList: [],
  updatedStatusSportArea: {},
  sportAreaUserList: [],
};

/**
 * Создание спортивной площадки.
 */
export const SportAreaCreateApiRequest = createAsyncThunk(
  "sportArea/SportAreaCreateApiRequest",
  async (data, { rejectWithValue }) => {
    const img = new FormData();
    let options = { json: data };
    if (data.images.length > 1) {
      data.images.forEach((photo) => {
        img.append("images", {
          name: photo.fileName,
          type: photo.type,
          uri:
            Platform.OS === "ios"
              ? photo.uri.replace("file://", "")
              : photo.uri,
        });
      });
      img.append("data", JSON.stringify(data));
      options = { body: img };
    }

    const response = await api.post(`location/create/`, options);
    const dataResponse = await response.json();
    if (!response.ok) {
      return rejectWithValue(dataResponse);
    }
    return dataResponse;
  }
);

/**
 * Получить список спортивных площадок для создателя.
 */
export const SportAreaOwnerListApiRequest = createAsyncThunk(
  "sportArea/SportAreaOwnerListApiRequest",
  async (_, { rejectWithValue }) => {
    const response = await api.get(`location/list/view/`);
    const dataResponse = await response.json();
    if (!response.ok) {
      return rejectWithValue(dataResponse);
    }
    return dataResponse;
  }
);

/**
 * Изменить статус спортивной площадки.
 */
export const SportAreaChangeStatusApiRequest = createAsyncThunk(
  "sportArea/SportAreaChangeStatusApiRequest",
  async ({ id, status }, { rejectWithValue }) => {
    const response = await api.put(`location/change/status/${id}`, {
      json: { status: status },
    });
    const dataResponse = await response.json();
    if (!response.ok) {
      return rejectWithValue(dataResponse);
    }
    return dataResponse;
  }
);

/**
 * Получить список спортивных площадок для пользователя.
 */
export const SportAreaUserListApiRequest = createAsyncThunk(
  "sportArea/SportAreaUserListApiRequest",
  async (_, { rejectWithValue }) => {
    const response = await api.get(`location/list/user/view/`);
    const dataResponse = await response.json();
    if (!response.ok) {
      return rejectWithValue(dataResponse);
    }
    return dataResponse;
  }
);
const baseSlice = createSlice({
  name: "sportArea",
  initialState,
  reducers: {},
  extraReducers: {
    /**
     * Получить список спортивных площадок у менеджера.
     */
    [SportAreaOwnerListApiRequest.fulfilled]: (state, action) => {
      state.sportAreaOwnerList = action.payload;
    },

    /**
     * Изменить статус спортивной площадки.
     */
    [SportAreaChangeStatusApiRequest.fulfilled]: (state, action) => {
      state.updatedStatusSportArea = action.payload;
    },

    /**
     * Получить список спортивных площадок у пользователя.
     */
    [SportAreaUserListApiRequest.fulfilled]: (state, action) => {
      state.sportAreaUserList = action.payload;
    },
  },
});
export default baseSlice.reducer;

export const sportAreaOwnerList = (state) => state.sportArea.sportAreaOwnerList;

export const updatedStatusSportArea = (state) =>
  state.sportArea.updatedStatusSportArea;

export const sportAreaUserList = (state) => state.sportArea.sportAreaUserList;
