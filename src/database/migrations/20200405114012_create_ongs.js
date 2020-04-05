
exports.up = function(knex) {
    //craindo a tabela
    return knex.schema.createTable('ongs', function(table) {
        //craiando as colunas da tabela
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
  });
};

exports.down = function(knex) {
    return knex.schema.dropTable('ongs');
};
