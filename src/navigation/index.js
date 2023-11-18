import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../components/CustomDrawer';
import Detail from '../pages/Detail';
import HomePage from '../pages/HomePage';
import SplashScreen from '../pages/SplashScreen';
import { useFonts } from 'expo-font';
import { Text } from 'react-native';
import Maps from '../pages/Maps';
import Tafsir from '../pages/Tafsir';
import CustomHeader from '../components/atoms/CustomHeader';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Doa from '../pages/Doa';
import Dzikir from '../pages/Dzikir';

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const MainApp = () => {
  let [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return <Text>Loading fonts</Text>;
  }
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Homepage"
        component={HomePage}
        options={{ headerShown: false }}
      />
      <Drawer.Screen name="Maps" component={Maps} />
      <Drawer.Screen name="Doa - Doa" component={Doa} />
      <Drawer.Screen name="Dzikir" component={Dzikir} />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          header: ({ navigation }) => (
            <CustomHeader
              title="Profile"
              onBack={() => navigation.goBack()}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          header: ({ navigation }) => (
            <CustomHeader
              title="Detail Surah"
              onBack={() => navigation.goBack()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Tafsir"
        component={Tafsir}
        options={{
          header: ({ navigation }) => (
            <CustomHeader
              title="Tafsir Ayat"
              onBack={() => navigation.goBack()}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default Router;
