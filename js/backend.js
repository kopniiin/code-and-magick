'use strict';

(function () {
  var URL_TO_DOWNLOAD_DATA = 'https://js.dump.academy/code-and-magick/data';
  var URL_TO_UPLOAD_DATA = 'https://js.dump.academy/code-and-magic';

  var OK_STATUS = 200;

  var TIME_TO_WAIT_RESPONSE = 10000;

  var activateXhrHandlers = function (xhr, successHandler, errorHandler) {
    var xhrLoadHandler = function () {
      if (xhr.status === OK_STATUS) {
        successHandler(xhr.response);
      } else {
        errorHandler(
            'Что-то пошло не по плану. Статус ответа: ' + xhr.status
        );
      }
    };

    var xhrErrorHandler = function () {
      errorHandler('Произошла ошибка соединения');
    };

    var xhrTimeoutHandler = function () {
      errorHandler('Время ожидания ответа истекло');
    };

    xhr.addEventListener('load', xhrLoadHandler);
    xhr.addEventListener('error', xhrErrorHandler);
    xhr.addEventListener('timeout', xhrTimeoutHandler);
  };

  var download = function (successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIME_TO_WAIT_RESPONSE;

    activateXhrHandlers(xhr, successHandler, errorHandler);

    xhr.open('GET', URL_TO_DOWNLOAD_DATA);
    xhr.send();
  };

  var upload = function (data, successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.timeout = TIME_TO_WAIT_RESPONSE;

    activateXhrHandlers(xhr, successHandler, errorHandler);

    xhr.open('POST', URL_TO_UPLOAD_DATA);
    xhr.send(data);
  };

  window.backend = {
    download: download,
    upload: upload
  };
})();
