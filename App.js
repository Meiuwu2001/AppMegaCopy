import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import { AuthProvider, AuthContext } from "./src/context/UsuarioContext";
import Dashboard from "./src/screens/dashboard";
import Profile from "./src/screens/profile";
import ContactInfo from "./src/screens/contactInfo";
import ReporteForm from "./src/screens/reporte-form";
import Login from "./src/screens/login";
import Toast from "react-native-toast-message";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  const { authState } = useContext(AuthContext);
  const { rol } = authState;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Inicio") {
            iconName = "home";
          } else if (route.name === "Perfil") {
            iconName = "user";
          } else if (route.name === "Reportar") {
            iconName = "file-text";
          } else if (route.name === "Contacto") {
            iconName = "book";
          }
          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#083992",
        tabBarInactiveTintColor: "#666",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Inicio" component={Dashboard} />

      {rol !== "tecnico" && (
        <Tab.Screen name="Reportar" component={ReporteForm} />
      )}
      <Tab.Screen name="Perfil" component={Profile} />
      <Tab.Screen name="Contacto" component={ContactInfo} />
    </Tab.Navigator>
  );
}

function AppContent() {
  const { authState, loading } = useContext(AuthContext); // Desestructurar loading

  if (loading) {
    return <LoadingScreen />; // Mostrar pantalla de carga mientras validas el token
  }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!authState.token ? (
          <Stack.Screen name="Login" component={Login} />
        ) : (
          <Stack.Screen name="MainApp" component={TabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
      <Toast />
    </AuthProvider>
  );
}
