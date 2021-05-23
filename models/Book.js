let Books = [];
const mongodb = require("mongodb");

const getDb = require("../util/database").getDb;

module.exports = class Book {
    constructor(
        id,
        title,
        price,
        authors,
        thumbnailUrl,
        categories,
        Description,
        pageCount,
        date
    ) {
        (this._id = id ? new mongodb.ObjectId(id) : null),
        (this.title = title),
        (this.price = price),
        (this.authors = authors),
        (this.thumbnailUrl = thumbnailUrl),
        (this.categories = categories),
        (this.Description = Description),
        (this.pageCount = pageCount),
        (this.date = new Date(date));
    }

    save() {
        const db = getDb();
        console.log("🚀 ~ file: product.js ~ line 16 ~ Product ~ save ~ db", db);
        let dbOp;
        if (this._id) {
            dbOp = db.collection("Books").updateOne({
                _id: this._id,
            }, {
                $set: this,
            });
        } else {
            dbOp = db.collection("Books").insertOne(this);
        }

        return dbOp
            .then((result) => {
                console.log(
                    "🚀 ~ file: Book.js ~ line 40 ~ Book ~ save ~ result",
                    result
                );
            })
            .catch((err) => {
                console.log("🚀 ~ file: Book.js ~ line 43 ~ Book ~ save ~ err", err);
            });
    }

    static DeleteWithId(id) {
        const db = getDb();
        return db
            .collection('Books')
            .deleteOne({
                _id: new mongodb.ObjectId(id)
            })
            .then(result => {
                console.log('Deleted');
            })
            .catch(err => {
                console.log(err);
            });
    }
    static updateById(Book) {
        const indexOfBook = Books.findIndex((book) => book.id == Book.id);
        console.log("Bookindex", Books[indexOfBook]);

        Books[indexOfBook] = Book;
        // Books.slice(0);
        console.log("Bookindexl", Books[indexOfBook]);
    }
    static FindById(id) {
        const db = getDb();
        return db
            .collection("Books")
            .find({
                _id: new mongodb.ObjectId(id)
            })
            .next()
            .then((product) => {
                console.log(product);
                return product;
            })
            .catch((err) => {
                console.log(err);
            });
    }
    static containsByID(id) {
        return Books.filter((book) => book.id.includes(id));
    }
    static fetchAll() {
        const db = getDb();

        return db
            .collection("Books")
            .find()
            .toArray()
            .then((products) => {
                console.table(products);
                return products;
            })
            .catch((err) => {
                console.log(err);
            });
    }
};