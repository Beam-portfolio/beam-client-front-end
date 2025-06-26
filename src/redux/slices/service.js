import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetcher } from '../../utils/axios';


const initialState = {
    services: [],
    loading: false,
    error: null,
}

export const fetchServices = createAsyncThunk("service/fetchServices",
   async (_, {rejectWithValue}) => {
    try {
        // const response = await axios.get("/services")
        const response = await fetcher('/services')
        return response.services
    } catch (error) {
        return rejectWithValue(error)
    }
   }
)


const serviceSlice = createSlice({
    name: "service",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchServices.fulfilled, (state, action) => {
        state.services = action.payload
        state.loading = false
        state.error = null
      })
      builder.addCase(fetchServices.pending, (state) => {
        state.loading = true
      })
      builder.addCase(fetchServices.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    },
})

export default serviceSlice.reducer