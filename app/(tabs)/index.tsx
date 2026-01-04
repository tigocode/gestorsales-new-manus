import { Card } from '@/components/ui/Card';
import { useRouter } from 'expo-router';
import {
  ArrowRight,
  Bell,
  Calendar,
  DollarSign,
  FileText,
  MessageCircle,
} from 'lucide-react-native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  const nextAppointments = [
    { id: 1, time: '09:00', patient: 'Victor Araujo', type: 'Particular', mode: 'Online' },
    { id: 2, time: '12:00', patient: 'Hugo Pontes', type: 'Convênio', mode: 'Presencial' },
  ];

  return (
    <View className="flex-1 bg-slate-50">
      {/* HEADER FIXO */}
      <View className="bg-white px-6 pt-16 pb-6 rounded-b-[40px] border-b border-slate-100">
        <View className="flex-row justify-between items-center mb-6">
          <TouchableOpacity onPress={() => router.push('/profile')}>
            <Text className="text-slate-500 text-sm font-medium">Bom dia,</Text>
            <Text className="text-2xl font-bold text-slate-900">Dr. Tiago</Text>
          </TouchableOpacity>

          <TouchableOpacity className="w-10 h-10 bg-slate-50 rounded-full items-center justify-center border border-slate-200 relative">
            <Bell size={20} color="#475569" />
            <View className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
          </TouchableOpacity>
        </View>

        {/* CARD FATURAMENTO (continua fixo junto ao header) */}
        <View className="bg-blue-600 p-6 rounded-3xl shadow-lg shadow-blue-500/30 relative overflow-hidden">
          <View className="flex-row justify-between items-start mb-4">
            <View>
              <Text className="text-blue-100 text-sm font-medium mb-1">
                Faturamento Hoje
              </Text>
              <Text className="text-3xl font-bold text-white">
                R$ 1.250,00
              </Text>
            </View>

            <View className="p-2 bg-white/20 rounded-xl">
              <DollarSign size={24} color="white" />
            </View>
          </View>

          <View className="flex-row items-center bg-emerald-500/20 self-start px-3 py-1 rounded-lg border border-emerald-500/30">
            <ArrowRight
              size={12}
              color="#D1FAE5"
              style={{ transform: [{ rotate: '-45deg' }] }}
            />
            <Text className="text-emerald-100 text-xs font-bold ml-1">
              +12% vs ontem
            </Text>
          </View>
        </View>
      </View>

      {/* CONTEÚDO ROLÁVEL */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* ACESSO RÁPIDO */}
        <View className="px-6 mt-8">
          <Text className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-7">
            Acesso Rápido
          </Text>

          <View className="flex-row flex-wrap -ms-2">
            <QuickAction icon={Calendar} label="Agenda" color="text-indigo-600" bg="bg-indigo-50" onPress={() => router.push('/agenda')} />
            <QuickAction icon={FileText} label="Relatórios" color="text-purple-600" bg="bg-purple-50" onPress={() => router.push('/reports')} />
            <QuickAction icon={DollarSign} label="Nova Venda" color="text-orange-600" bg="bg-orange-50" onPress={() => router.push('/sales')} />
            <QuickAction icon={MessageCircle} label="WhatsApp" color="text-emerald-600" bg="bg-emerald-50" onPress={() => router.push('/(tabs)/instance')} />
          </View>
        </View>

        {/* PRÓXIMOS */}
        <View className="px-6 mt-8">
          <Text className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-7">
            Próximos
          </Text>

          {nextAppointments.map((apt) => (
            <Card key={apt.id} className="flex-row items-center gap-2 mb-4 border border-gray-200">
              <View className="w-14 h-14 bg-blue-50 rounded-2xl items-center justify-center border border-blue-100">
                <Text className="text-lg font-bold text-blue-700">
                  {apt.time.split(':')[0]}
                </Text>
                <Text className="text-[10px] text-blue-400 font-bold">
                  {apt.time.split(':')[1]}
                </Text>
              </View>

              <View>
                <Text className="font-bold text-slate-800 text-base">
                  {apt.patient}
                </Text>
                <Text className="text-xs text-slate-500 font-medium mt-1">
                  {apt.type} • {apt.mode}
                </Text>
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

/* QUICK ACTION */
function QuickAction({ icon: Icon, label, color, bg, onPress }: any) {
  const colorsMap: any = {
    'bg-indigo-50': '#EEF2FF',
    'text-indigo-600': '#4F46E5',
    'bg-purple-50': '#FAF5FF',
    'text-purple-600': '#9333EA',
    'bg-orange-50': '#FFF7ED',
    'text-orange-600': '#EA580C',
    'bg-emerald-50': '#ECFDF5',
    'text-emerald-600': '#059669',
  };

  return (
    <TouchableOpacity
      className="w-1/2 px-2 mb-4"
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View className="bg-white p-4 rounded-3xl border border-gray-200 shadow-sm items-center py-6 gap-2">
        <View
          className="w-14 h-14 rounded-2xl items-center justify-center"
          style={{ backgroundColor: colorsMap[bg] }}
        >
          <Icon size={28} color={colorsMap[color]} />
        </View>
        <Text className="font-bold text-slate-700 text-sm">{label}</Text>
      </View>
    </TouchableOpacity>
  );
}