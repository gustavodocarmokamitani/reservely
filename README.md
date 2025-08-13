# 🛠️ Projeto de Agendamento de Serviço

## 🔎 Visão Geral

Este projeto permite a administração de serviços, funcionários e agendamentos de maneira eficiente. Inclui funcionalidades completas para controle de horários, gerenciamento de serviços e funcionários, além de um sistema robusto de autenticação baseado em JWT. A aplicação já está em produção e conta com funcionalidades específicas para clientes, funcionários e administradores.

---

## 🚀 Funcionalidades

### 🔐 Autenticação e Registro

- **Autenticação JWT**: Login e registro seguros utilizando JSON Web Token.
- **Registro de Usuário**: Clientes e funcionários podem se registrar na plataforma.
- **Login**: Login para diferentes níveis de usuário: Cliente, Funcionário e Administrador.

---

### 🛎️ Administração

- **Gerenciamento de Serviços**:
  - Criar, editar e excluir serviços.
  - Definir nome, preço, duração, disponibilidade e descrição.
- **Gerenciamento de Funcionários**:
  - Criar, editar e excluir perfis.
  - Atribuir serviços específicos a cada funcionário.
- **Configurações da Loja**:
  - Abrir/fechar a loja.
  - Definir horários e dias de funcionamento.
  - Marcar feriados e folgas recorrentes.

---

### 📅 Agendamento

- **Clientes**:
  - Escolher funcionário e serviço.
  - Agendar data e horário disponíveis.
- **Funcionários e Admins**:
  - Visualizar e alterar agendamentos.
  - Atualizar status: Pendente, Confirmado, Em andamento, Finalizado ou Cancelado.

---

### 🟢 Status dos Agendamentos

- ⏳ **Pendente**: Aguardando aprovação.
- ✅ **Confirmado**: Aprovado por funcionário ou admin.
- 🔧 **Em andamento**: Serviço em execução.
- 🏁 **Finalizado**: Serviço concluído.
- ❌ **Cancelado**: Agendamento cancelado.

---

## 📤 Envio de E-mails

Integração com **SendGrid** para envio automático de e-mails nos seguintes eventos:

- 🏪 Criação de usuário + loja.
- 👤 Registro de novo cliente.
- 📆 Criação de agendamento.
- ✅ Confirmação de agendamento.
- ✉️ Registro de novo profissional (com verificação por e-mail).

> ⚠️ **Obs.:** O envio é feito somente por e-mail. SMS não está nos planos.

---

## 📊 Funcionalidades Adicionais

- 📈 **Dashboard Analítico**  
  Métricas visuais como serviços mais populares, horários com maior demanda e desempenho de funcionários. *(Usando Chart.js)* ✅

- 🗓️ **Calendário Integrado**  
  Visualização prática dos agendamentos por data. ✅

- 📜 **Histórico de Agendamentos**  
  Exibe os agendamentos anteriores de clientes e funcionários. ✅

- 📱 **Responsividade**  
  Interface totalmente adaptável a dispositivos móveis, tablets e desktops. ✅

---

## 💡 Melhorias Futuras

- 💬 **Avaliações e Feedbacks**  
  Sistema de notas e comentários para clientes após os serviços.

- 🧾 **Promoções e Cupons**  
  Funcionalidade para criar e gerenciar campanhas promocionais.

- 👁️ **Acessibilidade (WCAG)**  
  Melhorar o suporte para navegação por leitores de tela e teclado.

- ⚡ **Atualização em Tempo Real**  
  Implementar WebSockets para atualização automática dos agendamentos (hoje é necessário recarregar a página).

---

## 🧰 Tecnologias Utilizadas

### 🔧 Back-end:
- ASP.NET Core
- JWT
- SendGrid

### 🎨 Front-end:
- React + TypeScript
- Styled-components
- Material-UI + React Bootstrap
- Axios, React Router
- Moment.js, React-datepicker
- Notistack, React Icons
- Chart.js

### 🎨 Deisgn:
![localhost_3000_](https://github.com/user-attachments/assets/c70aecb3-3766-419b-aa2e-1186bef1502c)
![localhost_3000_ (1)](https://github.com/user-attachments/assets/bfe628cb-3b0e-4281-9332-4e0cb0753c8c)
![Captura de tela 2025-06-27 114844](https://github.com/user-attachments/assets/3e3a18f9-b1ba-4ebd-9461-305910dbbbc0)
![localhost_3000_ (3)](https://github.com/user-attachments/assets/5b2591dc-89e6-4220-b52c-5f3fa2e2d52a)
![localhost_3000_service](https://github.com/user-attachments/assets/4d730981-787a-4fc6-a275-060853f9cbbd)
![localhost_3000_history-appointment (3)](https://github.com/user-attachments/assets/8b0e7028-00ce-4ac4-a100-513fd8dd4248)
![localhost_3000_service (1)](https://github.com/user-attachments/assets/ff8ddeac-3a91-479b-a9d7-becb84614641)


---

## 📦 Como Rodar o Projeto

### Frontend

Clone o repositório:
```bash
git clone https://github.com/gustavodocarmokamitani/reservely.git
cd reservely
npm install
npm run start
