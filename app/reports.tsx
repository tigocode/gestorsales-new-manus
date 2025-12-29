import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Stack, useRouter } from 'expo-router';
import { Bot, ChevronLeft, Sparkles, User } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function ReportsScreen() {
  const router = useRouter();
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  // Simulação de IA
  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setResult("Atenção à taxa de faltas de 8% nesta semana. A maioria ocorreu em horários da manhã. Sugiro confirmar via WhatsApp 2h antes.");
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <View className="flex-1 bg-slate-50">
      <Stack.Screen options={{ headerShown: false }} />
      
      <View className="pt-14 px-6 pb-4 bg-white border-b border-slate-100 flex-row items-center gap-4">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 -ml-2 rounded-full items-center justify-center active:bg-slate-50">
          <ChevronLeft size={24} color="#475569" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-slate-900">Relatórios</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24 }}>
        
        {/* Gráfico de Performance */}
        <Text className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Performance da Agenda</Text>
        <Card className="p-6 mb-6">
          <View className="flex-row items-center justify-between mb-6">
             {/* Donut Chart Simplificado (apenas visual) */}
             <View className="w-32 h-32 items-center justify-center border-[10px] border-emerald-500 rounded-full relative">
                <View className="absolute w-full h-full border-[10px] border-slate-100 rounded-full opacity-30" />
                <View className="items-center">
                  <Text className="text-3xl font-bold text-slate-800">92%</Text>
                  <Text className="text-[10px] text-slate-400 font-bold uppercase">Atendidos</Text>
                </View>
             </View>

             <View className="flex-1 pl-6 gap-3">
                <LegendItem color="bg-blue-500" label="Agendados" value="50" />
                <LegendItem color="bg-emerald-500" label="Atendidos" value="46" />
                <LegendItem color="bg-red-400" label="Faltas" value="4" />
             </View>
          </View>
          
          <View className="flex-row gap-2 p-3 bg-slate-50 rounded-xl items-center">
             <View className="p-1 bg-white rounded-lg shadow-sm">
               <User size={16} color="#059669"/>
             </View>
             <Text className="text-xs text-slate-600 flex-1">
               <Text className="font-bold text-emerald-600">5 novos pacientes</Text> esta semana.
             </Text>
          </View>
        </Card>

        {/* Gráfico de Barras Financeiro */}
        <Text className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Faturamento</Text>
        <Card className="p-6 mb-8">
          <View className="flex-row items-end justify-between mb-6">
            <View>
              <Text className="text-sm text-slate-500 font-medium">Receita Semanal</Text>
              <Text className="text-2xl font-bold text-slate-900">R$ 5.543,00</Text>
            </View>
            <View className="px-2 py-1 bg-green-100 rounded-lg">
              <Text className="text-xs font-bold text-green-700">+15%</Text>
            </View>
          </View>
          
          <View className="h-40 flex-row items-end justify-between gap-2">
            {[35, 55, 40, 70, 45, 90, 65].map((h, i) => (
              <View key={i} className="flex-1 items-center gap-2">
                <Animated.View 
                  entering={FadeInDown.delay(i * 100).springify()}
                  style={{ height: `${h}%` }}
                  className="w-full bg-blue-500 rounded-t-lg opacity-90"
                />
              </View>
            ))}
          </View>
          <View className="flex-row justify-between mt-2">
            {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => (
               <Text key={i} className="text-[10px] text-slate-400 font-bold w-6 text-center">{d}</Text>
            ))}
          </View>
        </Card>

        {/* AI Button */}
        <View>
          {!result && (
            <Button 
              variant="ai" 
              onPress={handleAnalyze} 
              loading={analyzing}
              icon={analyzing ? undefined : Sparkles}
            >
              {analyzing ? "Analisando Dados..." : "Gerar Insights com IA"}
            </Button>
          )}

          {result && (
            <Animated.View entering={FadeInUp} className="bg-white rounded-2xl p-6 border-l-4 border-purple-500 shadow-sm">
              <View className="flex-row items-center gap-2 mb-3">
                <View className="p-1.5 bg-purple-100 rounded-lg">
                  <Bot size={20} color="#9333EA" />
                </View>
                <Text className="font-bold text-slate-800">Consultor Virtual</Text>
              </View>
              <Text className="text-slate-600 text-sm leading-relaxed">{result}</Text>
              <TouchableOpacity onPress={() => setResult(null)}>
                <Text className="mt-4 text-xs font-bold text-purple-600 uppercase tracking-wide">Gerar Nova Análise</Text>
              </TouchableOpacity>
            </Animated.View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const LegendItem = ({ color, label, value }: any) => (
  <View className="flex-row justify-between items-center w-full">
     <View className="flex-row items-center gap-2">
       <View className={`w-2 h-2 rounded-full ${color}`} />
       <Text className="text-sm text-slate-600">{label}</Text>
     </View>
     <Text className="font-bold text-slate-800">{value}</Text>
  </View>
);