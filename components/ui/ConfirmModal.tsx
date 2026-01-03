import { AlertTriangle } from "lucide-react-native";
import React from "react";
import { Modal, Text, View } from "react-native";
import { Button } from "./Button";

interface ConfirmModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "primary"; // Para mudar a cor do botão de ação
}

export function ConfirmModal({
  visible,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "primary",
}: ConfirmModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      {/* Overlay Escuro */}
      <View className="flex-1 bg-black/60 justify-center items-center px-6">
        {/* Card Branco */}
        <View className="w-full bg-white rounded-[32px] p-6 shadow-xl">
          {/* Ícone de Atenção (Opcional, dá um toque profissional) */}
          <View
            className={`w-14 h-14 rounded-full items-center justify-center mb-4 self-center ${
              variant === "danger" ? "bg-red-50" : "bg-blue-50"
            }`}
          >
            <AlertTriangle
              size={28}
              color={variant === "danger" ? "#DC2626" : "#2563EB"}
            />
          </View>

          <Text className="text-xl font-bold text-slate-900 text-center mb-2">
            {title}
          </Text>

          <Text className="text-slate-500 text-center text-base mb-8 leading-6">
            {message}
          </Text>

          {/* Botões de Ação */}
          <View className="gap-3">
            <Button
              onPress={() => {
                onConfirm();
                onClose();
              }}
              variant={variant}
            >
              {confirmText}
            </Button>

            <View>
              <Button onPress={onClose} variant="secondary">
                {cancelText}
              </Button>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
