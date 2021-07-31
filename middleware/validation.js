const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

exports.signupRules = () => {
  return [
    body("email", "Please enter a valid email.")
      .isEmail()
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-mail already exists.");
          }
        });
      })
      .normalizeEmail(),
    body("password", "Please enter a password at least 6 characters.")
      .isLength({ min: 6 })
      .trim(),
    body("password", "Passwords don't match.").equals("confirmPassword").trim(),
  ];
};

exports.signupCheck = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  let errorMessage = errors.array()[0].msg;
  let errorParameter = errors.array()[0].param;
  return res.status(422).render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    errorMessage: errorMessage,
    oldInput: {
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    },
    validationErrorParam: errorParameter,
  });
};

exports.loginRules = () => {
  return [
    body("password", "Please enter a password").isLength({ min: 1 }).trim(),
    body("email", "Invalid email or password")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((user) => {
          if (!user) {
            return Promise.reject("Invalid email or password");
          }
          const passMatched = bcrypt.compareSync(
            req.body.password,
            user.password
          );
          if (!passMatched) {
            return Promise.reject("Invalid email or password");
          }
        });
      })
      .normalizeEmail(),
  ];
};

exports.loginCheck = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  let errorMessage = errors.array()[0].msg;
  let errorParameter = errors.array()[0].param;
  return res.status(422).render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage: errorMessage,
    oldInput: {
      email: req.body.email,
      password: req.body.password,
    },
    validationErrorParam: errorParameter,
  });
};

exports.productRules = () => {
  return [
    body("title")
      .isString()
      .isLength({ min: 3 })
      .trim()
      .withMessage("Title must be at least 3 characters long."),
    body("price").isFloat().withMessage("Please enter a valid number."),
    body("description")
      .isLength({ min: 2, max: 500 })
      .trim()
      .withMessage("Description must between 2 and 500 characters."),
  ];
};

exports.addProductCheck = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  let errorMessage = errors.array()[0].msg;
  let errorParameter = errors.array()[0].param;
  return res.status(422).render("admin/edit-product", {
    path: "/admin/add-product",
    pageTitle: "Add Product",
    product: {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
    },
    errorMessage: errorMessage,
    validationErrorParam: errorParameter,
    hasError: true,
    editing: false,
  });
};

exports.editProductCheck = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  let errorMessage = errors.array()[0].msg;
  let errorParameter = errors.array()[0].param;
  return res.status(422).render("admin/edit-product", {
    path: "/admin/edit-product",
    pageTitle: "Edit-product",
    product: {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
    },
    errorMessage: errorMessage,
    validationErrorParam: errorParameter,
    hasError: true,
    editing: true,
  });
};
