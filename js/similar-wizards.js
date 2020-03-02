'use strict';

(function () {
  var WIZARDS_AMOUNT = 4;

  var originalColors;

  var wizardsData = [];

  var wizardsContainer = document.querySelector('.setup-similar-list');

  var wizardTemplate = document.querySelector('#similar-wizard-template')
    .content.querySelector('.setup-similar-item');

  var save = function (newWizards) {
    wizardsData = newWizards;
  };

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

  var render = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < WIZARDS_AMOUNT; i++) {
      fragment.appendChild(createWizardElement(wizards[i]));
    }

    wizardsContainer.appendChild(fragment);
  };

  var compareNames = function (left, right) {
    if (left > right) {
      return 1;
    }

    if (left < right) {
      return -1;
    }

    return 0;
  };

  var calculateSimilarity = function (wizard) {
    var similarity = 0;

    if (wizard.colorCoat === originalColors.coatColor) {
      similarity += 2;
    }

    if (wizard.colorEyes === originalColors.eyesColor) {
      similarity += 1;
    }

    return similarity;
  };

  var wizardsComparator = function (left, right) {
    var similarityDiff = calculateSimilarity(right) - calculateSimilarity(left);

    return similarityDiff === 0 ?
      compareNames(left.name, right.name) :
      similarityDiff;
  };

  var update = function (newOriginalColors) {
    originalColors = newOriginalColors;

    wizardsContainer.innerHTML = '';

    var wizardsDataCopy = wizardsData.slice();

    render(wizardsDataCopy.sort(wizardsComparator));
  };

  var show = function () {
    document.querySelector('.setup-similar').classList.remove('hidden');
  };

  var loadSuccessHandler = function (newWizards) {
    save(newWizards);
    update(window.wizardItems.getColors());
    show();
  };

  var loadErrorHandler = function (errorMessage) {
    window.message.show(errorMessage, true);
  };

  window.backend.load(loadSuccessHandler, loadErrorHandler);

  window.similarWizards = {
    update: window.debounce(update)
  };
})();
