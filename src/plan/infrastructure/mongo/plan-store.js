
var mongo = require('mongodb').MongoClient;
var Promise = require('rsvp').Promise;

module.exports = function (data, method) {
  return new Promise(function (resolve, reject) {
    mongo.connect(process.env.MONGO, function (err, db) {
      if (err) {
        reject(err);
      }

      const store = new Store(db);

      // Returns Promise.
      const callable = store[method];

      callable(data).then(function(data) { resolve(data) });
    });
  });
};

function Store(db) {

}
