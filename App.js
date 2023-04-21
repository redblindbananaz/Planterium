import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/Pages/Home';
import ViewPlant from './src/Pages/ViewPlant';
import RegisterPlant from './src/Pages/RegisterPlant';
import Main from './src/Pages/Main';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <StatusBar
        style="light"
        backgroundColor="transparent"
        translucent={true}
      />
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Main">
        <Stack.Screen name="Main" component={Main} />
        {/* <Stack.Screen name="Home" component={Home} /> */}
        <Stack.Screen name="Register" component={RegisterPlant} />
        <Stack.Screen name="View" component={ViewPlant} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
