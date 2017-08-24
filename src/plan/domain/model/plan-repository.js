var Promise = require('rsvp').Promise;
var _ = require('lodash');
var Plan = require('./plan');

function PlanRepository(gateway, emitter, venueRepository) {

  var vm = this;
  var factory = function (id, venue, assistants, createdAt) {
    return new Plan(id, venue, assistants, createdAt);
  };

  var interval = function () {
    var to = new Date();

    if (6 < to.getHours()) {
      to.setDate(to.getDate() - 1);
    }

    var from = new Date(to.getFullYear(), to.getMonth(), to.getDate() - 1, 6, 0);

    return {
      "$gte": from.toISOString()
    };
  };

  this.currentPlans = function (location, page) {

    var dateQuery = interval();

    return new Promise(function (resolve, reject) {
      venueRepository.currentPlans(location, page).then(function (venues) {
        var plans = _.map(venues.businesses, function (venue) {
          return new Promise(function (resolve, reject) {
            gateway({
              'venue.id': venue.id,
              createdAt: dateQuery
            }, 'find').then(function (plans) {
              if (0 < plans.length) {
                return resolve(
                  factory(plans[0].id, venue, plans[0].assistants, plans[0].createdAt)
                );
              }

              resolve(factory(null, venue));
            }).catch(function (e) {
              reject(e);
            });
          });
        });

        Promise.all(plans).then(function (plans) {
          plans.total = venues.total;
          plans.showing = plans.length + (page - 1) * 6;
          resolve(plans);
        });
      });
    });
  };

  this.byId = function (id) {
    return new Promise(function (resolve, reject) {
      gateway({
        id: id,
        createdAt: interval()
      }, 'find', 1, 0).then(function (plans) {
        resolve(
          factory(plans[0].id, plans[0].venue, plans[0].assistants, plans[0].createdAt)
        );
      }).catch(function (e) {
        reject(e);
      });
    });
  };

  this.assist = function (id, venueId, userId) {

    return new Promise(function (resolve, reject) {
      vm.byId(id)
        .then(function (plan) {
          plan.addAssistant(userId);
          plan.from = interval();

          gateway(plan, 'update').then(function () {
            resolve(plan);
          }).catch(function (e) {
            reject(e);
          });

        })
        .catch(function () {
          venueRepository.byId(venueId).then(function (venue) {

            var plan = factory(id, venue, [userId]);

            gateway(plan, 'insert').then(function () {
              resolve(plan);
            }).catch(function (e) {
              reject(e);
            });
          });
        });
    });

  };

  this.cantAssist = function (id, venueId, userId) {
    return new Promise(function (resolve, reject) {
      vm.byId(id)
        .then(function (plan) {
          plan.removeAssistant(userId);
          plan.from = interval();

          gateway(plan, 'update').then(function () {
            resolve(plan);
          }).catch(function (e) {
            reject(e);
          });
        });
    });

  }

}

module.exports = PlanRepository;
