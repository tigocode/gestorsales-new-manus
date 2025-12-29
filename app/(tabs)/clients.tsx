import { useRouter } from 'expo-router';
import { ChevronRight, Filter, Plus, Search } from 'lucide-react-native';
import React from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Card } from '../../components/ui/Card';

const mockClients = [
  { id: 1, name: 'Alex Batista', type: 'Particular', status: 'Presencial', phone: '(11) 99999-9999', avatar: 'AB' },
  { id: 2, name: 'Eduarda Maria', type: 'Convênio: Amil', status: 'Online', phone: '(11) 98888-8888', avatar: 'EM' },
  { id: 3, name: 'Hugo Pontes', type: 'Convênio: Unimed', status: 'Presencial', phone: '(21) 97777-7777', avatar: 'HP' },
  { id: 4, name: 'João Claudio', type: 'Particular', status: 'Online', phone: '(31) 96666-6666', avatar: 'JC' },
  { id: 5, name: 'Mariana Silva', type: 'Particular', status: 'Presencial', phone: '(31) 95555-5555', avatar: 'MS' },
];

export default function ClientsScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-slate-50">
      <View className="pt-14 px-6 pb-4 bg-white border-b border-slate-100 z-10">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-2xl font-bold text-slate-900">Meus Clientes</Text>
          <TouchableOpacity 
            onPress={() => router.push('/client-add')}
            className="w-10 h-10 bg-blue-600 rounded-full items-center justify-center shadow-lg shadow-blue-500/30"
          >
            <Plus size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View className="flex-row gap-2">
          <View className="flex-1 relative justify-center">
            <TextInput 
              placeholder="Buscar cliente..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm font-medium"
              placeholderTextColor="#94a3b8"
            />
            <View className="absolute left-3">
              <Search size={18} color="#94a3b8" />
            </View>
          </View>
          <TouchableOpacity className="w-12 items-center justify-center bg-white border border-slate-200 rounded-xl">
            <Filter size={20} color="#64748b" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
        {mockClients.map((client) => (
          <TouchableOpacity 
            key={client.id}
            onPress={() => router.push('/client-detail/' + client.id)}
          >
            <Card className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center gap-4">
                <View className="w-12 h-12 rounded-full bg-slate-100 items-center justify-center border border-slate-200">
                  <Text className="font-bold text-slate-600 text-sm">{client.avatar}</Text>
                </View>
                <View>
                  <Text className="font-bold text-slate-800 text-base">{client.name}</Text>
                  <View className="flex-row gap-2 mt-1">
                    <View className="bg-blue-50 px-2 py-0.5 rounded-md">
                      <Text className="text-[10px] font-bold text-blue-700 uppercase">{client.type.split(':')[0]}</Text>
                    </View>
                    <View className={`px-2 py-0.5 rounded-md ${client.status === 'Online' ? 'bg-purple-50' : 'bg-orange-50'}`}>
                      <Text className={`text-[10px] font-bold uppercase ${client.status === 'Online' ? 'text-purple-700' : 'text-orange-700'}`}>
                        {client.status}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <ChevronRight size={20} color="#cbd5e1" />
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}