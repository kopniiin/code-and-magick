'use strict';

(function () {
  var WIZARD_NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];

  var WIZARD_SURNAMES = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];

  var WIZARD_AMOUNT = 4;

  var wizardTemplate = document.querySelector('#similar-wizard-template')
    .content.querySelector('.setup-similar-item');

  var createRandomWizard = function () {
    var name = window.utils.getRandomElement(WIZARD_NAMES);
    var surname = window.utils.getRandomElement(WIZARD_SURNAMES);
    var fullName = name + ' ' + surname;
    var coatColor = window.colors.getRandomCoatColor();
    var eyesColor = window.colors.getRandomEyesColor();

    return {
      name: fullName,
      coatColor: coatColor,
      eyesColor: eyesColor
    };
  };

  var createRandomWizards = function () {
    var wizards = [];

    for (var i = 0; i < WIZARD_AMOUNT; i++) {
      wizards.push(createRandomWizard());
    }

    return wizards;
  };

  var createWizardElement = function (wizard) {
    var wizardElement = wizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;

    window.colors.colorizeElement(
        wizardElement.querySelector('.wizard-coat'),
        wizard.coatColor
    );
    window.colors.colorizeElement(
        wizardElement.querySelector('.wizard-eyes'),
        wizard.eyesColor
    );

    return wizardElement;
  };

  var renderWizards = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(createWizardElement(wizards[i]));
    }

    document.querySelector('.setup-similar-list').appendChild(fragment);
  };

  var showWizards = function () {
    document.querySelector('.setup-similar').classList.remove('hidden');
  };

  var wizards = createRandomWizards();
  renderWizards(wizards);
  showWizards();
})();
