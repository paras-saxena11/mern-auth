import {createApi, fetchBaseQuery} from '@reduxjs/toolkit';

const baseQuery = fetchBaseQuery({baseUrl : ''})

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User'],
    endpoints: (builder) => ({})
})