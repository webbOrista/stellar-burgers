import { getUserApi, loginUserApi, logoutApi, registerUserApi, TLoginData, TRegisterData, updateUserApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ERequestStatus, TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

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

export const registerUser = createAsyncThunk(
  'user/register',
  async(data:TRegisterData,{rejectWithValue}) =>{
    const reply = await registerUserApi(data);
    if (!reply.success){
      return rejectWithValue(data);
    }
    setCookie('accessToken', reply.accessToken)
    localStorage.setItem('refreshToken', reply.refreshToken)
    return reply;
  }
)

export const loginUser = createAsyncThunk(
  'user/login',
  async(data:TLoginData,{rejectWithValue}) =>{
    const reply = await loginUserApi(data);
    if (!reply.success){
      return rejectWithValue(data);
    }
    setCookie('accessToken', reply.accessToken)
    localStorage.setItem('refreshToken', reply.refreshToken)
    return reply.user;
  }
)

export const updateUser = createAsyncThunk(
  'user/update',
  async(user:TRegisterData,{rejectWithValue}) =>{
    const reply = await updateUserApi(user);
    if (!reply.success){
      return rejectWithValue(reply);
    }
    return reply;
  }
)

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    const reply = await logoutApi();
    if (!reply.success) {
      return rejectWithValue(reply);
    }
    deleteCookie('accessToken');
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
      })
      .addCase(registerUser.pending, (state) => {
        state.isAuthChecked = false;
        state.isAuthenticated = false;
        state.status = ERequestStatus.Loading;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.status = ERequestStatus.Success;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.status = ERequestStatus.Failed;
      })
      .addCase(loginUser.pending, (state) => {
        state.isAuthChecked = false;
        state.isAuthenticated = false;
        state.status = ERequestStatus.Loading;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.status = ERequestStatus.Success;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.status = ERequestStatus.Failed;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = ERequestStatus.Loading;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.status = ERequestStatus.Success;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = ERequestStatus.Failed;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.status = ERequestStatus.Failed;;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isAuthChecked = true;
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
