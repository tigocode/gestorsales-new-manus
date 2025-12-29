import { CheckCircle2, LogOut, MessageCircle, QrCode, RefreshCw, Settings, Smartphone, Zap } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button } from '../../components/ui/Button'; // Ajuste o caminho conforme sua estrutura

export default function InstanceScreen() {
  const [status, setStatus] = useState<'connected' | 'disconnected'>('connected');

  return (
    <View className="flex-1 bg-slate-50">
      <View className="pt-14 px-6 pb-4 bg-white border-b border-slate-100 mb-6">
        <Text className="text-2xl font-bold text-slate-900">Conexão WhatsApp</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}>
        {/* Card de Status Principal */}
        <View className="w-full bg-white rounded-3xl p-6 shadow-sm border border-slate-200 mb-6 relative overflow-hidden">
          {/* Barra superior colorida indicando status */}
          <View className={`absolute top-0 left-0 w-full h-1.5 ${status === 'connected' ? 'bg-emerald-500' : 'bg-red-500'}`} />
          
          <View className="items-center text-center mt-2">
            {status === 'connected' ? (
              <>
                 <View className="w-32 h-32 bg-emerald-50 rounded-full items-center justify-center mb-4 relative">
                    <Smartphone size={64} color="#059669" />
                    <View className="absolute bottom-2 right-2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-white items-center justify-center">
                      <CheckCircle2 size={16} color="white" />
                    </View>
                 </View>
                 <Text className="text-xl font-bold text-slate-900">Instância Conectada</Text>
                 <Text className="text-sm text-slate-500 mt-2 mb-6 text-center max-w-[200px]">
                   O número (11) 99999-9999 está pronto para enviar mensagens.
                 </Text>
                 
                 {/* Status Grid */}
                 <View className="flex-row gap-4 w-full">
                    <View className="flex-1 bg-slate-50 rounded-xl p-3 items-center gap-1">
                       <Zap size={20} color="#EAB308" />
                       <Text className="text-xs font-bold text-slate-400 uppercase">Bateria</Text>
                       <Text className="font-bold text-slate-800">82%</Text>
                    </View>
                    <View className="flex-1 bg-slate-50 rounded-xl p-3 items-center gap-1">
                       <MessageCircle size={20} color="#3B82F6" />
                       <Text className="text-xs font-bold text-slate-400 uppercase">Fila</Text>
                       <Text className="font-bold text-slate-800">0 msgs</Text>
                    </View>
                 </View>
              </>
            ) : (
              <View className="py-8 items-center">
                 <QrCode size={180} color="#0f172a" />
                 <Text className="text-sm text-slate-500 mt-6 font-medium">Aguardando leitura do QR Code...</Text>
              </View>
            )}
          </View>
        </View>

        {/* Botões de Ação */}
        <View className="space-y-3">
          <Button variant="secondary" icon={RefreshCw}>Sincronizar Mensagens</Button>
          <Button variant="secondary" icon={Settings}>Configurar Templates</Button>
          
          <Button 
            variant="danger" 
            icon={LogOut} 
            onPress={() => setStatus(status === 'connected' ? 'disconnected' : 'connected')}
          >
            {status === 'connected' ? 'Desconectar Sessão' : 'Cancelar Conexão'}
          </Button>
        </View>

        <Text className="mt-8 text-xs text-slate-400 text-center leading-5">
          Versão do Cliente: 2.24.5.11{'\n'}
          Última sincronização: Hoje às 09:30
        </Text>
      </ScrollView>
    </View>
  );
}