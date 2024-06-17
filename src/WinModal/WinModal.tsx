import { useRef, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  toggleShowModal,
  setCurrentCard,
  deleteCard,
  addPlaceCard,
  upPlaceHolderReq,
  endUpPlaceHolder,
  resetColumns,
} from "../store/reducers/ColumnsSlice";
import "./WinModal.scss";
import { currentCard } from "../store/reducers/interfaces";
import { log } from "console";
import JSConfetti from 'js-confetti'
import { useNavigate, useParams } from "react-router-dom";
import { apiProfile } from "../store/reducers/CardsServices";
import { useUser } from "@clerk/clerk-react";


const WinModal: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const jsConfetti = new JSConfetti()
  const navigate =  useNavigate();
  const [PostElo, result] = apiProfile.usePostEloMutation();
  const {easyHard} = useParams();
  const { user } = useUser();
  const [PostWin, result2] = apiProfile.usePostWinMutation();

  const {win} = useAppSelector(state => state.columns)

  const closeModal = () => {
    // ref.current?.classList.add("setHide");

    // setTimeout(() => {
    //   dispatch(toggleShowModal());
    // }, 50);
    
    navigate('/games')
  };

  useEffect(() => {
    if (win) {
      jsConfetti.addConfetti({
        emojis: ['⚡️', '🥶', '🎁', '🧨'],
        emojiSize: 50,
        confettiNumber: 10,
     })
     jsConfetti.addConfetti({
      emojis: ['⚡️', '🥶', '🎁', '🧨'],
      emojiSize: 50,
      confettiNumber: 10,
   })
    jsConfetti.addConfetti({
      emojis: ['⚡️', '🥶', '🎁', '🧨'],
      emojiSize: 50,
      confettiNumber: 10,
  })
  PostElo({
    name: user ? user.id : '123',
    eloChange: easyHard === 'easy' ? 120 : 200
  })
  PostWin({
    name: user ? user.id : '123',
  })
  console.log(1);
  
    }
    
  }, [win])

  return (
    <div className="modalWin">
      <div ref={ref} className="dialogueWin setShowWin">
        <img src="/win.png" alt="" />
        <div className="infoWin">
          <h2>
            Congratulations!
          </h2>

          <div className="buttonsWin">
            <button type="button" onClick={() => {
              closeModal()
            }}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinModal;
