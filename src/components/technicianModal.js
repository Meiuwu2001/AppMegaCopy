import React from "react";
import { View, Text, Modal, FlatList, TouchableOpacity } from "react-native";
import { styles } from "./themes/themes";

const TechnicianModal = ({ visible, tecnicos, onSelect, onClose }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Seleccionar Técnico</Text>
          <FlatList
            data={tecnicos}
            keyExtractor={(item) => item.idTecnicos.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => onSelect(item)}
              >
                <Text style={styles.modalItemText}>
                  {`${item.Nombre} ${item.ApellidoPa}`}
                </Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default TechnicianModal;
