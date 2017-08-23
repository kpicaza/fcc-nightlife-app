
function Venue(venue) {

  this.id = function() {
    return venue.id;
  };

  this.venue = function() {
    return this[venue];
  };

}

module.exports = Venue;
