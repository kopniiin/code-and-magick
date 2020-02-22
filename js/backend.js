'use strict';

(function () {
  var Url = {
    LOAD: 'https://js.dump.academy/code-and-magick/data',
    SAVE: 'https://js.dump.academy/code-and-magick'
  };

  var load = function (successHandler, errorHandler) {
    window.serverRequest.send({
      url: Url.LOAD,
      successHandler: successHandler,
      errorHandler: errorHandler
    });
  };

  var save = function (data, successHandler, errorHandler) {
    window.serverRequest.send({
      url: Url.SAVE,
      data: data,
      successHandler: successHandler,
      errorHandler: errorHandler
    });
  };

  window.backend = {
    load: load,
    save: save
  };
})();
