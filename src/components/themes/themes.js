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
  header: {
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: -30,
  },
  logo: {
    width: 90,
    height: 90,
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
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "transparent",
    marginRight: 10,
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
    paddingTop: 20,
    paddingHorizontal: 20,
    marginTop: 0,
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
    width: "90%",
    maxHeight: "80%",
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
    alignItems: "center",
    marginBottom: 5,
  },
  serviceDepartment: {
    fontSize: 18,
    fontWeight: "bold",
  },
  serviceEquipment: {
    fontSize: 16,
    color: "#666",
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
    fontWeight: "500",
    marginBottom: 5,
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
  closeButton: {
    backgroundColor: "#666",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  actionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
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
  textArea: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: "#333",
    height: 150, // Altura ajustada para un textArea
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
  },
  titleLarge: {
    color: "#333",
    fontSize: 15,
    fontWeight: "bold",
  },
  greetingLarge: {
    fontSize: 20,
    marginBottom: 5,
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
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
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
    marginTop: 5,
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
});
