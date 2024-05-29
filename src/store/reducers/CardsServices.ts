import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DeckResponse } from './interfaces';

export const apiCards = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'https://deckofcardsapi.com/api'}),
    endpoints: builder => ({
        getCards: builder.query<DeckResponse, void>({
            query: () => '/deck/new/draw/?count=52'
        })
    })
})