import React, { useState, useRef, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  Animated,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { styles } from "../components/themes/themes";
import { FILTERS } from "../data/data";
import ReportModal from "../components/reportModal";
import { AuthContext } from "../context/UsuarioContext";
import { AlertCircle, Clock, CheckCircle, FileText } from "lucide-react-native";

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
  const [refreshing, setRefreshing] = useState(false);

  console.log(token);

  const filteredReports = reports.filter((report) =>
    activeFilter === "todos" ? true : report.estado === activeFilter
  );

  const closeModal = () => {
    setIsReportModalOpen(false);
    setSelectedReport(null);
    refreshDashboardData(); // Refresca los datos sin reiniciar la animación
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      await refreshDashboardData();
      // Opcional: reactivar animación si lo deseas
      setShouldAnimate(true);
    } catch (error) {
      console.error("Error al refrescar:", error);
    } finally {
      setRefreshing(false);
    }
  }, []);

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
        try {
          await loadUserDetails(rol, iduser);
          setLoading(false);
        } catch (error) {
          console.error("Error al cargar detalles de usuario:", error);
          setLoading(false);
          // Opcional: manejar el error de carga de usuario
        }
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
    try {
      // Primero, intenta recargar los detalles del usuario si no están disponibles
      if (!userDetails) {
        console.log("Recargando detalles de usuario");
        await loadUserDetails(rol, iduser);
      }

      // Espera un momento para asegurar que userDetails se ha actualizado
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Verificación de userDetails después de recargar
      if (!userDetails) {
        console.error("No se pudieron cargar los detalles de usuario");
        return;
      }

      let clienteId = null;
      let tecnicoId = null;

      // Ajusta la extracción de IDs según el rol
      if (rol === "cliente") {
        clienteId = userDetails.idClientes;
      } else if (rol === "tecnico") {
        tecnicoId = userDetails.idTecnicos;
      }

      // Si es admin, no necesita ID específico
      const reportData = await LoadReportsDetails(clienteId, tecnicoId);

      // Actualiza los reportes
      setReports(Array.isArray(reportData) ? reportData : []);
    } catch (error) {
      console.error("Error al actualizar el dashboard:", error);
      // Opcional: mostrar un mensaje de error al usuario
      // setError("No se pudieron actualizar los reportes");
    }
  };
  const LoadReportsDetails = async (clienteId, tecnicoId) => {
    try {
      if (
        (rol === "cliente" && !clienteId) ||
        (rol === "tecnico" && !tecnicoId)
      ) {
        console.error(`No se encontró el ID para el rol: ${rol}`);
        return []; // Retorna un arreglo vacío en lugar de lanzar un error
      }

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
        `Reports: Error al obtener los detalles de los reportes para rol ${rol}:`,
        err.message
      );
      setError("Error al cargar los reportes");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pendiente":
        return (
          <AlertCircle color="#ff006e" size={15} style={styles.statusIcon} />
        );
      case "ejecucion":
        return <Clock color="#ffbe0b" size={15} style={styles.statusIcon2} />;
      case "concluido":
        return (
          <CheckCircle color="#06d6a0" size={15} style={styles.statusIcon3} />
        );
      default:
        return <AlertCircle color="gray" size={15} style={styles.statusIcon} />;
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

  const truncateText = (text, maxLength) => {
    if (!text || text.length <= maxLength) {
      return text;
    }
    return `${text.slice(0, maxLength)}...`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.contentContainer}>
        {/* Header */}
        <Animated.View
          style={[styles.header, { transform: [{ scale: headerScale }] }]}
        >
          <View style={styles.infoContainer}>
            <View style={styles.headerTextContainer}>
              {rol !== "admin" && (
                <Text style={styles.greeting}>
                  ¡Hola, {userDetails?.nombre || "Usuario"}!
                </Text>
              )}
              {rol === "admin" && (
                <Text style={styles.greeting}>
                  ¡Hola, {userDetails?.nombre || "Administrador"}!
                </Text>
              )}
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
            <View style={styles.logoContainer}>
              <Image
                source={require("../../assets/logo.png")}
                style={styles.logo}
                resizeMode="contain"
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
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#666"]} // Color del indicador de carga (puedes personalizarlo)
            tintColor="#666" // Color del círculo de carga en iOS
            title="Actualizando reportes..." // Texto opcional de carga
          />
        }
      >
        {filteredReports.length === 0 ? (
          <View style={styles.noReportsContainer}>
            <FileText size={50} color="#666" />
            <Text style={styles.noReportsText}>No hay reportes</Text>
          </View>
        ) : (
          filteredReports.map((report, index) => (
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
                  <Text style={styles.cardTitle}>
                    {truncateText(report.tituloReporte || "No disponible", 27)}
                  </Text>
                  <View style={styles.statusContainer}>
                    {getStatusColor(report.estado)}
                    <Text style={styles.statusText}>
                      {getStatusText(report.estado)}
                    </Text>
                  </View>
                </View>
                {rol === "cliente" && (
                  <Text style={styles.cardDescription}>
                    {truncateText(report.comentarios || "Sin descripción", 100)}
                  </Text>
                )}
                {rol === "tecnico" && (
                  <Text style={styles.cardDescription}>
                    {truncateText(
                      report.ubicacion || "Ubicación no disponible",
                      100
                    )}
                  </Text>
                )}
                {rol === "admin" && (
                  <Text style={styles.cardDescription}>
                    {truncateText(
                      report.nombreUbicacion || "Ubicación no disponible",
                      100
                    )}
                  </Text>
                )}
              </Animated.View>
            </TouchableOpacity>
          ))
        )}
      </Animated.ScrollView>

      {/* Modals */}
      {isReportModalOpen && (
        <ReportModal
          selectedReport={selectedReport}
          closeModal={closeModal}
          token={token}
          rol={rol}
          userDetails={userDetails}
        />
      )}
    </SafeAreaView>
  );
}
