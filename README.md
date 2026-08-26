# MPredict

> **Sistema de Monitoramento e Gestão de Manutenção Preditiva**

O **MPredict** é uma aplicação voltada ao monitoramento da saúde de máquinas industriais e à gestão de processos de manutenção preditiva e preventiva.

O sistema centraliza informações provenientes do monitoramento dos equipamentos, permitindo acompanhar indicadores operacionais, realizar inspeções técnicas, registrar intervenções, receber alertas e analisar o histórico de manutenção.

A proposta é melhorar o **desempenho da manutenção e a produtividade das máquinas**, permitindo que equipes técnicas identifiquem situações que necessitam de intervenção antes que ocorram falhas mais graves.

---

## 🎯 Objetivos

O MPredict tem como principais objetivos:

* Monitorar a condição dos equipamentos em tempo real;
* Auxiliar na identificação de necessidades de manutenção;
* Centralizar informações sobre máquinas e intervenções;
* Facilitar a execução de inspeções preventivas;
* Registrar o histórico de manutenções;
* Emitir alertas relacionados à manutenção dos equipamentos;
* Disponibilizar indicadores para acompanhamento da operação;
* Apoiar a tomada de decisão da equipe responsável pela manutenção.

---

## ⚙️ Monitoramento das Máquinas

O sistema foi concebido para trabalhar em conjunto com sensores instalados nas máquinas.

No protótipo, sensores serão acoplados aos equipamentos para realizar o monitoramento de parâmetros como a **temperatura dos rolamentos e engrenagens**, além da identificação de pontos relacionados à lubrificação.

Entre os equipamentos considerados no projeto está o **torno mecânico**, com foco em regiões como:

* Caixa de engrenagens;
* Caixa de engrenagem longitudinal;
* Eixo-árvore;
* Caixa de tensão.

O projeto também considera a aplicação do monitoramento em outros equipamentos industriais, como furadeiras e fresadoras.

---

## 📊 Indicadores

Cada máquina poderá apresentar indicadores específicos para acompanhamento de seu estado.

### 🌡️ Temperatura

* Valor atual da temperatura em °C;
* Indicador visual do nível de temperatura;
* Registro temporal das variações;
* Identificação de variações atípicas.

O sistema deve permitir identificar **em que momento ocorreu uma variação significativa de temperatura**, possibilitando uma análise temporal do comportamento do equipamento.

### 🛢️ Lubrificação

* Indicador do nível de óleo ou fluido;
* Identificação da necessidade de substituição;
* Alertas relacionados à lubrificação.

### 📳 Vibração

O projeto inicialmente contempla um indicador de vibração capaz de identificar quando os valores ultrapassarem limites estabelecidos.

Entretanto, os documentos registram que existe uma recomendação para que esse módulo seja retirado ou permaneça configurável. Por isso, o indicador de vibração deverá ser considerado um **módulo opcional**.

---

## 📋 Checklist de Inspeção

O MPredict disponibiliza um checklist de manutenção preventiva vinculado à máquina selecionada.

Entre os itens previstos estão:

* [ ] Limpeza e lubrificação do barramento;
* [ ] Verificação da tensão das correias;
* [ ] Inspeção do sistema e painel elétrico;
* [ ] Teste do botão de parada de emergência;
* [ ] Verificação de ruídos e vibrações atípicas.

Ao finalizar a inspeção, o técnico poderá validar o checklist por meio de **assinatura digital**.

---

## 📜 Histórico de Manutenção

Cada equipamento possui um histórico centralizado de suas intervenções.

Cada registro de manutenção deverá armazenar:

* Data e hora da manutenção;
* Peças ou componentes substituídos;
* Técnico responsável;
* Identificação do técnico;
* Observações;
* Laudos ou informações técnicas adicionais.

O histórico poderá ser acessado diretamente pela máquina ou por meio do QR Code associado ao equipamento.

---

## 🔔 Alertas e Notificações

O sistema possui uma central de alertas destinada a informar situações que exigem atenção da equipe de manutenção.

Entre os alertas previstos estão:

* Próxima manutenção programada;
* Necessidade de troca de óleo ou lubrificante;
* Inspeções preventivas vencidas;
* Equipamentos parados para reparo.

Esses alertas são apresentados como parte da visão geral da oficina, permitindo identificar rapidamente equipamentos que necessitam de intervenção.

---

## 📈 Relatórios

O módulo de relatórios permite acompanhar indicadores relacionados à manutenção dos equipamentos.

### KPIs previstos

* Número total de manutenções;
* Manutenções preventivas e corretivas;
* Tempo total de parada das máquinas (**Downtime**);
* Custos acumulados com peças e manutenção;
* Falhas mais frequentes por equipamento.

Também está prevista a possibilidade de **exportação dos relatórios em PDF**.

---

## 🏭 Cadastro de Máquinas

O sistema possui uma área destinada ao cadastro dos equipamentos monitorados.

### Informações previstas

* Nome do equipamento;
* ID do ativo;
* Tipo de equipamento;
* Limites de alerta;
* Localização na fábrica.

Entre os tipos de equipamentos considerados estão tornos, fresadoras e outros equipamentos industriais.

---

## 👤 Perfil do Profissional

O MPredict possui uma área destinada às informações do técnico ou profissional responsável pelo uso do sistema.

São previstas as seguintes informações:

* Nome completo;
* Cargo ou função;
* Registro profissional / ID;
* Turno de trabalho;
* Histórico de checklists preenchidos.

---

## 📱 QR Code

Cada máquina poderá possuir um **QR Code próprio**.

A leitura do código através do dispositivo permite acessar rapidamente as informações relacionadas ao equipamento, incluindo seu histórico de manutenção.

Essa funcionalidade foi proposta para facilitar o uso do sistema diretamente no ambiente da oficina.

### Fluxo previsto

```text
Máquina
   │
   ▼
QR Code
   │
   ▼
Leitura pelo MPredict
   │
   ▼
Informações do equipamento
   │
   ├── Monitoramento
   ├── Checklist
   ├── Histórico
   └── Relatórios
```

---

## 📡 Arquitetura de Monitoramento

A proposta do protótipo prevê a utilização de sensores instalados diretamente nas máquinas.

O fluxo conceitual é:

```text
┌──────────────────┐
│ Máquina Industrial│
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│     Sensores     │
│                  │
│ • Temperatura    │
│ • Lubrificação   │
│ • Vibração*      │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Processamento /  │
│ Comunicação      │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│     MPredict     │
│                  │
│ Monitoramento    │
│ Alertas          │
│ Checklists       │
│ Histórico        │
│ Relatórios       │
└──────────────────┘

* Módulo opcional
```

O documento de prototipação cita a possibilidade de utilização de **ESP32** e registra que a definição da plataforma de comunicação/processamento ainda faz parte da investigação técnica do projeto.

---

## 🧭 Estrutura da Aplicação

A navegação principal proposta para o MPredict é:

```text
Tela Inicial
    │
    ├── Máquinas
    │     ├── Monitoramento
    │     ├── Checklist
    │     ├── Histórico
    │     └── Relatórios
    │
    ├── Checklist
    │
    ├── Histórico
    │
    ├── Relatórios
    │
    ├── Cadastro de Máquinas
    │
    └── Perfil do Profissional
```

A estrutura foi definida no briefing do sistema como:

**Tela Inicial → Máquinas → Checklist → Histórico → Relatórios → Cadastro → Perfil do Profissional.**

---

## 🏠 Dashboard

A tela inicial apresenta uma visão geral da oficina.

### Status dos equipamentos

Os equipamentos poderão ser classificados visualmente como:

* 🟢 Em operação;
* 🟡 Em alerta;
* 🔴 Parados.

### Acessos rápidos

O dashboard também contempla:

* Acesso ao scanner de QR Code;
* Central de alertas;
* Próximas manutenções;
* Alertas de lubrificação;
* Inspeções vencidas;
* Máquinas paradas.

---

## 🔌 Modo Offline

Uma das funcionalidades desejáveis do projeto é permitir que técnicos utilizem o sistema dentro da oficina mesmo sem conexão com a internet.

Nesse cenário, o profissional poderá:

* Consultar informações;
* Preencher checklists;
* Registrar informações localmente;
* Sincronizar os dados quando a conexão estiver disponível.

A proposta considera uma implementação baseada em **PWA / Local Storage**.

---

## ✍️ Assinatura Digital

O sistema prevê a utilização de assinatura digital para validação das inspeções.

O técnico poderá realizar a assinatura diretamente utilizando:

* Touchscreen;
* Mouse.

Essa assinatura estará associada ao checklist realizado pelo profissional responsável.

---

## 📄 Exportação de Relatórios

Os dados analíticos do sistema poderão ser exportados para **PDF**, permitindo gerar relatórios técnicos formatados para utilização e documentação das atividades de manutenção.

---

## 🎨 Identidade Visual

O projeto propõe uma identidade visual baseada no conceito **Industrial Moderno**.

### Paleta

* 🔵 Azul;
* ⚪ Branco;
* ⚫ Preto;
* ⚙️ Cinza.

A interface deve priorizar clareza das informações, leitura rápida dos indicadores e visualização objetiva do estado dos equipamentos.

---

## 🚧 Status do Projeto

> **Em desenvolvimento / Prototipação**

O projeto contempla tanto o desenvolvimento da aplicação quanto a construção do protótipo físico responsável pela coleta dos dados.

As etapas previstas incluem:

* Desenvolvimento do código da aplicação;
* Criação do protótipo;
* Definição dos componentes;
* Desenvolvimento dos esquemas;
* Testes planejados;
* Simulação e análise dos dados obtidos.

---

## 🔮 Possíveis Evoluções

Entre as funcionalidades identificadas nos documentos como melhorias ou recursos desejáveis estão:

* [ ] Integração completa com sensores físicos;
* [ ] Comunicação com ESP32 ou plataforma equivalente;
* [ ] QR Code individual por máquina;
* [ ] Funcionamento offline;
* [ ] Sincronização automática dos dados;
* [ ] Assinatura digital;
* [ ] Exportação de relatórios em PDF;
* [ ] Módulo configurável de vibração;
* [ ] Ampliação do monitoramento para diferentes tipos de máquinas.

---

## 📌 Escopo Funcional

| Módulo                 | Descrição                                        |
| ---------------------- | ------------------------------------------------ |
| **Dashboard**          | Visão geral do estado das máquinas e alertas     |
| **Máquinas**           | Monitoramento individual dos equipamentos        |
| **Temperatura**        | Acompanhamento e registro das variações térmicas |
| **Lubrificação**       | Monitoramento do nível de óleo/fluido            |
| **Vibração**           | Monitoramento opcional de vibração               |
| **Checklist**          | Inspeção preventiva dos equipamentos             |
| **Histórico**          | Registro das manutenções realizadas              |
| **Alertas**            | Notificações sobre situações de manutenção       |
| **Relatórios**         | Indicadores e análise da manutenção              |
| **Cadastro**           | Gerenciamento dos equipamentos                   |
| **Perfil**             | Informações e histórico do profissional          |
| **QR Code**            | Acesso rápido às informações da máquina          |
| **Modo Offline**       | Operação da aplicação sem conexão                |
| **Assinatura Digital** | Validação dos checklists                         |
| **PDF**                | Exportação dos relatórios                        |

---

## 📚 Fundamentação do Projeto

O projeto prevê uma fundamentação envolvendo conceitos de manutenção, normas técnicas e tecnologias relacionadas ao desenvolvimento do protótipo.

Entre os referenciais indicados estão:

* Normas **ABNT**;
* **NRs** relacionadas ao contexto industrial;
* Normas **ISO**;
* Tecnologias utilizadas na construção do protótipo;
* Métodos de monitoramento e manutenção preditiva.

A metodologia também contempla a documentação dos componentes utilizados, softwares, esquemas, testes e análise dos dados obtidos.

---

## 📄 Licença

Este projeto está em fase de desenvolvimento e prototipação. A definição da licença de distribuição deverá ser realizada posteriormente.
