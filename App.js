import { NavigationContainer } from '@react-navigation/native';
import Router from './src/navigation';
import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { useRef } from 'react';

export default function App() {
  const toastRef = useRef(null);
  return (
    <NavigationContainer>
      <Router />
      <Toast />
    </NavigationContainer>
  );
}
