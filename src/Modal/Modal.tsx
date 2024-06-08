import { useRef, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  toggleShowModal,
  setCurrentCard,
  deleteCard,
  addPlaceCard,
  upPlaceHolderReq,
  endUpPlaceHolder,
} from "../store/reducers/ColumnsSlice";
import "./Modal.scss";
import { currentCard } from "../store/reducers/interfaces";
import { log } from "console";

interface ModalProps {}

const Modal: React.FC<ModalProps> = () => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const { currentCard, placeHolders, cards, columns } = useAppSelector(
    (state) => state.columns
  );



  const endUpMatch = () => {
    let i = 0;
    let intervalId = setInterval(() => {
      
      dispatch(endUpPlaceHolder(i));
      
      i++
      if (i == 7) {
          i = 0
      }
    }, 50);
  };

  

  const closeModal = () => {
    ref.current?.classList.add("setHide");

    setTimeout(() => {
      dispatch(toggleShowModal());
    }, 50);
  };

  return (
    <div className="modal">
      <div ref={ref} className="dialogue setShow">
        <div className="info">
          <h2>
          You did it! <br /> Would you like us to complete the deck for you?
          </h2>

          <div className="buttons">
            <button
              type="button"
              onClick={() => {
                endUpMatch()
                closeModal()
              }}
            >
              Yes
            </button>
            <button type="button" onClick={closeModal}>
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
