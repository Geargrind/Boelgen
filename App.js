// App.js
import React, { useEffect } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import WebViewScreen from "./screens/WebViewScreen";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Linking } from "react-native";

// Konfigurer notifikationshåndtering
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const App = () => {
  useEffect(() => {
    const setupNotifications = async () => {
      // Få tilladelse til notifikationer
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") return;

      // Annuller alle eksisterende notifikationer
      await Notifications.cancelAllScheduledNotificationsAsync();

      // Planlæg ny notifikation om 30 dage
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Hold dig opdateret! 🌊",
          body: "Tjek de nyeste arrangementer på Bølgens program!",
        },
        trigger: {
          seconds: 30 * 24 * 60 * 60, // 30 dage i sekunder
        },
      });
    };

    // Kør opsætning ved appstart
    setupNotifications();
  }, []);

  const handleDeepLink = (url) => {
    if (url.includes("boelgenapp://events")) {
      navigateToEvent(url.split("/").pop());
    }
  };

  useEffect(() => {
    const subscription = Linking.addEventListener("url", ({ url }) =>
      handleDeepLink(url)
    );
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <WebViewScreen />
    </SafeAreaView>
  );
};

export default App;
