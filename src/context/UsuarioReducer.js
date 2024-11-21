export const authInitialState = {
  user: "",
  token: "",
  rol: "", // Incluir rol en el estado inicial
  iduser: "", // Incluir iduser en el estado inicial
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case "signIn":
      const { user, token, rol, iduser } = action.payload;
      return {
        ...state,
        user,
        token,
        rol, // Añadir rol al estado
        iduser, // Añadir iduser al estado
      };
    case "signOut":
      return {
        ...authInitialState,
      };
    case "setUsuario":
      const { userDetails } = action.payload;
      return {
        ...state,
        userDetails, // Actualizar iduser
      };
    default:
      return state;
  }
};
