# 🛒 Lista de Compras - App de Compras Domésticas

Um aplicativo moderno, rápido e de alto contraste desenvolvido para facilitar o gerenciamento de compras de supermercado. O foco é a eficiência e a legibilidade em ambientes reais de compras.

## ✨ Funcionalidades

- **Gerenciamento de Itens**: Adicione itens com nome, quantidade e categoria.
- **Edição de Itens**: Corrija itens rapidamente deslizando para o lado.
- **Segmentação Inteligente**: Visualize o que está faltando e o que já está no carrinho separadamente.
- **Alta Visibilidade**: Design de alto contraste otimizado para ambientes com iluminação variável (supermercados).
- **Reordenar Itens**: Organize sua lista conforme o corredor do mercado usando gestos de arrastar.
- **Persistência Local**: Seus dados ficam salvos no celular (LocalStorage) mesmo sem internet.
- **Ações Rápidas**: Deslize para excluir itens ou use o botão para limpar itens comprados.
- **Suporte Nativo**: Pronto para ser compilado como um aplicativo Android usando Capacitor.

## 🚀 Tecnologias Utilizadas

- **Ionic 8**: Framework UI para aplicativos cross-platform.
- **Angular 20 (Standalone Components)**: Otimização e performance moderna.
- **Angular Signals**: Gerenciamento de estado reativo e eficiente.
- **Capacitor 8**: Ponte nativa para rodar no Android/iOS.
- **Docker**: Ambiente de desenvolvimento isolado e replicável.

## 🛠️ Como Executar

### Pré-requisitos
- Docker e Docker Compose instalados.

### Rodando o Ambiente de Desenvolvimento
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/lista-de-compras-app.git
   cd lista-de-compras-app
   ```

2. Suba o container Docker:
   ```bash
   docker-compose up --build
   ```

3. Acesse no navegador:
   `http://localhost:8100`

## 📱 Como Gerar o APK (Android)

1. Garanta que você tenha o **Android Studio** e o **Java 17+** instalados no seu computador.
2. Gere os arquivos de produção no Docker:
   ```bash
   docker-compose run --rm app npm run build
   ```
3. Sincronize com a pasta Android:
   ```bash
   docker-compose run --rm app npx cap sync
   ```
4. Abra o projeto no Android Studio:
   ```bash
   npx cap open android
   ```
5. No Android Studio, vá em **Build > Build Bundle(s) / APK(s) > Build APK(s)**.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---
Desenvolvido por Jean
