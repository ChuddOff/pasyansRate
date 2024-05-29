import { ConnectDropTarget, useDrag, useDrop } from 'react-dnd';
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { addOpenedCard, setDragging, relocateCard } from "../store/reducers/ColumnsSlice";
import { useEffect } from 'react';
import './CardItem.scss'



interface CardItemProps {
    suit: string;
    value: string;
    code: string;
    bottom?: number;
    show?: boolean;
    columnIndex?: number;
    cardIndex?: number;
    isOther?: boolean;
}

interface CardFakeProps {
    bottom: number;
}
interface DroppedItem {
    code: string;
    card: number;
    column: number;
}
interface PlaceHolder {
    bottom: number;
    suit: string;
    code: string;
    columnIndex: number;
    isForKing: boolean;
}

const getIcon = (suit: string, value: string) => {
    if (value == "JACK") {
        return `V${suit === "HEARTS" || suit === "DIAMONDS" ? "R" : "B"}.png`
    }
    else if (value == "QUEEN") {
        return `D${suit === "HEARTS" || suit === "DIAMONDS" ? "R" : "B"}.png`
    }
    else if (value == "KING") {
        return `K${suit === "HEARTS" || suit === "DIAMONDS" ? "R" : "B"}.png`
    }
    else {
        return `${suit}.png`
    } 
}
 
export const CardItem: React.FC<CardItemProps> = ({suit, value, code, bottom=0, show=false, columnIndex = 0, cardIndex = 0, isOther=false}) => {

    
    const {cardsOpened} = useAppSelector(state => state.columns)

    return ( 
        <>
            {isOther || show || cardsOpened.includes(code) ?
            <CardReal 
            suit={suit} 
            value={value} 
            code={code} 
            bottom={bottom} 
            show={show} 
            columnIndex={columnIndex}
            cardIndex={cardIndex} />
            :
            <CardFake bottom={bottom}/>}
        </>
     );
}

const CardReal: React.FC<CardItemProps> = ({suit, value, code, bottom, show, columnIndex, cardIndex}) => {

    const dispatch = useAppDispatch();
    const {cardsOpened, isDrag} = useAppSelector(state => state.columns)

    useEffect(() => {
        if (!cardsOpened.includes(code)) {
            dispatch(addOpenedCard(code))
        }
    }, [])

    const [{ isDragging }, drag] = useDrag({
        type: 'card',
        item: { 
            code: code,
            column: columnIndex,
            card: cardIndex
         },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    })

    useEffect(() => {
        dispatch(setDragging(isDragging))
    }, [isDragging])
    

    return ( 
        <>
            <div 
            ref={drag}
            className='card' 
            // draggable={true}
            style={{bottom: `${bottom}px`}}>
                <div className='card_detail'
                >
                    <h4>{value=='10' ? value : value.charAt(0)}</h4>
                    <img src={`${suit}.png`} alt="" />
                </div>
                <img src={getIcon(suit, value)} alt="" />
            </div>

            {show && isDrag && !isDragging ?
            <PlaceHolder 
            bottom={(bottom ?? 0)+130} 
            suit={suit} code={code} 
            columnIndex={columnIndex ?? 0}
            isForKing = {false} /> 
             : null}
        </>
     );
}

export const PlaceHolder: React.FC<PlaceHolder> = ({bottom, suit, code, columnIndex, isForKing}) => {

    const dispatch = useAppDispatch();
    const {columns} = useAppSelector(state => state.columns)

    const [ {isOver} , drop] = useDrop({
        accept: 'card',
        drop: (item: DroppedItem) => isForKing ? isKing(item.code, item.column, item.card) : isRightCard(item.code, item.column, item.card),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        })
    })

    const valueArr = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'J', 'Q', 'K']

    const isRightCard = (newCode: string, indexOld: number, indexCard: number) => {
        const newSuit: string = newCode.charAt(1);
        const oldSuit: string = suit.charAt(0);
        const newValue: string = newCode.charAt(0);
        const oldValue: string = code.charAt(0);

        let isRightSuit: boolean = false;

        if (newSuit === 'D' || newSuit === 'H' && oldSuit === 'C' || oldSuit === 'S') {
            isRightSuit = true
        }
        if (oldSuit === 'D' || oldSuit === 'H' && newSuit === 'C' || newSuit === 'S') {
            isRightSuit = true
        }
        // console.log(valueArr.indexOf(newValue) === valueArr.indexOf(oldValue)-1 && isRightSuit);
        
        
        
        
        if (valueArr.indexOf(newValue) === valueArr.indexOf(oldValue)-1 && isRightSuit) {
            dispatch(relocateCard({
                indexOld: indexOld,
                indexNew: columnIndex, 
                indexCard: indexCard,
                cardList: columns[indexOld].slice(indexCard)
            }))
        }

    }

    const isKing = (newCode: string, indexOld: number, indexCard: number) => {
        const newValue: string = newCode.charAt(0);

        // console.log(valueArr.indexOf(newValue) === valueArr.indexOf(oldValue)-1 && isRightSuit);
        
        
        
        
        if (valueArr.indexOf(newValue) === 12) {
            dispatch(relocateCard({
                indexOld: indexOld,
                indexNew: columnIndex, 
                indexCard: indexCard,
                cardList: columns[indexOld].slice(indexCard)
            }))
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
            <img src="CARD.png" alt="" className='fakecard' />
        </div>
     );
}
