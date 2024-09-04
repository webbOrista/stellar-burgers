import { getFeedsApi } from './../../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ERequestStatus, TOrdersData } from './../../../utils/types';

export const getFeed = createAsyncThunk('feed/getAll', async () =>
  getFeedsApi()
);

interface IFeedSlice {
  feed: TOrdersData;
  status: ERequestStatus;
  error?: string | null;
}

export const initialState: IFeedSlice = {
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  status: ERequestStatus.Idle,
  error: null
};

export const FeedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.status = ERequestStatus.Loading;
        state.error = null;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        (state.status = ERequestStatus.Success), (state.feed = action.payload);
        state.error = null;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.status = ERequestStatus.Failed;
        state.error = action.error.message;
      });
  },
  selectors: {
    feedOrdersSelector: (state) => state.feed.orders,
    wholeFeedSelector: (state) => state.feed,
    feedStatusSelector: (state) => state.status
  }
});

export const { feedOrdersSelector, wholeFeedSelector, feedStatusSelector } =
  FeedSlice.selectors;

export const FeedSliceReducer = FeedSlice.reducer;
