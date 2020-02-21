'use strict';

(function () {
  var itemsForm = document.querySelector('.setup-wizard-form');

  var coat = itemsForm.querySelector('.wizard-coat');
  var coatColorInput = itemsForm.querySelector('.coat-color-input');

  var eyes = itemsForm.querySelector('.wizard-eyes');
  var eyesColorInput = itemsForm.querySelector('.eyes-color-input');

  var fireballWrap = itemsForm.querySelector('.setup-fireball-wrap');
  var fireball = fireballWrap.querySelector('.setup-fireball');
  var fireballColorInput = itemsForm.querySelector('.fireball-color-input');

  var changeItemColor = function (item, colorInput, color) {
    window.colors.colorizeElement(item, color);

    colorInput.value = color;
  };

  var changeItemWithCorrespondingColors = function (item) {
    switch (item) {
      case coat:
        changeItemColor(coat, coatColorInput, window.colors.getRandomCoatColor());
        break;
      case eyes:
        changeItemColor(eyes, eyesColorInput, window.colors.getRandomEyesColor());
        break;
      case fireball:
        changeItemColor(fireballWrap, fireballColorInput, window.colors.getRandomFireballColor());
        break;
    }
  };

  var itemClickHandler = function (evt) {
    changeItemWithCorrespondingColors(evt.target);
  };

  var submitSuccessHandler = function () {
    window.setupDialog.notify('submit');
    window.message.show('Данные успешно отправлены');
  };

  var submitErrorHandler = function (errorMessage) {
    window.message.show(errorMessage, true);
  };

  var formSubmitHandler = function (evt) {
    evt.preventDefault();

    window.backend.upload(
        new FormData(itemsForm),
        submitSuccessHandler,
        submitErrorHandler
    );
  };

  itemsForm.addEventListener('click', itemClickHandler);
  itemsForm.addEventListener('submit', formSubmitHandler);
})();
