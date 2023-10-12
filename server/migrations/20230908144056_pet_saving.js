exports.up = function (knex) {
    return knex.schema.createTable("pet_saving", (table) => {
        table.increments("id").primary();
        table.integer("petId").unsigned().references("petId").inTable("pets");
        table.integer("userId").unsigned().references("userId").inTable("users");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("pet_saving");
};
