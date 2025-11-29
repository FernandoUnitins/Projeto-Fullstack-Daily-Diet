import knex from 'knex';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuração para caminhos no ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const config = {
  client: 'sqlite3',
  connection: {
    // Cria o arquivo 'db.sqlite' na raiz do backend
    filename: path.resolve(__dirname, '..', 'db.sqlite'),
  },
  useNullAsDefault: true, // Necessário para SQLite
};

export const db = knex(config);
