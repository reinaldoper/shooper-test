# Aplicação de Transporte Particular

Esta aplicação permite que os usuários solicitem viagens em carros particulares, escolham entre diferentes motoristas e visualizem o histórico de viagens. A aplicação utiliza a API do Google Maps para calcular rotas e estimativas de viagem.

## Tecnologias Utilizadas

- **Frontend**: React, TypeScript, @react-google-maps/api
- **Backend**: Node.js, Express, TypeScript
- **Banco de Dados**: PostgreSQL
- **API do Google Maps**: Para cálculo de rotas e estimativas de distância.

## Instalação

### Pré-requisitos

- Node.js
- npm ou yarn
- Docker (opcional, mas recomendado para execução em contêineres)

### Configuração do Ambiente

1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DO_REPOSITORIO>
   ```

2. Para executar a aplicação usando Docker, utilize o seguinte comando:
   ```bash
   docker-compose up
   ```

## Backend

### O backend é uma API REST que fornece os seguintes endpoints:
1. POST /ride/estimate
- Recebe a origem e o destino da viagem.
- Valida se os endereços não estão em branco e se são diferentes.
- Utiliza a API do Google Maps para calcular a rota e a distância entre os pontos.
- Retorna as opções de motoristas disponíveis com seus respectivos valores.
2. PATCH /ride/confirm
- Confirma uma viagem com base no motorista selecionado.
- Atualiza o status da viagem no banco de dados.
3. GET /driver/:id
- Retorna informações sobre um motorista específico.

## Uso da API do Google Maps
1. No Frontend
- A API do Google Maps é utilizada para exibir um mapa interativo onde os usuários podem visualizar a origem e o destino da viagem. Os marcadores são colocados nos pontos corretos usando Marker ou AdvancedMarkerElement conforme necessário.
2. No Backend
- A API do Google Maps é utilizada para calcular rotas entre a origem e o destino fornecidos pelo usuário. Isso permite obter informações precisas sobre distância e tempo estimado para a viagem.
3. Contribuição
- Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.


## Rotas do Frontend

```bash
<Router>
    <Routes>
        <Route path="/" element={!isAuthenticated ? <Login /> : <Navigate to="/request" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/request" element={isAuthenticated ? <RequestRide /> : <Navigate to="/" />} />
        <Route path="/options" element={isAuthenticated ? <RideOptions /> : <Navigate to="/" />} />
        <Route path="/history" element={isAuthenticated ? <RideHistory /> : <Navigate to="/" />} />
        <Route path="/register-driver" element={isAuthenticated ? <RegisterDriver /> : <Navigate to="/" />} />
    </Routes>
</Router>
```


### Considerações Finais

- **Substitua `<URL_DO_REPOSITORIO>`** pelo link real do seu repositório.
- **Substitua `<GOOGLE_API_KEY>`** no docker compose pela sua chave do **GOOGLE**
- **Adicione informações sobre o banco de dados utilizado**, se aplicável.
- **Verifique se todos os detalhes estão corretos** e se refletem sua implementação atual.
- **Adicione mais informações conforme necessário**, como instruções específicas para executar testes ou outras funcionalidades.

Se você precisar de mais ajustes ou detalhes específicos, sinta-se à vontade para perguntar!