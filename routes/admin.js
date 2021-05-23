var express = require("express");
var auth = require("../util/authen");

var router = express.Router();

const adminController = require("../controllers/admin");

//PAGE ADMIN
/* GET admin listing. */
router.get("/", adminController.getIndex);

// ==> QUAN LY SAN PHAM

//GET:
router.get("/list-product", adminController.getListProduct);
router.get("/add-product", adminController.getAddProduct);
router.get("/edit-product/:BookId", adminController.getEditProduct_BookID);
router.get("/product-details", adminController.getProductDetails);
router.get(
    "/product-details/:BookId",
    adminController.getProductDetails_BookID
);

//POST:
router.post("/list-product/:BookId", adminController.postListProduct_BookID);
router.post("/add-product", adminController.postAddProduct);
router.post("/edit-product", adminController.postEditProduct);
//--------------------------------------------------------------------------

// ==> QUAN LY PHAN LOAI
//POST:
router.get("/list-category", adminController.getListCategory);
router.get("/add-new-product", adminController.getAddNewProduct);
router.get("/delete_category/:CategoryID", adminController.getDeleteCateGory);
router.get("/edit_category/:CategoryID", adminController.getEditCateGory);

//GET:
router.post("/add-new-product", adminController.PostAddNewProduct);
router.post("/edit-category/:CategoryID", adminController.PostEditProduct);

//--------------------------------------------------------------------------

// ==> SINGOUT
router.get("/signout", adminController.getSignout);

module.exports = router;