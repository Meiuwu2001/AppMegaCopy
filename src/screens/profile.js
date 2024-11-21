import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../context/UsuarioContext";

export default function Profile() {
  const { authState, loadUserDetails } = useContext(AuthContext); // Accede al estado global
  const { rol, iduser, userDetails, token } = authState; // Desestructurar los datos desde authState

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellidoPa: "",
    apellidoMa: "",
    telefono: "",
    correoElectronico: "",
  });

  useEffect(() => {
    if (rol && iduser) {
      loadUserDetails(rol, iduser); // Cargar detalles usando la función del contexto
    }
  }, [rol, iduser]); // Asegurarse de que se recargue si el rol o el iduser cambian

  useEffect(() => {
    if (userDetails) {
      // Cargar los detalles del usuario al estado del formulario
      setFormData({
        nombre: userDetails.nombre || "",
        apellidoPa: userDetails.apellidoPa || "",
        apellidoMa: userDetails.apellidoMa || "",
        Telefono: userDetails.Telefono || "",
        correoElectronico: userDetails.CorreoElectronico || "",
      });
    }
  }, [userDetails]);

  // Maneja el cambio en los campos del formulario
  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  // Cerrar modal
  const closeModal = () => setIsModalVisible(false);

  // Enviar datos para actualizar
  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `https://backend-integradora.vercel.app/api/${
          rol === "cliente" ? "clientes" : "tecnicos"
        }/${iduser}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Asegúrate de tener el token adecuado
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar los datos.");
      }
      loadUserDetails(rol, iduser);
      Alert.alert("Éxito", "Datos actualizados exitosamente.");
      closeModal(); // Cerrar el modal después de la actualización
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {userDetails ? (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Perfil de Usuario</Text>
          <Text style={styles.cardText}>
            Nombre: {userDetails.nombre} {userDetails.apellidoPa}{" "}
            {userDetails.apellidoMa}
          </Text>
          <Text style={styles.cardText}>Usuario: {userDetails.user}</Text>
          <Text style={styles.cardText}>
            Email: {userDetails.CorreoElectronico}
          </Text>
          <Text style={styles.cardText}>Teléfono: {userDetails.Telefono}</Text>
          <Text style={styles.cardText}>
            ID Cliente: {userDetails.idClientes}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsModalVisible(true)}
          >
            <Text style={styles.buttonText}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text>Cargando perfil...</Text>
      )}

      {/* Modal de edición de datos */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Editar Datos</Text>

          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={formData.nombre}
            onChangeText={(value) => handleInputChange("nombre", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Apellido Paterno"
            value={formData.apellidoPa}
            onChangeText={(value) => handleInputChange("apellidoPa", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Apellido Materno"
            value={formData.apellidoMa}
            onChangeText={(value) => handleInputChange("apellidoMa", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            value={formData.Telefono}
            onChangeText={(value) => handleInputChange("telefono", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Correo Electrónico"
            value={formData.correoElectronico}
            onChangeText={(value) =>
              handleInputChange("correoElectronico", value)
            }
          />

          <View style={styles.buttonContainer}>
            <Button title="Guardar cambios" onPress={handleUpdate} />
            <Button title="Cancelar" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    width: "100%",
    maxWidth: 350,
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4B6E80",
  },
  cardText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#5C6BC0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  // Modal container
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semi-transparente
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#4B6E80",
  },
  // Input fields
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
  // Button container to style buttons
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  // Button styles for better presentation
  button: {
    backgroundColor: "#5C6BC0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "45%", // Adjust width to make them fit nicely
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
