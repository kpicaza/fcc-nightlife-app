'use strict';

(function () {

  var apiUrl = appUrl + '/api/plans/';
  var body = $('main');
  var assistButton = $('.assist-to-plan');
  var cantAssistButton = $('.cant-assist');

  var assist = function (e) {
    e.preventDefault();

    var button = $(e.target).closest('button');
    var assistantSpan = button.closest('div').find('.assistants');

    ajaxFunctions.ajaxRequest('POST', apiUrl + button.data('plan-id') + '/assistants', {
      venueId: button.data('venue-id')
    }, function (data) {
      assistantSpan.text(data.nbrAssistants + ' ');
    }, function (e) {
      console.error(e, apiUrl);
    });

  };

  var cantAssist = function (e) {
    e.preventDefault();

    var button = $(e.target).closest('button');
    var assistantSpan = button.closest('div').find('.assistants');

    ajaxFunctions.ajaxRequest('DELETE', apiUrl + button.data('plan-id') + '/assistants', {
      venueId: button.data('venue-id')
    }, function (data) {
      assistantSpan.text(data.nbrAssistants + ' ');
    }, function (e) {
      console.error(e, apiUrl);
    });

  };

  body.bind('SearchWasMade', function () {

    assistButton = $('.assist-to-plan');
    cantAssistButton = $('.cant-assist');

    assistButton.unbind();
    cantAssistButton.unbind();
    assistButton.bind('click', assist);
    cantAssistButton.bind('click', cantAssist);
  });

})();
