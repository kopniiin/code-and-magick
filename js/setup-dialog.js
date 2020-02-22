'use strict';

(function () {
  var dialog = document.querySelector('.setup');
  var openButton = document.querySelector('.setup-open');
  var closeButton = dialog.querySelector('.setup-close');
  var wizardNameField = dialog.querySelector('.setup-user-name');

  var initialDialogCoords = {
    x: dialog.style.left,
    y: dialog.style.top
  };

  var resetPosition = function () {
    window.setupDialogDND.setPosition(initialDialogCoords);
  };

  var openDialog = function () {
    dialog.classList.remove('hidden');
    document.addEventListener('keydown', dialogEscKeydownHandler);
  };

  var closeDialog = function () {
    dialog.classList.add('hidden');
    resetPosition();
    document.removeEventListener('keydown', dialogEscKeydownHandler);
  };

  var dialogEscKeydownHandler = function (evt) {
    if (!window.utils.checkEscKey(evt.key)) {
      return;
    }

    if (evt.target !== wizardNameField) {
      closeDialog();
    }
  };

  var openButtonClickHandler = function () {
    openDialog();
  };

  var openButtonEnterKeydownHandler = function (evt) {
    if (window.utils.checkEnterKey(evt.key)) {
      openDialog();
    }
  };

  var closeButtonClickHandler = function () {
    closeDialog();
  };

  var closeButtonEnterKeydownHandler = function (evt) {
    if (window.utils.checkEnterKey(evt.key)) {
      closeDialog();
    }
  };

  var notify = function (event) {
    if (event === 'submit') {
      closeDialog();
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
