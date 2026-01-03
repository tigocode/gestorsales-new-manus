import { Button } from '@/components/ui/Button';
import { ConfirmModal } from '@/components/ui/ConfirmModal'; // <--- Importe o Modal
import { Input } from '@/components/ui/Input';
import { Stack, useRouter } from 'expo-router';
import { ChevronLeft, Edit3, LogOut, MessageCircle, Package, Save, Smartphone, User } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  
  // Estados para controlar os Modais
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  const [userData, setUserData] = useState({
    company: 'Clínica Bem Estar',
    name: 'Dr. Tiago',
    phone: '(11) 99999-9999',
    email: 'tiago@clinica.com',
  });

  const handleChange = (field: string, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveConfirm = () => {
    // Lógica real de salvar
    setIsEditing(false);
    // Aqui você poderia mostrar um "Toast" ou outro feedback de sucesso
  };

  const handleLogoutConfirm = () => {
    router.replace('/'); 
  };

  const ReadOnlyField = ({ icon: Icon, value, label }: any) => (
    <View className="mb-4">
      <Text className="text-sm font-bold text-slate-700 ml-1 mb-2">{label}</Text>
      <View className="w-full h-14 flex-row items-center bg-white border border-slate-200 rounded-2xl px-4">
        <View className="mr-3 w-6 items-center">
          <Icon size={20} color="#94a3b8" />
        </View>
        <Text className="text-slate-800 text-base font-medium">{value}</Text>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-slate-50">
      <Stack.Screen options={{ headerShown: false }} />

      {/* --- MODAIS --- */}
      
      {/* Modal de Logout */}
      <ConfirmModal
        visible={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
        title="Sair da Conta"
        message="Tem certeza que deseja desconectar? Você precisará fazer login novamente."
        confirmText="Sim, Sair"
        variant="danger"
      />

      {/* Modal de Salvar */}
      <ConfirmModal
        visible={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onConfirm={handleSaveConfirm}
        title="Salvar Alterações"
        message="Os dados do seu perfil serão atualizados. Deseja confirmar?"
        confirmText="Salvar Dados"
        variant="primary"
      />


      {/* --- CONTEÚDO DA TELA --- */}

      <View className="pt-14 px-6 pb-4 bg-white border-b border-slate-100 flex-row items-center justify-between">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity 
            onPress={() => router.back()} 
            className="w-10 h-10 -ml-2 rounded-full items-center justify-center active:bg-slate-50"
          >
            <ChevronLeft size={24} color="#475569" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-slate-900">Meu Perfil</Text>
        </View>
        
        {!isEditing && (
          <TouchableOpacity 
            onPress={() => setIsEditing(true)} 
            className="w-10 h-10 rounded-full bg-blue-50 items-center justify-center"
          >
            <Edit3 size={20} color="#2563EB" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
        
        <View className="items-center mb-8">
          <View className="relative">
            <View className="w-28 h-28 bg-blue-100 rounded-full items-center justify-center border-4 border-white shadow-sm">
              <Text className="text-4xl font-bold text-blue-600">DT</Text>
            </View>
          </View>
          <Text className="text-2xl font-bold text-slate-900 mt-4">{userData.name}</Text>
          <Text className="text-slate-500 text-sm font-medium">{userData.company}</Text>
        </View>

        <View className="mb-4">
          {isEditing ? (
            <>
              <Input 
                label="Nome da Empresa"
                value={userData.company} 
                onChangeText={(t) => handleChange('company', t)} 
                icon={Package} 
              />
              <Input 
                label="Nome Completo"
                value={userData.name} 
                onChangeText={(t) => handleChange('name', t)} 
                icon={User} 
              />
              <Input 
                label="Telefone"
                value={userData.phone} 
                onChangeText={(t) => handleChange('phone', t)} 
                icon={Smartphone} 
                keyboardType="phone-pad"
              />
              <Input 
                label="E-mail"
                value={userData.email} 
                onChangeText={(t) => handleChange('email', t)} 
                icon={MessageCircle} 
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </>
          ) : (
            <>
              <ReadOnlyField label="Nome da Empresa" value={userData.company} icon={Package} />
              <ReadOnlyField label="Nome Completo" value={userData.name} icon={User} />
              <ReadOnlyField label="Telefone" value={userData.phone} icon={Smartphone} />
              <ReadOnlyField label="E-mail" value={userData.email} icon={MessageCircle} />
            </>
          )}
        </View>

        <View>
          {isEditing ? (
            <Button onPress={() => setShowSaveModal(true)} icon={Save}>
              Salvar Alterações
            </Button>
          ) : (
            <Button 
              onPress={() => setShowLogoutModal(true)} 
              variant="danger" 
              icon={LogOut}
            >
              Sair da Conta
            </Button>
          )}
        </View>

      </ScrollView>
    </View>
  );
}