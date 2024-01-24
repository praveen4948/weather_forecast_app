const place = require("../model/place");

const handleError = (error) => {
  let errorMessage = { message: "An error occurred" };

  if (error.name === "ValidationError") {
    // Mongoose validation error, which may include required field violations
    errorMessage = {
      message: "Validation error",
      errors: {},
    };

    Object.keys(error.errors).forEach((key) => {
      errorMessage.errors[key] = error.errors[key].message;
    });
  } else if (error.code === 11000) {
    // Duplicate key error (unique constraint violation)
    errorMessage = {
      message: "Duplicate key error",
      key: Object.keys(error.keyPattern)[0],
    };
  }

  return errorMessage;
};

module.exports.add_place = async (req, res) => {
  try {
    const response = await place.create(req.body);
    res.json(response);
  } catch (error) {
    const err = handleError(error);
    res.status(400).json(err);
  }
};

module.exports.get_all_places = async (req, res) => {
  try {
    const response = await place.find();
    res.json(response);
  } catch (error) {
    const err = handleError(error);
    res.json(err);
  }
};

module.exports.get_place_by_id = async (req, res) => {
  const _id = req.params.id;
  try {
    const response = await place.find({ _id });
    res.json(response);
  } catch (error) {
    const err = handleError(error);
    res.status(404).json(err);
  }
};


module.exports.update_place = async (req, res) => {
  const _id = req.params.id;
  const data = req.body;

  try {
    const updatedPlace = await place.findOneAndUpdate(
      { _id },
      { $set: data },
      { new: true }
    );

    res.json({ message: "Document updated successfully", data: updatedPlace });

  } catch (error) {
    res.status(403).json({error: 'Place doest not exit with this id.'});
  }
};

module.exports.delete_place = async (req, res) => {
  const _id = req.params.id;

  try {
    const result = await place.deleteOne({ _id });

    if (result.deletedCount === 1) {
      res.json({ message: "Document deleted successfully" });
    } else {
      res
        .status(404)
        .json({ message: "Document not found with the specified ID" });
    }
  } catch (error) {
    const err = handleError(error);
    res.status(500).json(err);
  }
};
