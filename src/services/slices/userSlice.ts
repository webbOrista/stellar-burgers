import { getUserApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ERequestStatus, TUser } from '@utils-types';

export const getUser = createAsyncThunk(
  'user/get',
  async (_, { rejectWithValue }) => {
    const reply = await getUserApi();
    if (!reply.success) {
      return rejectWithValue(reply);
    }
    return reply;
  }
);

type TUserState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  user: TUser | null;
  status: ERequestStatus;
};

const initialState: TUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: null,
  status: ERequestStatus.Idle
};

export const UserSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUser.pending, (state) => {
        state.isAuthChecked = false;
        state.status = ERequestStatus.Loading;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.status = ERequestStatus.Success;
      })
      .addCase(getUser.rejected, (state) => {
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.status = ERequestStatus.Failed;
      });
  },
  selectors: {
    isAuthCheckedSelector: (state) => state.isAuthChecked,
    isAuthenticatedSelector: (state) => state.isAuthenticated,
    userDataSelector: (state) => state.user,
    userStatusSelector: (state) => state.status
  }
});

export const UserSelector = UserSlice.selectors;
