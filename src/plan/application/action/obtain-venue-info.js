'use strict';

function ObtainVenueInfo(repository) {

  this.action = function (req, res) {

    repository.byId(req.params.id).then(function (venue) {
      res.json(venue)
    });

  };

}

module.exports = ObtainVenueInfo;
