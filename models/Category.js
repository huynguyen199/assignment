// let CATEGORY = [];

// module.exports = class Category {
//     constructor(id, name) {
//         this.id = id,
//             this.name = name
//     }

//     save() {
//         CATEGORY.push(this);
//     }
//     static DeleteWithId(id) {
//         // const books = this.fetchAll();
//         CATEGORY = CATEGORY.filter(category => category.id != id);
//         // Books.slice(0);
//     }
//     static updateById(Book) {
//         const indexOfBook = Books.findIndex(category => category.id == Categorys.id);
//         console.log('Bookindex', Books[indexOfBook]);

//         CATEGORY[indexOfBook] = Book;
//         // Books.slice(0);
//         console.log('Bookindexl', Category[indexOfBook]);

//     }
//     static FindById(id) {
//         return CATEGORY.filter(category => category.id === id);
//     }
//     static containsByID(id) {
//         return CATEGORY.filter(category => category.id.includes(id));
//     }

//     static fetchAll() {
//         return CATEGORY;
//     }
// }

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: String,
});

module.exports = mongoose.model("Categories", CategorySchema);
