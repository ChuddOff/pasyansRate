import { CardItem } from '../CardItem/CardItem';
import { changeOpenedCard, appendPlaceHolder } from "../store/reducers/ColumnsSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { ConnectDropTarget, useDrag, useDrop } from 'react-dnd';
import './Header2.scss'
import '../CardItem/CardItem.scss'

interface DroppedItem {
    code: string;
    card: number;
    column: number;
}
 
const Header2: React.FC = () => {

    const dispatch = useAppDispatch();
    const {cardsOther, cardOtherIndex, placeHolders} = useAppSelector(state => state.columns)

    const [ , drop0] = useDrop({
        accept: 'card',
        drop: (item: DroppedItem) => placeCard(item.code, 0, 'HEARTS')
    })
    const [ , drop1] = useDrop({
        accept: 'card',
        drop: (item: DroppedItem) => placeCard(item.code, 1, 'DIAMONDS')
    })
    const [ , drop2] = useDrop({
        accept: 'card',
        drop: (item: DroppedItem) => placeCard(item.code, 2, 'CLUBS')
    })
    const [ , drop3] = useDrop({
        accept: 'card',
        drop: (item: DroppedItem) => placeCard(item.code, 3, 'SPADES')
    })

    const placeCard = (newCode: string, NumberSuit: number, suit: string) => {
        const valueArr = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'J', 'Q', 'K']

        const newSuit: string = newCode.charAt(1);
        const newValue: string = newCode.charAt(0);

        const reqCode: string = placeHolders[NumberSuit][-1] ? placeHolders[NumberSuit][-1].code : 'A'+suit;
        const reqSuit: string = reqCode.charAt(1);
        const reqValue: string = reqCode.charAt(0);

        const beforeValue: string = valueArr[valueArr.indexOf(newValue)-1] ?? 'A'
        
        if (beforeValue === reqValue && newSuit === reqSuit) {
            dispatch(appendPlaceHolder({
                count: NumberSuit,
                suit: suit,
                value: newValue,
                code: newCode}));
            console.log(placeHolders[1][placeHolders[1].length-1]);
            console.log(placeHolders[1]);
        }
        
        console.log(placeHolders);
        
        
    }

    const giveCardOther = () => {
        dispatch(changeOpenedCard(cardOtherIndex+1))
        
        if (cardsOther.length === cardOtherIndex+1) {
            dispatch(changeOpenedCard(-1))
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
                    {placeHolders[0].length==0 ? 
                    <img src="HEARTS_PLACE.png" alt="HEARTS" /> :
                    <CardItem 
                    suit={placeHolders[0][placeHolders[0].length-1].suit} 
                    value={placeHolders[0][placeHolders[0].length-1].value} 
                    code={placeHolders[0][placeHolders[0].length-1].code}  
                    isOther = {true} />}
                </div>
  
                <div className="cardholder" ref={drop1}>
                    {placeHolders[1].length==0 ? 
                        <img src="DIAMONDS_PLACE.png" alt="DIAMONDS" /> :
                        <CardItem 
                        suit={placeHolders[1][placeHolders[1].length-1].suit} 
                        value={placeHolders[1][placeHolders[1].length-1].value} 
                        code={placeHolders[1][placeHolders[1].length-1].code}  
                        isOther = {true} />}
                </div>

                <div className="cardholder" ref={drop2}>
                    {placeHolders[2].length==0 ? 
                        <img src="CLUBS_PLACE.png" alt="CLUBS" /> :
                        <CardItem 
                        suit={placeHolders[2][placeHolders[2].length-1].suit} 
                        value={placeHolders[2][placeHolders[2].length-1].value} 
                        code={placeHolders[2][placeHolders[2].length-1].code}  
                        isOther = {true} />}
                </div>

                <div className="cardholder" ref={drop3}>
                    {placeHolders[3].length==0 ? 
                            <img src="SPADES_PLACE.png" alt="SPADES" /> :
                            <CardItem 
                            suit={placeHolders[3][placeHolders[3].length-1].suit} 
                            value={placeHolders[3][placeHolders[3].length-1].value} 
                            code={placeHolders[3][placeHolders[3].length-1].code}  
                            isOther = {true} />}
                </div>
            </div>
        </div>
     );
}
 
export default Header2;