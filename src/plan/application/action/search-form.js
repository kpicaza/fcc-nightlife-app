
function SearchForm(repository) {

  this.action = function(req, res) {
    if (req.session.lastSearch) {
      repository.currentPlans(req.session.lastSearch.search, req.session.lastSearch.page)
        .then(function(plans) {
          res.render('plan/search-form', {
            plans: plans,
            hasPagination: plans.total > 6,
            criteria: req.session.lastSearch.search
          });
          req.session.lastSearch = null;
        });

      return;
    }

    res.render('plan/search-form', {
      plans: [],
      hasPagination: false,
      criteria: ''
    });
  };

}

module.exports = SearchForm;
