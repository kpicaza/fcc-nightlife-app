var Promise = require('rsvp').Promise;
var request = require('request');

module.exports = function (data, method) {

  return new Promise(function (resolve, reject) {

    const store = new Store();

    // Returns Promise.
    const callable = store[method];

    callable(data)
      .then(function(data) { resolve(data) })
      .catch(function(e) { reject(e) });

  });
};

function Store() {

  this. search = function(query) {
    const options = {
      method: 'GET',
      url: 'https://api.yelp.com/v3/businesses/search',
      qs: query,
      headers: {
        'cache-control': 'no-cache',
        authorization: 'Bearer ' + process.env.YELP_TOKEN
      }
    };

    return returnPromise(options);

  };

  this.findById = function(id) {
    const options = {
      method: 'GET',
      url: 'https://api.yelp.com/v3/businesses/' + id,
      headers: {
        'cache-control': 'no-cache',
        authorization: 'Bearer OpqM0ktSaM6hgy24RZaWfafNJ6vI0vP2QqDCpnXmeKdbhffo9Koo92MYTmVutYM0aaf3E0PnDXKTBEBEPp90tLXXsdRadKmkajKukc3YgCil9dMu8-1FpSopZ2ibWXYx'
      }
    };

    return returnPromise(options);
  };

}

function returnPromise(options) {
  return new Promise(function (resolve, reject) {
    request(options, function (error, response, body) {
      if (error) {
        return reject(new Error(error));
      }

      resolve(JSON.parse(body));
    });
  })
}
