import {CardItem} from "../CardItem/CardItem";
import { PlaceHolder } from "../CardItem/CardItem";
import axios from "axios";
import { useState, useEffect } from "react";

import './CardList.scss'
import { apiCards } from "../store/reducers/CardsServices";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { addOpenedCard, setColumns } from "../store/reducers/ColumnsSlice";
import { Card } from "../store/reducers/interfaces";
import { DropResult } from 'react-beautiful-dnd';
import { Provider } from "react-redux";
import { log } from "util";
import Modal from '../Modal/Modal';
  

interface CardListProps {
    
}

// const getCards = async (): Promise<DeckResponse> => {
//     const cards = await axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=52');
//     return cards.data;
// }
 
const CardList: React.FC<CardListProps> = () => {
    const dispatch = useAppDispatch();

    const [success, setSuccess] = useState(false)
    
    const {showModal, cards, columns} = useAppSelector(state => state.columns)
    
    const getCardByCode = (code: string) => {
        return cards[cards.map(item => item.code).indexOf(code)]
    }

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
        <div>
        <div 
            className="cardlist">
            {columns.map((column, columnIndex) => (
                <div key={columnIndex} className="column">
                    {column.length!==0 ? column.map((code, cardIndex) => {

                    let bottom: number = 0;
                    if (cardIndex) {
                        bottom = 90*cardIndex;
                    }

                        return <CardItem 
                        key={cardIndex} 
                        suit={getCardByCode(code).suit} 
                        value={getCardByCode(code).value} 
                        code={getCardByCode(code).code} 
                        bottom={bottom} 
                        show={column.length === cardIndex+1} 
                        columnIndex={columnIndex}
                        cardIndex={cardIndex}
                        isField={true} />
                    })
                    :
                    <PlaceHolder index = {columnIndex} bottom = {0} isForKing = {true} />
                    
                }
                </div>
            ))}
        </div>
        {showModal && <Modal/>}
        </div>
     );
}
 
export default CardList;