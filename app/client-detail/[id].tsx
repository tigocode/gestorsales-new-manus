import { Button } from '@/components/ui/Button';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Calendar, ChevronLeft, Copy, FileText, Send, Sparkles } from 'lucide-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';

// Simulando dados baseados no ID (na vida real viria de uma API)
const mockData: any = {
  1: { name: 'Alex Batista', phone: '(11) 99999-9999', avatar: 'AB' },
  2: { name: 'Eduarda Maria', phone: '(11) 98888-8888', avatar: 'EM' },
  // fallback
  default: { name: 'Cliente Visitante', phone: '(00) 00000-0000', avatar: 'CV' }
};

export default function ClientDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const client = mockData[Number(id)] || mockData.default;

  const [activeTab, setActiveTab] = useState('Confirmação');
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiMessage, setAiMessage] = useState('');

  const generateMessage = (topic: string) => {
    setActiveTab(topic);
    setLoadingAI(true);
    setAiMessage('');
    
    // Simula delay da IA
    setTimeout(() => {
      const messages: any = {
        'Confirmação': `Olá ${client.name}! 👋\n\nAqui é da Clínica Bem Estar. Passando para confirmar sua consulta amanhã. Podemos confirmar?`,
        'Cobrança': `Oi ${client.name}, tudo bem?\n\nIdentificamos uma pendência referente à sua última visita. Segue o código PIX para regularização.`,
        'Aniversário': `Parabéns ${client.name}! 🎉\n\nDesejamos muitas felicidades e saúde neste dia especial. Aproveite 10% de desconto na próxima consulta!`
      };
      setAiMessage(messages[topic]);
      setLoadingAI(false);
    }, 1500);
  };

  return (
    <View className="flex-1 bg-slate-50">
      <Stack.Screen options={{ headerShown: false }} />
      
      <View className="pt-14 px-6 pb-4 bg-white border-b border-slate-100 flex-row items-center gap-4">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 -ml-2 rounded-full items-center justify-center active:bg-slate-50">
          <ChevronLeft size={24} color="#475569" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-slate-900">Detalhes</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24 }}>
        {/* Profile Header */}
        <View className="items-center mb-8">
          <View className="w-24 h-24 bg-blue-100 rounded-full items-center justify-center border-4 border-white shadow-sm mb-4">
            <Text className="text-3xl font-bold text-blue-600">{client.avatar}</Text>
          </View>
          <Text className="text-2xl font-bold text-slate-900">{client.name}</Text>
          <Text className="text-slate-500">{client.phone}</Text>
        </View>

        {/* AI Section */}
        <View className="bg-white rounded-3xl overflow-hidden border border-purple-100 shadow-sm mb-6">
          <View className="bg-purple-50 p-4 border-b border-purple-100 flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Sparkles size={18} color="#9333EA" />
              <Text className="font-bold text-purple-900 text-sm">Assistente Inteligente</Text>
            </View>
            <View className="bg-white px-2 py-1 rounded-full">
               <Text className="text-[10px] font-bold text-purple-500 uppercase">Gemini AI</Text>
            </View>
          </View>

          <View className="p-4">
            <Text className="text-xs text-slate-500 mb-4 font-medium">Gerar mensagem automática:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-2 mb-4">
              {['Confirmação', 'Cobrança', 'Aniversário'].map(topic => (
                <TouchableOpacity
                  key={topic}
                  onPress={() => generateMessage(topic)}
                  className={`px-3 py-1.5 rounded-lg border ${activeTab === topic ? 'bg-purple-600 border-purple-600' : 'bg-slate-50 border-slate-200'}`}
                >
                  <Text className={`text-xs font-bold ${activeTab === topic ? 'text-white' : 'text-slate-600'}`}>
                    {topic}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View className="bg-slate-50 rounded-xl border border-slate-100 min-h-[100px] p-3 justify-center">
               {loadingAI ? (
                 <View className="flex-row items-center justify-center gap-2">
                   <ActivityIndicator color="#9333EA" />
                   <Text className="text-xs font-bold text-purple-600">Escrevendo...</Text>
                 </View>
               ) : (
                 <View>
                    <Text className="text-sm text-slate-700 leading-relaxed">
                      {aiMessage || "Selecione um tópico acima para gerar..."}
                    </Text>
                    {aiMessage !== '' && (
                      <View className="flex-row gap-2 mt-3 pt-3 border-t border-slate-200">
                        <TouchableOpacity className="flex-1 py-2 rounded-lg bg-emerald-500 flex-row items-center justify-center gap-2">
                          <Send size={14} color="white" />
                          <Text className="text-white text-xs font-bold">Enviar WhatsApp</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="p-2 rounded-lg bg-white border border-slate-200">
                          <Copy size={16} color="#475569" />
                        </TouchableOpacity>
                      </View>
                    )}
                 </View>
               )}
            </View>
          </View>
        </View>

        <View className="space-y-3">
          <Button variant="secondary" icon={Calendar}>Ver Histórico de Consultas</Button>
          <Button variant="secondary" icon={FileText}>Prontuário Digital</Button>
        </View>
      </ScrollView>
    </View>
  );
}