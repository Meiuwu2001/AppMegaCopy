import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Platform,
} from "react-native";
import { styles } from "../components/themes/themes";
import EquipmentModal from "./equipmentModal";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export const EditReportForm = ({
  selectedReport,
  closeEditModal,
  token,
  userDetails,
}) => {
  const [TituloReporte, setTituloReporte] = useState(
    selectedReport?.tituloReporte || ""
  );
  const [comentarios, setComentarios] = useState(
    selectedReport?.comentarios || ""
  );
  const [selectedEquipo, setSelectedEquipo] = useState(
    selectedReport?.equipo || null
  );
  const [equipos, setEquipos] = useState([]);
  const [showEquipmentModal, setShowEquipmentModal] = useState(false);

  useEffect(() => {
    fetchEquipos();
  }, []);

  const getEndpoint = (idClientes) => {
    if (idClientes) {
      return `https://backend-integradora.vercel.app/api/ClienteEquipoUbicacion/${idClientes}`;
    } else {
      return "https://backend-integradora.vercel.app/api/equipos";
    }
  };

  const fetchEquipos = async () => {
    try {
      const endpoint = getEndpoint(userDetails?.idClientes);

      const response = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setEquipos(data);
        console.log("Equipos obtenidos:", data);
      } else {
        console.error("Los datos recibidos no son un array:", data);
        setEquipos([]);
      }
    } catch (error) {
      console.error("Error fetching Equipos:", error);
      setError("Error al cargar los equipos");
    }
  };

  const handleEditSubmit = async () => {
    const updatedData = {
      tituloReporte: TituloReporte,
      comentarios,
      idEquipos: selectedEquipo?.idEquipos, // Solo envía el ID del equipo
    };

    try {
      const response = await fetch(
        `https://backend-integradora.vercel.app/api/reportes/${selectedReport.IdReporte}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar el reporte");
      }

      closeEditModal();
    } catch (error) {
      console.error("Error updating report:", error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={!!selectedReport}
      onRequestClose={closeEditModal}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Reporte</Text>

            {/* Título del reporte */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Problema</Text>
              <TextInput
                style={styles.input}
                value={TituloReporte}
                onChangeText={setTituloReporte}
              />
            </View>

            {/* Comentarios */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Descripción</Text>
              <TextInput
                style={[styles.textArea]}
                multiline
                value={comentarios}
                onChangeText={setComentarios}
              />
            </View>

            {/* Selección de equipo */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Equipo</Text>
              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => setShowEquipmentModal(true)}
              >
                <Text style={styles.selectButtonText}>
                  {selectedEquipo
                    ? selectedEquipo.NumeroEquipo
                    : "Seleccionar equipo"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Botón Guardar */}
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleEditSubmit}
            >
              <Text style={styles.actionButtonText}>Guardar Cambios</Text>
            </TouchableOpacity>

            {/* Botón Cerrar */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeEditModal}
            >
              <Text style={styles.actionButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Modal para seleccionar equipo */}
        <EquipmentModal
          visible={showEquipmentModal}
          equipos={equipos}
          onSelect={(equipo) => {
            setSelectedEquipo(equipo); // Establece el equipo seleccionado
            setShowEquipmentModal(false);
          }}
          onClose={() => setShowEquipmentModal(false)}
        />
      </KeyboardAwareScrollView>
    </Modal>
  );
};
