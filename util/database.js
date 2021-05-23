const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db;
const mongoConnect = (callback) => {
    MongoClient.connect(process.env.MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(client => {
            _db = client.db();

            callback(client);
        })
        .catch(err => {
            throw err;
        });
}

const getDb = () => {
    if (_db) {
        return _db;
    }

    throw 'No database found';
}
exports.mongoConnect = mongoConnect;
exports.getDb = getDb