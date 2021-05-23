const Books = require("../models/Book");
const CATEGORY = require("../models/Category");
const multer = require("multer");
var path = require("path");
const {
    ObjectId
} = require("bson");

const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: function(req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000,
    },
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    },
}).single("myImage");

// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb("Error: Images Only!");
    }
}

//GET:
exports.getIndex = (req, res, next) => {
    console.log("🚀 ~ file: admin.js ~ line 42 ~ req", req);
    res.render("admin/index2", {
        title: "Express",
    });
};

// ==> QUAN LY SAN PHAM
//GET:
exports.getListProduct = (req, res, next) => {
    const q = req.query.q;
    if (q) {
        console.log("🚀 ~ file: admin.js ~ line 56 ~ q", q);
    } else {
        Books.fetchAll().then((Book) => {
            res.render("admin/pages/forms/general", {
                title: "Express",
                Books: Book,
            });
        });
    }
};
exports.getAddProduct = (req, res, next) => {
    CATEGORY.find({}, function(err, categories) {
        res.render("admin/pages/forms/advanced", {
            title: "Express",
            editing: false,
            categories: categories,
        });
    });
};

exports.getProductDetails = (req, res, next) => {
    res.render("admin/pages/forms/editors", {
        title: "Express",
        isDetail: false,
    });
};

exports.getProductDetails_BookID = (req, res, next) => {
    const isDetails = req.query.isDetails;
    const id = req.params.BookId;
    const Book = Books.FindById(id);

    res.render("admin/pages/forms/editors", {
        title: "Express",
        isDetail: isDetails,
        Book: Book[0],
    });
};
exports.getEditProduct_BookID = (req, res, next) => {
    console.log("heello");
    const edit = req.query.edit;
    const id = req.params.BookId;

    Books.FindById(id).then((books) => {
        CATEGORY.find({}, function(err, categories) {
            res.render("admin/pages/forms/advanced", {
                editing: edit,
                Book: books,
                title: "Update sản phẩm",
                categories: categories,
            });
        });
    });
};
//POST:
exports.postAddProduct = (req, res, next) => {
    upload(req, res, (err) => {
        console.log("🚀 ~ file: admin.js ~ line 111 ~ upload ~ req", req);

        if (err) {
            // res.render("index", {
            //   msg: err,
            // });
        } else {
            if (req.file == undefined) {} else {
                const {
                    title,
                    price,
                    authors,
                    categories,
                    pagecount,
                    description,
                    date,
                } = req.body;
                const Linkimage = `/uploads/${req.file.filename}`;
                var fullUrl = req.protocol + "://" + req.get("host") + Linkimage;
                console.log("fullurl", fullUrl);
                const Book = new Books(
                    null,
                    title,
                    price,
                    authors,
                    fullUrl,
                    categories,
                    description,
                    pagecount,
                    date
                );
                Book.save().then((result) => {
                    res.redirect("/admin/list-product");
                });
            }
        }
    });
};

exports.postListProduct_BookID = (req, res, next) => {
    console.log("post delete");
    const id = req.params.BookId;
    console.log("🚀 ~ file: admin.js ~ line 166 ~ id", id);

    Books.DeleteWithId(id)
        .then(() => {
            console.log("DESTROYED PRODUCT");
            res.redirect("/admin/list-product");
        })
        .catch((err) => console.log(err));
};
exports.postEditProduct = (req, res, next) => {
    upload(req, res, (err) => {
        console.log("🚀 ~ file: admin.js ~ line 111 ~ upload ~ req", req);

        if (err) {
            res.render("index", {
                msg: err,
            });
        } else {
            if (req.file == undefined) {} else {
                const {
                    title,
                    price,
                    authors,
                    categories,
                    pagecount,
                    description,
                    date,
                } = req.body;
                const Linkimage = `/uploads/${req.file.filename}`;
                var fullUrl = req.protocol + "://" + req.get("host") + Linkimage;
                console.log("fullurl", fullUrl);
                const Book = new Books(
                    null,
                    title,
                    price,
                    authors,
                    fullUrl,
                    categories,
                    description,
                    pagecount,
                    date
                );
                Book.save().then((result) => {
                    res.redirect("/admin/list-product");
                });
            }
        }
    });
};

// ==> QUAN LY PHAN LOAI

//GET:
exports.getAddNewProduct = (req, res, next) => {
    res.render("admin/pages/tables/data", {
        title: "Express",
        editing: false,
    });
};
exports.getDeleteCateGory = (req, res, next) => {
    const id = req.params.CategoryID;
    console.log(
        "🚀 ~ file: admin.js ~ line 228 ~ exports.getDeleteCateGory ~ id",
        id
    );

    CATEGORY.deleteOne({
            _id: id,
        },
        (err) => {
            if (err) {
                console.error(err);
            }
        }
    );
    res.redirect("/admin/list-category");
};
exports.getEditCateGory = (req, res, next) => {
    const id = req.params.CategoryID;
    const edit = req.query.edit;
    CATEGORY.findById(id, function(err, Category) {
        console.log("🚀 ~ file: admin.js ~ line 240 ~ Category", Category);

        res.render("admin/pages/tables/data", {
            title: "Express",
            Category: Category,
            editing: edit,
        });
    });
};
exports.getListCategory = (req, res, next) => {
    CATEGORY.find({}, (err, category) => {
        res.render("admin/pages/tables/simple", {
            title: "Express",
            ListOfCategory: category,
        });
    });

    // const q = req.query.q;
    // console.log(q);
};

//POST:
exports.PostAddNewProduct = (req, res, next) => {
    console.log("helo post");
    const name = req.body.name;
    var categories = new CATEGORY({
        name: name,
    });

    CATEGORY.create(categories, (err, small) => {
        if (err) {
            console.trace(err);
        }
    });
    res.redirect("/admin/list-category");
};

exports.PostEditProduct = (req, res, next) => {
    console.log('id', req.params.CategoryID);
    CATEGORY.findByIdAndUpdate(req.params.CategoryID, req.body, (err, user) => {
        if (err) {
            return res
                .status(500)
                .send({
                    error: "unsuccessful"
                })
        };
        res.redirect("/admin/list-category");
    });
}


//SIGNOUT

exports.getSignout = (req, res, next) => {
    req.session.destroy(function(err) {
        res.redirect("/login"); //Inside a callback… bulletproof!
    });
};