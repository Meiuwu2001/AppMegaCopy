import React, { useState, useRef } from "react";
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
import { Feather } from "@expo/vector-icons";
import { styles } from "../components/themes/themes";

const TECHNICIANS = [
  { id: 1, name: "Carlos Stanley" },
  { id: 2, name: "Ana García" },
  { id: 3, name: "Roberto Méndez" },
];

const SERVICES = [
  {
    id: 1,
    title: "Desarrollo Social",
    description: "El equipo está manchando las hojas",
    department: "Departamento de Soporte Técnico",
    equipment: "M 155",
    reportedBy: "Carlos Stanley",
    date: "01/10/2024",
    time: "13:23:41",
    status: "pendiente",
    assignedTo: null,
  },
  {
    id: 2,
    title: "Reparación de Equipo",
    description: "Problema de encendido intermitente",
    department: "Departamento de Mantenimiento",
    equipment: "L 220",
    reportedBy: "Ana García",
    date: "02/10/2024",
    time: "09:15:23",
    status: "en-curso",
    assignedTo: "Juan Pérez",
  },
  {
    id: 3,
    title: "Instalación de Software",
    description: "Actualización a la última versión del sistema",
    department: "Departamento de TI",
    equipment: "PC 334",
    reportedBy: "Luis Morales",
    date: "03/10/2024",
    time: "11:45:10",
    status: "completada",
    assignedTo: "Pedro Sánchez",
  },
  {
    id: 4,
    title: "Revisión de Red",
    description: "Optimización de conexiones en el área de oficinas",
    department: "Departamento de Redes",
    equipment: "Router X500",
    reportedBy: "Sara Martínez",
    date: "04/10/2024",
    time: "10:35:52",
    status: "en-curso",
    assignedTo: "Laura Núñez",
  },
  {
    id: 5,
    title: "Backup de Datos",
    description: "Respaldo de la base de datos principal",
    department: "Departamento de TI",
    equipment: "Servidor DB01",
    reportedBy: "Jorge Ramírez",
    date: "05/10/2024",
    time: "08:05:32",
    status: "completada",
    assignedTo: "Miguel Ángel",
  },
];

const FILTERS = [
  { id: "todos", label: "Todos" },
  { id: "pendiente", label: "Pendientes" },
  { id: "en-curso", label: "En curso" },
  { id: "completada", label: "Completadas" },
];

export default function Dashboard() {
  const [services, setServices] = useState(SERVICES);
  const [activeFilter, setActiveFilter] = useState("todos");
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showTechnicianSelect, setShowTechnicianSelect] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleAssign = (technicianId) => {
    setServices(
      services.map((service) => {
        if (service.id === selectedService.id) {
          return {
            ...service,
            status: "en-curso",
            assignedTo: TECHNICIANS.find((tech) => tech.id === technicianId),
          };
        }
        return service;
      })
    );
    setShowTechnicianSelect(false);
    setShowModal(false);
  };

  const handleComplete = (serviceId) => {
    setServices(
      services.map((service) => {
        if (service.id === serviceId) {
          return {
            ...service,
            status: "completada",
          };
        }
        return service;
      })
    );
    setShowModal(false);
  };

  const ServiceModal = () => {
    if (!selectedService) return null;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
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
                  {selectedService.reportedBy}
                </Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor: getStatusBackgroundColor(
                      selectedService.status
                    ),
                  },
                ]}
              >
                <Text style={styles.statusBadgeText}>
                  {getStatusText(selectedService.status)}
                </Text>
              </View>
            </View>

            {/* Información del servicio */}
            <View style={styles.serviceInfo}>
              <View style={styles.infoRow}>
                <Text style={styles.serviceDepartment}>
                  {selectedService.title}
                </Text>
                <Text style={styles.serviceEquipment}>
                  {selectedService.equipment}
                </Text>
              </View>
              <Text style={styles.departmentLabel}>
                {selectedService.department}
              </Text>
            </View>

            {/* Comentario */}
            <View style={styles.commentSection}>
              <Text style={styles.commentLabel}>Comentario</Text>
              <Text style={styles.commentText}>
                {selectedService.description}
              </Text>
            </View>

            {/* Fecha y hora */}
            <View style={styles.timeSection}>
              <View style={styles.timeRow}>
                <Text style={styles.timeLabel}>Fecha</Text>
                <Text style={styles.timeValue}>{selectedService.date}</Text>
              </View>
              <View style={styles.timeRow}>
                <Text style={styles.timeLabel}>Hora</Text>
                <Text style={styles.timeValue}>{selectedService.time}</Text>
              </View>
            </View>

            {/* Botón de acción según estado */}
            {selectedService.status === "pendiente" && (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => setShowTechnicianSelect(true)}
              >
                <Text style={styles.actionButtonText}>Asignar</Text>
              </TouchableOpacity>
            )}
            {selectedService.status === "en-curso" && (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleComplete(selectedService.id)}
              >
                <Text style={styles.actionButtonText}>Completar</Text>
              </TouchableOpacity>
            )}

            {/* Selector de técnicos */}
            {showTechnicianSelect && (
              <View style={styles.technicianSelect}>
                <Text style={styles.technicianSelectTitle}>
                  Seleccionar técnico
                </Text>
                {TECHNICIANS.map((tech) => (
                  <TouchableOpacity
                    key={tech.id}
                    style={styles.technicianOption}
                    onPress={() => handleAssign(tech.id)}
                  >
                    <Text style={styles.technicianName}>{tech.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Botón cerrar */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setShowModal(false);
                setShowTechnicianSelect(false);
              }}
            >
              <Feather name="x" size={24} color="#666" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const filteredServices = SERVICES.filter((service) =>
    activeFilter === "todos" ? true : service.status === activeFilter
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "pendiente":
        return "#FFA500";
      case "en-curso":
        return "#4CAF50";
      case "completada":
        return "#2196F3";
      default:
        return "#666";
    }
  };

  const getStatusBackgroundColor = (status) => {
    switch (status) {
      case "pendiente":
        return "#FFA500";
      case "en-curso":
        return "#4CAF50";
      case "completada":
        return "#2196F3";
      default:
        return "#666";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pendiente":
        return "Pendiente";
      case "en-curso":
        return "En curso";
      case "completada":
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
                Aquí está{"\n"}la lista de servicios
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

      {/* Service Cards */}
      <Animated.ScrollView
        style={[styles.cardContainer, { opacity: fadeAnim }]}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {filteredServices.map((service, index) => (
          <TouchableOpacity
            key={service.id}
            onPress={() => {
              setSelectedService(service);
              setShowModal(true);
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
                <Text style={styles.cardTitle}>{service.title}</Text>
                <View style={styles.statusContainer}>
                  <View
                    style={[
                      styles.statusDot,
                      { backgroundColor: getStatusColor(service.status) },
                    ]}
                  />
                  <Text style={styles.statusText}>
                    {getStatusText(service.status)}
                  </Text>
                </View>
              </View>
              <Text style={styles.cardDescription}>{service.description}</Text>
            </Animated.View>
          </TouchableOpacity>
        ))}
      </Animated.ScrollView>

      <ServiceModal />
    </SafeAreaView>
  );
}
