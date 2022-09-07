import { createContext } from "react";

const MODAL_INITIAL_STATE = {
  openModal: false,
  editModal: false,
  currentData: undefined,
  toogleModalState: () => {},
  toogleIsEdit: () => {},
  updateCurrentData: () => {}
};
export const ModalContext = createContext(({} = MODAL_INITIAL_STATE));
