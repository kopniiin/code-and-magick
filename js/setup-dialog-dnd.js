'use strict';

(function () {
  var dialog = document.querySelector('.setup');
  var avatar = dialog.querySelector('.upload');

  var initialDialogCoords = {
    x: dialog.style.left,
    y: dialog.style.top
  };

  var returnToInitialPosition = function () {
    dialog.style.left = initialDialogCoords.x;
    dialog.style.top = initialDialogCoords.y;
  };

  var preventAvatarSelection = function () {
    var avatarClickHandler = function (evt) {
      evt.preventDefault();

      avatar.removeEventListener('click', avatarClickHandler);
    };

    avatar.addEventListener('click', avatarClickHandler);
  };

  var avatarMousedownHandler = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var isDialogDragged = false;

    var dialogMousemoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      isDialogDragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      dialog.style.left = dialog.offsetLeft - shift.x + 'px';
      dialog.style.top = dialog.offsetTop - shift.y + 'px';
    };

    var dialogMouseupHandler = function (upEvt) {
      upEvt.preventDefault();

      if (isDialogDragged) {
        preventAvatarSelection();
      }

      document.removeEventListener('mousemove', dialogMousemoveHandler);
      window.removeEventListener('mouseup', dialogMouseupHandler);
    };

    document.addEventListener('mousemove', dialogMousemoveHandler);
    window.addEventListener('mouseup', dialogMouseupHandler);
  };

  avatar.addEventListener('mousedown', avatarMousedownHandler);

  window.setupDialogDND = {
    returnToInitialPosition: returnToInitialPosition
  };
})();
