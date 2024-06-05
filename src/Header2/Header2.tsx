import { CardItem } from '../CardItem/CardItem';
import { deleteCard, changeOtherCard, addPlaceCard, upPlaceHolderReq } from "../store/reducers/ColumnsSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useDrop } from 'react-dnd';
import './Header2.scss'
import '../CardItem/CardItem.scss'
import { transform } from 'typescript';
import { HtmlHTMLAttributes, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

 
const Header2: React.FC = () => {

    const {easyHard} = useParams();
    const navigate =  useNavigate();

    let easHard: number;
    
    useEffect(() => {
        
        if (easyHard === 'easy') {
            easHard = 1
        }
        else if (easyHard === 'hard') {
            easHard = 3
        }
        else {
            navigate('/games')
        }
    }, [easyHard])

    let gapRange = 50;

    if (window.innerWidth <= 1023) {
        gapRange = 40;
    }
    if (window.innerWidth <= 767) {
        gapRange = 22;
    }

    const dispatch = useAppDispatch();
    const {currentCard, placeHoldersReq, cards, cardsOther, cardOtherIndex, placeHolders} = useAppSelector(state => state.columns)

    const getCardByCode = (code: string) => {
        return cards[cards.map(item => item.code).indexOf(code)]
    }

    

    const [ , drop0] = useDrop({
        accept: 'card',
        drop: () => placeCard(0, 'HEARTS')
    })
    const [ , drop1] = useDrop({
        accept: 'card',
        drop: () => placeCard(1, 'DIAMONDS')
    })
    const [ , drop2] = useDrop({
        accept: 'card',
        drop: () => placeCard(2, 'CLUBS')
    })
    const [ , drop3] = useDrop({
        accept: 'card',
        drop: () => placeCard(3, 'SPADES')
    })

    const placeCard = (NumberSuit: number, suit: string) => {
        
        if ((placeHoldersReq[NumberSuit] ?? "ACE") === currentCard.value && currentCard.suit === suit) {
            dispatch(upPlaceHolderReq(NumberSuit))
            dispatch(addPlaceCard(NumberSuit));
            dispatch(deleteCard())
        }
    }

    const [button, setButton] = useState(true)

    const ref0 = useRef<HTMLDivElement>(null)
    const ref50 = useRef<HTMLDivElement>(null)
    const ref100 = useRef<HTMLDivElement>(null)

    const giveCardOther = () => {
        dispatch(changeOtherCard(cardOtherIndex+1))
        
        if (cardsOther.length === cardOtherIndex+1) {
            dispatch(changeOtherCard(-1))
        }

        ref0.current?.classList.add('setShow0');
        ref50.current?.classList.add('setShow50');
        ref100.current?.classList.add('setShow100');
        setButton(false)

        setTimeout(() => {
            ref0.current?.classList.remove('setShow0');
            ref50.current?.classList.remove('setShow50');
            ref100.current?.classList.remove('setShow100');
            setButton(true)
        }, 500)

        
    }
    
    return ( 
        <div className="header2">
            <div className="givenCards">
                <div onClick={() => {
                        if (button) {
                            giveCardOther()
                        }
                }} >
                { cardsOther.length === cardOtherIndex+1 ?
                    <div>
                    <img  className='cardButton' src="/REPLACE.png" alt="" />
                    </div> :
                    <img className='cardButton' src="/CARD.png" alt="" />
                }
                
                </div>
                <div className="list">
                    
                    {cardsOther[cardOtherIndex-2] && 
                        <div 
                        ref={ref100}
                        className='setShow100'
                        style={{
                            display: 'relative',
                            transition: '0.5s',
                            transform: `translateX(${gapRange}px)`,
                            // animation: 'show100 0.5s ease-in-out forwards',
                            
                        }}>
                        <CardItem 
                        suit={cardsOther[cardOtherIndex-2].suit} 
                        value={cardsOther[cardOtherIndex-2].value} 
                        code={cardsOther[cardOtherIndex-2].code}  
                        isOther = {true} />
                        </div>}  
                          
                    {cardsOther[cardOtherIndex-1] && 
                    <div
                    ref={ref50}
                    className='setShow50'
                    style={{
                        display: 'relative',
                        // animation: 'show50 0.5s ease-in-out forwards',
                        transform: 'translateX(0px)',
                        transition: '0.5s'
                    }}>
                    <CardItem 
                    suit={cardsOther[cardOtherIndex-1].suit} 
                    value={cardsOther[cardOtherIndex-1].value} 
                    code={cardsOther[cardOtherIndex-1].code}  
                    isOther = {true} />
                    </div>
                    }  
                    {cardsOther[cardOtherIndex] && 
                    <div 
                    ref={ref0}
                    className='setShow0'
                     style={{
                        display: 'relative',
                        transform: `translateX(-${gapRange}px)`,
                        transition: '0.5s'
                    }}>
                        <CardItem 
                        suit={cardsOther[cardOtherIndex].suit} 
                        value={cardsOther[cardOtherIndex].value} 
                        code={cardsOther[cardOtherIndex].code}  
                        isOther = {true} />
                    </div>
                    }  
                    
                </div>

            </div>
            <div className="cardState">
                <div className="cardholder" ref={drop0}>
                    {placeHolders[0].length===0 ? 
                    <img src="/HEARTS_PLACE.png" alt="HEARTS" /> :
                    <CardItem 
                    suit={getCardByCode(placeHolders[0].slice(-1)[0]).suit} 
                    value={getCardByCode(placeHolders[0].slice(-1)[0]).value} 
                    code={getCardByCode(placeHolders[0].slice(-1)[0]).code}  
                    isPlace = {true} />}
                </div>
  
                <div className="cardholder" ref={drop1}>
                    {placeHolders[1].length===0 ? 
                        <img src="/DIAMONDS_PLACE.png" alt="DIAMONDS" /> :
                        <CardItem 
                        suit={getCardByCode(placeHolders[1].slice(-1)[0]).suit} 
                        value={getCardByCode(placeHolders[1].slice(-1)[0]).value} 
                        code={getCardByCode(placeHolders[1].slice(-1)[0]).code} 
                        isPlace = {true} />}
                </div>

                <div className="cardholder" ref={drop2}>
                    {placeHolders[2].length===0 ? 
                        <img src="/CLUBS_PLACE.png" alt="CLUBS" /> :
                        <CardItem 
                        suit={getCardByCode(placeHolders[2].slice(-1)[0]).suit} 
                        value={getCardByCode(placeHolders[2].slice(-1)[0]).value} 
                        code={getCardByCode(placeHolders[2].slice(-1)[0]).code}  
                        isPlace = {true} />}
                </div>

                <div className="cardholder" ref={drop3}>
                    {placeHolders[3].length===0 ? 
                        <img src="/SPADES_PLACE.png" alt="SPADES" /> :
                        <CardItem 
                        suit={getCardByCode(placeHolders[3].slice(-1)[0]).suit} 
                        value={getCardByCode(placeHolders[3].slice(-1)[0]).value} 
                        code={getCardByCode(placeHolders[3].slice(-1)[0]).code}  
                        isPlace = {true} />}
                </div>
            </div>
        </div>
     );
}
 
export default Header2;