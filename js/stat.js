'use strict';

var WINDOW_X = 100;
var WINDOW_Y = 10;
var WINDOW_WIDTH = 420;
var WINDOW_HEIGHT = 270;
var GAP = 16;
var WINDOW_COLOR = '#ffffff';

var SHADOW_OFFSET = 10;
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';

var FONT = '16px PT Mono';
var FONT_GAP = 16;
var FONT_COLOR = '#000000';

var MESSAGE_TEXTS = [
  'Ура вы победили!',
  'Список результатов:'
];

var BAR_WIDTH = 40;
var MAX_BAR_HEIGHT = 150;
var BAR_GAP = 50;
var BAR_HUE = 240;
var BAR_LIGHTNESS = 50;

var CURRENT_PLAYER_NAME = 'Вы';
var CURRENT_PLAYER_COLOR = 'rgba(255, 0, 0, 1)';

var renderWindow = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, WINDOW_WIDTH, WINDOW_HEIGHT);
};

var renderMessage = function (ctx) {
  ctx.font = FONT;
  ctx.fillStyle = FONT_COLOR;

  var messageX = WINDOW_X + GAP;

  for (var i = 0; i < MESSAGE_TEXTS.length; i++) {
    var text = MESSAGE_TEXTS[i];
    var messageY = WINDOW_Y + GAP + FONT_GAP * (i + 1);
    ctx.fillText(text, messageX, messageY);
  }
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    maxElement = (maxElement < arr[i]) ? arr[i] : maxElement;
  }

  return maxElement;
};

var getRandomColor = function () {
  var saturation = Math.floor(Math.random() * 101);
  return 'hsl(' + BAR_HUE + ', ' + saturation + '%, ' + BAR_LIGHTNESS + '%)';
};

var renderBar = function (ctx, barX, nameY, name, time, barHeight, barColor) {
  var barY = nameY - (FONT_GAP + barHeight);
  var timeY = barY - FONT_GAP;

  ctx.fillStyle = FONT_COLOR;
  ctx.fillText(name, barX, nameY);
  ctx.fillText(time, barX, timeY);

  ctx.fillStyle = barColor;
  ctx.fillRect(barX, barY, BAR_WIDTH, barHeight);
};

var renderBarChart = function (ctx, names, times) {
  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var barX = WINDOW_X + GAP + (BAR_WIDTH + BAR_GAP) * i;
    var nameY = WINDOW_Y + WINDOW_HEIGHT - GAP;
    var name = names[i];
    var time = Math.round(times[i]);
    var barHeight = (times[i] / maxTime) * MAX_BAR_HEIGHT;
    var barColor = (name === CURRENT_PLAYER_NAME) ?
      CURRENT_PLAYER_COLOR :
      getRandomColor();

    renderBar(ctx, barX, nameY, name, time, barHeight, barColor);
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderWindow(ctx, WINDOW_X + SHADOW_OFFSET, WINDOW_Y + SHADOW_OFFSET, SHADOW_COLOR);
  renderWindow(ctx, WINDOW_X, WINDOW_Y, WINDOW_COLOR);

  renderMessage(ctx);

  renderBarChart(ctx, names, times);
};
