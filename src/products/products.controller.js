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
  res.json({data});
}

function list(req, res, next) {
  productsService
    .list()
    .then(data => res.json({ data }))
    .catch(next);
}

module.exports = {
  read: [productExists, read],
  list: [list],
};
