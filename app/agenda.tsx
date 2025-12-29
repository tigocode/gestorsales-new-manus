import { Card } from '@/components/ui/Card';
import { Stack, useRouter } from 'expo-router';
import { ChevronLeft, Plus } from 'lucide-react-native';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const appointments = [
  { id: 1, time: '09:00', patient: 'Victor Araujo', type: 'Particular', mode: 'Online' },
  { id: 2, time: '12:00', patient: 'Hugo Pontes', type: 'Convênio', mode: 'Presencial' },
  { id: 3, time: '14:00', patient: 'Natália Silva', type: 'Convênio', mode: 'Presencial' },
  { id: 4, time: '16:30', patient: 'Amanda Costa', type: 'Particular', mode: 'Online' },
];

export default function AgendaScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-slate-50">
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Header com Botão de Adicionar */}
      <View className="pt-14 px-6 pb-4 bg-white border-b border-slate-100 flex-row items-center justify-between">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 -ml-2 rounded-full items-center justify-center active:bg-slate-50">
            <ChevronLeft size={24} color="#475569" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-slate-900">Agenda</Text>
        </View>
        <TouchableOpacity 
          onPress={() => router.push('/agenda-add')}
          className="w-10 h-10 bg-blue-600 rounded-full items-center justify-center shadow-md shadow-blue-500/30"
        >
          <Plus size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Calendário Strip (Horizontal) */}
      <View className="bg-white pb-4 shadow-sm border-b border-slate-100 mb-2">
        <View className="flex-row justify-between items-center px-4 mb-4 pt-2">
          <Text className="font-bold text-slate-700">Dezembro, 2025</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
          {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, idx) => (
            <TouchableOpacity 
              key={idx} 
              className={`items-center justify-center gap-1 w-12 h-16 mr-2 rounded-2xl ${idx === 2 ? 'bg-blue-600 shadow-md shadow-blue-200' : 'bg-slate-50'}`}
            >
              <Text className={`text-[10px] font-bold ${idx === 2 ? 'text-white' : 'text-slate-400'}`}>{day}</Text>
              <Text className={`text-base font-bold ${idx === 2 ? 'text-white' : 'text-slate-700'}`}>{19 + idx}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Lista de Horários */}
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
        <Text className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-4">Hoje</Text>
        {appointments.map((apt, index) => (
          <View key={apt.id} className="flex-row gap-4 mb-4">
            <View className="items-center pt-1 w-12">
              <Text className="font-bold text-slate-700">{apt.time}</Text>
              {index !== appointments.length - 1 && (
                <View className="w-0.5 flex-1 bg-slate-200 mt-2 mb-2 relative rounded-full" />
              )}
            </View>
            <Card className={`flex-1 ${index === 0 ? 'border-l-4 border-l-blue-500' : ''}`}>
              <View className="flex-row justify-between items-start">
                <View>
                  <Text className="font-bold text-slate-800 text-base">{apt.patient}</Text>
                  <Text className="text-sm text-slate-500 mt-0.5">{apt.type}</Text>
                </View>
                <View className={`px-2 py-1 rounded-md ${apt.mode === 'Online' ? 'bg-purple-100' : 'bg-blue-100'}`}>
                  <Text className={`text-[10px] font-bold uppercase ${apt.mode === 'Online' ? 'text-purple-700' : 'text-blue-700'}`}>
                    {apt.mode}
                  </Text>
                </View>
              </View>
            </Card>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}