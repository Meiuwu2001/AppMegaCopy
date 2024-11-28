import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Platform,
} from "react-native";
import { styles } from "../components/themes/themes";
import { AuthContext } from "../context/UsuarioContext";
import EquipmentModal from "../components/equipmentModal";
import TechnicianModal from "../components/technicianModal";
import ClienteModal from "../components/clienteModal";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ReporteForm = () => {
  const { authState } = useContext(AuthContext);
  const { rol, userDetails, token } = authState;

  // State for form fields
  const [TituloReporte, setTituloReporte] = useState("");
  const [FolioReporte, setFolioReporte] = useState("");
  const [comentarios, setComentarios] = useState("");
  const [selectedEquipo, setSelectedEquipo] = useState(null);
  const [tecnicoAsignado, setTecnicoAsignado] = useState(null);
  const [cliente, setCliente] = useState(null);

  // Modal visibility states
  const [showEquipmentModal, setShowEquipmentModal] = useState(false);
  const [showTechnicianModal, setShowTechnicianModal] = useState(false);
  const [showClienteModal, setShowClienteModal] = useState(false);

  // New state for two-step form
  const [formStep, setFormStep] = useState(1);

  // Other existing states
  const [equipos, setEquipos] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState("");
  const currentDate = new Date();

  // Existing useEffect and fetch functions remain the same
  useEffect(() => {
    fetchEquipos();
    fetchTecnicos();
    fetchClientes();
  }, [userDetails]);

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

  const fetchClientes = async () => {
    try {
      const response = await fetch(
        "https://backend-integradora.vercel.app/api/clientes",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error("Error fetching Tecnicos:", error);
    }
  };

  const handleSubmit = async () => {
    const reportData = {
      TituloReporte,
      FolioReporte: rol === "admin" ? FolioReporte : "", // Only include if admin
      fechaCreacion: currentDate,
      fechaHoraActualizacion: currentDate,
      estado: "pendiente",
      comentarios,
      creadorReporte: userDetails.idClientes || cliente?.idClientes,
      idEquipos: selectedEquipo?.idEquipos,
      tecnicoAsignado: rol === "admin" ? tecnicoAsignado?.idTecnicos : null, // Only include if admin
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
      }

      // Reset form
      setTituloReporte("");
      setFolioReporte("");
      setComentarios("");
      setSelectedEquipo(null);
      setTecnicoAsignado(null);
      setCliente(null);
    } catch (error) {
      setError(error.message || "Algo salió mal");
    }
  };

  const canSubmit = () => {
    // Basic validation for clients
    if (rol !== "admin") {
      return (
        TituloReporte.trim() !== "" &&
        comentarios.trim() !== "" &&
        selectedEquipo !== null
      );
    }

    // Admin validation
    return (
      TituloReporte.trim() !== "" &&
      comentarios.trim() !== "" &&
      tecnicoAsignado !== null &&
      selectedEquipo !== null
    );
  };

  // Validation for first step
  const canProceedToNextStep = () => {
    return TituloReporte.trim() !== "" && comentarios.trim() !== "";
  };

  // Render first step of the form
  const renderFirstStep = () => (
    <>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Problema</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese el problema"
          value={TituloReporte}
          onChangeText={setTituloReporte}
        />
      </View>

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

      {rol === "admin" && (
        <TouchableOpacity
          style={[
            styles.actionButton,
            !canProceedToNextStep() && styles.disabledButton,
          ]}
          onPress={() => canProceedToNextStep() && setFormStep(2)}
          disabled={!canProceedToNextStep()}
        >
          <Text style={styles.actionButtonText}>Siguiente</Text>
        </TouchableOpacity>
      )}
    </>
  );

  // Render second step of the form (only for admin)
  const renderSecondStep = () => (
    <>
      {rol === "admin" && (
        <>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Folio</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingrese el folio"
              value={FolioReporte}
              onChangeText={setFolioReporte}
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
                  ? selectedEquipo.numeroEquipo || selectedEquipo.NumeroEquipo
                  : "Seleccionar equipo"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Técnico</Text>
            <TouchableOpacity
              style={styles.selectButton}
              onPress={() => setShowTechnicianModal(true)}
            >
              <Text style={styles.selectButtonText}>
                {tecnicoAsignado
                  ? `${tecnicoAsignado.Nombre} ${tecnicoAsignado.ApellidoPa}`
                  : "Seleccionar técnico"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Reportó</Text>
            <TouchableOpacity
              style={styles.selectButton}
              onPress={() => setShowClienteModal(true)}
            >
              <Text style={styles.selectButtonText}>
                {cliente
                  ? `${cliente.Nombre} ${cliente.ApellidoPa}`
                  : "Seleccionar cliente"}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              style={[
                styles.actionButton,
                { width: "45%", backgroundColor: "gray" },
              ]}
              onPress={() => setFormStep(1)}
            >
              <Text style={styles.actionButtonText}>Atrás</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.actionButton,
                { width: "45%" },
                (!tecnicoAsignado || !selectedEquipo) && styles.disabledButton,
              ]}
              onPress={handleSubmit}
              disabled={!tecnicoAsignado || !selectedEquipo}
            >
              <Text style={styles.actionButtonText}>Generar Reporte</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );

  // Render the full form for non-admin users
  const renderFullForm = () => (
    <>
      {renderFirstStep()}

      {rol === "admin" && (
        <>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Folio</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingrese el folio"
              value={FolioReporte}
              onChangeText={setFolioReporte}
            />
          </View>
        </>
      )}

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Equipo</Text>
        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => setShowEquipmentModal(true)}
        >
          <Text style={styles.selectButtonText}>
            {selectedEquipo
              ? selectedEquipo.numeroEquipo || selectedEquipo.NumeroEquipo
              : "Seleccionar equipo"}
          </Text>
        </TouchableOpacity>
      </View>

      {rol === "admin" && (
        <>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Técnico</Text>
            <TouchableOpacity
              style={styles.selectButton}
              onPress={() => setShowTechnicianModal(true)}
            >
              <Text style={styles.selectButtonText}>
                {tecnicoAsignado
                  ? `${tecnicoAsignado.Nombre} ${tecnicoAsignado.ApellidoPa}`
                  : "Seleccionar técnico"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Reportó</Text>
            <TouchableOpacity
              style={styles.selectButton}
              onPress={() => setShowClienteModal(true)}
            >
              <Text style={styles.selectButtonText}>
                {cliente
                  ? `${cliente.Nombre} ${cliente.ApellidoPa}`
                  : "Seleccionar cliente"}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <TouchableOpacity
        style={[styles.actionButton, !canSubmit() && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={!canSubmit()}
      >
        <Text style={styles.actionButtonText}>Generar Reporte</Text>
      </TouchableOpacity>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flex: 1, // Ocupa toda la pantalla
          justifyContent: "center", // Centra el contenido verticalmente
          alignItems: "center", // Centra el contenido horizontalmente
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={styles.cardContainer2}
          contentContainerStyle={{
            flexGrow: 1, // Permite expandirse dentro del espacio disponible
            justifyContent: "center", // Centrado vertical
            alignItems: "center", // Centrado horizontal
            paddingBottom: 100, // Espacio extra si es necesario
          }}
        >
          <View style={styles.contentContainer2}>
            <View style={styles.header2}></View>
            <View
              style={[
                styles.logoContainer2,
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
          <View style={[styles.cardLarge, { margin: 20 }]}>
            <View style={styles.headerSection}>
              <View>
                <Text style={styles.dateTextLarge}>
                  {currentDate.toLocaleDateString()}
                </Text>
                <Text style={styles.greetingLarge}>Reportar un problema</Text>
              </View>
            </View>

            {/* Conditional rendering based on role and form step */}
            {rol === "admin"
              ? formStep === 1
                ? renderFirstStep()
                : renderSecondStep()
              : renderFullForm()}

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

        <ClienteModal
          visible={showClienteModal}
          clientes={clientes}
          onSelect={(cliente) => {
            setCliente(cliente);
            setShowClienteModal(false);
          }}
          onClose={() => setShowClienteModal(false)}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ReporteForm;
