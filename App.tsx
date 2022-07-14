// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TailwindProvider} from 'tailwindcss-react-native';

import HomeScreen from './src/screens/home_screen';
import LuanchCompareScreen from './src/screens/launch_compare_screen';
import LuanchScreen from './src/screens/launch_screen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <TailwindProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Launch" component={LuanchScreen} />
          <Stack.Screen name="LaunchCompare" component={LuanchCompareScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  );
}

export default App;
