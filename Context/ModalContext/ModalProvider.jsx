import { useReducer } from "react";
import { ModalContext, modalReducer } from "./";

const MODAL_INITIAL_STATE = {
  openModal: false,
  currentData: {},
};

export const ModalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(modalReducer, MODAL_INITIAL_STATE);

  const toogleModalState = (open = false) => {
    dispatch({ type: "CHANGE_STATE_MODAL", payload: open });
  };

  return (
    <ModalContext.Provider value={{ ...state, toogleModalState }}>
      {children}
    </ModalContext.Provider>
  );
};
