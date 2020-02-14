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

  var changeWizardItemColor = function (wizardItem, colorInput, color) {
    window.colors.colorizeElement(wizardItem, color);

    colorInput.value = color;
  };

  var changeWizardItemWithCorrespondingColors = function (item) {
    switch (item) {
      case wizardCoat:
        changeWizardItemColor(wizardCoat, coatColorInput, window.colors.getRandomCoatColor());
        break;
      case wizardEyes:
        changeWizardItemColor(wizardEyes, eyesColorInput, window.colors.getRandomEyesColor());
        break;
      case wizardFireball:
        changeWizardItemColor(wizardFireballWrap, fireballColorInput, window.colors.getRandomFireballColor());
        break;
    }
  };

  var wizardItemClickHandler = function (evt) {
    changeWizardItemWithCorrespondingColors(evt.target);
  };

  itemsContainer.addEventListener('click', wizardItemClickHandler);
})();
