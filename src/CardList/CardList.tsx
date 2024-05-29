import {CardItem} from "../CardItem/CardItem";
import { PlaceHolder } from "../CardItem/CardItem";
import axios from "axios";
import { useState, useEffect } from "react";

import './CardList.scss'
import { apiCards } from "../store/reducers/CardsServices";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setColumns } from "../store/reducers/ColumnsSlice";
import { Card } from "../store/reducers/interfaces";
import { DropResult } from 'react-beautiful-dnd';
import { Provider } from "react-redux";
import { log } from "util";
  

interface CardListProps {
    
}

// const getCards = async (): Promise<DeckResponse> => {
//     const cards = await axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=52');
//     return cards.data;
// }
 
const CardList: React.FC<CardListProps> = () => {
    const dispatch = useAppDispatch();
    const [success, setSuccess] = useState(false)
    const {columns} = useAppSelector(state => state.columns)
    
    

    const {data, isSuccess, isLoading, isError} = apiCards.useGetCardsQuery()

    if (isError) {
        console.log('Error');
    }
    if (isLoading) {
        console.log('Loading');
    }
    if (isSuccess && !success) {
        dispatch(setColumns(data.cards))
        setSuccess(true)
    }

    

    return (  
        <div 
            className="cardlist">
            {columns.map((column, columnIndex) => (
                <div key={columnIndex} className="column">
                    {column.length!==0 ? column.map((card, cardIndex) => {

                    let bottom: number = 0;
                    if (cardIndex) {
                        bottom = 85*cardIndex;
                    }

                        return <CardItem 
                        key={cardIndex} 
                        suit={card.suit} 
                        value={card.value} 
                        code={card.code} 
                        bottom={bottom} 
                        show={column.length === cardIndex+1} 
                        columnIndex={columnIndex}
                        cardIndex={cardIndex} />
                    })
                    :
                    <PlaceHolder bottom = {0} suit = {'KING'} code = {'KH'} columnIndex = {columnIndex} isForKing = {true} />
                    
                }
                </div>
            ))}
        </div>
     );
}
 
export default CardList;