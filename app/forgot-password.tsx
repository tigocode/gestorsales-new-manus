import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Stack, useRouter } from 'expo-router';
import { ArrowRight, CheckCircle2, ChevronLeft, Mail } from 'lucide-react-native';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    // Simulação de envio
    setSent(true);
  };

  // --- ESTADO DE SUCESSO (LINK ENVIADO) ---
  if (sent) {
    return (
      <View className="flex-1 bg-white justify-center px-6">
        <Stack.Screen options={{ headerShown: false }} />
        
        <View className="items-center">
          <View className="w-24 h-24 bg-green-100 rounded-full items-center justify-center mb-6">
            <CheckCircle2 size={48} color="#10B981" />
          </View>
          <Text className="text-2xl font-bold text-slate-900 mb-2 text-center">Link Enviado!</Text>
          <Text className="text-slate-500 text-center mb-8 text-lg leading-6">
            Verifique sua caixa de entrada ou WhatsApp para redefinir sua senha.
          </Text>
          
          <Button onPress={() => router.back()}>
            Voltar ao Login
          </Button>
        </View>
      </View>
    );
  }

  // --- ESTADO DE FORMULÁRIO ---
  return (
    <View className="flex-1 bg-white pt-12">
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

      <View className="px-6 pt-4">
        <View className="mb-8">
          <Text className="text-3xl font-bold text-slate-900 mb-2">Recuperar Senha</Text>
          <Text className="text-slate-500 text-lg leading-6">
            Informe seu e-mail ou WhatsApp cadastrado para receber o link de redefinição.
          </Text>
        </View>

        <View className="mb-8">
          <Input 
            label="E-mail ou WhatsApp" 
            placeholder="ex: seu@email.com" 
            icon={Mail} 
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <Button onPress={handleSend} icon={ArrowRight}>
          Enviar Link
        </Button>
      </View>
    </View>
  );
}