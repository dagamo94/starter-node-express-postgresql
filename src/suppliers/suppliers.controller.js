const suppliersService = require("./suppliers.service");
const hasProperties = require("../errors/hasProperties");

const VALID_PROPERTIES = [
  "supplier_name",
  "supplier_address_line_1",
  "supplier_address_line_2",
  "supplier_city",
  "supplier_state",
  "supplier_zip",
  "supplier_phone",
  "supplier_email",
  "supplier_notes",
  "supplier_type_of_goods"
];

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(field => !VALID_PROPERTIES.includes(field));

  if (invalidFields.length) {
    return next({ status: 400, message: `Invalid field${invalidFields.length > 1 ? "s" : ""}: ${invalidFields.join(", ")}` })
  }
  next();
}

// ************* REVIEW **************
const hasRequiredProperties = hasProperties("supplier_name", "supplier_email");
// ************************************
// *** REVIEW: why can't I use this syntax instead of the one above ^^^^
function REVIEW_hasRequiredProperties() {
  hasProperties("supplier_name", "supplier_email")
}

async function supplierExists(req, res, next) {
  const { supplierId } = req.params;

  try {
    const supplier = await suppliersService.read(supplierId);
    if (supplier) {
      res.locals.supplier = supplier;
      return next();
    }
    next({ state: 404, message: `Supplier with ID: ${supplierId} cannot be found` });
  } catch (error) {
    next(error);
  }
}

// *********** REVIEW ****************
function supplierExists_PromiseChainVersion(req, res, next) {
  const { supplierId } = req.params;
  suppliersService
    .read(supplierId)
    .then(supplier => {
      if (supplier) {
        res.locals.supplier = supplier;
        return next();
      }
      next({ status: 404, message: `Supplier with ID: ${supplierId} cannot be found.` });
    })
    .catch(next);

}




async function list(req, res) {
  const suppliersList = await suppliersService.list();
  res.json({ data: suppliersList });
}

async function create(req, res, next) {
  try {
    const data = await suppliersService.create(req.body.data);
    res.status(201).json({ data });
  } catch (error) {
    next(error);
  }
}

function create_PromiseChainVersion(req, res, next) {
  suppliersService
    .create(req.body.data)
    .then(data => res.status(201).json({ data }))
    .catch(next);
}

/*
The function above calls the SuppliersService.update() method, passing in the updatedSupplier object. Note that the supplier_id of updatedSupplier is always set to the existing supplier_id (res.locals.supplier.supplier_id) to prevent the update from accidentally, or intentionally, changing the supplier_id during an update. If the promise resolves successfully, then the server responds with the updated supplier.
*/

// **** Example code in the lesson uses promise chains wheres the gitHub repo comes with async functions like below
async function update(req, res, next) {
  const updatedSupplier = {
    ...req.body.data,
    supplier_id: res.locals.supplier.supplier_id
  };

  try {
    const data = await suppliersService.update(updatedSupplier);
    res.json({ data });
  } catch (error) {
    next(error);
  }
}

// **** Example from lesson using promise chain
function update_PromiseChainVersion(req, res, next){
  const udpatedSupplier = {
    ...req.body.data,
    supplier_id: res.locals.supplier.supplier_id
  };
  suppliersService
    .update(updatedSupplier)
    .then(data => res.json({data}))
    .catch(next);
}

async function destroy(req, res, next) {
  try{
    await suppliersService.delete(res.locals.supplier.supplier_id);
    res.sendStatus(204);
  }catch(error){
    next(error);
  }
}

module.exports = {
  list,
  create: [hasOnlyValidProperties, hasRequiredProperties, create],
  update: [supplierExists, hasOnlyValidProperties, hasRequiredProperties, update],
  delete: [supplierExists, destroy],
};
