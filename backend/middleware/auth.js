// Dev auth stub — replace with real JWT auth later.
// Matches the user id used in scripts/seedTasks.js .
const SEED_USER_ID = "64b0f2c8e1a2b3c4d5e6f701";

module.exports = (req, res, next) => {
  req.user = {
    id: req.headers["x-user-id"] || SEED_USER_ID,
  };
  next();
};
