'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var checkEscKey = function (key) {
    return key === ESC_KEY;
  };

  var checkEnterKey = function (key) {
    return key === ENTER_KEY;
  };

  var getRandomInt = function (maxInt) {
    return Math.floor(Math.random() * maxInt);
  };

  var getRandomElement = function (array) {
    return array[getRandomInt(array.length)];
  };

  window.utils = {
    checkEscKey: checkEscKey,
    checkEnterKey: checkEnterKey,
    getRandomInt: getRandomInt,
    getRandomElement: getRandomElement
  };
})();
