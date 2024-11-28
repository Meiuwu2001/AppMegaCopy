import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Platform,
} from "react-native";
import { styles } from "./themes/themes";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export const FinalCommentsModal = ({
  visible,
  onClose,
  onConfirm,
  token,
  IdReporte,
}) => {
  const [finalComments, setFinalComments] = useState("");
  const [error, setError] = useState("");

  const handleConfirm = async () => {
    if (!finalComments.trim()) {
      setError("Por favor, ingrese comentarios finales");
      return;
    }

    try {
      const currentDate = new Date();
      const reportData = {
        estado: "concluido",
        fechaHoraActualizacion: currentDate,
        ComentariosFinales: finalComments.trim(),
      };

      const response = await fetch(
        `https://backend-integradora.vercel.app/api/reportes/${IdReporte}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(reportData),
        }
      );

      if (!response.ok) {
        throw new Error("Error al concluir el reporte");
      }

      onConfirm(finalComments.trim());
    } catch (error) {
      console.error("Error al concluir el reporte:", error);
      setError(error instanceof Error ? error.message : "Algo salió mal");
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Observaciones</Text>

            <TextInput
              style={styles.textArea}
              multiline
              numberOfLines={4}
              placeholder="Ingrese las observaciones del reporte"
              value={finalComments}
              onChangeText={setFinalComments}
            />

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity style={styles.deleteButton} onPress={onClose}>
              <Text style={styles.actionButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.completeButton}
              onPress={handleConfirm}
            >
              <Text style={styles.actionButtonText}>Concluir Reporte</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Modal>
  );
};
