import React from "react";
import { WebView } from "react-native-webview";

const WebViewScreen = () => {
  return (
    <WebView source={{ uri: "https://www.boelgen.dk" }} style={{ flex: 1 }} />
  );
};

export default WebViewScreen;
