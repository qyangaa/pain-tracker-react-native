import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";
import { ConfigureStore } from "./redux/configureStore";
import { Provider } from "react-redux";

//  Pages
import ScreensContainer from "./components/pages/ScreensContainer";
import OnBoarding from "./components/pages/OnBoarding";
import Authentication from "./components/pages/Authentication";
import AppLoading from "expo-app-loading";

const store = ConfigureStore();

const AuthenticationStack = createStackNavigator();
const AuthenticationNavigator = () => {
  <AuthenticationStack.Navigator>
    <AuthenticationStack.Screen name="OnBoarding" component={OnBoarding} />
  </AuthenticationStack.Navigator>;
};

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <ScreensContainer />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
