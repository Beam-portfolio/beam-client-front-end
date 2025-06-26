import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetcher } from '../../utils/axios'

const initialState = {
    settings: null,
    loading: false,
    error: null
}


export const fetchSettings = createAsyncThunk('settings/fetchSettings', async (_, {rejectWithValue}) => {
    try {
        const response = await fetcher('/settings')
        return response.data || response
    } catch (error) {
        return rejectWithValue(error)
    }
})

const SettingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSettings.fulfilled, (state, action) => {
            state.settings = action.payload
            state.loading = false
            state.error = null
        })
        builder.addCase(fetchSettings.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchSettings.rejected, (state, action) => {
            state.error = action.payload
        })

    }
})

export default SettingsSlice.reducer
