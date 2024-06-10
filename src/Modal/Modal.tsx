import { useRef , useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  toggleShowModal,
  endUpPlaceHolder,
  setAutoComplete,
} from "../store/reducers/ColumnsSlice";
import "./Modal.scss";

interface ModalProps {}

const Modal: React.FC<ModalProps> = () => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const { placeHolders, cards } = useAppSelector(
    (state) => state.columns
  );

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
                dispatch(setAutoComplete(true))
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
