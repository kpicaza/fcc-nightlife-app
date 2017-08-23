var Promise = require('rsvp').Promise;
var _ = require('lodash');
var Plan = require('./plan');

function PlanRepository(gateway, emitter, venueRepository) {

  var factory = function (id, venue, assistants, createdAt) {
    return new Plan(id, venue, assistants, createdAt);
  };

  this.currentPlans = function (location, page) {

    return new Promise(function (resolve, reject) {
      venueRepository.currentPlans(location, page).then(function (venues) {

        var plans = _.map(venues.businesses, function (venue) {
          return factory(null, venue);
        });

        plans.total = venues.total;
        resolve(plans);
      })
    });
  };

}

module.exports = PlanRepository;
