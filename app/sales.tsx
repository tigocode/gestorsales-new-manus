import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Stack, useRouter } from "expo-router";
import {
    ArrowRight,
    Banknote,
    Box,
    CheckCircle2,
    ChevronLeft,
    CreditCard,
    FileText,
    Minus,
    Plus,
    Search,
    ShoppingCart,
    Trash2,
    User,
    Zap,
} from "lucide-react-native";
import React, { useState } from "react";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

// Mocks
const mockClients = [
  { id: 1, name: "Alex Batista", phone: "(11) 99999-9999", avatar: "AB" },
  { id: 2, name: "Eduarda Maria", phone: "(11) 98888-8888", avatar: "EM" },
  { id: 3, name: "Hugo Pontes", phone: "(21) 97777-7777", avatar: "HP" },
];

const mockProducts = [
  {
    id: 1,
    name: "Consulta Padrão",
    price: "R$ 250,00",
    rawPrice: 250.0,
    icon: User,
  },
  {
    id: 2,
    name: "Lente Oasys",
    price: "R$ 180,00",
    rawPrice: 180.0,
    icon: Box,
  },
  {
    id: 3,
    name: "Bioimpedância",
    price: "R$ 100,00",
    rawPrice: 100.0,
    icon: FileText,
  },
];

export default function SalesScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [paymentMethod, setPaymentMethod] = useState("pix");

  // Lógica do Carrinho
  const addToCart = (id: number) =>
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  const removeFromCart = (id: number) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[id] > 1) newCart[id] -= 1;
      else delete newCart[id];
      return newCart;
    });
  };

  const cartTotal = Object.entries(cart).reduce((total, [id, qty]) => {
    const p = mockProducts.find((prod) => prod.id === parseInt(id));
    return total + (p ? p.rawPrice * qty : 0);
  }, 0);

  const cartItemsCount = Object.values(cart).reduce((a, b) => a + b, 0);

  // -- RENDERIZAÇÃO DAS ETAPAS --

  // Etapa 4: Sucesso
  if (step === 4)
    return (
      <View className="flex-1 bg-white items-center justify-center p-6">
        <Stack.Screen options={{ headerShown: false }} />

        <View className="w-24 h-24 bg-green-100 rounded-full items-center justify-center mb-6 shadow-sm">
          <CheckCircle2 size={48} color="#16A34A" />
        </View>

        <Text className="text-2xl font-bold text-slate-900 mb-2">
          Venda Realizada!
        </Text>

        <Text className="text-slate-500 text-center mb-8 max-w-[200px]">
          O comprovante foi enviado para o WhatsApp do cliente.
        </Text>

        {/* BOTÕES */}
        <View className="w-full mt-2">
          <Button onPress={() => router.back()}>Voltar para Home</Button>
          <View className="mt-4">
            <Button variant="secondary" icon={FileText}>
              <View>
                <Text className="font-bold text-lg">Ver Recibo</Text>
              </View>
            </Button>
          </View>
        </View>
      </View>
    );

  return (
    <View className="flex-1 bg-slate-50">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header Comum */}
      <View className="pt-14 px-6 pb-4 bg-white border-b border-slate-100 flex-row items-center gap-4">
        <TouchableOpacity
          onPress={() => (step === 1 ? router.back() : setStep(step - 1))}
          className="w-10 h-10 -ml-2 rounded-full items-center justify-center active:bg-slate-50"
        >
          <ChevronLeft size={24} color="#475569" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-slate-900">
          {step === 1
            ? "Nova Venda"
            : step === 2
            ? "Selecionar Itens"
            : "Pagamento"}
        </Text>
      </View>

      {/* Barra de Progresso */}
      <View className="px-6 mt-4">
        <View className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
          <View className="flex-row justify-between mb-2">
            <Text className="text-sm text-blue-800 font-bold">
              Etapa {step} de 3
            </Text>
            {selectedClient && (
              <Text className="text-xs font-bold text-blue-600">
                {selectedClient.name}
              </Text>
            )}
          </View>
          <View className="w-full bg-blue-200 h-1.5 rounded-full">
            <View
              className="bg-blue-600 h-full rounded-full"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
        {/* ETAPA 1: SELECIONAR CLIENTE */}
        {step === 1 && (
          <View>
            <View className="relative justify-center mb-4">
              <TextInput
                placeholder="Buscar cliente..."
                className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm"
              />
              <Search
                size={18}
                color="#94a3b8"
                style={{ position: "absolute", left: 12 }}
              />
            </View>
            {mockClients.map((client) => (
              <Card
                key={client.id}
                className="flex-row items-center justify-between mb-3"
                onTouchEnd={() => {
                  setSelectedClient(client);
                  setStep(2);
                }}
              >
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 rounded-full bg-slate-50 items-center justify-center">
                    <Text className="font-bold text-slate-600">
                      {client.avatar}
                    </Text>
                  </View>
                  <View>
                    <Text className="font-bold text-slate-800">
                      {client.name}
                    </Text>
                    <Text className="text-xs text-slate-500">
                      {client.phone}
                    </Text>
                  </View>
                </View>
                <ChevronLeft
                  size={20}
                  color="#cbd5e1"
                  style={{ transform: [{ rotate: "180deg" }] }}
                />
              </Card>
            ))}
          </View>
        )}

        {/* ETAPA 2: ITENS / CARRINHO */}
        {step === 2 && (
          <View className="gap-3">
            {mockProducts.map((product) => {
              const qty = cart[product.id] || 0;
              return (
                <Card
                  key={product.id}
                  className={`flex-row items-center justify-between ${
                    qty > 0 ? "border-blue-300 bg-blue-50" : ""
                  }`}
                >
                  <View className="flex-row items-center gap-3">
                    <View
                      className={`w-10 h-10 rounded-xl items-center justify-center ${
                        qty > 0 ? "bg-blue-200" : "bg-slate-50"
                      }`}
                    >
                      <product.icon
                        size={20}
                        color={qty > 0 ? "#1E40AF" : "#64748b"}
                      />
                    </View>
                    <View>
                      <Text className="font-bold text-slate-800 text-sm">
                        {product.name}
                      </Text>
                      <Text className="text-xs text-slate-500 font-semibold">
                        {product.price}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row items-center gap-3">
                    {qty > 0 ? (
                      <>
                        <TouchableOpacity
                          onPress={() => removeFromCart(product.id)}
                          className="w-8 h-8 rounded-full bg-white border border-slate-200 items-center justify-center"
                        >
                          {qty === 1 ? (
                            <Trash2 size={16} color="#ef4444" />
                          ) : (
                            <Minus size={16} color="#64748b" />
                          )}
                        </TouchableOpacity>
                        <Text className="font-bold text-slate-900 w-4 text-center">
                          {qty}
                        </Text>
                        <TouchableOpacity
                          onPress={() => addToCart(product.id)}
                          className="w-8 h-8 rounded-full bg-blue-600 items-center justify-center shadow-md"
                        >
                          <Plus size={16} color="white" />
                        </TouchableOpacity>
                      </>
                    ) : (
                      <TouchableOpacity
                        onPress={() => addToCart(product.id)}
                        className="w-8 h-8 rounded-full bg-slate-50 items-center justify-center"
                      >
                        <Plus size={18} color="#64748b" />
                      </TouchableOpacity>
                    )}
                  </View>
                </Card>
              );
            })}
          </View>
        )}

        {/* ETAPA 3: PAGAMENTO */}
        {step === 3 && (
          <View>
            <View className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-6">
              <View className="items-center mb-6">
                <Text className="text-slate-500 text-sm">
                  Valor Total a Pagar
                </Text>
                <Text className="text-4xl font-bold text-slate-900 mt-1">
                  R$ {cartTotal.toFixed(2).replace(".", ",")}
                </Text>
              </View>
              <View className="gap-3 mb-4">
                {Object.entries(cart).map(([id, qty]) => {
                  const p = mockProducts.find(
                    (prod) => prod.id === parseInt(id)
                  );
                  if (!p) return null;
                  return (
                    <View
                      key={id}
                      className="flex-row justify-between text-sm border-b border-slate-50 pb-2"
                    >
                      <Text className="text-slate-600">
                        {qty}x {p.name}
                      </Text>
                      <Text className="font-semibold text-slate-900">
                        R$ {(p.rawPrice * qty).toFixed(2).replace(".", ",")}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>

            <Text className="font-bold text-slate-900 mb-3 ml-1">
              Forma de Pagamento
            </Text>
            <View className="gap-3">
              {[
                { id: "pix", label: "Pix", icon: Zap },
                { id: "card", label: "Cartão de Crédito", icon: CreditCard },
                { id: "cash", label: "Dinheiro", icon: Banknote },
              ].map((method) => (
                <TouchableOpacity
                  key={method.id}
                  onPress={() => setPaymentMethod(method.id)}
                  className={`flex-row items-center gap-2 p-5 rounded-2xl border ${
                    paymentMethod === method.id
                      ? "bg-blue-600 border-blue-600"
                      : "bg-white border-slate-200"
                  }`}
                >
                  <method.icon
                    size={26}
                    color={paymentMethod === method.id ? "white" : "#475569"}
                  />
                  <Text
                    className={`font-bold ${
                      paymentMethod === method.id
                        ? "text-white"
                        : "text-slate-600"
                    }`}
                  >
                    {method.label}
                  </Text>
                  {paymentMethod === method.id && (
                    <CheckCircle2
                      size={22}
                      color="white"
                      style={{ marginLeft: "auto" }}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Footer Fixo: Resumo do Carrinho (Apenas Etapa 2) */}
      {step === 2 && cartItemsCount > 0 && (
        <View className="absolute bottom-6 left-6 right-6 bg-slate-900 p-4 rounded-3xl shadow-xl shadow-slate-900/20 flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <View className="bg-slate-800 p-2.5 rounded-full relative">
              <ShoppingCart size={20} color="white" />
              <View className="absolute -top-1 -right-1 bg-red-500 w-4 h-4 rounded-full items-center justify-center border-2 border-slate-900">
                <Text className="text-white text-[9px] font-bold">
                  {cartItemsCount}
                </Text>
              </View>
            </View>
            <View>
              <Text className="text-[10px] text-slate-400 font-bold uppercase">
                Total
              </Text>
              <Text className="text-lg font-bold text-white">
                R$ {cartTotal.toFixed(2).replace(".", ",")}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => setStep(3)}
            className="bg-white px-5 py-2.5 rounded-xl flex-row items-center gap-2"
          >
            <Text className="font-bold text-slate-900 text-sm">Pagar</Text>
            <ArrowRight size={16} color="#0f172a" />
          </TouchableOpacity>
        </View>
      )}

      {/* Footer Fixo: Finalizar (Apenas Etapa 3) */}
      {step === 3 && (
        <View className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-slate-100">
          <Button onPress={() => setStep(4)}>Finalizar Venda</Button>
        </View>
      )}
    </View>
  );
}
