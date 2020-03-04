'use strict';

(function () {
  var ALLOWED_FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatar = document.querySelector('.setup-user-pic');
  var avatarField = document.querySelector('input[name=avatar]');

  var changeAvatar = function (newAvatar) {
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      avatar.src = reader.result;
    });

    reader.readAsDataURL(newAvatar);
  };

  var fieldChangeHandler = function () {
    var newAvatar = avatarField.files[0];
    var fileName = newAvatar.name.toLowerCase();

    var isAllowed = ALLOWED_FILE_TYPES.some(function (type) {
      return fileName.endsWith(type);
    });

    if (isAllowed) {
      changeAvatar(newAvatar);
    }
  };

  avatarField.addEventListener('change', fieldChangeHandler);
})();
