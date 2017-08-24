var mongo = require('mongodb').MongoClient;
var Promise = require('rsvp').Promise;

module.exports = function (data, method, limit, offset) {
  return new Promise(function (resolve, reject) {
    mongo.connect(process.env.MONGO, function (err, db) {
      if (err) {
        reject(err);
      }

      const store = new Store(db);

      // Returns Promise.
      const callable = store[method];

      callable(data, limit, offset).then(function (data) {
        resolve(data)
      });
    });
  });
};

function Store(db) {

  var vm = this;
  var collection;

  var construct = function (db) {
    collection = db.collection('plans');
  };

  var serializePlan = function (plan) {

    return {
      id: plan.id(),
      venue: plan.venue(),
      assistants: plan.assistants(),
      createdAt: plan.createdAt()
    }
  };

  construct(db);

  this.find = function (criteria, limit, offset) {
    limit = limit || 10;
    offset = offset || 0;

    return new Promise(function (resolve, reject) {
      collection
        .find(criteria)
        .skip(offset)
        .limit(limit)
        .sort({createdAt: -1})
        .toArray(function (err, documents) {
          if (err) {
            return reject(err);
          }

          resolve(documents);

          db.close();
        });
    });
  };

  this.insert = function (plan) {
    return new Promise(function (resolve, reject) {
      var aPlan = serializePlan(plan);

      collection.insert(aPlan, function (err) {
        if (err) {
          return reject(err);
        }

        resolve(vm.find({id: plan.id()}, 1, 0));
      });
    });
  };

  this.update = function (plan) {
    return new Promise(function (resolve, reject) {

      var aPlan = serializePlan(plan);

      collection.update({id: plan.id()}, aPlan, function (err) {
        if (err) {
          return reject(err);
        }

        resolve(vm.find({id: plan.id()}, 1, 0));
      });
    });
  };

}
