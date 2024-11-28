import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00205B",
    paddingTop: 30,
  },
  contentContainer: {
    paddingBottom: 10,
  },
  contentContainer2: {
    flex: 1,
    justifyContent: "center", // Centrado vertical
    alignItems: "center", // Centrado horizontal
  },
  header: {
    padding: 20,
  },
  header2: {
    padding: 300,
    position: "absolute",
    backgroundColor: "#00205B",
    borderRadius: 220,
    margin: "auto",
    top: -170,
    zIndex: 1,
  },
  logoContainer: {
    alignItems: "center",
  },
  logoContainer2: {
    flexDirection: "row",
    justifyContent: "center", // Centrado horizontal
    alignItems: "center", // Asegura el logo centrado
    width: "100%",
  },
  logo: {
    width: 90,
    height: 90,
  },
  logo2: {
    width: 170,
    height: 170,
    zIndex: 10,
    margin: "auto",
    marginBottom: -20,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTextContainer: {
    flex: 1,
  },
  greeting: {
    color: "#fff",
    fontSize: 16,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  profileContainer: {
    overflow: "hidden",
    marginLeft: 15,
  },
  profilePic: {
    width: "100%",
    height: "100%",
  },
  filterWrapper: {
    marginBottom: 0,
  },
  filterContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    display: "flex",
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "transparent",
    height: 36,
  },
  filterButtonActive: {
    backgroundColor: "#fff",
  },
  filterText: {
    color: "#fff",
    fontSize: 14,
  },
  filterTextActive: {
    color: "#00205B",
  },
  cardContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 0,
    zIndex: 1,
  },
  cardContainer2: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
    marginTop: 0,
    gap: 0,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 5,
  },
  statusText: {
    fontSize: 12,
    color: "#666",
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    paddingTop: 25,
    width: "90%",
    maxHeight: "95%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  reporterInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalProfilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  reporterName: {
    fontSize: 16,
    fontWeight: "500",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    position: "absolute",
    top: -10,
    right: 0,
  },
  statusBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
  serviceInfo: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start", // Asegura la alineación superior
    marginBottom: 10,
  },
  commentField: {
    flex: 1, // Permite que el texto se ajuste automáticamente
    marginLeft: 10,
  },
  commentFieldRight: {
    flex: 1,
    alignItems: "flex-end", // Todo el contenido se alinea a la derecha
  },
  serviceDepartment: {
    fontSize: 18,
    fontWeight: "bold",
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#444b66",
  },
  serviceEquipment: {
    fontSize: 16,
    color: "#666",
    textAlign: "right", // Alinear el texto a la derecha
    flex: 1, // Ocupar espacio disponible si hay más elementos en la fila
  },

  departmentLabel: {
    fontSize: 14,
    color: "#666",
  },
  commentSection: {
    marginBottom: 20,
  },
  commentLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  equipmentLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#444",
  },
  commentText: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },
  timeSection: {
    marginBottom: 20,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  timeLabel: {
    fontSize: 14,
    color: "#666",
  },
  timeValue: {
    fontSize: 14,
    fontWeight: "500",
  },
  actionButton: {
    backgroundColor: "#2d57d1",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  startButton: {
    backgroundColor: "#f1a71b",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  completeButton: {
    backgroundColor: "#35b440",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  closeButton: {
    backgroundColor: "#666",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: "#ed1926",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },

  actionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    margin: "auto",
  },
  technicianSelect: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
  },
  technicianSelectTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
  },
  technicianOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  technicianName: {
    fontSize: 14,
    color: "#444",
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: "#333",
  },
  input2: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
  },
  textArea: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: "#333",
    height: 100, // Altura ajustada para un textArea
    textAlignVertical: "top", // Alineación del texto al inicio
  },
  cardLarge: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 25,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignSelf: "center", // Asegura que la tarjeta esté centrada
    zIndex: 2,
    minWidth: 310,
  },
  titleLarge: {
    color: "#333",
    fontSize: 15,
    fontWeight: "bold",
  },
  greetingLarge: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 10,
    color: "#444b66",
  },
  dateTextLarge: {
    color: "#666",
    fontSize: 14,
    marginBottom: 5,
  },
  closeBtn: {
    display: "flex",
    margin: "auto",
    marginBottom: 5,
    justifyContent: "center",
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: "#262b3e",
  },
  inputContainer: {
    marginBottom: 16,
  },
  selectButton: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectButtonText: {
    color: "#333",
    fontSize: 16,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: "auto",
    marginBottom: "auto",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  modalItem: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginRight: 5,
    marginLeft: 5,
  },
  modalItemText: {
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
  technicianContainer: {
    flexDirection: "column",
  },
  icon: {
    marginRight: 10,
    backgroundColor: "#2d57d1",
    padding: 10,
    borderRadius: 25,
  },
  icon2: {
    backgroundColor: "#00205B",
    borderRadius: 25,
  },
  statusIcon: {
    marginRight: 3,
    backgroundColor: "#ffe9f3",
    borderRadius: 10,
  },
  statusIcon2: {
    marginRight: 3,
    backgroundColor: "#fff7e2",
    borderRadius: 10,
  },
  statusIcon3: {
    marginRight: 3,
    backgroundColor: "#e1fff8",
    borderRadius: 10,
  },
  refreshIndicator: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  confirmationModal: {
    display: "flex",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  confirmationText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    margin: "auto",
  },
  confirmationButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    margin: "auto",
  },
  confirmButton: {
    backgroundColor: "#35b440",
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#ed1926",
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignItems: "center",
  },
  noReportsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    padding: 20,
  },
  noReportsText: {
    marginTop: 15,
    fontSize: 18,
    color: "#666",
    textAlign: "center",
  },
});
