import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetcher } from '../../utils/axios';



const initialState = {
  projects: [],
  currentProject: null,
  loading: false,
  error: null
}

export const fetchProjects = createAsyncThunk("project/fetchProjects",
   async (_, {rejectWithValue}) => {
    try {
        const response = await fetcher('/projects')
        return response
    } catch (error) {
        return rejectWithValue(error)
    }
   }
)

export const fetchProject = createAsyncThunk("project/fetchProject",
   async (projectId, {rejectWithValue}) => {
    try {
        const response = await fetcher(`/projects/${projectId}`)
        return response
    } catch (error) {
        return rejectWithValue(error)
    }
   }
)

const ProjectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProjects.fulfilled, (state, action) => {
            state.projects = action.payload
            state.loading = false
            state.error = null
        })
        builder.addCase(fetchProjects.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchProjects.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(fetchProject.fulfilled, (state, action) => {
            state.currentProject = action.payload
            state.loading = false
            state.error = null
        })
        builder.addCase(fetchProject.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchProject.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default ProjectSlice.reducer
