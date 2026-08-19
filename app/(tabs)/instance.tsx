import { CheckCircle2, LogOut, QrCode, RefreshCw, Smartphone } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';
import { auth } from '../../lib/firebase';
import { getInstance, InstanceRecord, logoutSession, startSession } from '../../lib/watApi';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export default function InstanceScreen() {
  const [company, setCompany] = useState('Minha empresa');
  const [name, setName] = useState('Administrador');
  const [record, setRecord] = useState<InstanceRecord | null>(null);
  const [qr, setQr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function connect() {
    setLoading(true); setError('');
    try {
      const result = await startSession(company, name, auth.currentUser);
      setQr(result.Qrcode);
      setRecord({ instance: result.instance, status: 'qr_pending', qrcode: result.Qrcode });
    } catch (e) { setError(e instanceof Error ? e.message : 'Não foi possível iniciar a sessão.'); }
    finally { setLoading(false); }
  }

  async function refresh() {
    if (!record?.instance) return;
    try { setRecord(await getInstance(record.instance, auth.currentUser)); }
    catch (e) { setError(e instanceof Error ? e.message : 'Não foi possível consultar a instância.'); }
  }

  async function logout() {
    if (!record?.instance) return;
    setLoading(true);
    try { await logoutSession(record.instance, auth.currentUser); setRecord({ ...record, status: 'disconnected' }); setQr(null); }
    catch (e) { setError(e instanceof Error ? e.message : 'Não foi possível encerrar a sessão.'); }
    finally { setLoading(false); }
  }

  useEffect(() => { const timer = setInterval(refresh, 5000); return () => clearInterval(timer); }, [record?.instance]);

  const connected = record?.status === 'connected';
  return (
    <View className="flex-1 bg-slate-50">
      <View className="pt-14 px-6 pb-4 bg-white border-b border-slate-100 mb-6">
        <Text className="text-2xl font-bold text-slate-900">Conexão WhatsApp</Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}>
        {!record && (
          <View className="bg-white rounded-3xl p-5 border border-slate-200 mb-5">
            <Input label="Empresa" value={company} onChangeText={setCompany} />
            <Input label="Nome da instância" value={name} onChangeText={setName} />
            <Button onPress={connect} loading={loading} icon={QrCode}>Gerar QR Code</Button>
          </View>
        )}
        <View className="w-full bg-white rounded-3xl p-6 border border-slate-200 mb-6">
          <View className={`absolute top-0 left-0 w-full h-1.5 rounded-t-3xl ${connected ? 'bg-emerald-500' : 'bg-amber-500'}`} />
          <View className="items-center mt-2">
            {connected && record ? (
              <View className="items-center">
                <View className="w-32 h-32 bg-emerald-50 rounded-full items-center justify-center mb-4">
                  <Smartphone size={64} color="#059669" />
                  <CheckCircle2 size={22} color="#059669" />
                </View>
                <Text className="text-xl font-bold text-slate-900">Instância conectada</Text>
                <Text className="text-sm text-slate-500 mt-2 text-center">{record.phone || 'Número conectado'} está pronto para uso.</Text>
              </View>
            ) : qr ? (
              <View className="items-center">
                <Image source={{ uri: qr }} style={{ width: 260, height: 260 }} />
                <Text className="text-sm text-slate-500 mt-4">Aponte o WhatsApp para o QR Code.</Text>
              </View>
            ) : (
              <View className="items-center py-8">
                <QrCode size={100} color="#94a3b8" />
                <Text className="text-sm text-slate-500 mt-4">Nenhuma sessão ativa.</Text>
              </View>
            )}
          </View>
        </View>
        {error ? <Text className="text-red-600 text-center mb-4">{error}</Text> : null}
        {record && (
          <>
            <Button variant="secondary" icon={RefreshCw} onPress={refresh}>Atualizar status</Button>
            <View className="mt-3"><Button variant="danger" icon={LogOut} loading={loading} onPress={logout}>Encerrar sessão</Button></View>
          </>
        )}
        {loading && <ActivityIndicator className="mt-4" color="#2563EB" />}
      </ScrollView>
    </View>
  );
}
