const express = require("express");
const procedureController = require("../controller/procedureController");
const { getAllProcedures, createProcedure, updateProcedure, deleteProcedure } =
  procedureController;
const authcontroller = require("../controller/authController");
const { protect, restrictTo } = authcontroller;

const procedureRouter = express.Router();

procedureRouter
  .route("/")
  .get(getAllProcedures)
  .post(protect, restrictTo("admin"), createProcedure);

procedureRouter
  .route("/:id")
  .patch(protect, restrictTo("admin"), updateProcedure)
  .delete(protect, restrictTo("admin"), deleteProcedure);
module.exports = procedureRouter;
