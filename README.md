# GestorSales

Aplicativo Expo/React Native para gestão clínica e comercial, com autenticação Firebase e integração com o backend WAT-LAB para gerenciamento de instâncias WhatsApp.

> **Configuração local:** o passo a passo completo está em [`SETUP.md`](./SETUP.md). Ele inclui Firebase Client, Email/Password, URL da API, execução no Expo, aparelho físico e troubleshooting.

## Início rápido local

```bash
npm install
cp .env.example .env
npx expo start
```

Antes de iniciar, preencha no `.env` as variáveis `EXPO_PUBLIC_FIREBASE_*` e `EXPO_PUBLIC_WAT_API_URL`. Em aparelho físico, substitua `127.0.0.1` pelo IP da máquina na rede local, por exemplo `http://192.168.1.20:3002`. O backend WAT-LAB precisa estar rodando conforme o [guia do backend](../wat-lab/SETUP.md) ou conforme o `SETUP.md` do repositório WAT-LAB.

O fluxo é: criar conta ou entrar pelo Firebase Auth, abrir a aba **Instância**, gerar o QR, ler pelo WhatsApp e aguardar a atualização do status. Consulte [`SETUP.md`](./SETUP.md) para os comandos e a configuração completa.

Este é um projeto [Expo](https://expo.dev) criado com [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Começando

1. Instale as dependências

   ```bash
   npm install
   ```

2. Inicie o aplicativo

   ```bash
   npx expo start
   ```

No output, você encontrará opções para abrir o aplicativo em um

- [build de desenvolvimento](https://docs.expo.dev/develop/development-builds/introduction/)
- [emulador Android](https://docs.expo.dev/workflow/android-studio-emulator/)
- [simulador iOS](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), um sandbox limitado para experimentar o desenvolvimento de aplicativos com Expo

Você pode começar a desenvolver editando os arquivos dentro do diretório **app**. Este projeto utiliza [roteamento baseado em arquivos](https://docs.expo.dev/router/introduction).

## Estrutura do Aplicativo

O aplicativo possui as seguintes telas:

- **Agenda**: Visualize e gerencie compromissos.
- **Adicionar Agenda**: Adicione novos compromissos à sua agenda.
- **Relatórios**: Gere relatórios sobre suas atividades.
- **Vendas**: Acompanhe e gerencie suas vendas.
- **Clientes**: Visualize e gerencie informações dos clientes.
- **Adicionar Cliente**: Adicione novos clientes ao sistema.
- **Detalhes do Cliente**: Veja informações detalhadas sobre um cliente específico.
- **Produtos**: Gerencie os produtos disponíveis.
- **Adicionar Produto**: Adicione novos produtos ao seu inventário.

## Resetando o Projeto

Quando estiver pronto, execute:

```bash
npm run reset-project
```

Este comando moverá o código inicial para o diretório **app-example** e criará um novo diretório **app** em branco onde você pode começar a desenvolver.

## Aprenda Mais

Para aprender mais sobre o desenvolvimento do seu projeto com Expo, consulte os seguintes recursos:

- [Documentação do Expo](https://docs.expo.dev/): Aprenda os fundamentos ou aprofunde-se em tópicos avançados com nossos [guias](https://docs.expo.dev/guides).
- [Tutorial Learn Expo](https://docs.expo.dev/tutorial/introduction/): Siga um tutorial passo a passo onde você criará um projeto que roda no Android, iOS e na web.

## Junte-se à Comunidade

Junte-se à nossa comunidade de desenvolvedores criando aplicativos universais.

- [Expo no GitHub](https://github.com/expo/expo): Veja nossa plataforma de código aberto e contribua.
- [Comunidade Discord](https://chat.expo.dev): Converse com usuários do Expo e faça perguntas.
