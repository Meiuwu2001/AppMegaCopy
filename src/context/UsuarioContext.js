import React, { createContext, useReducer, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authReducer } from "./UsuarioReducer";
import LoadingScreen from "../components/navigation/LoadingScreen";

export const authInitialState = {
  user: "",
  token: "",
  iduser: "",
  rol: "",
};

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, authInitialState);
  const [loading, setLoading] = useState(true);

  // Función para validar el token almacenado
  const validateToken = async (tokenToValidate) => {
    try {
      const response = await fetch(
        `https://backend-integradora.vercel.app/api/auth/perfil`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokenToValidate}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        return data; // Devolver los datos del perfil si el token es válido
      } else {
        throw new Error("Token inválido");
      }
    } catch (error) {
      return null; // Si ocurre un error, retornar null
    }
  };

  const loadToken = async () => {
    const storedToken = await AsyncStorage.getItem("authToken");
    const storedUser = await AsyncStorage.getItem("authUser");
    const storedRol = await AsyncStorage.getItem("rol");
    const storedIdUser = await AsyncStorage.getItem("iduser");

    if (storedToken && storedUser) {
      // Asegúrate de que ambos estén presentes
      

      try {
        const tokenValidationResult = await validateToken(storedToken);

        if (tokenValidationResult) {
         
          const { usuario } = tokenValidationResult;

          // Almacenar los datos del usuario en AsyncStorage para futuras referencias
          await AsyncStorage.setItem("rol", usuario.rol);
          await AsyncStorage.setItem("iduser", usuario.id.toString());
          await AsyncStorage.setItem("authUser", JSON.stringify(usuario));

          // Despachar la acción para actualizar el estado con los datos completos
          dispatch({
            type: "signIn",
            payload: {
              user: usuario,
              token: storedToken,
              rol: usuario.rol,
              iduser: usuario.id.toString(),
            },
          });

          // Aquí puedes cargar detalles adicionales si es necesario
          loadUserDetails(usuario.rol, usuario.id);
        } else {
         
          await AsyncStorage.removeItem("authToken");
          await AsyncStorage.removeItem("authUser");
          await AsyncStorage.removeItem("iduser");
          await AsyncStorage.removeItem("rol");

          // Despachar la acción de cierre de sesión
          dispatch({ type: "signOut" });
        }
      } catch (error) {
        console.error("Error al validar el token:", error);
        await AsyncStorage.removeItem("authToken");
        await AsyncStorage.removeItem("authUser");
        await AsyncStorage.removeItem("iduser");
        await AsyncStorage.removeItem("rol");

        // Despachar la acción de cierre de sesión
        dispatch({ type: "signOut" });
      }
    } else {
      dispatch({ type: "signOut" });
    }

    setLoading(false); // Finaliza la carga una vez que la validación se haya completado
  };

  // El signIn también debe ser modificado para almacenar correctamente todos los valores
  const signIn = async (user, token) => {
    try {
      // Validamos el token primero
      const tokenValidationResult = await validateToken(token);
      if (tokenValidationResult) {
        const { usuario } = tokenValidationResult;
  
        // Almacenar los valores solo si el token es válido
        await AsyncStorage.setItem("authToken", token);
        await AsyncStorage.setItem("authUser", JSON.stringify(usuario));
        await AsyncStorage.setItem("rol", usuario.rol);
        await AsyncStorage.setItem("iduser", usuario.id.toString());
  
        // Despachamos la acción para actualizar el estado
        dispatch({
          type: "signIn",
          payload: {
            user: usuario,
            token,
            rol: usuario.rol,
            iduser: usuario.id.toString(),
          },
        });
  
        // Cargar detalles adicionales del usuario si es necesario
        loadUserDetails(usuario.rol, usuario.id);
      } else {
      }
    } catch (error) {
      console.error("Error al validar el token en signIn:", error);
    }
  };
  

  // Cargar detalles del usuario según su rol
  const loadUserDetails = async () => {
    const { token, rol, iduser } = authState;
    if (token && rol && iduser) {
      try {
        const endpointMap = {
          cliente: `https://backend-integradora.vercel.app/api/clienteById/${iduser}`,
          tecnico: `https://backend-integradora.vercel.app/api/tecnicoById/${iduser}`,
          admin: `https://backend-integradora.vercel.app/api/auth/getUser/${iduser}`,
        };

        const endpoint = endpointMap[rol];

        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const result = await response.json();
        
          if (result) {
        dispatch({
          type: "setUsuario", 
          payload: { userDetails: result } // Guarda todo el JSON recibido
        });
      }
        
      } catch (err) {
        console.error(
          "Error al obtener los detalles del usuario:",
          err.message
        );
      }
    } else {
    }
  };

  useEffect(() => { 
    loadToken();
  }, []);

  const signOut = async () => {
    await AsyncStorage.removeItem("authToken");
    await AsyncStorage.removeItem("authUser");
    await AsyncStorage.removeItem("iduser");
    await AsyncStorage.removeItem("rol");
    dispatch({ type: "signOut" });
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider
      value={{
        authState,
        signIn,
        signOut,
        loadUserDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
