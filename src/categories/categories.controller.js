const res = require("express/lib/response");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
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
  try {
    const data = await categoriesService.list();
    res.json({ data });
  } catch (err) {
    next(err);
  }
}

/* **** LESSON ASYNC AWAIT VERSION **** */
async function list_Lesson_Version() {
  const data = await categoriesService.list(); // executes a Knex query, which is an asynchronous function. Using the await keyword forces the execution of the code to pause on that line until that asynchronous operation is finished
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list)
};
