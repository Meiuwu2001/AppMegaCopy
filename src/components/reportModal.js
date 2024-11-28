import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Modal } from "react-native";
import { styles } from "./themes/themes";
import { Feather } from "@expo/vector-icons";
import { EditReportForm } from "./editReportForm";
import { FinalCommentsModal } from "../components/finalCommentsModal";
import TechnicianModal from "../components/technicianModal";

export default function ReportModal({
  selectedReport,
  closeModal,
  token,
  rol,
  userDetails,
}) {
  if (!selectedReport) return null;

  const [successMessage, setSuccessMessage] = useState("");
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isFinalCommentsModalVisible, setIsFinalCommentsModalVisible] =
    useState(false);
  const [showTechnicianModal, setShowTechnicianModal] = useState(false);
  const [tecnicos, setTecnicos] = useState([]);

  const handleComplete = () => {
    // Instead of directly changing the state, show the final comments modal
    setIsFinalCommentsModalVisible(true);
  };

  const handleFinalCommentConfirm = (comments) => {
    // Close both the final comments modal and the report modal
    setIsFinalCommentsModalVisible(false);
    setSuccessMessage("Reporte completado exitosamente.");
    closeModal();
  };

  const fetchTecnicos = async () => {
    try {
      const response = await fetch(
        "https://backend-integradora.vercel.app/api/tecnicos",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setTecnicos(data);
    } catch (error) {
      console.error("Error fetching Tecnicos:", error);
    }
  };

  const handleAssignTechnician = async (tecnico) => {
    try {
      const response = await fetch(
        `https://backend-integradora.vercel.app/api/reportes/${selectedReport.IdReporte}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            tecnicoAsignado: tecnico.idTecnicos,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al asignar técnico");
      }

      // Update the local state to reflect the new technician
      selectedReport.tecnicoAsignado = `${tecnico.Nombre} ${tecnico.ApellidoPa}`;
      setShowTechnicianModal(false);
    } catch (error) {
      console.error("Error asignando técnico:", error);
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

  const handleDelete = async (IdReporte) => {
    try {
      const response = await fetch(
        `https://backend-integradora.vercel.app/api/reportes/${IdReporte}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        closeModal();
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const getStatusBackgroundColor = (status) => {
    switch (status) {
      case "pendiente":
        return "#ff006e";
      case "ejecucion":
        return "#ffbe0b";
      case "concluido":
        return "#06d6a0";
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

  const formatTextToLines = (text, maxCharsPerLine = 25) => {
    if (!text) return "";
    const words = text.split(" ");
    let currentLine = "";
    let formattedText = "";

    words.forEach((word) => {
      if ((currentLine + word).length > maxCharsPerLine) {
        formattedText += `${currentLine}\n`;
        currentLine = word + " ";
      } else {
        currentLine += word + " ";
      }
    });

    // Agrega la última línea
    formattedText += currentLine.trim();
    return formattedText;
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
              <Feather
                style={styles.icon}
                name="users"
                size={24}
                color="white"
              />
              {rol === "admin" && (
                <Text style={styles.reporterName}>
                  Reportó{"\n"}
                  {selectedReport.Cliente}
                </Text>
              )}
              {rol === "tecnico" && (
                <Text style={styles.reporterName}>
                  Reportó{"\n"}
                  {selectedReport.creadorReporte}
                </Text>
              )}
              {rol === "cliente" && (
                <View style={styles.technicianContainer}>
                  {selectedReport.estado === "ejecucion" && (
                    <Text style={styles.departmentLabel}>
                      Un técnico va en camino
                    </Text>
                  )}
                  <Text style={styles.reporterName}>
                    Técnico asinado:{"\n"}
                    {selectedReport.tecnicoAsignado || "No asignado"}
                  </Text>
                </View>
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
              <Text style={styles.reportTitle}>
                {selectedReport.tituloReporte}
              </Text>
            </View>
          </View>

          <View style={styles.commentSection}>
            <View style={styles.infoRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.commentLabel}>
                  Descripción del problema
                </Text>
                <Text style={styles.commentText}>
                  {selectedReport.comentarios}
                </Text>
              </View>
              {rol === "admin" && (
                <View style={styles.commentFieldRight}>
                  <Text style={styles.commentLabel}>Técnico asignado</Text>
                  <Text
                    style={styles.commentText}
                    numberOfLines={2} // Limita a dos líneas si es necesario
                    ellipsizeMode="tail" // Agrega "..." si supera las líneas
                  >
                    {selectedReport.TecnicoAsignado || "No asignado"}
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.infoRow}>
              <View style={{ flex: 1 }}>
                {rol === "admin" ? (
                  <>
                    <Text style={styles.commentLabel}>Ubicación</Text>
                    <Text style={styles.commentText}>
                      {selectedReport.nombreUbicacion}
                    </Text>
                  </>
                ) : (
                  <>
                    {selectedReport.ubicacion && (
                      <>
                        <Text style={styles.commentLabel}>Ubicación</Text>
                        <Text style={styles.commentText}>
                          {selectedReport.ubicacion}
                        </Text>
                      </>
                    )}
                  </>
                )}
              </View>
              <View style={styles.commentFieldRight}>
                <Text style={styles.commentLabel}>Equipo</Text>
                <Text style={styles.commentText}>
                  {selectedReport.numeroEquipo}
                </Text>
              </View>
            </View>
          </View>

          {selectedReport.ComentariosFinales && rol !== "cliente" && (
            <View style={styles.commentSection}>
              <Text style={styles.commentLabel}>Observaciones</Text>
              <Text style={styles.commentText}>
                {selectedReport.ComentariosFinales}
              </Text>
            </View>
          )}

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
          {selectedReport.estado === "pendiente" && rol === "tecnico" && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleStart(selectedReport.IdReporte)}
            >
              <Text style={styles.actionButtonText}>Comenzar servicio</Text>
            </TouchableOpacity>
          )}

          {/* Technician Assignment Button */}
          {rol === "admin" &&
            !selectedReport.TecnicoAsignado &&
            selectedReport.estado === "pendiente" && (
              <TouchableOpacity
                style={styles.startButton}
                onPress={() => {
                  fetchTecnicos(); // Fetch technicians when button is pressed
                  setShowTechnicianModal(true);
                }}
              >
                <Text style={styles.actionButtonText}>Asignar técnico</Text>
              </TouchableOpacity>
            )}

          {rol === "admin" &&
            selectedReport.TecnicoAsignado &&
            selectedReport.estado === "pendiente" && (
              <TouchableOpacity
                style={styles.startButton}
                onPress={() => {
                  fetchTecnicos(); // Fetch technicians when button is pressed
                  setShowTechnicianModal(true);
                }}
              >
                <Text style={styles.actionButtonText}>Reasignar técnico</Text>
              </TouchableOpacity>
            )}

          {selectedReport.estado === "ejecucion" &&
            (rol === "admin" || rol === "tecnico") && (
              <TouchableOpacity
                style={styles.completeButton}
                onPress={() => handleComplete(selectedReport.IdReporte)}
              >
                <Text style={styles.actionButtonText}>Concluir servicio</Text>
              </TouchableOpacity>
            )}

          {/* Botón eliminar */}
          {((rol === "cliente" && selectedReport.estado !== "concluido") ||
            rol === "admin") && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(selectedReport.IdReporte)}
            >
              <Text style={styles.actionButtonText}>Eliminar</Text>
            </TouchableOpacity>
          )}

          {/* Botón editar */}
          {((rol === "cliente" && selectedReport.estado !== "concluido") ||
            rol === "admin") && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setIsEditModalVisible(true)}
            >
              <Text style={styles.actionButtonText}>Editar</Text>
            </TouchableOpacity>
          )}

          {/* Botón cerrar */}
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.actionButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
      {isEditModalVisible && (
        <EditReportForm
          selectedReport={selectedReport}
          closeEditModal={() => setIsEditModalVisible(false)}
          token={token}
          userDetails={userDetails}
        />
      )}

      {/* Final Comments Modal */}
      {isFinalCommentsModalVisible && (
        <FinalCommentsModal
          visible={isFinalCommentsModalVisible}
          onClose={() => setIsFinalCommentsModalVisible(false)}
          onConfirm={handleFinalCommentConfirm}
          token={token}
          IdReporte={selectedReport.IdReporte}
        />
      )}

      {/* Technician Modal */}
      <TechnicianModal
        visible={showTechnicianModal}
        tecnicos={tecnicos}
        onSelect={(tecnico) => {
          handleAssignTechnician(tecnico);
        }}
        onClose={() => setShowTechnicianModal(false)}
      />
    </Modal>
  );
}
