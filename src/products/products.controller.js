const asyncErrorBoundary = require("../errors/asyncErrorBoundary.js");
const productsService = require("./products.service.js");

async function productExists(req, res, next) {
  const { productId } = req.params;
  try {
    const product = await productsService.read(productId);
    if (product) {
      res.locals.product = product;
      return next();
    }
    next({ status: 404, message: `Product with ID: ${productId} not found` });
  } catch (err) {
    next(err);
  }
}

async function read(req, res) {
  const { product: data } = res.locals;
  res.json({ data });
}

function list_Promise_Chain(req, res, next) {
  productsService
    .list()
    .then(data => res.json({ data }))
    .catch(next);
}

async function list(req, res, next) {
  const data = await productsService.list();
  res.json({ data });
}

async function listOutOfStockCount(req, res) {
  res.json({ data: await productsService.listOutOfStockCount() });
}

async function listPriceSummary(req, res) {
  res.json({ data: await productsService.listPriceSummary() });
}

async function listTotalWeightByProduct(req, res) {
  res.json({ data: await productsService.listTotalWeightByProduct() })
}

module.exports = {
  read: [asyncErrorBoundary(productExists), read],
  list: [asyncErrorBoundary(list)],
  listOutOfStockCount: asyncErrorBoundary(listOutOfStockCount),
  listPriceSummary: asyncErrorBoundary(listPriceSummary),
  listTotalWeightByProduct: asyncErrorBoundary(listTotalWeightByProduct)
};
