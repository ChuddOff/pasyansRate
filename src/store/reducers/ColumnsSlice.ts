import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";
import { Card, currentCard } from "./interfaces";
import produce from 'immer';
import { it } from "node:test";

interface UserState {
    cards: currentCard[];
    columns: string[][];
    cardsOther: CardsOther[];
    cardOtherIndex: number;
    cardsOpened: string[];
    isDrag: boolean;
    moves: number;
    placeHoldersReq: string[]
    placeHolders: string[][];
    currentCard: currentCard;
    showModal: boolean;
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

const initialState: UserState = {
    cards: [],
    columns: [[], [], [], [], [], [], []],
    cardsOther: [],
    cardOtherIndex: -1,
    cardsOpened: [],
    isDrag: false,
    moves: 0,
    placeHoldersReq: ['ACE', 'ACE', 'ACE', 'ACE'],
    placeHolders: [[], [], [], []],
    currentCard: {
        suit: '0',
        value: '0',
        code: '0',
        bottom: 0,
        columnIndex: 0,
        cardIndex: 0,
        isOther: false,
        isPlace: false,
        isField: false
    },
    showModal: false
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
        setColumns: (state, action: PayloadAction<Card[]>) => {
            
            const columnsUpdate: Card[][] =  [[], [], [], [], [], [], []]
            const cardsUpdate: Card[]  =  [...action.payload];
            
            for (let i = 1; i <= 7; i++) {
                columnsUpdate[i-1] = cardsUpdate.splice(0, i);
                
            }
            state.cardsOther = cardsUpdate;

            cardsUpdate.forEach(item => {
                state.cards.push({
                    suit: item.suit,
                    value: item.value,
                    code: item.code,
                    bottom: 0,
                    columnIndex: 0,
                    cardIndex: 0,
                    isOther: true,
                    isPlace: false,
                    isField: false
                })
            })

            action.payload.forEach(item => {
                state.cards.push({
                    suit: item.suit,
                    value: item.value,
                    code: item.code,
                    bottom: 0,
                    columnIndex: 0,
                    cardIndex: 0,
                    isOther: true,
                    isPlace: false,
                    isField: false
                })
            })
            
            columnsUpdate.forEach((item, i) => {
                item.forEach((item2) => {
                    state.columns[i].push(item2.code)
                })
            })
        },
        updateCards: (state, action: PayloadAction<currentCard>) => {
            if (state.cards.map(item => item.code).indexOf(action.payload.code) !== -1) {
                state.cards[state.cards.map(item => item.code).indexOf(action.payload.code)] = action.payload;
            } else {
                state.cards.push(action.payload)
            }
        },
        setCurrentCard: (state, action: PayloadAction<currentCard>) => {
            state.currentCard = action.payload;
        },
        setDragging: (state, action) => {
            state.isDrag = action.payload;
        },

        addOpenedCard: (state, action) => {
            if (!state.cardsOpened.includes(action.payload)) {
                state.cardsOpened.push(action.payload);
            }
            
            
        },
        changeOtherCard: (state, action) => {
            
            state.cardOtherIndex = action.payload;

        },
        appendPlaceHolder: (state, action) => {
            
            state.placeHolders[action.payload].push(state.currentCard.code);
        },
        deleteCard: (state) => {
            state.moves += 1
            if (state.currentCard.isOther) {
                state.cardsOther.splice(state.cardsOther.map(item => item.code).indexOf(state.currentCard.code), 1);
                state.cardOtherIndex -= 1;
            }
            if (state.currentCard.isPlace) {
                const suits = ['HEARTS', 'DIAMONDS', 'CLUBS', 'SPADES']
                const valueArr = ['ACE', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING']

                const suitIndex = suits.indexOf(state.currentCard.suit)

                state.placeHolders[suitIndex].splice(state.placeHolders[suitIndex].length-1, 1)

                state.placeHoldersReq[suitIndex] = valueArr[valueArr.indexOf(state.currentCard.value)]
            }
            
            if (state.currentCard.isField) {
                
                state.columns[state.currentCard.columnIndex].splice(state.currentCard.cardIndex, 10)
            }
        },
        addCard: (state, action: PayloadAction<string>) => {

            const placedCard: currentCard = state.cards[state.cards.map(item => item.code).indexOf(action.payload)]



            if (placedCard.isField && state.currentCard.isField) {
                const cardList = state.columns[state.currentCard.columnIndex].slice(state.currentCard.cardIndex)
                
                cardList.forEach(item => {
                    state.columns[placedCard.columnIndex].push(item)
                })
            } else {
                
                state.columns[placedCard.columnIndex].push(state.currentCard.code)
            }

        },
        addKingCard: (state, action: PayloadAction<number>) => {

            if (state.currentCard.isField) {
                const cardList = state.columns[state.currentCard.columnIndex].slice(state.currentCard.cardIndex)
                
                cardList.forEach(item => {
                    
                    state.columns[action.payload].push(item)
                })
            }

            if (state.currentCard.isOther) {
                
                state.columns[action.payload].push(state.currentCard.code)
            }

        },
        addPlaceCard: (state, action: PayloadAction<number>) => {

            console.log(state.currentCard.code);
            
            state.placeHolders[action.payload].push(state.currentCard.code)

        },
        upPlaceHolderReq: (state, action: PayloadAction<number>) => {
            
            const valueArr = ['ACE', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING']

            state.placeHoldersReq[action.payload] = valueArr[valueArr.indexOf(state.currentCard.value)+1]
        },
        toggleShowModal: (state) => {
            state.showModal = !state.showModal
        },
    }
})

export default ColumnsSlice.reducer;

export const {
    updateCards,
    setColumns,
    addOpenedCard,
    setDragging,
    changeOtherCard,
    appendPlaceHolder,
    setCurrentCard,
    deleteCard,
    addCard,
    addKingCard,
    upPlaceHolderReq,
    addPlaceCard,
    toggleShowModal
} = ColumnsSlice.actions; 