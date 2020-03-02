'use strict';

(function () {
  var dialog = document.querySelector('.setup');
  var openButton = document.querySelector('.setup-open');
  var closeButton = dialog.querySelector('.setup-close');
  var wizardNameField = dialog.querySelector('.setup-user-name');
  var coatColorField = dialog.querySelector('.coat-color-input');
  var eyesColorField = dialog.querySelector('.eyes-color-input');

  var initialDialogCoords = {
    x: dialog.style.left,
    y: dialog.style.top
  };

  var resetPosition = function () {
    window.setupDialogDND.setPosition(initialDialogCoords);
  };

  var open = function () {
    dialog.classList.remove('hidden');
    document.addEventListener('keydown', dialogEscKeydownHandler);
  };

  var close = function () {
    dialog.classList.add('hidden');
    resetPosition();
    document.removeEventListener('keydown', dialogEscKeydownHandler);
  };

  var dialogEscKeydownHandler = function (evt) {
    if (!window.utils.checkEscKey(evt.key)) {
      return;
    }

    if (evt.target !== wizardNameField) {
      close();
    }
  };

  var openButtonClickHandler = function () {
    open();
  };

  var openButtonEnterKeydownHandler = function (evt) {
    if (window.utils.checkEnterKey(evt.key)) {
      open();
    }
  };

  var closeButtonClickHandler = function () {
    close();
  };

  var closeButtonEnterKeydownHandler = function (evt) {
    if (window.utils.checkEnterKey(evt.key)) {
      close();
    }
  };

  var handleSubmitNotification = function () {
    close();
  };

  var handleChangeNotification = function (target) {
    if (target === coatColorField || target === eyesColorField) {
      window.similarWizards.update(window.wizardItems.getColors());
    }
  };

  var notify = function (event, target) {
    switch (event) {
      case 'submit':
        handleSubmitNotification();
        break;
      case 'change':
        handleChangeNotification(target);
        break;
    }
  };

  openButton.addEventListener('click', openButtonClickHandler);
  openButton.addEventListener('keydown', openButtonEnterKeydownHandler);

  closeButton.addEventListener('click', closeButtonClickHandler);
  closeButton.addEventListener('keydown', closeButtonEnterKeydownHandler);

  window.setupDialog = {
    notify: notify
  };
})();
