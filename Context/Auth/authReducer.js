export const authReducer = (state, action) => {

   switch (action.type) {
      case 'AUTH_LOGIN':
         return {
            ...state,
            isLoggedIn: true,
            username: action.payload.username,
            rol: action.payload.rol,
            id: action.payload.id,
         }
      case 'AUTH_LOGOUT':
         return {
            ...state,
            isLoggedIn: false,
            username: undefined,
            rol: undefined,
            id: undefined,
         }
      default:
         return state;
   }
}