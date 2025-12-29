import { LucideIcon } from 'lucide-react-native';
import { Text, TextInput, TextInputProps, View } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  icon?: LucideIcon;
}

export function Input({ label, icon: Icon, className = '', ...props }: InputProps) {
  return (
    <View className="space-y-2 mb-4">
      {label && <Text className="text-sm font-bold text-slate-700 ml-1">{label}</Text>}
      
      <View className="relative w-full">
        {/* Ícone Absolute */}
        {Icon && (
          <View className="absolute left-4 top-4 z-10">
            <Icon size={20} color="#94a3b8" />
          </View>
        )}
        
        {/* CORREÇÃO: Removemos a lógica dinâmica pl-${...} 
           e usamos classes explícitas baseadas na prop `icon`.
        */}
        <TextInput 
          className={`w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pr-4 text-slate-800 text-base focus:border-blue-500 ${Icon ? 'pl-12' : 'pl-4'} ${className}`}
          placeholderTextColor="#94a3b8"
          {...props}
        />
      </View>
    </View>
  );
}