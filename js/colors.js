'use strict';

(function () {
  var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  var EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];

  var FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var SVG_ELEMENT = 'use';

  var getRandomCoatColor = function () {
    return window.utils.getRandomElement(COAT_COLORS);
  };

  var getRandomEyesColor = function () {
    return window.utils.getRandomElement(EYES_COLORS);
  };

  var getRandomFireballColor = function () {
    return window.utils.getRandomElement(FIREBALL_COLORS);
  };

  var getPropertyToChange = function (element) {
    return element.tagName.toLowerCase() === SVG_ELEMENT ?
      'fill' : 'backgroundColor';
  };

  var colorizeElement = function (element, color) {
    var propertyToChange = getPropertyToChange(element);

    element.style[propertyToChange] = color;
  };

  window.colors = {
    getRandomCoatColor: getRandomCoatColor,
    getRandomEyesColor: getRandomEyesColor,
    getRandomFireballColor: getRandomFireballColor,
    colorizeElement: colorizeElement
  };
})();
