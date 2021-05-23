var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");

//Route
var adminRouter = require("./routes/admin");
var loginRouter = require("./routes/login");
var apiRouter = require("./routes/api");
var auth = require("./util/authen");

//database
const mongoConnect = require("./util/database").mongoConnect;
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
//Controller
const errorController = require("./controllers/error");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
    session({
        secret: process.env.JWT_KEY,
        resave: true,
        saveUninitialized: true,
        cookie: {
            secure: false,
        },
    })
);

// console.trace debug error
app.use(logger("dev"));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use('/', indexRouter);
app.use("/", loginRouter);
app.use("/admin", adminRouter);
app.use("/api", apiRouter);
// app.use('/admin', adminRouter);
// catch 404 and forward to error handler
app.use(errorController.get404);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});
// error handler3
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

mongoConnect(() => {});

module.exports = app;