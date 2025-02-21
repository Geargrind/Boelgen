import React, { useState, useRef } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons"; // Tilføj denne linje

const WebViewScreen = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const webViewRef = useRef(null);

  return (
    <View style={styles.container}>
      {/* Tilføj header her */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => webViewRef.current?.goBack()}
          style={styles.button}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => webViewRef.current?.reload()}
          style={styles.button}
        >
          <Ionicons name="refresh" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {error ? (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>
            Kunne ikke indlæse siden. Prøv igen senere.
          </Text>
        </View>
      ) : (
        <>
          {loading && (
            <View style={styles.centerContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}

          <WebView
            ref={webViewRef}
            source={{ uri: "https://www.boelgen.dk" }}
            style={styles.webview}
            onLoadStart={() => {
              setLoading(true);
              setError(false);
            }}
            onLoadEnd={() => setLoading(false)}
            onError={() => setError(true)}
            onHttpError={() => setError(true)}
            startInLoadingState={false}
            pullToRefreshEnabled={true}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
    marginTop: 50, // Tilføj plads til headeren
  },
  header: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  button: {
    padding: 10,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    padding: 20,
  },
});

export default WebViewScreen;
