import {CardItem} from "../CardItem/CardItem";
import { PlaceHolder } from "../CardItem/CardItem";
import { useState } from "react";

import './CardList.scss'
import { apiCards } from "../store/reducers/CardsServices";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setColumns, toggleShowModal } from "../store/reducers/ColumnsSlice";
import Modal from '../Modal/Modal';
  

interface CardListProps {
    
}
 
const CardList: React.FC<CardListProps> = () => {


    
    let bottomRange = 90;

    if (window.innerWidth <= 1023) {
        bottomRange = 68;
    }
    if (window.innerWidth <= 767) {
        bottomRange = 38;
    }


    const dispatch = useAppDispatch();

    const [ success, setSuccess] = useState(false)
    const [ end, setEnd] = useState(false)

    const {cardsOther, cardsOpened, showModal, cards, columns} = useAppSelector(state => state.columns)
    
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
    
    if (!end && cardsOpened.length === 52 && cardsOther.length === 0) {
        setEnd(true)
        setTimeout(() => {
            dispatch(toggleShowModal())
        }, 100);
        
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
                        bottom = bottomRange*cardIndex;
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