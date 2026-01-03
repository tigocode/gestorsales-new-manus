import { LucideIcon } from 'lucide-react-native';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'ai' | 'outline';
  icon?: LucideIcon;
  loading?: boolean;
  className?: string;
}

export function Button({ 
  children, 
  onPress, 
  variant = 'primary', 
  icon: Icon, 
  loading = false,
  className = '' 
}: ButtonProps) {
  
  const variants = {
    primary: "bg-blue-600 border-blue-600",
    secondary: "bg-white border-slate-200",
    ghost: "bg-transparent border-transparent",
    danger: "bg-red-50 border-red-100",
    ai: "bg-purple-600 border-purple-600",
    outline: "bg-transparent border-slate-300",
  };

  const textVariants = {
    primary: "text-white",
    secondary: "text-slate-700",
    ghost: "text-slate-600",
    danger: "text-red-600",
    ai: "text-white",
    outline: "text-slate-700",
  };

  // Estilo de sombra específico para o botão Primary
  const shadowStyle = variant === 'primary' ? {
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8, // Sombra para Android
  } : {};

  return (
    <TouchableOpacity 
      onPress={onPress}
      disabled={loading}
      className={`w-full py-4 rounded-2xl flex-row items-center justify-center border ${variants[variant]} ${className}`}
      activeOpacity={0.8}
      style={shadowStyle}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'secondary' || variant === 'ghost' ? '#475569' : '#FFF'} />
      ) : (
        <View className="flex-row items-center justify-center">
          {Icon && (
            <Icon 
              size={20} 
              color={variant === 'secondary' || variant === 'ghost' || variant === 'outline' ? '#475569' : (variant === 'danger' ? '#DC2626' : '#FFF')} 
              style={{ marginRight: 8 }} 
            />
          )}
          <Text className={`font-bold text-base ${textVariants[variant]}`}>
            {children}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}