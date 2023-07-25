import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';  // import LoginScreen component
import MainScreen from './screens/MainScreen';  // import MainScreen component
import ApprenticePlacement from './screens/ApprenticePlacement';  // import ApprenticePlacement component

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{
        gestureEnabled: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ApprenticePlacement" component={ApprenticePlacement} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
