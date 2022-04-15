const db = require("../db/connection");

function list() {
    return db("suppliers").select("*");
}

function create(supplier) {
    return db("suppliers")
        .insert(supplier)
        .returning("*")
        .then(createdRecords => createdRecords[0]);
}

function read(supplier_id) {
    return db("suppliers").select("*").where({ supplier_id }).first();
}

function update(updatedSupplier) {
    return db("suppliers")
        .select("*")
        .where({ supplier_id: updatedSupplier.supplier_id })
        .update(updatedSupplier, "*")
        .then(updatedRecords => updatedRecords[0]); // optional line to return only the one record being updated
}

function destroy(supplier_id) {
    return db("suppliers").where({ supplier_id }).del();
}

module.exports = {
    list,
    create,
    read,
    update,
    delete: destroy
};