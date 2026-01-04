import { useRouter } from 'expo-router';
import { Box, Clock, FileText, Filter, MoreVertical, Plus, Search, User } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Card } from '../../components/ui/Card';

// Dados simulados
const mockProducts = [
  { id: 1, name: 'Consulta Padrão', category: 'Serviço', price: 'R$ 250,00', stock: null, icon: User },
  { id: 2, name: 'Lente Oasys 1-Day', category: 'Produto', price: 'R$ 180,00', stock: 45, icon: Box },
  { id: 3, name: 'Bioimpedância', category: 'Exame', price: 'R$ 100,00', stock: null, icon: FileText },
  { id: 4, name: 'Armação Ray-Ban', category: 'Produto', price: 'R$ 650,00', stock: 12, icon: Box },
  { id: 5, name: 'Retorno', category: 'Serviço', price: 'R$ 0,00', stock: null, icon: Clock },
];

export default function ProductsScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('Todos');

  return (
    <View className="flex-1 bg-slate-50">
      {/* Header Fixo */}
      <View className="pt-14 px-6 pb-4 bg-white border-b border-slate-100 z-10">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-2xl font-bold text-slate-900">Produtos & Serviços</Text>
          <TouchableOpacity 
            onPress={() => router.push('/product-add')} // Faremos a tela de cadastro depois
            className="w-10 h-10 bg-blue-600 rounded-full items-center justify-center shadow-lg shadow-blue-500/30"
          >
            <Plus size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Barra de Busca e Filtro */}
        <View className="flex-row gap-2 mb-4">
          <View className="flex-1 relative justify-center">
            <TextInput 
              placeholder="Buscar item..." 
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

        {/* Filtros Horizontais */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
          {['Todos', 'Serviços', 'Produtos', 'Exames'].flatMap((item) => (
            <TouchableOpacity 
              key={item}
              onPress={() => setActiveFilter(item)}
              className={`px-4 py-2 rounded-lg mr-2 ${activeFilter === item ? 'bg-blue-600' : 'bg-slate-50 border border-slate-200'}`}
            >
              <Text className={`text-xs font-bold ${activeFilter === item ? 'text-white' : 'text-slate-600'}`}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Lista de Produtos */}
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
        {mockProducts.map((product) => (
          <Card key={product.id} className="flex-row items-center justify-between mb-3 border-l-4 border-l-transparent hover:border-l-blue-500">
            <View className="flex-row items-center gap-4">
              <View className={`w-12 h-12 rounded-2xl items-center justify-center ${product.category === 'Produto' ? 'bg-orange-50' : 'bg-blue-50'}`}>
                {/* Renderização condicional do ícone */}
                <product.icon size={24} color={product.category === 'Produto' ? '#EA580C' : '#2563EB'} />
              </View>
              <View>
                <Text className="font-bold text-slate-800 text-base">{product.name}</Text>
                <View className="flex-row items-center gap-2 mt-1">
                  <View className="bg-slate-50 px-2 py-0.5 rounded-md">
                    <Text className="text-[10px] font-bold text-slate-600 uppercase">{product.category}</Text>
                  </View>
                  {product.stock !== null && (
                    <Text className={`text-[10px] font-bold ${product.stock < 15 ? 'text-red-500' : 'text-slate-400'}`}>
                      {product.stock} un.
                    </Text>
                  )}
                </View>
              </View>
            </View>
            <View className="items-end">
               <Text className="font-bold text-slate-900">{product.price}</Text>
               <TouchableOpacity className="p-1 mt-1">
                 <MoreVertical size={16} color="#cbd5e1" />
               </TouchableOpacity>
            </View>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}