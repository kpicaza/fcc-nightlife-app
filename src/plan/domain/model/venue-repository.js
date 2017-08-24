
var LIMIT = 6;

function VenueRepository(gateway, emitter) {

  this.currentPlans = function(location, page) {
    return gateway({
      location: location,
      term: 'nightlife',
      limit: LIMIT,
      offset: (page -1) * LIMIT
    }, 'search')
  };

  this.byId = function (id) {
    return gateway(id, 'findById');
  };

}

module.exports = VenueRepository;
