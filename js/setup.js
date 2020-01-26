'use strict';

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

var WIZARD_AMOUNT = 4;

var wizardTemplate = document.querySelector('#similar-wizard-template')
  .content.querySelector('.setup-similar-item');


var getRandomInt = function (maxInt) {
  return Math.floor(Math.random() * maxInt);
};

var getRandomElement = function (array) {
  return array[getRandomInt(array.length)];
};

var createRandomWizard = function () {
  var name = getRandomElement(WIZARD_NAMES);
  var surname = getRandomElement(WIZARD_SURNAMES);
  var fullName = name + ' ' + surname;
  var coatColor = getRandomElement(COAT_COLORS);
  var eyesColor = getRandomElement(EYES_COLORS);

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
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderWizards = function (wizards) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(createWizardElement(wizards[i]));
  }

  document.querySelector('.setup-similar-list').appendChild(fragment);
};

var renderWizardContainer = function () {
  document.querySelector('.setup-similar').classList.remove('hidden');
};

var renderSetupDialog = function () {
  document.querySelector('.setup').classList.remove('hidden');
};

renderSetupDialog();

var wizards = createRandomWizards();

renderWizards(wizards);

renderWizardContainer();
