import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import { styles } from "../components/themes/themes";
import { AuthContext } from "../context/UsuarioContext";
import EquipmentModal from "../components/equipmentModal";
import TechnicianModal from "../components/technicianModal";

const ReporteForm = () => {
  const { authState } = useContext(AuthContext);
  const { rol, userDetails, token } = authState;
  const [TituloReporte, setTituloReporte] = useState("");
  const [FolioReporte, setFolioReporte] = useState("");
  const [comentarios, setComentarios] = useState("");
  const [selectedEquipo, setSelectedEquipo] = useState(null);
  const [tecnicoAsignado, setTecnicoAsignado] = useState(null);
  const [showEquipmentModal, setShowEquipmentModal] = useState(false);
  const [showTechnicianModal, setShowTechnicianModal] = useState(false);
  const [equipos, setEquipos] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);
  const [error, setError] = useState("");
  const currentDate = new Date();

  useEffect(() => {
    fetchEquipos();
    fetchTecnicos();
  }, [userDetails]);

  const fetchEquipos = async () => {
    try {
      if (!userDetails?.idClientes) {
        console.error("ID de cliente no disponible");
        return;
      }

      const response = await fetch(
        `https://backend-integradora.vercel.app/api/ClienteEquipoUbicacion/${userDetails.idClientes}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

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

  const handleSubmit = async () => {
    const reportData = {
      TituloReporte,
      FolioReporte,
      fechaCreacion: currentDate,
      fechaHoraActualizacion: currentDate,
      estado: "pendiente",
      comentarios,
      creadorReporte: userDetails.idClientes,
      idEquipos: selectedEquipo?.idEquipos,
    };

    try {
      const response = await fetch(
        "https://backend-integradora.vercel.app/api/reportes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(reportData),
        }
      );

      if (!response.ok) {
        throw new Error("Error al guardar el reporte");
      } else {
        console.log("Si se pudo");
      }

      // Limpiar formulario después de enviar
      setTituloReporte("");
      setFolioReporte("");
      setComentarios("");
      setSelectedEquipo(null);
      setTecnicoAsignado(null);
    } catch (error) {
      setError(error.message || "Algo salió mal");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.cardContainer2}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        >
          <View style={styles.contentContainer2}>
            <View style={styles.header2}>
              <View
                style={[
                  styles.logoContainer,
                  {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                    width: "100%",
                  },
                ]}
              >
                <Image
                  source={require("../../assets/logo.png")}
                  style={styles.logo2}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
          <View style={[styles.cardLarge, { margin: 20 }]}>
            <View style={styles.headerSection}>
              <View>
                <Text style={styles.dateTextLarge}>
                  {currentDate.toLocaleDateString()}
                </Text>
                <Text style={styles.greetingLarge}>Reportar un problema</Text>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Problema</Text>
              <TextInput
                style={styles.input}
                placeholder="Ingrese el problema"
                value={TituloReporte}
                onChangeText={setTituloReporte}
              />
            </View>

            {rol === "admin" && (
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Folio</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ingrese el folio"
                  value={FolioReporte}
                  onChangeText={setFolioReporte}
                />
              </View>
            )}

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Descripción del problema</Text>
              <TextInput
                style={[styles.textArea]}
                placeholder="Ingrese la descripción detallada"
                multiline={true}
                numberOfLines={4}
                value={comentarios}
                onChangeText={setComentarios}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Equipo</Text>
              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => setShowEquipmentModal(true)}
              >
                <Text style={styles.selectButtonText}>
                  {selectedEquipo
                    ? selectedEquipo.numeroEquipo
                    : "Seleccionar equipo"}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleSubmit}
            >
              <Text style={styles.actionButtonText}>Generar Reporte</Text>
            </TouchableOpacity>

            {error !== "" && <Text style={styles.errorText}>{error}</Text>}
          </View>
        </ScrollView>

        <EquipmentModal
          visible={showEquipmentModal}
          equipos={equipos}
          onSelect={(equipo) => {
            setSelectedEquipo(equipo);
            setShowEquipmentModal(false);
          }}
          onClose={() => setShowEquipmentModal(false)}
        />

        <TechnicianModal
          visible={showTechnicianModal}
          tecnicos={tecnicos}
          onSelect={(tecnico) => {
            setTecnicoAsignado(tecnico);
            setShowTechnicianModal(false);
          }}
          onClose={() => setShowTechnicianModal(false)}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ReporteForm;
