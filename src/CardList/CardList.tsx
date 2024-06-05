import {CardItem} from "../CardItem/CardItem";
import { PlaceHolder } from "../CardItem/CardItem";
import { useEffect, useState } from "react";

import './CardList.scss'
import { apiCards } from "../store/reducers/CardsServices";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setColumns, setRestart, toggleShowModal } from "../store/reducers/ColumnsSlice";
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

    const [ end, setEnd] = useState(false)

    const {restart, cardsOther, cardsOpened, showModal, cards, columns, placeHolders} = useAppSelector(state => state.columns)
    
    const getCardByCode = (code: string) => {
        return cards[cards.map(item => item.code).indexOf(code)]
    }

    const {data, isSuccess, isFetching, isError, refetch} = apiCards.useGetCardsQuery()

    if (isError) {
        console.log('Error');
    }
    if (isFetching) {
        console.log('Loading');
    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(setColumns(data.cards))
            dispatch(setRestart(false))
        }
    }, [data, isSuccess])
    
    if (!end && cardsOpened.length === 52 && cardsOther.length === 0) {
        setEnd(true)
        setTimeout(() => {
            dispatch(toggleShowModal())
        }, 100);
        
    }

    useEffect(() => {
        if (restart) {
            refetch()
        }
    }, [restart])
    

    if (placeHolders[0].slice(-1)[0] && getCardByCode(placeHolders[0].slice(-1)[0]).value === 'KING' && 
    placeHolders[1].slice(-1)[0] && getCardByCode(placeHolders[1].slice(-1)[0]).value === 'KING' && 
    placeHolders[2].slice(-1)[0] && getCardByCode(placeHolders[2].slice(-1)[0]).value === 'KING' && 
    placeHolders[3].slice(-1)[0] && getCardByCode(placeHolders[3].slice(-1)[0]).value === 'KING') {
        // clearInterval(intervalId);
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