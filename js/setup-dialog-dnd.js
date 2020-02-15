'use strict';

(function () {
  var dialog = document.querySelector('.setup');
  var avatar = dialog.querySelector('.upload');

  var calculatePageHeight = function () {
    return Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );
  };

  var setPosition = function (coords) {
    dialog.style.left = coords.x;
    dialog.style.top = coords.y;
  };

  var preventAvatarSelection = function () {
    var avatarClickHandler = function (evt) {
      evt.preventDefault();

      avatar.removeEventListener('click', avatarClickHandler);
    };

    avatar.addEventListener('click', avatarClickHandler);
  };

  var avatarMousedownHandler = function (evt) {
    var dialogWidth = dialog.offsetWidth;
    var dialogHeight = dialog.offsetHeight;
    var dialogOffsetX = dialogWidth / -2;

    var pageWidth = document.documentElement.offsetWidth;
    var pageHeight = calculatePageHeight();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var isDialogDragged = false;

    var correctOutOfPageCoords = function (coords) {
      var x = coords.x;
      var y = coords.y;

      if (x + dialogOffsetX < 0) {
        x = 0 - dialogOffsetX;
      } else if (x + dialogWidth + dialogOffsetX > pageWidth) {
        x = pageWidth - dialogWidth - dialogOffsetX;
      }

      if (y < 0) {
        y = 0;
      } else if (y + dialogHeight > pageHeight) {
        y = pageHeight - dialogHeight;
      }

      return {
        x: x,
        y: y
      };
    };

    var dialogMousemoveHandler = function (moveEvt) {
      isDialogDragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var dialogCoords = correctOutOfPageCoords({
        x: dialog.offsetLeft - shift.x,
        y: dialog.offsetTop - shift.y
      });

      setPosition({
        x: dialogCoords.x + 'px',
        y: dialogCoords.y + 'px'
      });
    };

    var dialogMouseupHandler = function () {
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
    setPosition: setPosition
  };
})();
