
function SearchForm() {

  this.action = function(req, res) {
    res.render('plan/search-form', {plans: [], hasPagination: false});
  };

}

module.exports = SearchForm;
