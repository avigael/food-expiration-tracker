import React, { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import HomeScreen from "./src/screens/HomeScreen";
import MenuScreen from "./src/screens/MenuScreen";
import EditScreen from "./src/screens/EditScreen";
import CreateScreen from "./src/screens/CreateScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import configureStore from "./src/redux/store";

const getFonts = () =>
  Font.loadAsync({
    MenloBold: require("./src/assets/fonts/Menlo-Bold.ttf"),
  });

const Stack = createStackNavigator();
const store = configureStore();

function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Create" component={CreateScreen} />
            <Stack.Screen name="Edit" component={EditScreen} />
            <Stack.Screen name="Menu" component={MenuScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={console.warn}
      />
    );
  }
}

export default App;
