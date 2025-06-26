import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetcher } from '../../utils/axios';

const initialState = {
  testimonials: [],
  loading: false,
  error: null,
}

export const fetchTestimonials = createAsyncThunk("testimonial/fetchTestimonials",
     async (_, {rejectWithValue}) => {
      try {
      const data = await fetcher('/customer-word');
      console.log(data, 'data');
      
      return data.customerWords || data;
      } catch (error) {
          return rejectWithValue(error)
      }
     }
)

const testimonialSlice = createSlice({
  name: 'testimonialSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTestimonials.fulfilled, (state, action) => {
      state.testimonials = action.payload
      state.loading = false
      state.error = null
    })
    builder.addCase(fetchTestimonials.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchTestimonials.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
  }
})

export default testimonialSlice.reducer