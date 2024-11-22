import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  StatusBar,
} from "react-native";
import { styles } from "../components/themes/themes";

const ReporteForm = () => {
  const [department, setDepartment] = useState("");
  const [equipmentNumber, setEquipmentNumber] = useState("");
  const [comment, setComment] = useState("");
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const currentDate = new Date();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const reportData = {
      TituloReporte,
      fechaCreacion: currentDate,
      fechaHoraActualizacion: currentDate,
      estado: "pendiente",
      comentarios,
      creadorReporte,
      tecnicoAsignado,
      idEquipos,
    };

    try {
      const response = await fetch(
        "https://backend-integradora.vercel.app/api/reportes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(reportData),
        }
      );

      if (!response.ok) {
        throw new Error("Error al guardar el reporte");
      }

      closeModal();
    } catch (error) {
      setError(error.message || "Algo salió mal");
      closeModal();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <View
              style={[
                styles.logoContainer,
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 20,
                  width: "100%",
                },
              ]}
            >
              <Image
                source={require("../../assets/logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
              <Image
                source={require("../../assets/brother-logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <View style={styles.headerTextContainer}>
              <Text style={styles.titleLarge}>Realiza tu{"\n"}solicitud</Text>
            </View>
          </View>
        </View>

        <ScrollView
          style={styles.cardContainer}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        >
          <View style={[styles.cardLarge, { margin: 20 }]}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <View>
                <Text style={styles.dateTextLarge}>
                  {new Date().toLocaleDateString()}
                </Text>
                <Text style={styles.greetingLarge}>¡Hola, Carlos!</Text>
              </View>
              <View style={styles.profileContainer}>
                <Image
                  source={require("../../assets/profile.jpg")}
                  style={styles.profilePic}
                />
              </View>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Departamento"
              value={department}
              onChangeText={setDepartment}
            />

            <View style={{ height: 10 }} />

            <TextInput
              style={styles.input}
              placeholder="Numero del Equipo"
              value={equipmentNumber}
              onChangeText={setEquipmentNumber}
            />

            <View style={{ height: 10 }} />

            <TextInput
              style={[
                styles.input,
                {
                  height: 120,
                  textAlignVertical: "top",
                  marginBottom: 20,
                },
              ]}
              placeholder="Comentario"
              multiline={true}
              numberOfLines={4}
              value={comment}
              onChangeText={setComment}
            />

            <TouchableOpacity
              style={{
                backgroundColor: "#4751FF",
                padding: 15,
                borderRadius: 10,
                alignItems: "center",
              }}
              onPress={handleSubmit}
            >
              <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
                Enviar
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ReporteForm;
