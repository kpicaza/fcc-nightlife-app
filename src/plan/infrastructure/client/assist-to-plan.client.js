'use strict';

(function () {

  var apiUrl = appUrl + '/api/plans/';
  var body = $('main');
  var assistButton = $('.assist-to-plan');
  var cantAssistButton = $('.cant-assist');

  var bindActions = function () {
    assistButton = $('.assist-to-plan');
    cantAssistButton = $('.cant-assist');
    assistButton.unbind();
    cantAssistButton.unbind();
    assistButton.bind('click', assist);
    cantAssistButton.bind('click', cantAssist);
  };

  var drawButton = function (button, type, planId, venueId) {
    var buttonTexts = {
      'cant-assist': ';-C Finally, i can\'t',
      'assist-to-plan': 'I\'m go!!'
    };

    var htmlButton = '<button class="' + type
      + ' mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" data-plan-id="'
      + planId + '" data-venue-id="' + venueId + '">' + buttonTexts[type]
      + '</button>';

    button.replaceWith(htmlButton);
    componentHandler.upgradeAllRegistered();
    bindActions();
  };

  var assist = function (e) {
    e.preventDefault();

    var button = $(e.target).closest('button');
    var assistantSpan = button.closest('div').find('.assistants');
    var planId = button.data('plan-id');
    var venueId = button.data('venue-id');

    ajaxFunctions.ajaxRequest('POST', apiUrl + planId + '/assistants', {
      venueId: venueId
    }, function (data) {
      drawButton(button, 'cant-assist', planId, venueId);
      assistantSpan.text(data.nbrAssistants + ' ');
    }, function (e) {
      console.error(e, apiUrl);
    });

  };

  var cantAssist = function (e) {
    e.preventDefault();

    var button = $(e.target).closest('button');
    var assistantSpan = button.closest('div').find('.assistants');
    var planId = button.data('plan-id');
    var venueId = button.data('venue-id');

    ajaxFunctions.ajaxRequest('DELETE', apiUrl + planId + '/assistants', {
      venueId: venueId
    }, function (data) {
      drawButton(button, 'assist-to-plan', planId, venueId);
      assistantSpan.text(data.nbrAssistants + ' ');
    }, function (e) {
      console.error(e, apiUrl);
    });

  };

  body.bind('SearchWasMade', function () {
    bindActions();
  });

})();
