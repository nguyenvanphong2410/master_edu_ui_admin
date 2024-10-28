import { createSlice } from "@reduxjs/toolkit";

const generalConfigSlice = createSlice({
  name: 'generalConfig',
  initialState: {
    isLoadingConfig: false,
  },
  reducers: {
    setLoadingConfig: (state, action) => ({
        ...state,
        isLoadingConfig: action.payload
      }),
  }
})

export const {
    setLoadingConfig
} = generalConfigSlice.actions

export default generalConfigSlice.reducer