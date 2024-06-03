import { CardItem } from '../CardItem/CardItem';
import { deleteCard, changeOtherCard, addPlaceCard, upPlaceHolderReq } from "../store/reducers/ColumnsSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useDrop } from 'react-dnd';
import './Header2.scss'
import '../CardItem/CardItem.scss'

 
const Header2: React.FC = () => {

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

    const giveCardOther = () => {
        dispatch(changeOtherCard(cardOtherIndex+1))
        
        if (cardsOther.length === cardOtherIndex+1) {
            dispatch(changeOtherCard(-1))
        }
    }

    return ( 
        <div className="header2">
            <div className="givenCards">
                <div onClick={() => giveCardOther()} >
                <img className='cardButton' src="CARD.png" alt="" />
                </div>
                <div className="list">
                    {cardOtherIndex!==-1 ? <CardItem 
                                            suit={cardsOther[cardOtherIndex].suit} 
                                            value={cardsOther[cardOtherIndex].value} 
                                            code={cardsOther[cardOtherIndex].code}  
                                            isOther = {true} /> : 
                                            <div onClick={() => giveCardOther()}>
                                            <img  className='cardButton' src="REPLACE.png" alt="" />
                                            </div>}
                </div>

            </div>
            <div className="cardState">
                <div className="cardholder" ref={drop0}>
                    {placeHolders[0].length===0 ? 
                    <img src="HEARTS_PLACE.png" alt="HEARTS" /> :
                    <CardItem 
                    suit={getCardByCode(placeHolders[0].slice(-1)[0]).suit} 
                    value={getCardByCode(placeHolders[0].slice(-1)[0]).value} 
                    code={getCardByCode(placeHolders[0].slice(-1)[0]).code}  
                    isPlace = {true} />}
                </div>
  
                <div className="cardholder" ref={drop1}>
                    {placeHolders[1].length===0 ? 
                        <img src="DIAMONDS_PLACE.png" alt="DIAMONDS" /> :
                        <CardItem 
                        suit={getCardByCode(placeHolders[1].slice(-1)[0]).suit} 
                        value={getCardByCode(placeHolders[1].slice(-1)[0]).value} 
                        code={getCardByCode(placeHolders[1].slice(-1)[0]).code} 
                        isPlace = {true} />}
                </div>

                <div className="cardholder" ref={drop2}>
                    {placeHolders[2].length===0 ? 
                        <img src="CLUBS_PLACE.png" alt="CLUBS" /> :
                        <CardItem 
                        suit={getCardByCode(placeHolders[2].slice(-1)[0]).suit} 
                        value={getCardByCode(placeHolders[2].slice(-1)[0]).value} 
                        code={getCardByCode(placeHolders[2].slice(-1)[0]).code}  
                        isPlace = {true} />}
                </div>

                <div className="cardholder" ref={drop3}>
                    {placeHolders[3].length===0 ? 
                        <img src="SPADES_PLACE.png" alt="SPADES" /> :
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