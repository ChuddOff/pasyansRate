import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DeckResponse, EloBody, ProfileBody, ProfileResponse, TimeBody } from './interfaces';

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
                url: `/api/zamer/postElo`,
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