import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import AddOutfitScreen from "./screens/AddOutfitScreen";
import MapScreen from "./screens/MapScreen";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Add Outfit" component={AddOutfitScreen} />
          <Stack.Screen name="Mapa" component={MapScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
