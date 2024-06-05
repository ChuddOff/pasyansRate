import { useDrag, useDrop } from 'react-dnd';
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { addOpenedCard, setDragging, setCurrentCard, updateCards, deleteCard, addCard, addKingCard, addPlaceCard, upPlaceHolderReq } from "../store/reducers/ColumnsSlice";
import { useEffect, useState } from 'react';
import './CardItem.scss'
import { currentCard } from '../store/reducers/interfaces';
import { useSwipeable } from 'react-swipeable';


interface CardItemProps {
    suit: string;
    value: string;
    code: string;
    bottom?: number;
    show?: boolean;
    columnIndex?: number;
    cardIndex?: number;
    isOther?: boolean;
    isPlace?: boolean;
    isField?: boolean;
}

interface CardFakeProps {
    bottom: number;
}
interface DroppedItem {
    columnIndex: number;
}
interface PlaceHolder {
    index?: number;
    bottom: number;
    code?: string;
    isForKing: boolean;
}

const getIcon = (suit: string, value: string) => {
    if (value === "JACK") {
        return `/V${suit === "HEARTS" || suit === "DIAMONDS" ? "R" : "B"}.png`
    }
    else if (value === "QUEEN") {
        return `/D${suit === "HEARTS" || suit === "DIAMONDS" ? "R" : "B"}.png`
    }
    else if (value === "KING") {
        return `/K${suit === "HEARTS" || suit === "DIAMONDS" ? "R" : "B"}.png`
    }
    else {
        return `/${suit}.png`
    } 
}
 
export const CardItem: React.FC<CardItemProps> = ({suit, value, code, bottom=0, show=false, columnIndex = 0, cardIndex = 0, isOther=false, isPlace=false, isField=false}) => {
    
    const {cardsOpened} = useAppSelector(state => state.columns)
    const dispatch = useAppDispatch();

    useEffect(() => {

        dispatch(updateCards({
            suit: suit,
            value: value,
            code: code,
            bottom: bottom ?? 0,
            columnIndex: columnIndex ?? 0,
            cardIndex: cardIndex ?? 0,
            isOther: isOther ?? false,
            isPlace: isPlace ?? false,
            isField: isField ?? false
        }))
    }, [suit, value, code, bottom, show, columnIndex, cardIndex, isOther, isPlace, isField])

    

    return ( 
        <>
            {show || cardsOpened.includes(code) || isPlace || isOther ?
            <CardReal 
            suit={suit} 
            value={value} 
            code={code} 
            bottom={bottom} 
            show={show} 
            columnIndex={columnIndex}
            cardIndex={cardIndex}
            isOther={isOther}
            isPlace={isPlace}
            isField={isField}
             />
            :
            <CardFake bottom={bottom}/>}
        </>
     );
}

const CardReal: React.FC<CardItemProps> = ({suit, value, code, bottom, show, columnIndex, cardIndex, isOther, isPlace, isField}) => {

    const dispatch = useAppDispatch();
    const {currentCard, placeHoldersReq, columns, cards, cardsOpened, isDrag} = useAppSelector(state => state.columns)



    let bottomRange = 130;

    if (window.innerWidth <= 1023) {
        bottomRange = 100;
    }
    if (window.innerWidth <= 767) {
        bottomRange = 60;
    }



    useEffect(() => {
        if (!cardsOpened.includes(code)) {
            dispatch(addOpenedCard(code))
        }
    }, [suit, value, code, bottom, show, columnIndex, cardIndex, isOther, isPlace, isField])



    const [{ isDragging }, drag] = useDrag({
        type: 'card',
        item: { 
            columnIndex: columnIndex
         },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    })



    const [positionX, setPositionX] = useState(0);
    const [positionY, setPositionY] = useState(0);



    useEffect(() => {
        dispatch(setDragging(isDragging))

        if (isDragging) {
            dispatch(setCurrentCard({
                suit: suit,
                value: value,
                code: code,
                bottom: bottom ?? 0,
                columnIndex: columnIndex ?? 0,
                cardIndex: cardIndex ?? 0,
                isOther: isOther ?? false,
                isPlace: isPlace ?? false,
                isField: isField ?? false
            }))
        }
    }, [isDragging])
    
    const getCardByCode = (code: string): currentCard => {
        return cards[cards.map(item => item.code).indexOf(code)]
    }

    const checkValue = (valueOld: string, valueNew: string) => {
        const valueArr = ['ACE', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING']

        return valueArr.indexOf(valueOld) === valueArr.indexOf(valueNew)+1
    }

    const checkSuit = (suitOld: string, suitNew: string) => {
        let isRightSuit: boolean = false;

        if ((suitOld === 'DIAMONDS' || suitOld === 'HEARTS') && (suitNew === 'CLUBS' || suitNew === 'SPADES')) {
            isRightSuit = true
        }
        if ((suitNew === 'DIAMONDS' || suitNew === 'HEARTS') && (suitOld === 'CLUBS' || suitOld === 'SPADES')) {
            isRightSuit = true
        }
        return isRightSuit;
    }

    const autoSelect = (code: string) => {
        if (!getCardByCode(code).isField){
            let unFound: boolean = true;
            const suits = ['HEARTS', 'DIAMONDS', 'CLUBS', 'SPADES']

            dispatch(setCurrentCard(getCardByCode(code)));
            
            if (!getCardByCode(code).isPlace) {
                for (let i = 0; i<placeHoldersReq.length; i++) {
                    if ((getCardByCode(code).value === placeHoldersReq[i]) && (suits[i] === getCardByCode(code).suit)) {
                        // dispatch(addCard(getCardByCode(column.slice(-1)[0]).code))

                        dispatch(addPlaceCard(i))
                        dispatch(upPlaceHolderReq(i))
                        dispatch(deleteCard())
                        unFound = false
                        break
                    }
                }
            }
            
            if (unFound && !getCardByCode(code).isField) {
                
                for (let i = 0; i<columns.length; i++) {
                    if (!columns[i].slice(-1)[0] && getCardByCode(code).value==='KING') {
                        dispatch(addKingCard(i))
                        dispatch(deleteCard())
                        break
                    }
        
                    if (checkValue(getCardByCode(columns[i].slice(-1)[0] ?? 'AH').value, getCardByCode(code).value) && checkSuit(getCardByCode(columns[i].slice(-1)[0]).suit, getCardByCode(code).suit)) {
                        
                        dispatch(addCard(getCardByCode(columns[i].slice(-1)[0]).code))
                        dispatch(deleteCard())
                        break
                    }
                } 
            }
        }
    }

    return ( 
        <>
            <div 
            onClick={() => {autoSelect(code)}}
            ref={drag}
            className='card' 
            // draggable={true}
            style={{
                bottom: `${bottom}px`,
                transform: `translate(${positionX}px, ${positionY}px)`,
                }}>
                <div className='card_detail'
                >
                    <h4>{value==='10' ? value : value.charAt(0)}</h4>
                    <img src={`/${suit}.png`} alt="" />
                </div>
                <img src={getIcon(suit, value)} alt="" />
            </div>

            {show && isDrag && !isDragging ?
            <PlaceHolder
            bottom={(bottom ?? 0)+bottomRange} 
            code={code} 
            isForKing = {false} /> 
             : null}
        </>
     );
}

export const PlaceHolder: React.FC<PlaceHolder> = ({index = 0, bottom, code='0', isForKing}) => {

    const dispatch = useAppDispatch();
    const {cards, currentCard} = useAppSelector(state => state.columns)

    const getCardByCode = (code: string) => {
        return cards[cards.map(item => item.code).indexOf(code)]
    }

    const [ {isOver} , drop] = useDrop({
        accept: 'card',
        drop: (item: DroppedItem) => isForKing ? isKing() : isRightCard(),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        })
    })

    const valueArr = ['ACE', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING']

    const isRightCard = () => {

        let isRightSuit: boolean = false;

        if ((currentCard.suit === 'DIAMONDS' || currentCard.suit === 'HEARTS') && (getCardByCode(code).suit === 'CLUBS' || getCardByCode(code).suit === 'SPADES')) {
            isRightSuit = true
        }
        if ((getCardByCode(code).suit === 'DIAMONDS' || getCardByCode(code).suit === 'HEARTS') && (currentCard.suit === 'CLUBS' || currentCard.suit === 'SPADES')) {
            isRightSuit = true
        }
        
        if (valueArr.indexOf(currentCard.value) === valueArr.indexOf(getCardByCode(code).value)-1 && isRightSuit) {
            dispatch(addCard(getCardByCode(code).code))
            dispatch(deleteCard())
        }

    }

    const isKing = () => {
        
        if (valueArr.indexOf(currentCard.value) === 12) {
            dispatch(addKingCard(index))
            dispatch(deleteCard())
        }

    }

    return (
        <div 
        ref={drop}
        className='card' 
        // draggable={true}
        style={{bottom: `${bottom}px`, background: 'none'}}>

        </div>
    )
}



const CardFake: React.FC<CardFakeProps> = ({bottom}) => {
    return ( 
        <div 
        className='card' 
        style={{bottom: `${bottom}px`}}>
            <img src="/CARD.png" alt="" className='fakecard' />
        </div>
     );
}
