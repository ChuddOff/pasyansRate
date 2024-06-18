import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DeckResponse, EloBody, ProfileBody, ProfilePostBody, ProfileResponse, TimeBody } from './interfaces';

export const apiCards = createApi({
    reducerPath: 'apiCards',
    baseQuery: fetchBaseQuery({baseUrl: 'https://deckofcardsapi.com/api'}),
    endpoints: builder => ({
        getCards: builder.query<DeckResponse, void>({
            query: () => '/deck/new/draw/?count=52'
        }),
    })
})

export const apiProfile = createApi({
    reducerPath: 'apiProfile',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000' }),
    tagTypes: ['Profile'],
    endpoints: (builder) => ({
        getProfile: builder.query<ProfileResponse[], ProfileBody>({
            query: ({ name }) => ({
                url: `/api/zamer/getProfile`,
                params: {name},
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            providesTags: ['Profile'],
        }),
        getAll: builder.query<ProfileResponse[], void>({
            query: () => ({
                url: `/api/zamer/getAll`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        postProfile: builder.mutation<void, ProfilePostBody>({
            query: (body) => ({
                url: `/api/zamer/postProfile`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            }),
            invalidatesTags: ['Profile'],
        }),
        postElo: builder.mutation<void, EloBody>({
            query: (body) => ({
                url: `/api/zamer/postElo`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            }),
            invalidatesTags: ['Profile'],
        }),
        postTime: builder.mutation<void, TimeBody>({
            query: (body) => ({
                url: `/api/zamer/postTime`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            }),
            invalidatesTags: ['Profile'],
        }),
        postWin: builder.mutation<void, ProfileBody>({
            query: (body) => ({
                url: `/api/zamer/postWin`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            }),
            invalidatesTags: ['Profile'],
        }),
        postFail: builder.mutation<void, ProfileBody>({
            query: (body) => ({
                url: `/api/zamer/postFail`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            }),
            invalidatesTags: ['Profile'],
        })
    })
}) 
// export const apiProfile = createApi({
//     reducerPath: 'api',
//     baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api/zamer/getProfile' }), // укажите базовый URL вашего API
//     endpoints: (builder) => ({
//       getUserById: builder.query<ProfileResponse, string>({
//         query: (id) => `?name=${id}`,
//       }),
//     }),
//   });