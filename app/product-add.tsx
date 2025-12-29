import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Stack, useRouter } from 'expo-router';
import { Box, ChevronLeft, DollarSign, FileText, Filter, Save, Tag } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function ProductAddScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.back();
    }, 1000);
  };

  return (
    <View className="flex-1 bg-slate-50">
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Header Customizado */}
      <View className="pt-14 px-6 pb-4 bg-white border-b border-slate-100 flex-row items-center gap-4">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 -ml-2 rounded-full items-center justify-center active:bg-slate-50">
          <ChevronLeft size={24} color="#475569" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-slate-900">Novo Item</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Input label="Nome do Item" placeholder="Ex: Consulta Padrão" icon={Tag} />
        
        <View className="flex-row gap-4">
          <View className="flex-1">
            <Input label="Preço (R$)" placeholder="0,00" icon={DollarSign} keyboardType="numeric" />
          </View>
          <View className="flex-1">
            <Input label="Estoque" placeholder="0" icon={Box} keyboardType="numeric" />
          </View>
        </View>

        <Input label="Categoria" placeholder="Serviço, Produto, Exame..." icon={Filter} />
        <Input label="Descrição Opcional" placeholder="Detalhes do item..." icon={FileText} multiline numberOfLines={3} style={{ height: 100, textAlignVertical: 'top' }} />

        <View className="mt-4">
          <Button onPress={handleSave} loading={loading} icon={loading ? undefined : Save}>
            {loading ? 'Salvando...' : 'Salvar Item'}
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}