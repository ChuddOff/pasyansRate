

import { useRef } from 'react';
import { useAppDispatch } from '../hooks/redux';
import { toggleShowModal } from '../store/reducers/ColumnsSlice';
import './Modal.scss'

interface ModalProps {
    
}
 
const Modal: React.FC<ModalProps> = () => {

    const ref = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();

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
                        type="button">Да</button>
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