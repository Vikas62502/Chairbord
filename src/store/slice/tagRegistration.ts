import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    tagRegistrationData: {},
}

export const tagRegistrationSlice = createSlice({
    name: 'tagRegistration',
    initialState,
    reducers: {
        saveTagRegistrationData: (state, action: PayloadAction<any>) => {
            state.tagRegistrationData = action.payload;
        },
        resetTagRegistrationData: (state) => {
            state.tagRegistrationData = {};
        }
    }
})

export const { saveTagRegistrationData, resetTagRegistrationData } = tagRegistrationSlice.actions

export default tagRegistrationSlice.reducer