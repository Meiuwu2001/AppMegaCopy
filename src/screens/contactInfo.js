import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";

export default function ContactInfo() {
  const handleCopyToClipboard = (text) => {
    Clipboard.setString(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.profileName}>Información de Contacto</Text>
      </View>

      <View style={styles.cardContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Dirección */}
          <TouchableOpacity
            onPress={() =>
              handleCopyToClipboard(
                "AV. 5 DE FEBRERO #1206 BUROCRATA, DURANGO, DURANGO 34279"
              )
            }
          >
            <View style={styles.infoCard}>
              <View style={styles.infoItem}>
                <FontAwesome
                  name="map-marker"
                  size={20}
                  color="#3658bb"
                  style={styles.infoIcon}
                />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Dirección</Text>
                  <Text style={styles.infoText}>
                    AV. 5 DE FEBRERO #1206 BUROCRATA, DURANGO, DURANGO 34279
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          {/* Horarios (no clickeable) */}
          <View style={styles.infoCard}>
            <View style={styles.infoItem}>
              <FontAwesome
                name="clock-o"
                size={20}
                color="#3658bb"
                style={styles.infoIcon}
              />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Horario</Text>
                <Text style={styles.infoText}>Lun - Vie: 09:00 - 19:00</Text>
                <Text style={styles.infoText}>Sábado: 10:00 - 14:00</Text>
                <Text style={styles.infoText}>Domingo: Cerrado</Text>
              </View>
            </View>
          </View>

          {/* Teléfonos */}
          <TouchableOpacity
            onPress={() => handleCopyToClipboard("618-825-3884, 618-825-3885")}
          >
            <View style={styles.infoCard}>
              <View style={styles.infoItem}>
                <FontAwesome
                  name="phone"
                  size={20}
                  color="#3658bb"
                  style={styles.infoIcon}
                />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Teléfonos</Text>
                  <Text style={styles.infoText}>618-825-3884</Text>
                  <Text style={styles.infoText}>618-825-3885</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          {/* Email */}
          <TouchableOpacity
            onPress={() => handleCopyToClipboard("copimegatron@hotmail.com")}
          >
            <View style={styles.infoCard}>
              <View style={styles.infoItem}>
                <FontAwesome
                  name="envelope"
                  size={20}
                  color="#3658bb"
                  style={styles.infoIcon}
                />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Email</Text>
                  <Text style={styles.infoText}>copimegatron@hotmail.com</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00205B",
  },
  header: {
    padding: 20,
    paddingTop: 50,
  },
  profileContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
    textAlign: "center",
  },
  profileRole: {
    fontSize: 16,
    color: "#fff",
    opacity: 0.8,
    marginBottom: 20,
  },
  cardContainer: {
    backgroundColor: "#f5f5f5",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    paddingHorizontal: 20,
    flex: 1,
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  infoIcon: {
    marginRight: 15,
    width: 24,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
  },
  editButton: {
    backgroundColor: "#2d57d1",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  passwordButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  logoutButton: {
    backgroundColor: "#FF4444",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonIcon: {
    marginRight: 10,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
    gap: 10,
  },
  actionButton: {
    backgroundColor: "#2d57d1",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  closeButton: {
    backgroundColor: "#666",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  loadingText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  menuContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 20,
    overflow: "hidden",
  },
  menuButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f4ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  menuButtonText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
});
