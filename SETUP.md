# Configuração e execução do GestorSales

Este projeto é um aplicativo Expo/React Native que usa Firebase Client para autenticação e a API `wat-lab` para gerenciar instâncias WhatsApp.

## 1. Pré-requisitos

Instale Node.js 20 ou superior, npm e o Expo CLI via `npx`. Para testar em aparelho físico, instale Expo Go ou configure um development build compatível com o SDK do projeto.

## 2. Instalação

```bash
cd gestorsales-new
npm install
cp .env.example .env
```

## 3. Configurar Firebase Client

No [Firebase Console](https://console.firebase.google.com), crie ou selecione o mesmo projeto usado pelo backend. Ative **Authentication > Sign-in method > Email/Password** e crie um aplicativo Web em **Configurações do projeto**.

Copie a configuração pública do aplicativo para `.env`:

```dotenv
EXPO_PUBLIC_FIREBASE_API_KEY=AIza...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=seu-projeto
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=seu-projeto.firebasestorage.app
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
EXPO_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc
```

Essas variáveis são configurações públicas do Client SDK, mas as regras do Firebase continuam sendo responsáveis pela segurança. Nunca coloque `FIREBASE_PRIVATE_KEY` ou qualquer credencial de conta de serviço neste projeto.

## 4. Apontar para o WAT-LAB

Defina a URL da API:

```dotenv
EXPO_PUBLIC_WAT_API_URL=http://127.0.0.1:3002
```

No navegador ou em um emulador Android, esse endereço pode funcionar. Em um aparelho físico, substitua `127.0.0.1` pelo IP local da máquina, por exemplo `http://192.168.1.20:3002`. O computador e o telefone devem estar na mesma rede, e a porta 3002 deve estar liberada no firewall.

Se o backend estiver com `REQUIRE_FIREBASE_AUTH=true`, o usuário autenticado no app enviará automaticamente o Firebase ID token nas chamadas da API. O projeto precisa usar o mesmo Firebase Project ID no app e no backend.

## 5. Executar

```bash
npx expo start
```

Use `a` para Android, `i` para iOS quando disponível, ou leia o QR pelo Expo Go. A tela de login usa `signInWithEmailAndPassword`; o cadastro usa `createUserWithEmailAndPassword`. Depois do login, abra a aba **Instância**, informe empresa e nome e toque em **Gerar QR Code**.

## 6. Testar o fluxo integrado

Primeiro inicie os emuladores e o backend seguindo [o guia do WAT-LAB](../wat-lab/SETUP.md). Depois inicie o Expo. No app, crie uma conta ou entre com uma conta já criada. Em **Instância**, gere o QR, leia-o com o WhatsApp e aguarde a atualização automática do status.

O aplicativo consulta o status da instância a cada cinco segundos. Quando o backend registrar `connected`, a tela exibirá o número conectado. O botão **Atualizar status** força uma consulta imediata e **Encerrar sessão** chama `POST /logout-session`.

## 7. Verificações

Execute a checagem TypeScript:

```bash
npx tsc --noEmit
```

A camada de API está em `lib/watApi.ts`, a configuração do Firebase em `lib/firebase.ts` e a tela integrada em `app/(tabs)/instance.tsx`. Os módulos de clientes, produtos, vendas, agenda e relatórios ainda contêm dados de protótipo e devem receber modelagem Firestore e regras de negócio em etapas posteriores.

## 8. Problemas comuns

Se o login falhar, verifique se Email/Password está habilitado e se as variáveis `EXPO_PUBLIC_FIREBASE_*` pertencem ao projeto correto. Se a API não for alcançada, não use `localhost` em aparelho físico; utilize o IP da máquina. Se a API retornar erro 401, confira se o backend exige autenticação e se o app e o backend usam o mesmo projeto Firebase.
