import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { AuthContext } from "../context/UsuarioContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Lock, User } from "lucide-react-native";

const Login = ({ navigation }) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const context = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPasswordRecovery, setShowPasswordRecovery] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await fetch(
        "https://backend-integradora.vercel.app/api/auth/iniciar-sesion",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user, password }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        // Almacenar el token en AsyncStorage
        await AsyncStorage.setItem("authToken", data.token);
        context.signIn(user, data.token);
        // Limpiar campos de usuario y contraseña
        setUser("");
        setPassword("");

        // Redirigir al usuario a la pantalla principal

        navigation.reset({
          index: 0,
          routes: [{ name: "MainApp" }],
        });
      } else {
        setErrorMessage(
          "Usuario o contraseña incorrectos.\nInténtalo de nuevo."
        );
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setErrorMessage("Hubo un error al intentar iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            bounces={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.logoContainer}>
              <Image
                source={require("../../assets/logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.title}>Bienvenido</Text>
              <Text style={styles.subtitle}>Inicia sesión con tu cuenta</Text>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Usuario</Text>
                <View style={styles.inputWrapper}>
                  <User
                    size={20}
                    color={user ? "#2044ac" : "#A9A9A9"} // Azul si hay texto, gris si está vacío
                    style={styles.icon}
                  />
                  <TextInput
                    style={styles.inputWithIcon}
                    placeholder="Tu usuario..."
                    value={user}
                    onChangeText={setUser}
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Contraseña</Text>
                <View style={styles.inputWrapper}>
                  <Lock
                    size={20}
                    color={password ? "#2044ac" : "#A9A9A9"} // Azul si hay texto, gris si está vacío
                    style={styles.icon}
                  />
                  <TextInput
                    style={styles.inputWithIcon}
                    placeholder="••••••••"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </View>
              </View>

              <TouchableOpacity onPress={() => setShowPasswordRecovery(true)}>
                <Text style={styles.forgotPassword}>
                  ¿Olvidaste tu contraseña?
                </Text>
              </TouchableOpacity>

              {errorMessage && (
                <Text style={styles.errorMessage}>{errorMessage}</Text>
              )}

              {loading && (
                <Text style={styles.loadingMessage}>
                  Verificando usuario...
                </Text>
              )}

              {showPasswordRecovery && (
                <View style={styles.recoveryContainer}>
                  <Text style={styles.recoveryText}>
                    Puedes contactarte con un administrador para recuperar tu
                    contraseña.
                  </Text>
                  <Text style={styles.recoveryPhone}>
                    Teléfono: 618-825-3884
                  </Text>
                </View>
              )}

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
              >
                <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
              </TouchableOpacity>

              {/* Mostrar botón de huella si está disponible */}
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00205B",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 350,
    height: 250,
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
    minHeight: "70%",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#1e3f7c",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#2044ac",
    marginBottom: 10,
  },

  forgotPassword: {
    color: "#2044ac",
    textAlign: "right",
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: "#4751FF",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fcfcfc",
    borderRadius: 30,
    paddingHorizontal: 10,
    shadowColor: "#a2a2a2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  inputWithIcon: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    color: "#333",
  },
  errorMessage: {
    color: "red",
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  loadingMessage: {
    fontSize: 16,
    color: "#a3a8c1",
    marginTop: 10,
    marginBottom: 20,
    textAlign: "center",
  },
  recoveryContainer: {
    marginBottom: 10,
    backgroundColor: "#fcfcfc",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#a2a2a2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  recoveryText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  recoveryPhone: {
    fontSize: 18,
    color: "#3658bb",
    fontWeight: 600,
  },
});

export default Login;
