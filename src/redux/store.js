import { configureStore } from '@reduxjs/toolkit';
import serviceSlice from './slices/service.js';
import projectSlice from './slices/Project.js';
import testimonialSlice from './slices/testimonial.js'
import SettingsSlice from './slices/settings.js'


export const store = configureStore({
    reducer: {
        services: serviceSlice,
        projects: projectSlice,
        testimonials: testimonialSlice,
        settings: SettingsSlice
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
      }),
})