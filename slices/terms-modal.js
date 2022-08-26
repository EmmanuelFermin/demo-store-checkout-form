import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenTermsModal: false,
};

const slice = createSlice({
  name: "terms-modal",
  initialState,
  reducers: {
    openModal(state) {
      state.isOpenTermsModal = !state.isOpenTermsModal;
    },
  },
});

export const { reducer } = slice;

export const openModal = () => (dispatch) => {
  dispatch(slice.actions.openModal());
};

export default slice;
//SLICE COMPONENT FOR MODULARIZE REDUX
