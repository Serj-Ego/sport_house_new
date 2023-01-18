import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import filterSearchParams from "../../../modules/filterSearchParams";

let initialState = {
  sportAreaOwnerList: [],
  updatedStatusSportArea: {},
  sportAreaUserList: [],

  sportAreaDetailView: {},
};

/**
 * Создание спортивной площадки.
 */
export const SportAreaCreateApiRequest = createAsyncThunk(
  "sportArea/SportAreaCreateApiRequest",
  async ({ data, images }, { rejectWithValue }) => {
    const fieldsData = new FormData();

    images.forEach((photo) => {
      fieldsData.append("images", {
        name: photo.fileName,
        type: photo.type,
        uri: photo.uri,
      });
    });
    fieldsData.append("data", JSON.stringify(data));
    const options = { body: fieldsData };

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
  async (searchText = null, { rejectWithValue }) => {
    const response = await api.get(`location/owner/`, {
      searchParams: { ...filterSearchParams({ search: searchText }) },
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

/**
 * Получить информацию спортивной площадки для создателя.
 */
export const SportAreaRetrieveOwnerApiRequest = createAsyncThunk(
  "sportArea/SportAreaRetrieveOwnerApiRequest",
  async (id, { rejectWithValue }) => {
    const response = await api.get(`location/owner/${id}`);
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
  "sportArea/SportAreaRetrieveOwnerApiRequest",
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
 * Проверить дату для записи.
 */
export const SportAreaCheckDateApiRequest = createAsyncThunk(
  "sportArea/SportAreaCheckDateApiRequest",
  async (id, { rejectWithValue }) => {
    const response = await api.get(`location/check/date/${id}`);
    const dataResponse = await response.json();
    if (!response.ok) {
      return rejectWithValue(dataResponse);
    }
    return dataResponse;
  }
);

/**
 * Проверить time для записи.
 */
export const SportAreaCheckTimeApiRequest = createAsyncThunk(
  "sportArea/SportAreaCheckTimeApiRequest",
  async ({ id, day }, { rejectWithValue }) => {
    const response = await api.get(`location/check/time/${id}`, {
      searchParams: { day: day },
    });
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

    /**
     * Получить информацию спортивной площадки для создателя.
     */
    [SportAreaRetrieveOwnerApiRequest.fulfilled]: (state, action) => {
      state.sportAreaDetailView = action.payload;
    },
  },
});
export default baseSlice.reducer;

export const sportAreaOwnerList = (state) => state.sportArea.sportAreaOwnerList;

export const updatedStatusSportArea = (state) =>
  state.sportArea.updatedStatusSportArea;

export const sportAreaUserList = (state) => state.sportArea.sportAreaUserList;
export const sportAreaDetailView = (state) =>
  state.sportArea.sportAreaDetailView;
