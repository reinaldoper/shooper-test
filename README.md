# Aplicação de Transporte Particular

Esta é uma aplicação de transporte particular desenvolvida como parte de um teste técnico para a Shopper.com.br. O sistema permite que usuários solicitem viagens de um ponto A a um ponto B, escolham entre motoristas disponíveis e confirmem suas viagens.

## Estrutura do Projeto

O projeto é dividido em duas partes principais:

- **Backend**: API REST em Node.js com TypeScript.
- **Frontend**: Interface do usuário (a ser implementada).

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- Sequelize (ORM)
- Axios (para chamadas HTTP)
- Google Maps API
- Docker

## Configuração do Backend

### Pré-requisitos

Antes de executar o projeto, certifique-se de ter o seguinte instalado:

- Node.js
- Docker e Docker Compose

### Instalação

1. Clone o repositório:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DA_PASTA>
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Para construir e executar a aplicação usando Docker, execute:
   
   ```bash
   docker-compose up
   ```

## Endpoints da API

### A API possui os seguintes endpoints:
1. POST /ride/estimate
Responsável por receber a origem e o destino da viagem e realizar os cálculos dos valores da viagem.
Validações:
- Os endereços de origem e destino não podem estar em branco.
- O ID do usuário não pode estar em branco.
- Os endereços de origem e destino não podem ser o mesmo endereço.
Retorno:
- Latitude e longitude dos pontos iniciais e finais.
- Distância e tempo do percurso.
- Opções de motoristas disponíveis com seus respectivos valores.

2. PATCH /ride/confirm
- Confirma uma corrida com os detalhes fornecidos.
Requisitos:
- Recebe os dados da corrida, incluindo customer_id, origin, destination, distance, duration, driver_id e value.
Retorno:
- Confirmação da criação da corrida.
3. GET /ride/:customer_id
- Recupera o histórico de corridas para um cliente específico.
Parâmetros:
- customer_id: ID do cliente cujas corridas devem ser retornadas.
Retorno:
- Lista das corridas realizadas pelo cliente.