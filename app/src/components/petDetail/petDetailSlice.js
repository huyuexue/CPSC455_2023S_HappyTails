import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    selected:{}
}

const petDetailSlice = createSlice({
    name:'petDetail',
    initialState,
    reducers: {
        openDetailView: {
            reducer: (state, action) => {
                state.isOpen = true;
            }
        },
        closeDetailView: {
            reducer: (state, action) => {
                state.isOpen = false;
            }
        },
        selectPet: {
            reducer: (state, action) =>{
                state.selected =  action.payload;
            }
        }
    }

});

export const {openDetailView, closeDetailView, selectPet} = petDetailSlice.actions;
export default petDetailSlice.reducer
export const detailViewStatus = (state) => state.petDetail.isOpen;
export const selectedPet = (state) => state.petDetail.selected;