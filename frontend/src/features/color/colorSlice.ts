// store/colorSlice.js
import { createSlice } from "@reduxjs/toolkit";

interface ColorState {
  pickedColor: string;
}

const initialState: ColorState = {
  pickedColor: "#000000",
};

const colorSlice = createSlice({
  name: "color",
  initialState: initialState,
  reducers: {
    setColor: (state, action) => {
      state.pickedColor = action.payload;
    },
  },
});

export const { setColor } = colorSlice.actions;
export default colorSlice.reducer;
