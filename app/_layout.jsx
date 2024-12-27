import { Stack } from 'expo-router';
import Register from './register';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="userPick" options={{ headerShown: false }} />
      <Stack.Screen name="win" options={{ headerShown: false }} />
      <Stack.Screen name="draw" options={{ headerShown: false }} />
      <Stack.Screen name="lose" options={{ headerShown: false }} />
    </Stack>
  );
}
