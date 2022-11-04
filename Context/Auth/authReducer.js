export const authReducer = (state, action) => {

   switch (action.type) {
      case 'AUTH_LOGIN':
         return {
            ...state,
            isLoggedIn: true,
            id_user: action.payload.id_user,
            id_type: action.payload.id_type,
            names: action.payload.names,
            surname: action.payload.surname,
            username: action.payload.username,
            avatar: action.payload?.avatar,
         }
      case 'AUTH_LOGOUT':
         return {
            ...state,
            isLoggedIn: false,
            id_user: undefined,
            id_type: undefined,
            names: undefined,
            surname: undefined,
            username: undefined,
            avatr: action.payload.avatar
         }
      default:
         return state;
   }
}