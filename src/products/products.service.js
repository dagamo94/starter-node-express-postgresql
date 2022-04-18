const knex = require("../db/connection");

const productsTable = "products";

function list() {
    return knex(productsTable).select("*");
}

function read(productId) {
    return knex(productsTable).select("*").where({ product_id: productId }).first();
}

function listOutOfStockCount() {
    return knex(productsTable)
        .select("product_quantity_in_stock as out_of_stock")
        .count("product_id")
        .where({ product_quantity_in_stock: 0 })
        .groupBy("out_of_stock");
}

function listPriceSummary() {
    return knex(productsTable)
        .select("supplier_id")
        .min("product_price")
        .max("product_price")
        .avg("product_price")
        .groupBy("supplier_id");
}
//
function listTotalWeightByProduct() {
    return knex(productsTable)
        .select(
            "product_sku",
            "product_title",
            knex.raw("sum(product_weight_in_lbs * product_quantity_in_stock) as total_weight_in_lbs")
        )
        .groupBy("product_title", "product_sku");
}

module.exports = {
    list,
    read,
    listOutOfStockCount,
    listPriceSummary,
    listTotalWeightByProduct
}