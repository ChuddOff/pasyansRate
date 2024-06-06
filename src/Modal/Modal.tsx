import { useRef, useCallback } from "react";
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

  const getCardByCode = (code: string): currentCard => {
    return cards[cards.map((item) => item.code).indexOf(code)];
  };

  const checkValue = (valueOld: string, valueNew: string) => {
    const valueArr = [
      "ACE",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "JACK",
      "QUEEN",
      "KING",
    ];

    return valueArr.indexOf(valueNew) === valueArr.indexOf(valueOld) + 1;
  };

//   const solve = useCallback(() => {
//     console.log(JSON.stringify(columns, null, 2));

//     columns.forEach((item: string[]) => {
//       if (item.slice(-1)[0]) {
//         console.log(item.slice(-1)[0]);

//         const suits = ["HEARTS", "DIAMONDS", "CLUBS", "SPADES"];

//         const index: number = suits.indexOf(
//           getCardByCode(item.slice(-1)[0]).suit
//         );

//         if (
//           checkValue(
//             getCardByCode(placeHolders[index].slice(-1)[0]).value,
//             getCardByCode(item.slice(-1)[0]).value
//           )
//         ) {
//           dispatch(setCurrentCard(getCardByCode(item.slice(-1)[0])));
//           console.log(currentCard);
//           dispatch(addPlaceCard(index));
//           dispatch(upPlaceHolderReq(index));
//           dispatch(deleteCard());
//         }
//       }
//     });
//   }, [currentCard, placeHolders, cards, columns]);


  const endUpMatch = () => {
    let i = 0;
    let intervalId = setInterval(() => {
      
      dispatch(endUpPlaceHolder(i));
      
      i++
      if (i == 7) {
          i = 0
      }

      if (getCardByCode(placeHolders[0].slice(-1)[0]).value === 'KING' && 
      getCardByCode(placeHolders[1].slice(-1)[0]).value === 'KING' && 
      getCardByCode(placeHolders[2].slice(-1)[0]).value === 'KING' && 
      getCardByCode(placeHolders[3].slice(-1)[0]).value === 'KING') {
        clearInterval(intervalId);
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
