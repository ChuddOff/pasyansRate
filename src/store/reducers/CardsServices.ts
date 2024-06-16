import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DeckResponse, ProfileBody, ProfileResponse } from './interfaces';

export const apiCards = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'https://deckofcardsapi.com/api'}),
    endpoints: builder => ({
        getCards: builder.query<DeckResponse, void>({
            query: () => '/deck/new/draw/?count=52'
        }),
    })
}) 
export const фзш = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000' }),
    tagTypes: ['Profile'],
    endpoints: (builder) => ({
        getProfile: builder.query<ProfileResponse, ProfileBody>({
            query: ({ name }) => ({
                url: `/api/zamer/getProfile?name=${name}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
    })
}) 
export const apiProfile = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api/zamer/getProfile' }), // укажите базовый URL вашего API
    endpoints: (builder) => ({
      getUserById: builder.query<ProfileResponse, string>({
        query: (id) => `?name=${id}`,
      }),
    }),
  });