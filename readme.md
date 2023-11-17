# TripFriend

## _Projeto avaliativo final para a disciplina de Programação Web 4 - IFSP/2023_
### Prof. Hilton César
#

## Propósito e utilização do sistema
A ideia do TripFriend é criar uma comunidade de pessoas que compartilham o desejo comum de viajar e explorar o mundo! Para utiizar o sistema, é necessário primeiramente criar uma conta. Após autenticação, você pode criar uma viagem ou então visualizar as viagens cadastradas e os viajantes que se juntaram a elas. Você pode também se juntar a uma viagem que tenha interesse, de acordo com o destino ou afinidade com o perfil dos viajantes. Uma vez logado no sistema, você pode também cancelar qualquer viagem que você criou.

## API Backend
A API do backend foi construída utilizando Node Express com auxílio das bibliotecas nodemon, cors, body-parser e mysql para criação e manipulação do banco de dados.

### Rotas
| Operação | Rota | Retorno |
| ------ | ------ | ------ |
| BASE URL| http://localhost:3001 | URL base|
| POST | /register| cria um usuário |
| PUT | /edit/user/:id| edita os dados de um usuário |
| POST | /login| faz login no sistema |
| GET | /viajante/id/:userId| localiza um usuário pelo id |
|POST|/trips|cria uma viagem|
| GET | /trips | lista as viagens cadastradas |
| POST | /trips/:tripId/join| adiciona um viajante a uma viagem |
| GET | /tripviajantes/:tripId| obtém a lista de viajantes de uma viagem|
|DELETE|/trip/delete/:id| remove uma viagem e os viajantes associados|
| DELETE | /tripviajantes/:tripId| remove um viajante de uma lista de viagem|


## Frontend
O frontend foi desenvolvido em React JS utilizando as bibliotecas axios para comunicação com API, react-bootstrap para estilização das folhas de estilo, toast para notificações mais elegantes e react-router-dom para manipulação das rotas.

## Desenvolvedores
Roberto Augusto Silva Molina | Vinicius Meyer Laroza