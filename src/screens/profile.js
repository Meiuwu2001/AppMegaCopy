import React, { useContext, useEffect } from "react";
import { View, Text } from "react-native";
import { AuthContext } from "../context/UsuarioContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile() {
  const { loadUserDetails } = useContext(AuthContext); // Usa signOut desde el contexto
  const iduser = AsyncStorage.getItem("iduser");
  const rol = AsyncStorage.getItem("rol");
  useEffect(() => {
    loadUserDetails(rol, iduser);
  });
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Perfil</Text>
    </View>
  );
}
