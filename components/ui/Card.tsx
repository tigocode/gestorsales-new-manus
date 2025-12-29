import { View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  className?: string;
}

export function Card({ children, className = '', ...props }: CardProps) {
  return (
    <View 
      className={`bg-white p-4 rounded-3xl border border-slate-100 shadow-sm ${className}`}
      {...props}
    >
      {children}
    </View>
  );
}