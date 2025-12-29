import { Tabs } from 'expo-router';
import { Home, Package, QrCode, Users } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      headerShown: false,
      tabBarActiveTintColor: '#2563EB', // Blue 600
      tabBarInactiveTintColor: '#94a3b8', // Slate 400
      tabBarStyle: {
        borderTopColor: '#F1F5F9',
        backgroundColor: '#FFFFFF',
        height: 95,
        paddingBottom: 10,
        paddingTop: 10,
      },
      tabBarLabelStyle: {
        fontSize: 10,
        fontWeight: 'bold',
      }
    }}>
      <Tabs.Screen
        name="index" // Isso será a Home
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="products" // Vamos criar esse arquivo depois
        options={{
          title: 'Produtos',
          tabBarIcon: ({ color }) => <Package size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="clients" // Vamos criar esse arquivo depois
        options={{
          title: 'Clientes',
          tabBarIcon: ({ color }) => <Users size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="instance" // Vamos criar esse arquivo depois
        options={{
          title: 'Instância',
          tabBarIcon: ({ color }) => <QrCode size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}