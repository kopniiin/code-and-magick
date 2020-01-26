'use strict';

var NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var WIZARD_NUMBER = 4;

var setupDialog = document.querySelector('.setup');
var wizardContainer = setupDialog.querySelector('.setup-similar');
var wizardList = wizardContainer.querySelector('.setup-similar-list');

var wizardTemplate = document.querySelector('#similar-wizard-template')
  .content.querySelector('.setup-similar-item');


var getRandomInt = function (maxInt) {
  return Math.floor(Math.random() * maxInt);
};

var createRandomWizard = function () {
  var name = NAMES[getRandomInt(NAMES.length)];
  var surname = SURNAMES[getRandomInt(SURNAMES.length)];
  var fullName = name + ' ' + surname;
  var coatColor = COAT_COLORS[getRandomInt(COAT_COLORS.length)];
  var eyesColor = EYES_COLORS[getRandomInt(EYES_COLORS.length)];

  return {
    name: fullName,
    coatColor: coatColor,
    eyesColor: eyesColor
  };
};

var renderWizard = function (wizard) {
  var wizardElement = wizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderWizards = function (wizards) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  wizardList.appendChild(fragment);
  wizardContainer.classList.remove('hidden');
};

var renderSetupDialog = function () {
  setupDialog.classList.remove('hidden');

  var wizards = [];
  for (var i = 0; i < WIZARD_NUMBER; i++) {
    wizards.push(createRandomWizard());
  }

  renderWizards(wizards);
};

renderSetupDialog();
