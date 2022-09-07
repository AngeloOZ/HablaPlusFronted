import { useReducer } from "react";
import { ModalContext, modalReducer } from "./";

const MODAL_INITIAL_STATE = {
  openModal: false,
  editModal: false,
  currentData: undefined,
};

export const ModalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(modalReducer, MODAL_INITIAL_STATE);

  const toogleModalState = (open = false) => {
    dispatch({ type: "CHANGE_STATE_MODAL", payload: open });
  };

  const toogleIsEdit = (edit) => {
    dispatch({ type: "CHANGE_STATE_EDIT", payload: edit });
  };

  /**
   * funcion para actualizar la currentData es decir la informacion a editar
   * @param {Object} data
   */
  const updateCurrentData = (data) => {
    dispatch({ type: "UPDATE_CURRENT_DATA", payload: data });
  };

  return (
    <ModalContext.Provider
      value={{ ...state, toogleModalState, updateCurrentData, toogleIsEdit }}
    >
      {children}
    </ModalContext.Provider>
  );
};
