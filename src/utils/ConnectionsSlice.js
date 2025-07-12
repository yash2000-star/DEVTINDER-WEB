import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
    name: 'connection',
    initialState: null,
    reducers: {
        addConnections: (state, action) => action.payload,
        removeConnections: () => null,
    },
});

export const { addConnections, removeConnections } = connectionsSlice.actions;

export default connectionsSlice.reducer