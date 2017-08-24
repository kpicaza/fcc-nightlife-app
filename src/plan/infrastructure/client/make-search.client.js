'use strict';

(function () {

  var apiUrl = appUrl + '/plans/search';
  var page = 1;
  var scrollPosition = 0;
  var body = $('main');
  var searchButton = $('#make-search-button');
  var searchInput = $('#search');
  var searchResultDiv = $('#search-result');
  var loading = $('#loading-results');
  var showMoreButton = $('#show-more');
  var loadingPagination = $('#loading-pagination');
  var showDetailButton = $('.show-detail');

  var reload = function () {
    componentHandler.upgradeAllRegistered();
    showMoreButton = $('#show-more');
    showDetailButton = $('.show-detail');
    loadingPagination = $('#loading-pagination');
    bindPagination();
    bindDetail();
    body.trigger('SearchWasMade');
  };

  var bindDetail = function () {
    var cardContent = $('.mdl-card__supporting-text .collapse');

    cardContent.on('hide.bs.collapse', function (evt) {
      var button = $(evt.target).closest('.plan-card-wide').find('.show-detail');
      button.text('more info');
    });

    cardContent.on('show.bs.collapse', function (evt) {
      var button = $(evt.target).closest('.plan-card-wide').find('.show-detail');
      button.text('less info');
    });

  };

  var scrollTo = function () {
    body.stop().animate({
        scrollTop: scrollPosition
      }, 500, 'swing',
      function () {
        body = $('main');
        searchResultDiv = $('#search-result');
      });
  };

  var bindPagination = function () {
    showMoreButton.bind('click', function (e) {
      e.preventDefault();

      scrollPosition = $(e.target).offset().top + body.scrollTop() - 100;

      showMoreButton.remove();
      loadingPagination.removeClass('hidden');

      page++;
      ajaxFunctions.ajaxRequest('POST', apiUrl, {
        search: searchInput.val(),
        page: page
      }, function (data) {
        loadingPagination.remove();
        searchResultDiv.append($(data).find('#search-result').html());
        reload();
        scrollTo();
      }, function (e) {
        console.error(e, apiUrl);
      });
    });
  };

  searchButton.bind('click', function (e) {
    e.preventDefault();

    loading.removeClass('hidden');

    ajaxFunctions.ajaxRequest('POST', apiUrl, {
      search: searchInput.val(),
      page: page
    }, function (data) {
      searchResultDiv.replaceWith($(data).find('#search-result'));
      searchResultDiv = $('#search-result');
      reload();
    }, function (e) {
      console.error(e, apiUrl);
    });
  });


})();
