'use strict';

(function () {
  var itemsForm = document.querySelector('.setup-wizard-form');

  var coat = itemsForm.querySelector('.wizard-coat');
  var coatColorField = itemsForm.querySelector('.coat-color-input');

  var eyes = itemsForm.querySelector('.wizard-eyes');
  var eyesColorField = itemsForm.querySelector('.eyes-color-input');

  var fireballWrap = itemsForm.querySelector('.setup-fireball-wrap');
  var fireball = fireballWrap.querySelector('.setup-fireball');
  var fireballColorField = itemsForm.querySelector('.fireball-color-input');

  var changeItemColor = function (item, color, field) {
    window.colors.colorizeElement(item, color);

    field.value = color;
    window.setupDialog.notify('change', field);
  };

  var changeItemWithCorrespondingColors = function (item) {
    switch (item) {
      case coat:
        changeItemColor(
            coat,
            window.colors.getRandomCoatColor(),
            coatColorField
        );
        break;
      case eyes:
        changeItemColor(
            eyes,
            window.colors.getRandomEyesColor(),
            eyesColorField
        );
        break;
      case fireball:
        changeItemColor(
            fireballWrap,
            window.colors.getRandomFireballColor(),
            fireballColorField
        );
        break;
    }
  };

  var itemClickHandler = function (evt) {
    changeItemWithCorrespondingColors(evt.target);
  };

  var saveSuccessHandler = function () {
    window.setupDialog.notify('submit');
    window.message.show('Данные успешно отправлены');
  };

  var saveErrorHandler = function (errorMessage) {
    window.message.show(errorMessage, true);
  };

  var formSubmitHandler = function (evt) {
    evt.preventDefault();

    window.backend.save(
        new FormData(itemsForm),
        saveSuccessHandler,
        saveErrorHandler
    );
  };

  itemsForm.addEventListener('click', itemClickHandler);
  itemsForm.addEventListener('submit', formSubmitHandler);
})();
