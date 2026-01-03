import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Stack, useRouter } from 'expo-router';
import { ArrowRight, ChevronLeft, MessageCircle, Package, Smartphone, User } from 'lucide-react-native';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function RegisterScreen() {
  const router = useRouter();

  const handleRegister = () => {
    // Aqui viria a lógica de criar conta no banco de dados
    // Por enquanto, vamos direto para a Home
    router.replace('/(tabs)');
  };

  return (
    <View className="flex-1 bg-white pt-12">
      {/* Esconde o Header padrão do sistema */}
      <Stack.Screen options={{ headerShown: false }} />

      {/* Botão Voltar */}
      <View className="px-6 pb-4">
        <TouchableOpacity 
          onPress={() => router.back()} 
          className="w-10 h-10 rounded-full bg-slate-50 items-center justify-center border border-slate-100"
        >
          <ChevronLeft size={24} color="#64748B" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}>
        <View className="mb-8 mt-2">
          <Text className="text-3xl font-bold text-slate-900 mb-2">Crie sua conta</Text>
          <Text className="text-slate-500 text-lg leading-6">
            Comece a gerenciar sua clínica e vendas hoje mesmo.
          </Text>
        </View>

        {/* Formulário */}
        {/* Como nosso Input já tem margem inferior (mb-4), basta empilhá-los */}
        <View className="mb-4">
          <Input 
            label="Nome da Empresa" 
            placeholder="Ex: Clínica Bem Estar" 
            icon={Package} 
          />
          
          <Input 
            label="Nome Completo" 
            placeholder="Seu nome" 
            icon={User} 
          />
          
          <Input 
            label="Telefone / WhatsApp" 
            placeholder="(00) 00000-0000" 
            icon={Smartphone} 
            keyboardType="phone-pad" 
          />
          
          <Input 
            label="E-mail" 
            placeholder="seu@email.com" 
            icon={MessageCircle} 
            keyboardType="email-address" 
            autoCapitalize="none"
          />
        </View>

        {/* Ação Principal */}
        <Button onPress={handleRegister} icon={ArrowRight}>
          Cadastrar e Entrar
        </Button>

        {/* Rodapé Login */}
        <View className="flex-row justify-center mt-8 mb-4">
          <Text className="text-slate-500">Já tem uma conta? </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-blue-600 font-bold">Fazer Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}