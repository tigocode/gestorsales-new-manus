import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { ArrowRight, Calendar, Lock, User } from 'lucide-react-native';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../lib/firebase';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin() {
    if (!email || !password) { setError('Informe e-mail e senha.'); return; }
    setLoading(true); setError('');
    try { await signInWithEmailAndPassword(auth, email.trim(), password); router.replace('/(tabs)'); }
    catch (e) { setError(e instanceof Error ? e.message : 'Não foi possível entrar.'); }
    finally { setLoading(false); }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 px-8 pt-28 pb-12">
          <View className="items-center mb-12"><View className="w-24 h-24 bg-blue-600 rounded-[32px] items-center justify-center mb-8"><Calendar size={48} color="white" strokeWidth={2.5} /></View><Text className="text-3xl font-bold text-slate-900 mb-2">Gestor Sales</Text><Text className="text-slate-500 text-base text-center max-w-[260px] leading-relaxed">Gestão clínica e comercial simplificada para você.</Text></View>
          <View className="w-full mb-8"><Input placeholder="Seu e-mail" icon={User} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" /><Input placeholder="Sua senha" icon={Lock} value={password} onChangeText={setPassword} secureTextEntry /><View className="flex-row justify-end mt-1"><TouchableOpacity onPress={() => router.push('/forgot-password')}><Text className="text-sm font-bold text-blue-600">Esqueceu a senha?</Text></TouchableOpacity></View></View>
          {error ? <Text className="text-red-600 text-center mb-4">{error}</Text> : null}
          <View className="mb-8"><Button onPress={handleLogin} loading={loading} icon={ArrowRight}>Entrar</Button><View className="mt-4"><Button variant="secondary" onPress={() => router.push('/register')}>Criar conta grátis</Button></View></View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
