import { createContext } from "react";

const MODAL_INITIAL_STATE = {
  openModal: false,
  currentData: {},
  toogleModalState: () => {},
};
export const ModalContext = createContext(({} = MODAL_INITIAL_STATE));
