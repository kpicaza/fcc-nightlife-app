
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

}

module.exports = VenueRepository;
