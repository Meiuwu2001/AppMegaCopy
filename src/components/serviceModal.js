import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Modal } from "react-native";
import { styles } from "../components/themes/themes";
import { Feather } from "@expo/vector-icons";
import { SERVICES } from "../data/data";

export default function ServiceModal({ selectedService, closeModal, token }) {
  if (!selectedService) return null;

  const [successMessage, setSuccessMessage] = useState("");

  const handleComplete = async (IdReporte) => {
    const currentDate = new Date();
    const reportData = {
      estado: "concluido",
      fechaHoraActualizacion: currentDate,
    };

    try {
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
        throw new Error("Error al completar el reporte");
      }

      setSuccessMessage("Reporte completado exitosamente.");
      console.log(successMessage);
      closeModal();
    } catch (error) {
      setError(error.message || "Algo salió mal");
      console.error(error);
    }
  };

  const handleStart = async (IdReporte) => {
    const reportData = {
      estado: "ejecucion",
    };

    try {
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
        throw new Error("Error al completar el reporte");
      }

      setSuccessMessage("Reporte completado exitosamente.");
      console.log(successMessage);
      closeModal();
    } catch (error) {
      setError(error.message || "Algo salió mal");
      console.error(error);
    }
  };

  const getStatusBackgroundColor = (status) => {
    switch (status) {
      case "pendiente":
        return "#FFA500";
      case "ejecucion":
        return "#4CAF50";
      case "concluido":
        return "#2196F3";
      default:
        return "#666";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pendiente":
        return "Pendiente";
      case "ejecucion":
        return "En curso";
      case "concluido":
        return "Concluido";
      default:
        return status;
    }
  };

  const formatFecha = (fecha) => {
    const fechaObj = new Date(fecha);
    const opcionesFecha = { day: "2-digit", month: "2-digit", year: "numeric" };

    const fechaFormateada = fechaObj.toLocaleDateString("es-ES", opcionesFecha);

    return `${fechaFormateada}`;
  };

  const formatHora = (fecha) => {
    const fechaObj = new Date(fecha);
    const opcionesHora = { hour: "2-digit", minute: "2-digit", hour12: true };

    const horaFormateada = fechaObj.toLocaleTimeString("es-ES", opcionesHora);

    return `${horaFormateada}`;
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={!!selectedService}
      onRequestClose={closeModal}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header con foto y estado */}
          <View style={styles.modalHeader}>
            <View style={styles.reporterInfo}>
              <Image
                source={require("../../assets/profile.jpg")}
                style={styles.modalProfilePic}
              />
              <Text style={styles.reporterName}>
                Reportó{"\n"}
                {selectedService.Cliente}
              </Text>
            </View>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor: getStatusBackgroundColor(
                    selectedService.estado
                  ),
                },
              ]}
            >
              <Text style={styles.statusBadgeText}>
                {getStatusText(selectedService.estado)}
              </Text>
            </View>
          </View>

          {/* Información del servicio */}
          <View style={styles.serviceInfo}>
            <View style={styles.infoRow}>
              <Text style={styles.serviceDepartment}>
                {selectedService.tituloReporte}
              </Text>
              <Text style={styles.serviceEquipment}>
                {selectedService.numeroEquipo}
              </Text>
            </View>
            <Text style={styles.departmentLabel}>
              {selectedService.nombreUbicacion}
            </Text>
          </View>

          {/* Comentario */}
          <View style={styles.commentSection}>
            <Text style={styles.commentLabel}>Comentario</Text>
            <Text style={styles.commentText}>
              {selectedService.comentarios}
            </Text>
          </View>

          {/* Fecha y hora */}
          <View style={styles.timeSection}>
            <View style={styles.timeRow}>
              <Text style={styles.timeLabel}>Fecha</Text>
              <Text style={styles.timeValue}>
                {formatFecha(selectedService.fechaCreacion)}
              </Text>
            </View>
            <View style={styles.timeRow}>
              <Text style={styles.timeLabel}>Hora</Text>
              <Text style={styles.timeValue}>
                {formatHora(selectedService.fechaCreacion)}
              </Text>
            </View>
          </View>

          {/* Botón de acción según estado */}
          {selectedService.estado === "pendiente" && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleStart(selectedService.IdReporte)}
            >
              <Text style={styles.actionButtonText}>Comenzar</Text>
            </TouchableOpacity>
          )}
          {selectedService.estado === "ejecucion" && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleComplete(selectedService.IdReporte)}
            >
              <Text style={styles.actionButtonText}>Completar</Text>
            </TouchableOpacity>
          )}

          {/* Botón cerrar */}
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Feather name="x" size={24} color="#666" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
