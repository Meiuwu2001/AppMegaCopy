import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { styles } from "./themes/themes";
import { Feather } from "@expo/vector-icons";

const EquipmentModal = ({ visible, equipos, onSelect, onClose }) => {
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

  // Filtrar equipos solo si hay un término de búsqueda
  const filteredEquipos = searchTerm
    ? equipos.filter((equipo) =>
        (equipo.numeroEquipo || equipo.NumeroEquipo)
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Seleccionar Equipo</Text>

          {/* Input para buscar equipos */}
          <TextInput
            style={styles.input2}
            placeholder="Buscar equipo..."
            value={searchTerm}
            onChangeText={setSearchTerm}
          />

          {/* Lista filtrada de equipos */}
          <FlatList
            data={filteredEquipos}
            keyExtractor={(item) => item.idEquipos.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => onSelect(item)}
              >
                <Text style={styles.modalItemText}>
                  <Feather name="printer" size={24} color="#666" />
                  {"  "}
                  {item.numeroEquipo || item.NumeroEquipo}
                </Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              searchTerm !== "" && (
                <Text style={styles.emptyListText}>
                  No se encontraron equipos
                </Text>
              )
            }
          />

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.actionButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default EquipmentModal;
