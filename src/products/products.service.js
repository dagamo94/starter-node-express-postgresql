const knex = require("../db/connection");

const productsTable = "products";

function list(){
    return knex(productsTable).select("*");
}

function read(productId){
    return knex(productsTable).select("*").where({product_id: productId}).first();
}

module.exports = {
    list,
    read
}