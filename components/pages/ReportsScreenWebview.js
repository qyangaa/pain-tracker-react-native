import React from "react";
import { View, Text } from "react-native";
import { WebView } from "react-native-webview";

export default function ReportsScreenWebview({ screenWidth, screenHeight }) {
  return (
    <WebView
      source={{ uri: "http://10.0.2.2:3000/" }}
      style={{ marginTop: 20, width: screenWidth, height: screenHeight }}
    />
  );
}
