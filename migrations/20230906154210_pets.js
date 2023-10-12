exports.up = function (knex) {
    return knex.schema.createTable("pets", (table) => {
        table.increments("petId").primary();
        table.string("type").notNull();
        table.string("name").notNull();
        table.string("adoptionStatus").notNull();
        table.string("picture").notNull();
        table.string("breed");
        table.float("height");
        table.float("weight");
        table.string("color");
        table.text("bio");
        table.boolean("hypoallergenic").defaultTo(0);
        table.string("dietary");
        table.integer("ownerId");
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("pets");
};