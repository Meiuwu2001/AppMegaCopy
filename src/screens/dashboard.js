import React, { useState, useRef, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  Animated,
  Modal,
  Pressable,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { styles } from "../components/themes/themes";
import { FILTERS, SERVICES, TECHNICIANS } from "../data/data";
import ServiceModal from "../components/serviceModal";
import { AuthContext } from "../context/UsuarioContext";
import axios from "axios";

export default function Dashboard() {
  const { authState, loadUserDetails } = useContext(AuthContext);
  const { rol, iduser, userDetails, token } = authState;
  const [reports, setReports] = useState([]);
  const [activeFilter, setActiveFilter] = useState("todos");
  const [selectedService, setSelectedService] = useState(null);
  const [isServiceModalOpen, setIsAddReportModalOpen] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fetchReports = async () => {
    try {
      const response = await axios.get(
        "https://backend-integradora.vercel.app/api/reportesCreados",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReports(response.data);
    } catch (error) {
      console.error("Error fetching Reports:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredReports = reports.filter((report) =>
    activeFilter === "todos" ? true : report.estado === activeFilter
  );

  const closeModal = () => {
    setIsAddReportModalOpen(false);
    setSelectedService(null);
    fetchReports();
  };

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    fetchReports();
  }, []);

  const getStatusColor = (status) => {
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
        return "Completada";
      default:
        return status;
    }
  };

  const headerScale = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.9],
    extrapolate: "clamp",
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.contentContainer}>
        {/* Header */}
        <Animated.View
          style={[styles.header, { transform: [{ scale: headerScale }] }]}
        >
          {/* Logo Container */}
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Info Container */}
          <View style={styles.infoContainer}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.greeting}>¡Hola, Carolina!</Text>
              <Text style={styles.title}>
                Aquí está{"\n"}la lista de reportes
              </Text>
            </View>
            <View style={styles.profileContainer}>
              <Image
                source={require("../../assets/profile.jpg")}
                style={styles.profilePic}
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
              setSelectedService(report);
              setIsAddReportModalOpen(true);
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
                <Text style={styles.cardTitle}>{report.nombreUbicacion}</Text>
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
              <Text style={styles.cardDescription}>{report.tituloReporte}</Text>
            </Animated.View>
          </TouchableOpacity>
        ))}
      </Animated.ScrollView>

      {isServiceModalOpen && (
        <ServiceModal
          selectedService={selectedService}
          closeModal={closeModal}
          token={token}
        />
      )}
    </SafeAreaView>
  );
}
