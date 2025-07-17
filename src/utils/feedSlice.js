import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null, 
    reducers: {
        addFeed: (state, action) => {
            return action.payload;
        },
        removeUserFeed: (state, action) => {
            if (!state) return null; 
            return state.filter(user => user._id !== action.payload);
        },
        clearFeed: (state, action) => {
            return null;
        }
    }
});

export const { addFeed, removeUserFeed, clearFeed } = feedSlice.actions; 
export default feedSlice.reducer; 