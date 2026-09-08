# Refund

Aplicacao web para gerenciamento de solicitacoes de reembolso. O sistema possui fluxos diferentes para colaboradores e gestores, com autenticacao baseada em token e comunicacao com uma API REST.

## Funcionalidades

### Colaborador

- Criacao de conta e login
- Envio de uma solicitacao de reembolso
- Selecao de categoria e valor da solicitacao
- Upload do comprovante
- Confirmacao dos dados antes do envio

### Gestor

- Visualizacao das solicitacoes no dashboard
- Paginacao dos resultados
- Consulta dos detalhes de uma solicitacao
- Visualizacao do colaborador, categoria, valor e comprovante

## Tecnologias

- React 19
- TypeScript
- Vite
- React Router
- Axios
- Tailwind CSS 4
- Zod
- ESLint

## Pre-requisitos

- Node.js 20 ou superior
- npm
- API do projeto disponivel em `http://localhost:3333`

O frontend utiliza essa URL como `baseURL` em `src/services/api.ts`. Portanto, o backend precisa estar em execucao antes de testar login, cadastro ou solicitacoes.

## Como executar

1. Clone o repositorio:

   ```bash
   git clone <url-do-repositorio>
   cd refund
   ```

2. Instale as dependencias:

   ```bash
   npm install
   ```

3. Inicie a aplicacao em modo de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Abra a URL exibida pelo Vite, normalmente `http://localhost:5173`.

## Scripts disponiveis

| Comando           | Descricao                                                      |
| ----------------- | -------------------------------------------------------------- |
| `npm run dev`     | Inicia o servidor de desenvolvimento do Vite                   |
| `npm run build`   | Executa a verificacao do TypeScript e gera a build de producao |
| `npm run lint`    | Executa o ESLint no projeto                                    |
| `npm run preview` | Serve localmente a build de producao                           |

## Rotas principais

| Perfil      | Rota          | Funcao                    |
| ----------- | ------------- | ------------------------- |
| Publico     | `/`           | Login                     |
| Publico     | `/signup`     | Cadastro                  |
| Colaborador | `/`           | Formulario de reembolso   |
| Colaborador | `/confirm`    | Confirmacao do reembolso  |
| Gestor      | `/`           | Dashboard de solicitacoes |
| Gestor      | `/refund/:id` | Detalhes do reembolso     |

O acesso as rotas e definido pelo papel do usuario autenticado: `employee` ou `manager`.

## Autenticacao

Depois do login, o token e os dados do usuario sao armazenados no `localStorage` com a chave `@refund`. O token tambem e enviado nas requisicoes seguintes pelo header `Authorization` no formato `Bearer <token>`.

Ao sair, os dados locais sao removidos e o usuario retorna para a tela de login.

## Estrutura do projeto

```text
src/
├── assets/       # Imagens e icones utilizados pela aplicacao
├── components/   # Componentes reutilizaveis de interface
├── contexts/     # Contextos globais, como autenticacao
├── dtos/         # Tipos das respostas da API
├── hooks/        # Hooks customizados
├── pages/        # Paginas e telas da aplicacao
├── routes/       # Rotas publicas e rotas por perfil de usuario
├── services/     # Configuracao de acesso a API
└── utils/        # Funcoes auxiliares e formatadores
```

## Build de producao

Para gerar os arquivos de producao:

```bash
npm run build
```

Os arquivos gerados ficam na pasta `dist/` e podem ser servidos com:

```bash
npm run preview
```

## Licenca

Este projeto e destinado a fins de estudo e demonstracao.
