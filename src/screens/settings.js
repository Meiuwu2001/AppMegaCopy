import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
  Button,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { AuthContext } from "../context/UsuarioContext"; // Importa el AuthContext

const Settings = () => {
  const { signOut, authState } = useContext(AuthContext); // Usa signOut desde el contexto
  const { iduser, token, user } = authState; // Desestructurar los datos desde authState

  // Estado para la modal y las contraseñas
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleLogout = () => {
    signOut();
  };

  const handleUpdatePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }
    try {
      const response = await fetch(
        `https://backend-integradora.vercel.app/api/auth/update-password/${iduser}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ password: passwordData.newPassword }),
        }
      );
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      alert("Contraseña actualizada exitosamente");
      setIsModalOpen(false);
    } catch (err) {
      alert(err.message);
    }
  };

  // Función para actualizar el estado de las contraseñas en tiempo real
  const handlePasswordChange = (field, value) => {
    setPasswordData({ ...passwordData, [field]: value });
  };

  return (
    <View style={styles.container}>
      {/* Botón para abrir la modal de actualización de contraseña */}
      <TouchableOpacity
        style={styles.updatePasswordButton}
        onPress={() => setIsModalOpen(true)}
      >
        <Feather name="lock" size={24} color="white" />
        <Text style={styles.updatePasswordText}>Actualizar Contraseña</Text>
      </TouchableOpacity>

      {/* Modal para actualizar la contraseña */}
      <Modal
        visible={isModalOpen}
        animationType="slide"
        onRequestClose={() => setIsModalOpen(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Actualizar Contraseña</Text>

          {/* Campo para nueva contraseña */}
          <TextInput
            style={styles.input}
            placeholder="Nueva Contraseña"
            secureTextEntry
            value={passwordData.newPassword}
            onChangeText={(value) => handlePasswordChange("newPassword", value)}
          />

          {/* Campo para confirmar nueva contraseña */}
          <TextInput
            style={styles.input}
            placeholder="Confirmar Contraseña"
            secureTextEntry
            value={passwordData.confirmPassword}
            onChangeText={(value) =>
              handlePasswordChange("confirmPassword", value)
            }
          />

          {/* Comparar contraseñas en tiempo real */}
          {passwordData.newPassword &&
            passwordData.confirmPassword &&
            passwordData.newPassword !== passwordData.confirmPassword && (
              <Text style={styles.errorText}>
                Las contraseñas no coinciden.
              </Text>
            )}

          {/* Botones para guardar o cancelar */}
          <View style={styles.buttonContainer}>
            <Button
              title="Guardar cambios"
              onPress={handleUpdatePassword}
              disabled={
                passwordData.newPassword !== passwordData.confirmPassword
              }
            />
            <Button title="Cancelar" onPress={() => setIsModalOpen(false)} />
          </View>
        </View>
      </Modal>

      {/* Botón de cerrar sesión */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Feather name="log-out" size={24} color="white" />
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: "#333",
  },
  updatePasswordButton: {
    backgroundColor: "#4CAF50",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    gap: 10,
  },
  updatePasswordText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  logoutButton: {
    backgroundColor: "#FF4444",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    gap: 10,
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 10,
    backgroundColor: "#fff",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    fontSize: 14,
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
  },
});

export default Settings;
