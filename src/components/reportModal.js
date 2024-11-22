import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Modal } from "react-native";
import { styles } from "./themes/themes";
import { Feather } from "@expo/vector-icons";

export default function ReportModal({
  selectedReport,
  closeModal,
  token,
  rol,
}) {
  if (!selectedReport) return null;

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
      visible={!!selectedReport}
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
              {(rol === "admin" || rol === "tecnico") && (
                <Text style={styles.reporterName}>
                  Reportó{"\n"}
                  {selectedReport.Cliente}
                </Text>
              )}
              {rol === "cliente" && (
                <Text style={styles.reporterName}>
                  Técnico asinado:{"\n"}
                  {selectedReport.tecnicoAsignado || "No asignado"}
                </Text>
              )}
            </View>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor: getStatusBackgroundColor(
                    selectedReport.estado
                  ),
                },
              ]}
            >
              <Text style={styles.statusBadgeText}>
                {getStatusText(selectedReport.estado)}
              </Text>
            </View>
          </View>

          {/* Información del servicio */}
          <View style={styles.serviceInfo}>
            <View style={styles.infoRow}>
              <Text style={styles.serviceDepartment}>
                {selectedReport.tituloReporte}
              </Text>
              <Text style={styles.serviceEquipment}>
                {selectedReport.numeroEquipo}
              </Text>
            </View>
            <Text style={styles.departmentLabel}>
              {selectedReport.nombreUbicacion}
            </Text>
          </View>

          {/* Comentario */}
          <View style={styles.commentSection}>
            <Text style={styles.commentLabel}>Comentario</Text>
            <Text style={styles.commentText}>{selectedReport.comentarios}</Text>
          </View>

          {/* Fecha y hora */}
          <View style={styles.timeSection}>
            <View style={styles.timeRow}>
              <Text style={styles.timeLabel}>Fecha</Text>
              <Text style={styles.timeValue}>
                {formatFecha(selectedReport.fechaCreacion)}
              </Text>
            </View>
            <View style={styles.timeRow}>
              <Text style={styles.timeLabel}>Hora</Text>
              <Text style={styles.timeValue}>
                {formatHora(selectedReport.fechaCreacion)}
              </Text>
            </View>
          </View>

          {/* Botón de acción según estado */}
          {selectedReport.estado === "pendiente" &&
            (rol === "admin" || rol === "tecnico") && (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleStart(selectedReport.IdReporte)}
              >
                <Text style={styles.actionButtonText}>Comenzar</Text>
              </TouchableOpacity>
            )}
          {selectedReport.estado === "ejecucion" &&
            (rol === "admin" || rol === "tecnico") && (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleComplete(selectedReport.IdReporte)}
              >
                <Text style={styles.actionButtonText}>Completar</Text>
              </TouchableOpacity>
            )}

          {/* Botón cerrar */}
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Feather name="x" size={24} color="#666" style={styles.closeBtn} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
