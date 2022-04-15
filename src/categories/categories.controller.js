const categoriesService = require("./categories.service");

/* *** PROMISE CHAIN VERSION *** */
// async function list(req, res, next) {
//   categoriesService
//     .list()
//     .then(data => res.json({data}))
//     .catch(next);
// }


/* *** ASYNC AWAIT VERSION *** */
async function list(req, res, next) {
  try{
    const data = await categoriesService.list();
    res.json({data});
  }catch(err){
    next(err);
  }
}

module.exports = {
  list
};
