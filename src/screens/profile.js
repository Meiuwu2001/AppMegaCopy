import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AuthContext } from "../context/UsuarioContext";
import { FontAwesome, Feather } from "@expo/vector-icons";

export default function Profile() {
  const { authState, loadUserDetails, signOut } = useContext(AuthContext);
  const { rol, iduser, userDetails, token } = authState;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellidoPa: "",
    apellidoMa: "",
    Telefono: "",
    CorreoElectronico: "",
  });
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (rol && iduser) {
      loadUserDetails(rol, iduser);
    }
  }, [rol, iduser]);

  useEffect(() => {
    if (userDetails) {
      setFormData({
        nombre: userDetails.nombre || "",
        apellidoPa: userDetails.apellidoPa || "",
        apellidoMa: userDetails.apellidoMa || "",
        Telefono: userDetails.Telefono || "",
        CorreoElectronico: userDetails.CorreoElectronico || "",
      });
    }
  }, [userDetails]);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData((prevData) => ({ ...prevData, [field]: value }));
  };

  const closeModal = () => setIsModalVisible(false);
  const closePasswordModal = () => {
    setIsPasswordModalVisible(false);
    setPasswordData({ newPassword: "", confirmPassword: "" });
  };

  const handleUpdate = async () => {
    try {
      const endpointMap = {
        cliente: `https://backend-integradora.vercel.app/api/clientes/${userDetails.idClientes}`,
        tecnico: `https://backend-integradora.vercel.app/api/tecnicos/${userDetails.idTecnicos}`,
      };
      const response = await fetch(endpointMap[rol], {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar los datos.");
      }
      Alert.alert("Éxito", "Datos actualizados exitosamente.");
      closeModal();
      loadUserDetails(rol, iduser);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleUpdatePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
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

      if (!response.ok) throw new Error("Error al actualizar la contraseña");

      Alert.alert("Éxito", "Contraseña actualizada exitosamente");
      closePasswordModal();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleLogout = () => {
    signOut();
  };

  return (
    <View style={styles.container}>
      {userDetails ? (
        <>
          <View style={styles.header}>
            <View style={styles.profileContainer}>
              <View style={styles.avatarContainer}>
                <FontAwesome
                  style={styles.icon2}
                  name="user-circle"
                  size={80}
                  color="#fff"
                />
              </View>
              {(rol === "cliente" || rol === "tecnico") && (
                <Text style={styles.profileName}>
                  {`${userDetails.nombre} ${userDetails.apellidoPa} ${userDetails.apellidoMa}`}
                </Text>
              )}
              {rol === "admin" && (
                <Text style={styles.profileName}>
                  {userDetails.nombre || "Usuario"}
                </Text>
              )}
              <Text style={styles.profileRole}>
                Usuario: {userDetails.user}
              </Text>
            </View>
          </View>

          <View style={styles.cardContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.infoCard}>
                <View style={styles.infoItem}>
                  <FontAwesome
                    name="envelope"
                    size={20}
                    color="#666"
                    style={styles.infoIcon}
                  />
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Email</Text>
                    <Text style={styles.infoText}>
                      {userDetails.CorreoElectronico || "No disponible"}
                    </Text>
                  </View>
                </View>

                <View style={styles.infoItem}>
                  <FontAwesome
                    name="phone"
                    size={20}
                    color="#666"
                    style={styles.infoIcon}
                  />
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Mobile</Text>
                    <Text style={styles.infoText}>
                      {userDetails.Telefono || "No disponible"}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Nueva sección de botones con el nuevo diseño */}
              <View style={styles.menuContainer}>
                <TouchableOpacity
                  style={styles.menuButton}
                  onPress={() => setIsModalVisible(true)}
                >
                  <View style={styles.menuIconContainer}>
                    <FontAwesome name="user" size={20} color="#2d57d1" />
                  </View>
                  <Text style={styles.menuButtonText}>Editar Perfil</Text>
                  <FontAwesome name="chevron-right" size={16} color="#ccc" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.menuButton}
                  onPress={() => setIsPasswordModalVisible(true)}
                >
                  <View style={styles.menuIconContainer}>
                    <Feather name="lock" size={20} color="#2d57d1" />
                  </View>
                  <Text style={styles.menuButtonText}>
                    Actualizar Contraseña
                  </Text>
                  <FontAwesome name="chevron-right" size={16} color="#ccc" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.menuButton}
                  onPress={handleLogout}
                >
                  <View style={styles.menuIconContainer}>
                    <Feather name="log-out" size={20} color="#2d57d1" />
                  </View>
                  <Text style={styles.menuButtonText}>Cerrar Sesión</Text>
                  <FontAwesome name="chevron-right" size={16} color="#ccc" />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </>
      ) : (
        <Text style={styles.loadingText}>Cargando perfil...</Text>
      )}

      {/* Modal de edición de perfil */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Editar Datos</Text>

            <Text style={styles.inputLabel}>Nombre(s)</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={formData.nombre}
              onChangeText={(value) => handleInputChange("nombre", value)}
            />
            <Text style={styles.inputLabel}>Apellido Paterno</Text>
            <TextInput
              style={styles.input}
              placeholder="Apellido Paterno"
              value={formData.apellidoPa}
              onChangeText={(value) => handleInputChange("apellidoPa", value)}
            />
            <Text style={styles.inputLabel}>Apellido Materno</Text>
            <TextInput
              style={styles.input}
              placeholder="Apellido Materno"
              value={formData.apellidoMa}
              onChangeText={(value) => handleInputChange("apellidoMa", value)}
            />
            <Text style={styles.inputLabel}>Teléfono</Text>
            <TextInput
              style={styles.input}
              placeholder="Teléfono"
              value={formData.Telefono}
              onChangeText={(value) => handleInputChange("Telefono", value)}
            />
            <Text style={styles.inputLabel}>Correo</Text>
            <TextInput
              style={styles.input}
              placeholder="Correo Electrónico"
              value={formData.CorreoElectronico}
              onChangeText={(value) =>
                handleInputChange("CorreoElectronico", value)
              }
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleUpdate}
              >
                <Text style={styles.actionButtonText}>Guardar cambios</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.actionButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de cambio de contraseña */}
      <Modal
        visible={isPasswordModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closePasswordModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Actualizar Contraseña</Text>

            <Text style={styles.inputLabel}>Nueva contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder="Nueva Contraseña"
              secureTextEntry
              value={passwordData.newPassword}
              onChangeText={(value) =>
                handlePasswordChange("newPassword", value)
              }
            />
            <Text style={styles.inputLabel}>Confirmar nueva contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirmar Contraseña"
              secureTextEntry
              value={passwordData.confirmPassword}
              onChangeText={(value) =>
                handlePasswordChange("confirmPassword", value)
              }
            />

            {passwordData.newPassword &&
              passwordData.confirmPassword &&
              passwordData.newPassword !== passwordData.confirmPassword && (
                <Text style={styles.errorText}>
                  Las contraseñas no coinciden.
                </Text>
              )}

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleUpdatePassword}
                disabled={
                  passwordData.newPassword !== passwordData.confirmPassword
                }
              >
                <Text style={styles.actionButtonText}>Guardar cambios</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closePasswordModal}
              >
                <Text style={styles.actionButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00205B",
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  profileContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
    textAlign: "center",
  },
  profileRole: {
    fontSize: 16,
    color: "#fff",
    opacity: 0.8,
    marginBottom: 20,
  },
  cardContainer: {
    backgroundColor: "#f5f5f5",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    paddingHorizontal: 20,
    flex: 1,
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  infoIcon: {
    marginRight: 15,
    width: 24,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
  },
  editButton: {
    backgroundColor: "#2d57d1",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  passwordButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  logoutButton: {
    backgroundColor: "#FF4444",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonIcon: {
    marginRight: 10,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
    gap: 10,
  },
  actionButton: {
    backgroundColor: "#2d57d1",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  closeButton: {
    backgroundColor: "#666",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  loadingText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  menuContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 20,
    overflow: "hidden",
  },
  menuButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f4ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  menuButtonText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
});
