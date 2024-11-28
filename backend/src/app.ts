import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Sequelize } from 'sequelize';
import routes from './routes/index';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());


const sequelize = new Sequelize(process.env.DATABASE_URL as string);

sequelize.authenticate()
  .then(() => console.log('Conectado ao banco de dados'))
  .catch(err => console.error('Não foi possível conectar ao banco de dados:', err));

app.use('/', routes);


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});