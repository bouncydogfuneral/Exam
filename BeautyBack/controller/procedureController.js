const Procedure = require("../model/proceduresModel");

exports.getAllProcedures = async (req, res) => {
  try {
    const procedures = await Procedure.find();
    res.status(200).json({
      status: "success",
      results: procedures.length,
      data: {
        procedures,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
exports.getOneProcedure = async (req, res) => {
  try {
    const { id } = req.params;
    const procedure = await Procedure.findById(id);
    res.status(200).json({
      status: "success",
      data: {
        procedure,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.createProcedure = async (req, res) => {
  try {
    const newProcedure = await Procedure.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        procedure: newProcedure,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
exports.updateProcedure = async (req, res) => {
  try {
    const { id } = req.params;
    const procedure = await Procedure.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        procedure,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.deleteProcedure = async (req, res) => {
  try {
    const { id } = req.params;
    const procedure = await Procedure.findByIdAndDelete(id);
    res.status(200).json({
      status: "success",
      data: {
        procedure,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
