import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Stack, useRouter } from 'expo-router';
import { Activity, Calendar, CheckCircle2, ChevronLeft, Clock, MapPin, Search, Sparkles } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function AgendaAddScreen() {
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
      
      <View className="pt-14 px-6 pb-4 bg-white border-b border-slate-100 flex-row items-center gap-4">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 -ml-2 rounded-full items-center justify-center active:bg-slate-50">
          <ChevronLeft size={24} color="#475569" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-slate-900">Agendar</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Input label="Paciente" placeholder="Buscar paciente..." icon={Search} />
        
        <View className="flex-row gap-4">
           <View className="flex-1">
             <Input label="Data" placeholder="DD/MM" icon={Calendar} />
           </View>
           <View className="flex-1">
             <Input label="Horário" placeholder="00:00" icon={Clock} />
           </View>
        </View>

        <Input label="Tipo de Atendimento" placeholder="Presencial, Online..." icon={MapPin} />
        <Input label="Procedimento" placeholder="Consulta, Retorno..." icon={Activity} />
        
        {/* Sugestão IA */}
        <View className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-6">
          <View className="flex-row items-center gap-2 mb-2">
            <Sparkles size={16} color="#1E40AF" />
            <Text className="text-sm font-bold text-blue-800">Sugestão da IA</Text>
          </View>
          <Text className="text-xs text-blue-600 leading-5">
            O horário das 14:00 costuma ter menos cancelamentos para este perfil de paciente.
          </Text>
        </View>

        <Button onPress={handleSave} loading={loading} icon={loading ? undefined : CheckCircle2}>
          {loading ? 'Agendando...' : 'Confirmar Agendamento'}
        </Button>
      </ScrollView>
    </View>
  );
}