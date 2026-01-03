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
      
      <View className="relative w-full justify-center">
        {/* Ícone Absolute: Fixo na esquerda */}
        {Icon && (
          <View className="absolute left-4 z-10 pointer-events-none">
            <Icon size={24} color="#94a3b8" />
          </View>
        )}
        
        {/* O SEGREDO ESTÁ AQUI: 
            Se tiver ícone (Icon ?), usamos 'pl-14' (padding-left grande).
            Se não, usamos 'pl-4' padrão.
        */}
        <TextInput 
          className={`w-full h-15 bg-white border border-slate-200 rounded-2xl py-4 pr-14 text-slate-800 text-base focus:border-blue-500 ${Icon ? 'pl-14' : 'pl-4'} ${className}`}
          placeholderTextColor="#94a3b8"
          {...props}
        />
      </View>
    </View>
  );
}