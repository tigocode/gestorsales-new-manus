import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

export default function Layout() {
  return (
    <View className="flex-1">
      <StatusBar style="dark" />
      <Stack 
        screenOptions={{ 
          headerShown: false, // Remove o cabeçalho padrão em todas as telas
          contentStyle: { backgroundColor: '#F8FAFC' } // Cor de fundo global (slate-50)
        }} 
      />
    </View>
  );
}