import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import WebViewScreen from "./screens/WebViewScreen";

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <WebViewScreen />
    </SafeAreaView>
  );
};

export default App;
