import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Card } from "./interfaces";
import produce from 'immer';

interface UserState {
    columns: Card[][];
    cardsOther: CardsOther[];
    cardOtherIndex: number;
    cardsOpened: string[];
    isDrag: boolean;
    placeHolders: CardsOther[][];
    // [key: string]: Card[] | undefined;
}
interface DroppedRelocate {
    indexOld: number;
    indexNew: number;
    indexCard: number;
    cardList: Card[];
}
interface CardsOther {
    suit: string;
    value: string;
    code: string;
}
interface DroppedPlaceHolder {
    count: number;
    suit: string;
    value: string;
    code: string;
}

const initialState: UserState = {
    columns: [[], [], [], [], [], [], []],
    cardsOther: [],
    cardOtherIndex: -1,
    cardsOpened: [],
    isDrag: false,
    placeHolders: [[], [], [], []]
}


// const initColumns = (state: UserState, cards: Card[]): void => {
    
//     for (let i = 1; i <= 7; i++) {
//         console.log(state);
//         state[`columns${i}`] = cards.splice(0, i);
//         console.log(cards);
//     }
// }

const ColumnsSlice = createSlice({
    name: 'Columns',
    initialState,
    reducers: {
        setColumns: (state, action) => {
            
            const columnsUpdate: Card[][] =  [[], [], [], [], [], [], []]
            const cardsUpdate: Card[]  =  [...action.payload];
            
            for (let i = 1; i <= 7; i++) {
                columnsUpdate[i-1] = cardsUpdate.splice(0, i);
                
            }
            state.cardsOther = cardsUpdate;
            state.columns = columnsUpdate;
        },
        addOpenedCard: (state, action) => {
            if (!state.cardsOpened.includes(action.payload)) {
                state.cardsOpened.push(action.payload);
            }
            
            
        },
        setDragging: (state, action) => {
            state.isDrag = action.payload;
        },
        relocateCard: (state, action: PayloadAction<DroppedRelocate>) => {
            const item = action.payload;
            state.columns[item.indexOld].splice(item.indexCard, item.cardList.length);
            
            for (const card of item.cardList) {
                
                state.columns[item.indexNew].push(card);
            }
        },
        changeOpenedCard: (state, action) => {
            
            state.cardOtherIndex = action.payload;

        },
        appendPlaceHolder: (state, action: PayloadAction<DroppedPlaceHolder>) => {
            const {count, suit, value, code} = action.payload;
            console.log(count, code);
            
            state.placeHolders[count].push({
                suit: suit,
                value: value,
                code: code
            })
        },
        // relocateCard: (state, action) => {
        //     const {}

        // }
    }
})

export default ColumnsSlice.reducer;

export const {
    setColumns,
    addOpenedCard,
    setDragging,
    relocateCard,
    changeOpenedCard,
    appendPlaceHolder
} = ColumnsSlice.actions; 