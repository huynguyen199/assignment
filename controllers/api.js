const Book = require("../models/Book");
const User = require("../models/User");
const CATEGORY = require("../models/Category");
const STUDENT = require("../models/Student");
const HUY = require("../models/huy");

exports.getProducts = (req, res, next) => {
  STUDENT.find().then((products) => {
    res.send(products);
  });

  // Book.fetchAll().then((products) => {
  //   res.send({
  //     products,
  //   });
  // });
};

exports.getProductsById = (req, res, next) => {
  let { id } = req.params;
  Book.FindById(id).then((products) => {
    res.send({
      products,
    });
  });
};

exports.postApiLogin = (req, res, next) => {
  let { username, password } = req.body;
  let isUser = false;
  User.findOne({ username: username, password: password }, (err, user) => {
    if (err) {
      console.trace(err);
    }
    if (user) {
      // isUser = true;
      console.log("server user:", user);
      res.send({ success: true });
    } else {
      res.send({ success: false });

      // isUser = false;
    }
  });

  // res.end();
};

exports.postApiRegister = (req, res, next) => {
  console.log("SERVER: REGISTER");

  let { username, password } = req.body;
  var user = new User({
    username: username,
    password: password,
  });
  console.log("user", user);
  User.count({ username: username }, (err, count) => {
    console.log("🚀 ~ file: api.js ~ line 52 ~ User.count ~ count", count);

    if (count > 0) {
      res.send({ success: false });
    } else {
      User.create(user, (err, user) => {
        if (user) {
          res.send({ success: true });
        }
      });
    }
  });

  //   User.create(user, (err, user) => {
  //     if (err) {
  //       console.trace(err);
  //     }
  //     if (user) {
  //       res.send({ success: true });
  //     }
  //   });
  // } else {
  //   res.send({ success: false });
  // }
};
