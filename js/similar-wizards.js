'use strict';

(function () {
  var WIZARDS_AMOUNT = 4;

  var wizardTemplate = document.querySelector('#similar-wizard-template')
    .content.querySelector('.setup-similar-item');

  var createWizardElement = function (wizard) {
    var wizardElement = wizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;

    window.colors.colorizeElement(
        wizardElement.querySelector('.wizard-coat'),
        wizard.colorCoat
    );
    window.colors.colorizeElement(
        wizardElement.querySelector('.wizard-eyes'),
        wizard.colorEyes
    );

    return wizardElement;
  };

  var renderWizards = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < WIZARDS_AMOUNT; i++) {
      fragment.appendChild(createWizardElement(wizards[i]));
    }

    document.querySelector('.setup-similar-list').appendChild(fragment);
  };

  var showWizards = function () {
    document.querySelector('.setup-similar').classList.remove('hidden');
  };

  var downloadSuccessHandler = function (wizards) {
    renderWizards(wizards);
    showWizards();
  };

  var downloadErrorHandler = function (errorMessage) {
    window.message.show(errorMessage, true);
  };

  window.backend.download(downloadSuccessHandler, downloadErrorHandler);
})();
