import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Stack, useRouter } from 'expo-router';
import { ArrowRight, ChevronLeft, MessageCircle, Package, Smartphone, User } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../lib/firebase';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export default function RegisterScreen() {
  const router = useRouter();
  const [company, setCompany] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleRegister() {
    if (!company || !fullName || !email || password.length < 6) { setError('Preencha empresa, nome, e-mail e uma senha com 6 caracteres.'); return; }
    setLoading(true); setError('');
    try { await createUserWithEmailAndPassword(auth, email.trim(), password); router.replace('/(tabs)'); }
    catch (e) { setError(e instanceof Error ? e.message : 'Não foi possível criar a conta.'); }
    finally { setLoading(false); }
  }

  return (
    <View className="flex-1 bg-white pt-12"><Stack.Screen options={{ headerShown: false }} /><View className="px-6 pb-4"><TouchableOpacity onPress={() => router.back()} className="w-10 h-10 rounded-full bg-slate-50 items-center justify-center border border-slate-100"><ChevronLeft size={24} color="#64748B" /></TouchableOpacity></View>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}><View className="mb-8 mt-2"><Text className="text-3xl font-bold text-slate-900 mb-2">Crie sua conta</Text><Text className="text-slate-500 text-lg leading-6">Comece a gerenciar sua clínica e vendas hoje mesmo.</Text></View>
        <View className="mb-4"><Input label="Nome da Empresa" placeholder="Ex: Clínica Bem Estar" icon={Package} value={company} onChangeText={setCompany} /><Input label="Nome Completo" placeholder="Seu nome" icon={User} value={fullName} onChangeText={setFullName} /><Input label="Telefone / WhatsApp" placeholder="(00) 00000-0000" icon={Smartphone} value={phone} onChangeText={setPhone} keyboardType="phone-pad" /><Input label="E-mail" placeholder="seu@email.com" icon={MessageCircle} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" /><Input label="Senha" placeholder="Mínimo de 6 caracteres" value={password} onChangeText={setPassword} secureTextEntry /></View>
        {error ? <Text className="text-red-600 text-center mb-4">{error}</Text> : null}<Button onPress={handleRegister} loading={loading} icon={ArrowRight}>Cadastrar e Entrar</Button><View className="flex-row justify-center mt-8 mb-4"><Text className="text-slate-500">Já tem uma conta? </Text><TouchableOpacity onPress={() => router.back()}><Text className="text-blue-600 font-bold">Fazer Login</Text></TouchableOpacity></View>
      </ScrollView>
    </View>
  );
}
