import { NavigationContainer } from '@react-navigation/native';
import Router from './src/navigation';
import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { useRef } from 'react';
import { ApolloProvider } from '@apollo/client';
import { GraphQlClient } from './src/utils/Graph';

export default function App() {
  const toastRef = useRef(null);
  return (
    <ApolloProvider client={GraphQlClient}>
      <NavigationContainer>
        <Router />
        <Toast />
      </NavigationContainer>
    </ApolloProvider>
  );
}
