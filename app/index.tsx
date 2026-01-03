import { useRouter } from "expo-router";
import { ArrowRight, Calendar, Lock, User } from "lucide-react-native";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = () => {
    router.replace("/(tabs)");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 px-8 pt-28 pb-12">
          {/* Logo Section */}
          <View className="items-center mb-12">
            <View
              className="w-24 h-24 bg-blue-600 rounded-[32px] items-center justify-center mb-8"
              style={{
                shadowColor: "#2563EB",
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.3,
                shadowRadius: 20,
                elevation: 10,
              }}
            >
              <Calendar size={48} color="white" strokeWidth={2.5} />
            </View>
            <Text className="text-3xl font-bold text-slate-900 mb-2">
              Gestor Sales
            </Text>
            <Text className="text-slate-500 text-base text-center max-w-[260px] leading-relaxed">
              Gestão clínica e comercial simplificada para você.
            </Text>
          </View>

          {/* Form Section */}
          <View className="space-y-1 w-full mb-8">
            <Input
              placeholder="Seu e-mail"
              icon={User}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <Input placeholder="Sua senha" icon={Lock} secureTextEntry />
            {/* 👇 ATUALIZE ESTA PARTE 👇 */}
            <View className="flex-row justify-end mt-1">
              <TouchableOpacity onPress={() => router.push("/forgot-password")}>
                <Text className="text-sm font-bold text-blue-600">
                  Esqueceu a senha?
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Buttons */}
          <View className="mt-6 mb-8">
            <Button onPress={handleLogin} icon={ArrowRight}>
              Entrar
            </Button>

            <View className="mt-4">
              <Button
                variant="secondary"
                onPress={() => router.push("/register")}
              >
                Criar conta grátis
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
