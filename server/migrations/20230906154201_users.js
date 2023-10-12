exports.up = function (knex) {
    return knex.schema.createTable("users", (table) => {
        table.increments("userId").primary();
        table.string("first_name").notNull();
        table.string("last_name").notNull();
        table.string("email").notNull();
        table.string("phone_number");
        table.string("password").notNull();
        table.string("bio");
        table.boolean("is_admin").defaultTo(0);
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
};
exports.down = function (knex) {
    return knex.schema.dropTable("users");
};