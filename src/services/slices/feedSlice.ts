import { getFeedsApi } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ERequestStatus, TOrdersData } from "@utils-types";



export const getFeed = createAsyncThunk('feed/getAll', async () =>
    getFeedsApi()
  );
  
  interface IFeedSlice {
    feed: TOrdersData;
    status: ERequestStatus;
  }
  
  const initialState: IFeedSlice = {
    feed: {
      orders: [],
      total: 0,
      totalToday: 0
    },
    status: ERequestStatus.Idle
  };
  
  export const FeedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getFeed.pending, (state) => {
          state.status = ERequestStatus.Loading;
        })
        .addCase(getFeed.fulfilled, (state, action) => {
            (state.status = ERequestStatus.Success), (state.feed = action.payload);
          })
        .addCase(getFeed.rejected, (state) => {
          state.status = ERequestStatus.Failed;
        })
    },
    selectors: {
      feedOrdersSelector: (state) => state.feed.orders,
      wholeFeedSelector: (state) => state.feed,
      feedStatusSelector: (state) => state.status,
    }
  });

  export const {feedOrdersSelector, wholeFeedSelector, feedStatusSelector} = FeedSlice.selectors
