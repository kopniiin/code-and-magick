'use strict';

(function () {
  var itemsContainer = document.querySelector('.setup-wizard-form');

  var wizardCoat = itemsContainer.querySelector('.wizard-coat');
  var coatColorInput = itemsContainer.querySelector('.coat-color-input');

  var wizardEyes = itemsContainer.querySelector('.wizard-eyes');
  var eyesColorInput = itemsContainer.querySelector('.eyes-color-input');

  var wizardFireballWrap = itemsContainer.querySelector('.setup-fireball-wrap');
  var wizardFireball = wizardFireballWrap.querySelector('.setup-fireball');
  var fireballColorInput = itemsContainer.querySelector('.fireball-color-input');

  var changeWizardItemColor = function (wizardItem, colorInput, colors) {
    var randomColor = window.utils.getRandomElement(colors);

    window.colors.colorizeElement(wizardItem, randomColor);

    colorInput.value = randomColor;
  };

  var changeWizardItemWithCorrespondingColors = function (item) {
    switch (item) {
      case wizardCoat:
        changeWizardItemColor(wizardCoat, coatColorInput, window.colors.coatColors);
        break;
      case wizardEyes:
        changeWizardItemColor(wizardEyes, eyesColorInput, window.colors.eyesColors);
        break;
      case wizardFireball:
        changeWizardItemColor(wizardFireballWrap, fireballColorInput, window.colors.fireballColors);
        break;
    }
  };

  var wizardItemClickHandler = function (evt) {
    changeWizardItemWithCorrespondingColors(evt.target);
  };

  itemsContainer.addEventListener('click', wizardItemClickHandler);
})();
