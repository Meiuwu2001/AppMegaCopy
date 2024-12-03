export const authInitialState = {
  user: "",
  token: "",
  rol: "", // Incluir rol en el estado inicial
  iduser: "", // Incluir iduser en el estado inicial
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case "signIn":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        rol: action.payload.rol,
        iduser: action.payload.iduser,
      };
    case "setUsuario":
      return {
        ...state,
        userDetails: action.payload.userDetails,
      };
    case "signOut":
      return {
        ...authInitialState,
      };
    default:
      return state;
  }
};
