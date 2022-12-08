const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validateToDoInput = (data) => {
  let errors = {};

  if (isEmpty(data.title)) {
    errors.title = "Title field can not be empty";
  } else if (!Validator.isLength(data.title, { min: 1, max: 20 })) {
    errors.content = "title field must be between 1 and 20 characters";
  }
  if (isEmpty(data.desc)) {
    errors.desc = "Description field can not be empty";
  } else if (!Validator.isLength(data.desc, { min: 1, max: 300 })) {
    errors.content = "Description field must be between 1 and 300 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateToDoInput;
