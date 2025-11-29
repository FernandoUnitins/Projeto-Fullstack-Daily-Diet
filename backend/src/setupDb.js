import { db } from './database.js';

async function setup() {
  console.log('### Criando e configurando banco de dados...');

  try {
    // 1. Tabela de Usuários (JÁ COM A SENHA)
    const hasUsers = await db.schema.hasTable('users');
    if (!hasUsers) {
      await db.schema.createTable('users', table => {
        table.uuid('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable(); // <--- Adicionamos direto aqui
        table.timestamp('created_at').defaultTo(db.fn.now());
      });
      console.log('-> Tabela "users" criada.');
    }

    // 2. Tabela de Refeições
    const hasMeals = await db.schema.hasTable('meals');
    if (!hasMeals) {
      await db.schema.createTable('meals', table => {
        table.uuid('id').primary();
        table
          .uuid('user_id')
          .references('users.id')
          .notNullable()
          .onDelete('CASCADE');
        table.string('name').notNullable();
        table.text('description');
        table.string('date_time').notNullable();
        table.boolean('on_diet').notNullable();
        table.timestamp('created_at').defaultTo(db.fn.now());
      });
      console.log('--->Tabela "meals" criada.');
    }

    console.log('----> Banco de dados pronto para uso!');
  } catch (err) {
    console.error('Erro:', err);
  } finally {
    await db.destroy();
  }
}

setup();
/*v1
import { db } from './database.js';

async function setup() {
  console.log('🚧 Criando tabelas...');

  try {
    // 1. Tabela de Usuários
    const hasUsers = await db.schema.hasTable('users');
    if (!hasUsers) {
      await db.schema.createTable('users', table => {
        table.uuid('id').primary();
        table.string('name').notNullable();
        table.string('email');
        table.timestamp('created_at').defaultTo(db.fn.now());
      });
      console.log('✅ Tabela "users" criada.');
    }

    // 2. Tabela de Refeições
    const hasMeals = await db.schema.hasTable('meals');
    if (!hasMeals) {
      await db.schema.createTable('meals', table => {
        table.uuid('id').primary();
        table
          .uuid('user_id')
          .references('users.id')
          .notNullable()
          .onDelete('CASCADE');
        table.string('name').notNullable();
        table.text('description');
        table.string('date_time').notNullable();
        table.boolean('on_diet').notNullable();
        table.timestamp('created_at').defaultTo(db.fn.now());
      });
      console.log('✅ Tabela "meals" criada.');
    }

    console.log('🚀 Banco de dados configurado com sucesso!');
  } catch (err) {
    console.error('Erro ao configurar banco:', err);
  } finally {
    await db.destroy();
  }
}

setup();
*/
