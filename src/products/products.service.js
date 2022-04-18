const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCategory = mapProperties({
    category_id: "category.category_id",
    category_name: "category.category_name",
    category_description: "category.category_description"
});

const addSupplier = mapProperties({
    supplier_id: "supplier.supplier_id"
});

const productsTable = "products";

function list() {
    return knex(productsTable).select("*");
}

function read(product_id) {
    return knex("products as p")
        .join("products_categories as pc", "p.product_id", "pc.product_id")
        .join("categories as c", "pc.category_id", "c.category_id")
        .select("p.*", "c.*")
        .where({"p.product_id": product_id})
        .first()
        .then(addCategory)
        .then(addSupplier);
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