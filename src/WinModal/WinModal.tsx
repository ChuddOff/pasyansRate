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
import "./WinModal.scss";
import { currentCard } from "../store/reducers/interfaces";
import { log } from "console";
import JSConfetti from 'js-confetti'
import { useNavigate } from "react-router-dom";


const WinModal: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const jsConfetti = new JSConfetti()
  const navigate =  useNavigate();

  const closeModal = () => {
    // ref.current?.classList.add("setHide");

    // setTimeout(() => {
    //   dispatch(toggleShowModal());
    // }, 50);
    navigate('/games')
  };

  useEffect(() => {
    jsConfetti.addConfetti({
      emojis: ['⚡️', '🥶', '🎁', '🧨'],
      emojiSize: 50,
      confettiNumber: 10,
   })
  })

  return (
    <div className="modalWin">
      <div ref={ref} className="dialogueWin setShowWin">
        <img src="/win.png" alt="" />
        <div className="infoWin">
          <h2>
            Congratulations!
          </h2>

          <div className="buttonsWin">
            <button type="button" onClick={closeModal}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinModal;
