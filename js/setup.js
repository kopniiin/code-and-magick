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

var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var WIZARD_AMOUNT = 4;

var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

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

var wizards = createRandomWizards();

renderWizards(wizards);

var setupDialog = document.querySelector('.setup');
var setupOpenButton = document.querySelector('.setup-open');
var setupCloseButton = setupDialog.querySelector('.setup-close');
var wizardNameInput = setupDialog.querySelector('.setup-user-name');

var openSetupDialog = function () {
  setupDialog.classList.remove('hidden');
  document.addEventListener('keydown', dialogEscKeydownHandler);
};

var closeSetupDialog = function () {
  setupDialog.classList.add('hidden');
  document.removeEventListener('keydown', dialogEscKeydownHandler);
};

var dialogEscKeydownHandler = function (evt) {
  if (evt.key !== ESC_KEY) {
    return;
  }

  if (evt.target !== wizardNameInput) {
    closeSetupDialog();
  }
};

var setupOpenButtonClickHandler = function () {
  openSetupDialog();
};

var setupOpenButtonEnterKeydownHandler = function (evt) {
  if (evt.key === ENTER_KEY) {
    openSetupDialog();
  }
};

var setupCloseButtonClickHandler = function () {
  closeSetupDialog();
};

var setupCloseButtonEnterKeydownHandler = function (evt) {
  if (evt.key === ENTER_KEY) {
    closeSetupDialog();
  }
};

setupOpenButton.addEventListener('click', setupOpenButtonClickHandler);
setupOpenButton.addEventListener('keydown', setupOpenButtonEnterKeydownHandler);

setupCloseButton.addEventListener('click', setupCloseButtonClickHandler);
setupCloseButton.addEventListener('keydown', setupCloseButtonEnterKeydownHandler);

var wizardCoat = setupDialog.querySelector('.wizard-coat');
var coatColorInput = setupDialog.querySelector('.coat-color-input');

var wizardEyes = setupDialog.querySelector('.wizard-eyes');
var eyesColorInput = setupDialog.querySelector('.eyes-color-input');

var wizardFireballWrap = setupDialog.querySelector('.setup-fireball-wrap');
var wizardFireball = wizardFireballWrap.querySelector('.setup-fireball');
var fireballColorInput = setupDialog.querySelector('.fireball-color-input');

var getPropertyToChange = function (wizardItem) {
  return wizardItem.classList.contains('setup-fireball-wrap') ?
    'backgroundColor' :
    'fill';
};

var changeWizardItemColor = function (wizardItem, colorInput, colors) {
  var randomColor = getRandomElement(colors);

  var propertyToChange = getPropertyToChange(wizardItem);

  wizardItem.style[propertyToChange] = randomColor;

  colorInput.value = randomColor;
};

var changeWizardItemWithCorrespondingColors = function (item) {
  switch (item) {
    case wizardCoat:
      changeWizardItemColor(wizardCoat, coatColorInput, COAT_COLORS);
      break;
    case wizardEyes:
      changeWizardItemColor(wizardEyes, eyesColorInput, EYES_COLORS);
      break;
    case wizardFireball:
      changeWizardItemColor(wizardFireballWrap, fireballColorInput, FIREBALL_COLORS);
      break;
  }
};

var wizardItemClickHandler = function (evt) {
  changeWizardItemWithCorrespondingColors(evt.target);
};

setupDialog.addEventListener('click', wizardItemClickHandler);
