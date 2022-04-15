/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// THE 'exports.up' AND 'exports.down' FUNCTIONS SHOULD ALWAYS RETURN A PROMISE.

 exports.up = function (db) {
    return db.schema.createTable("suppliers", (table) => { // pass in the name of the table 'suppliers' and a call back function where the param makes reference to the table
      table.increments("supplier_id").primary(); // Sets supplier_id as the primary key
      table.string("supplier_name");
      table.string("supplier_address_line_1");
      table.string("supplier_address_line_2");
      table.string("supplier_city");
      table.string("supplier_state");
      table.string("supplier_zip");
      table.string("supplier_phone");
      table.string("supplier_email");
      table.text("supplier_notes");
      table.string("supplier_type_of_goods");
      table.timestamps(true, true); // Adds created_at and updated_at columns
    });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("suppliers");
};
