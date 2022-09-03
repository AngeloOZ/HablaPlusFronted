export const modalReducer = (state, action) => {
   switch (action.type) {
      case 'CHANGE_STATE_MODAL':
         return {
            ...state,
            openModal: action.payload,
         }
      default:
         return state;
   }
}