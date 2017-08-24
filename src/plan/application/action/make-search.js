'use strict';

function MakeSearch(repository) {

  this.action = function(req, res) {

    var page = req.body.page || 1;

    repository.currentPlans(req.body.search, page)
      .then(function(plans) {
        res.render('plan/search-form', {plans: plans, hasPagination: plans.total > 6});
      });
  }

}

module.exports = MakeSearch;
