# 🌟 Ecoexpedições

**Guia Turístico PWA para Bonito, MS - Compatível com Android Auto**

<div align="center">

![PWA](https://img.shields.io/badge/PWA-enabled-brightgreen)
![Android Auto](https://img.shields.io/badge/Android%20Auto-compatible-blue)
![Offline](https://img.shields.io/badge/Offline-ready-orange)
![Voice Control](https://img.shields.io/badge/Voice%20Control-enabled-purple)
![License](https://img.shields.io/badge/license-MIT-green)

</div>

## 📱 Sobre o Projeto

**Ecoexpedições** é uma Progressive Web App (PWA) moderna e completa, especialmente projetada para ser compatível com **Android Auto**, oferecendo um guia turístico completo de Bonito, Mato Grosso do Sul. A aplicação funciona 100% offline e possui controle por voz, tornando-a perfeita para uso durante viagens.

### 🎯 Principais Características

- 🚗 **Android Auto Compatible** - Interface otimizada para uso automotivo
- 📱 **Progressive Web App** - Instale como app nativo
- 🔊 **Controle por Voz** - Navegue usando comandos em português
- 📍 **GPS Integrado** - Navegação real com aplicativos nativos
- 🌐 **100% Offline** - Funciona sem conexão à internet
- 🎨 **Dark Mode** - Interface otimizada para dirigir à noite
- 📱 **Responsivo** - Funciona em desktop, tablet e mobile

## 🏞️ Atrativos Incluídos

### Principais Destinos (16+ atrativos)

| Categoria | Atrativos |
|-----------|-----------|
| **🏔️ Grutas** | Gruta do Lago Azul, Abismo Anhumas, Grutas de São Miguel |
| **🏊 Rios** | Rio da Prata, Rio Sucuri, Aquário Natural, Rio Formoso Eco Park |
| **💧 Cachoeiras** | Boca da Onça, Estância Mimosa, Cachoeira do Rio do Peixe |
| **🦅 Ecoturismo** | Buraco das Araras, Projeto Jiboia, Fazenda San Francisco |
| **🏖️ Balneários** | Balneário Municipal, Nascente do Rio Formoso |

Cada atrativo inclui:
- 📸 **Fotos em alta qualidade**
- 📍 **Coordenadas GPS precisas**
- ⏱️ **Duração estimada**
- 💰 **Preços atualizados**
- 🎯 **Atividades disponíveis**
- 💡 **Dicas importantes**
- 🧭 **Nível de dificuldade**

## 🎤 Comandos de Voz

A aplicação responde aos seguintes comandos em português:

### Navegação
- **"início"** ou **"voltar"** - Volta para tela inicial
- **"favoritos"** - Mostra seus atrativos favoritos
- **"próximos"** ou **"perto de mim"** - Atrativos próximos
- **"recomendados"** - Atrativos mais bem avaliados

### Busca por Categoria
- **"grutas"** - Mostra todas as grutas
- **"rios"** - Mostra rios para flutuação
- **"cachoeiras"** - Mostra todas as cachoeiras
- **"aventura"** - Atividades de aventura

### Atrativos Específicos
- **"gruta lago azul"** - Abre a Gruta do Lago Azul
- **"rio da prata"** - Abre o Rio da Prata
- **"abismo anhumas"** - Abre o Abismo Anhumas

### Navegação GPS
- **"navegar"** ou **"ir para"** - Navega para atrativo selecionado

### Ajuda
- **"ajuda"** ou **"comandos"** - Lista comandos disponíveis

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** + **TypeScript** - Interface moderna e tipada
- **Vite** - Build tool rápido e moderno
- **Tailwind CSS** - Estilização responsiva
- **Shadcn/ui** - Componentes UI elegantes
- **Service Worker** - Cache offline inteligente

### Backend  
- **FastAPI** - API REST moderna e rápida
- **MongoDB** - Banco de dados NoSQL
- **Pydantic** - Validação de dados
- **Motor** - Driver MongoDB assíncrono

### PWA Features
- **Web Speech API** - Reconhecimento de voz
- **Geolocation API** - GPS integrado
- **Cache API** - Armazenamento offline
- **Web App Manifest** - Instalação como app

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- Python 3.11+
- MongoDB
- Yarn

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/ecoexpedicoes.git
cd ecoexpedicoes
```

### 2. Configure o Backend
```bash
cd backend

# Instale as dependências Python
pip install -r requirements.txt

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações

# Execute o servidor
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

### 3. Configure o Frontend
```bash
cd frontend

# Instale as dependências
yarn install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite VITE_REACT_APP_BACKEND_URL com a URL do seu backend

# Execute em desenvolvimento
yarn dev

# Ou build para produção
yarn build
```

### 4. Acesse a aplicação
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8001
- **Documentação API**: http://localhost:8001/docs

## 📱 Instalação como PWA

### No Navegador Desktop
1. Acesse a aplicação
2. Clique no ícone "Instalar" na barra de endereços
3. Ou use o banner de instalação no topo da página

### No Android
1. Abra no Chrome
2. Toque no menu (⋮) → "Instalar app"
3. O app aparecerá na tela inicial

### Android Auto
1. Instale o app como PWA
2. Conecte o dispositivo ao Android Auto
3. A aplicação aparecerá automaticamente

## 🔧 Configuração do Deploy

### GitHub Pages (Automático)

O projeto inclui workflow automático para deploy no GitHub Pages:

1. **Ative GitHub Pages** no seu repositório
2. **Configure a branch** `main` como source
3. **Push para main** - o deploy acontece automaticamente

### Deploy Manual

```bash
# Build da aplicação
cd frontend
yarn build

# Deploy para seu servidor
scp -r build/* user@servidor:/var/www/ecoexpedicoes/
```

### Variáveis de Ambiente

#### Frontend (.env)
```env
VITE_REACT_APP_BACKEND_URL=https://api.ecoexpedicoes.com/api
```

#### Backend (.env)
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=ecoexpedicoes
```

## 📊 Estrutura do Projeto

```
ecoexpedicoes/
├── 📁 frontend/              # React PWA
│   ├── 📁 public/           # Assets estáticos
│   │   ├── manifest.json    # PWA manifest
│   │   ├── sw.js           # Service Worker
│   │   └── icons/          # Ícones PWA
│   ├── 📁 src/
│   │   ├── 📁 components/   # Componentes React
│   │   ├── 📁 hooks/        # Custom hooks
│   │   ├── 📁 pages/        # Páginas
│   │   └── 📁 data/         # Dados dos atrativos
│   └── package.json
├── 📁 backend/               # FastAPI
│   ├── server.py            # Servidor principal
│   ├── models.py            # Modelos de dados
│   ├── attractions_routes.py # Rotas API
│   └── 📁 data/            # Dados iniciais
├── 📁 .github/workflows/    # CI/CD
│   └── deploy.yml          # Deploy automático
└── README.md
```

## 🤝 Contribuindo

1. **Fork** o projeto
2. **Crie** uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. **Abra** um Pull Request

### Padrões de Código
- **ESLint** para JavaScript/TypeScript
- **Black** para Python
- **Conventional Commits** para mensagens
- **Testes** obrigatórios para novas features

## 🐛 Issues e Bugs

Encontrou um bug? [Abra uma issue](https://github.com/seu-usuario/ecoexpedicoes/issues) com:

- 📱 **Dispositivo** e sistema operacional
- 🌐 **Navegador** e versão
- 📝 **Descrição detalhada** do problema
- 🔄 **Passos para reproduzir**

## 📜 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👥 Autores

- **Seu Nome** - *Desenvolvimento inicial* - [seu-usuario](https://github.com/seu-usuario)

## 🙏 Agradecimentos

- [Bonito Convention & Visitors Bureau](https://www.bonito-ms.com.br/) - Informações turísticas
- [Unsplash](https://unsplash.com/) - Imagens dos atrativos
- [React](https://reactjs.org/) - Framework frontend
- [FastAPI](https://fastapi.tiangolo.com/) - Framework backend

## 📞 Suporte

- 📧 **Email**: suporte@ecoexpedicoes.com
- 🐦 **Twitter**: [@ecoexpedicoes](https://twitter.com/ecoexpedicoes)
- 💬 **Discord**: [Server de Suporte](https://discord.gg/ecoexpedicoes)

---

<div align="center">

**Desenvolvido com ❤️ para os amantes da natureza de Bonito, MS**

[🌐 Website](https://ecoexpedicoes.github.io) • [📱 PWA](https://ecoexpedicoes.github.io) • [📄 Docs](https://docs.ecoexpedicoes.com)

</div>
