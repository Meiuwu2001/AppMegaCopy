import React, { useState, useRef, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  Animated,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { styles } from "../components/themes/themes";
import { FILTERS } from "../data/data";
import ReportModal from "../components/reportModal";
import { AuthContext } from "../context/UsuarioContext";
import { Feather, FontAwesome } from "@expo/vector-icons";

export default function Dashboard() {
  const { authState, loadUserDetails } = useContext(AuthContext);
  const { rol, iduser, userDetails, token } = authState;
  const [reports, setReports] = useState([]);
  const [activeFilter, setActiveFilter] = useState("todos");
  const [selectedReport, setSelectedReport] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [shouldAnimate, setShouldAnimate] = useState(true); // Controla cuándo debe animar

  console.log(token);

  const filteredReports = reports.filter((report) =>
    activeFilter === "todos" ? true : report.estado === activeFilter
  );

  const closeModal = () => {
    setIsReportModalOpen(false);
    setSelectedReport(null);
    refreshDashboardData(); // Refresca los datos sin reiniciar la animación
  };

  useEffect(() => {
    // Ejecutar animación solo si `shouldAnimate` es true
    if (shouldAnimate) {
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => setShouldAnimate(false)); // Desactiva la bandera después de animar
    }
  }, [shouldAnimate]);

  useEffect(() => {
    if (rol && iduser) {
      const fetchDetails = async () => {
        await loadUserDetails(rol, iduser); // Carga detalles del usuario
        setLoading(false);
      };
      fetchDetails();
    }
  }, [rol, iduser]);

  useEffect(() => {
    if (userDetails) {
      initializeDashboard();
    }
  }, [userDetails]);

  const initializeDashboard = async () => {
    setLoading(true);
    setError(null);

    let clienteId = null;
    let tecnicoId = null;

    if (rol === "cliente" && userDetails) {
      clienteId = userDetails.idClientes;
    } else if (rol === "tecnico" && userDetails) {
      tecnicoId = userDetails.idTecnicos;
    }

    const reportData = await LoadReportsDetails(clienteId, tecnicoId);
    setReports(Array.isArray(reportData) ? reportData : []);
    setLoading(false);

    // Solo activa la animación en la carga inicial
    if (!isReportModalOpen) {
      setShouldAnimate(true);
    }
  };

  const refreshDashboardData = async () => {
    setError(null);

    let clienteId = null;
    let tecnicoId = null;

    if (rol === "cliente" && userDetails) {
      clienteId = userDetails.idClientes;
    } else if (rol === "tecnico" && userDetails) {
      tecnicoId = userDetails.idTecnicos;
    }

    const reportData = await LoadReportsDetails(clienteId, tecnicoId);
    setReports(Array.isArray(reportData) ? reportData : []);
  };

  const LoadReportsDetails = async (clienteId, tecnicoId) => {
    try {
      const endpointReportMap = {
        admin: `https://backend-integradora.vercel.app/api/reportesCreados`,
        cliente: `https://backend-integradora.vercel.app/api/reportesclientes/${clienteId}`,
        tecnico: `https://backend-integradora.vercel.app/api/tecnicosreportes/${tecnicoId}`,
      };

      const endpointReport = endpointReportMap[rol];
      const response = await fetch(endpointReport, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      const result = await response.json();
      return result;
    } catch (err) {
      console.error(
        "Reports: Error al obtener los detalles de los reportes:",
        err.message
      );
      setError("Error al cargar los reportes");
    }
  };

  const getStatusColor = (status) => {
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

  const headerScale = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.9],
    extrapolate: "clamp",
  });

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#666" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.contentContainer}>
        {/* Header */}
        <Animated.View
          style={[styles.header, { transform: [{ scale: headerScale }] }]}
        >
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.greeting}>
                ¡Hola, {userDetails?.nombre || "Usuario"}!
              </Text>
              {rol === "admin" && (
                <Text style={styles.title}>
                  Aquí está la lista{"\n"}completa de reportes
                </Text>
              )}
              {rol === "tecnico" && (
                <Text style={styles.title}>
                  Aquí están tus{"\n"}reportes asignados
                </Text>
              )}
              {rol === "cliente" && (
                <Text style={styles.title}>
                  Estos son los reportes{"\n"}que has realizado
                </Text>
              )}
            </View>
            <View style={styles.profileContainer}>
              <FontAwesome
                style={styles.icon2}
                name="user-circle"
                size={40}
                color="#fff"
              />
            </View>
          </View>
        </Animated.View>

        {/* Filters */}
        <View style={styles.filterWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterContainer}
          >
            {FILTERS.map((filter) => (
              <TouchableOpacity
                key={filter.id}
                style={[
                  styles.filterButton,
                  activeFilter === filter.id && styles.filterButtonActive,
                ]}
                onPress={() => setActiveFilter(filter.id)}
              >
                <Text
                  style={[
                    styles.filterText,
                    activeFilter === filter.id && styles.filterTextActive,
                  ]}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Report Cards */}
      <Animated.ScrollView
        style={[styles.cardContainer, { opacity: fadeAnim }]}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {filteredReports.map((report, index) => (
          <TouchableOpacity
            key={report.IdReporte}
            onPress={() => {
              setSelectedReport(report);
              setIsReportModalOpen(true);
            }}
          >
            <Animated.View
              style={[
                styles.card,
                {
                  opacity: fadeAnim,
                  transform: [
                    {
                      translateY: fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [50 * (index + 1), 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{report.tituloReporte}</Text>
                <View style={styles.statusContainer}>
                  <View
                    style={[
                      styles.statusDot,
                      { backgroundColor: getStatusColor(report.estado) },
                    ]}
                  />
                  <Text style={styles.statusText}>
                    {getStatusText(report.estado)}
                  </Text>
                </View>
              </View>
              {rol === "cliente" && (
                <Text style={styles.cardDescription}>
                  {report.comentarios || "Sin descripción"}
                </Text>
              )}
              {rol === "tecnico" && (
                <Text style={styles.cardDescription}>
                  {report.ubicacion || "Ubicación no disponible"}
                </Text>
              )}
              {rol === "admin" && (
                <Text style={styles.cardDescription}>
                  {report.nombreUbicacion || "Ubicación no disponible"}
                </Text>
              )}
            </Animated.View>
          </TouchableOpacity>
        ))}
      </Animated.ScrollView>

      {/* Modals */}
      {isReportModalOpen && (
        <ReportModal
          selectedReport={selectedReport}
          closeModal={closeModal}
          token={token}
          rol={rol}
        />
      )}
    </SafeAreaView>
  );
}
