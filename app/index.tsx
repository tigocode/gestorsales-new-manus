import { useRouter } from "expo-router";
import { ArrowRight, Calendar, Settings, User } from "lucide-react-native";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";

// Importando nossos componentes criados
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = () => {
    router.replace("/(tabs)"); // Redireciona para a Home e impede voltar para o login
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 px-6 pt-20 pb-10 justify-center">
          {/* Header / Logo Section */}
          <View className="items-center mb-12">
            <View className="w-24 h-24 bg-blue-600 rounded-3xl items-center justify-center shadow-lg shadow-blue-500/30 mb-8 rotate-3">
              <Calendar size={48} color="white" />
            </View>
            <Text className="text-3xl font-bold text-slate-900 mb-2">
              Gestor Sales
            </Text>
            <Text className="text-slate-500 text-lg text-center max-w-[260px]">
              Gestão clínica e comercial simplificada para você.
            </Text>
          </View>

          {/* Form Section */}
          <View className="space-y-4 w-full mb-8">
            <Input
              placeholder="Seu e-mail"
              icon={User}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <Input placeholder="Sua senha" icon={Settings} secureTextEntry />
            <View className="flex-row justify-end mt-2">
              <Text className="text-sm font-semibold text-blue-600">
                Esqueceu a senha?
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="space-y-4">
            <Button onPress={handleLogin} icon={ArrowRight}>
              Entrar
            </Button>
            <Button variant="secondary">Criar conta grátis</Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
