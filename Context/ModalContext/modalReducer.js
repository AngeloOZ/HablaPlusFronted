export const modalReducer = (state, action) => {
   switch (action.type) {
      case 'CHANGE_STATE_MODAL':
         return {
            ...state,
            openModal: action.payload,
         }
      case 'CHANGE_STATE_EDIT':
         return {
            ...state,
            editModal: action.payload,
         }
      case 'UPDATE_CURRENT_DATA':
         return {
            ...state,
            currentData: action.payload,
         }
      default:
         return state;
   }
}