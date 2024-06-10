import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DeckResponse } from './interfaces';

export const apiCards = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'https://deckofcardsapi.com/api'}),
    endpoints: builder => ({
        getCards: builder.query<DeckResponse, void>({
            query: () => '/deck/new/draw/?count=52'
        }),
    })
}) 
export const apiProfile = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:4000'}),
    endpoints: builder => ({
        getProfile: builder.query<DeckResponse, void>({
            query: () => '/api/zamer/getProfile'
        })
    })
}) 