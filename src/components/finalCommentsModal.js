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
import Toast from "react-native-toast-message";

export const FinalCommentsModal = ({
  visible,
  onClose,
  onConfirm,
  token,
  IdReporte,
}) => {
  const [finalComments, setFinalComments] = useState("");
  const [error, setError] = useState("");

  const showToastSuccessCompleteService = () => {
    Toast.show({
      type: "success",
      text1: "Servicio concluido con éxito!",
    });
  };

  const showToastErrorCompleteService = () => {
    Toast.show({
      type: "error",
      text1: "Hubo un problema al concluir el servicio",
    });
  };

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
        showToastErrorCompleteService();
        throw new Error("Error al concluir el reporte");
      } else {
        showToastSuccessCompleteService();
      }

      setTimeout(() => onConfirm(finalComments.trim()), 1000);
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
      <Toast />
    </Modal>
  );
};
