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

const ClienteModal = ({ visible, clientes, onSelect, onClose }) => {
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

  // Filtrar clientes solo si hay un término de búsqueda
  const filteredClientes = searchTerm
    ? clientes.filter((cliente) =>
        `${cliente.Nombre} ${cliente.ApellidoPa}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Seleccionar Cliente</Text>

          {/* Input para buscar clientes */}
          <TextInput
            style={styles.input2}
            placeholder="Buscar cliente..."
            value={searchTerm}
            onChangeText={setSearchTerm}
          />

          {/* Lista filtrada de clientes */}
          <FlatList
            data={filteredClientes}
            keyExtractor={(item) => item.idClientes.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => onSelect(item)}
              >
                <Text style={styles.modalItemText}>
                  <Feather name="user" size={24} color="#666" />
                  {"  "}
                  {`${item.Nombre} ${item.ApellidoPa}`}
                </Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              searchTerm !== "" && (
                <Text style={styles.emptyListText}>
                  No se encontraron clientes
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

export default ClienteModal;
