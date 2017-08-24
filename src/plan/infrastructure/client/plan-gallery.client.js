'use strict';

(function () {

  var apiUrl = appUrl + '/api/venues/';
  var body = $('main');
  var showDialogButtons = $('.show-gallery');

  var bindOpenDialog = function () {
    showDialogButtons.unbind();
    showDialogButtons.bind('click', function (e) {
      e.preventDefault();

      var button = $(e.target).closest('button');
      var dialog = $(e.target).closest('.plan-card-wide').find('dialog');
      var venueId = button.data('venue-id');

      if (!dialog[0].showModal) {
        dialogPolyfill.registerDialog(dialog);
      }

      ajaxFunctions.ajaxRequest('GET', apiUrl + venueId, {}, function (data) {
        var htmlImages = data.photos.map(function (photo) {
          return '<img height="auto" src="' + photo + '"/>';
        });

        var carousel = '<div id="gallery-' + venueId + '">' + htmlImages.join('') + '</div>';

        dialog.find('.mdl-dialog__content').html(carousel);
        dialog.find('.mdl-dialog__title').text(data.name);

        $('#gallery-' + venueId).slick({
          dots: true,
          arrows: false,
          adaptiveHeight: true,
          centerMode: true,
          mobileFirst: true,
          autoplay: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          fade: true,
          cssEase: 'linear',
          lazyLoad: 'ondemand'
        });

        dialog[0].showModal();

      }, function (e) {
        console.error(e, apiUrl);
      });

    });
  };

  var bindCloseDialog = function () {
    var close = $('.close-gallery');

    close.unbind();
    close.bind('click', function (e) {
      var dialog = $(e.target).closest('.plan-card-wide').find('dialog');

      dialog[0].close();
    });
  };

  body.bind('SearchWasMade', function () {
    showDialogButtons = $('.show-gallery');

    bindOpenDialog();
    bindCloseDialog();
  });

})();
