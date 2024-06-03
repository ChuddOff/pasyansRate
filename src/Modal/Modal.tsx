

import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { toggleShowModal, setCurrentCard, deleteCard, addPlaceCard, upPlaceHolderReq } from '../store/reducers/ColumnsSlice';
import './Modal.scss'
import { currentCard } from '../store/reducers/interfaces';

interface ModalProps {
    
}
 
const Modal: React.FC<ModalProps> = () => {

    const ref = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();

    const {placeHolders, cards, columns} = useAppSelector(state => state.columns)

    const getCardByCode = (code: string): currentCard => {
        return cards[cards.map(item => item.code).indexOf(code)]
    }

    const checkValue = (valueOld: string, valueNew: string) => {
        const valueArr = ['ACE', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING']

        return valueArr.indexOf(valueOld) === valueArr.indexOf(valueNew)+1
    }

    const endUpMatch = () => {
        while(true) {
            columns.forEach(item => {
                if (item.slice(-1)[0]) {
                    const suits = ['HEARTS', 'DIAMONDS', 'CLUBS', 'SPADES']

                    const index: number = suits.indexOf(getCardByCode(item.slice(-1)[0]).suit)

                    if (checkValue(getCardByCode(placeHolders[index].slice(-1)[0]).value, getCardByCode(item.slice(-1)[0]).value)) {
                        dispatch(setCurrentCard(getCardByCode(item.slice(-1)[0])));
                        dispatch(addPlaceCard(index))
                        dispatch(upPlaceHolderReq(index))
                        dispatch(deleteCard())
                    }
                }
                
            })
        }
    }

    const closeModal = () => {
        ref.current?.classList.add('setHide')
        
        setTimeout(() => {
            dispatch(toggleShowModal())
        }, 1000);
        
    }

    return ( 
        <div className="modal">
            <div ref={ref} className="dialogue setShow">

                <div className="info">
                    <h2>У вас получилось! <br /> Хотите доразложим колоду за вас?</h2>
                    
                    <div className="buttons">
                        <button 
                        type="button" 
                        onClick={() => {endUpMatch()}} >Да</button>
                        <button 
                        type="button" 
                        onClick={closeModal}
                        >Нет</button>
                    </div>
                </div>
            </div>
            
        </div>
     );
}
 
export default Modal;