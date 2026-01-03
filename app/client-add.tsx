import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Stack, useRouter } from 'expo-router';
import { Calendar, ChevronLeft, Mail, Save, Smartphone, User } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function ClientAddScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.back();
    }, 1500);
  };

  return (
    <View className="flex-1 bg-slate-50">
      {/* 1. Escondemos o header nativo para usar o nosso customizado */}
      <Stack.Screen options={{ headerShown: false }} />

      {/* 2. Nosso Cabeçalho Customizado (Igual ao da Home/Instância) */}
      <View className="pt-14 px-6 pb-4 bg-white border-b border-slate-100 flex-row items-center gap-4">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="w-10 h-10 -ml-2 rounded-full items-center justify-center active:bg-slate-50"
        >
          <ChevronLeft size={24} color="#475569" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-slate-900">Novo Cliente</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Input label="Nome Completo" placeholder="Ex: João Silva" icon={User} />
        <Input label="Telefone / WhatsApp" placeholder="(00) 00000-0000" icon={Smartphone} keyboardType="phone-pad" />
        <Input label="E-mail" placeholder="email@exemplo.com" icon={Mail} keyboardType="email-address" />
        <Input label="Nascimento" placeholder="DD/MM/AAAA" icon={Calendar} />
        <Input label="Convênio" placeholder="Particular, Unimed..." />

        <View className="mt-4">
          <Button 
            onPress={handleSave} 
            loading={loading} 
            icon={loading ? undefined : Save}
          >
            {loading ? 'Salvando...' : 'Cadastrar Cliente'}
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}