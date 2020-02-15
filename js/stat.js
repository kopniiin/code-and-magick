'use strict';

(function () {
  var FONT = '16px PT Mono';
  var FONT_GAP = 16;
  var FONT_COLOR = '#000000';

  var WINDOW_X = 100;
  var WINDOW_Y = 10;
  var WINDOW_WIDTH = 420;
  var WINDOW_HEIGHT = 270;
  var WINDOW_GAP = 16;
  var WINDOW_TITLE = 'Ура вы победили!';
  var WINDOW_BACKGROUND_COLOR = '#ffffff';
  var windowTitleX = WINDOW_X + WINDOW_GAP;
  var windowTitleY = WINDOW_Y + WINDOW_GAP + FONT_GAP;

  var SHADOW_OFFSET = 10;
  var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
  var shadowX = WINDOW_X + SHADOW_OFFSET;
  var shadowY = WINDOW_Y + SHADOW_OFFSET;

  var BAR_WIDTH = 40;
  var BAR_MAX_HEIGHT = 150;
  var BAR_GAP = 50;
  var BAR_CHART_TITLE = 'Список результатов:';
  var BAR_HUE = 240;
  var BAR_LIGHTNESS = 50;
  var barChartTitleX = WINDOW_X + WINDOW_GAP;
  var barChartTitleY = WINDOW_Y + WINDOW_GAP + FONT_GAP * 2;
  var barNameY = WINDOW_Y + WINDOW_HEIGHT - WINDOW_GAP;

  var CURRENT_PLAYER_NAME = 'Вы';
  var CURRENT_PLAYER_COLOR = 'rgba(255, 0, 0, 1)';

  var renderWindow = function (ctx) {
    renderShadow(ctx);

    ctx.fillStyle = WINDOW_BACKGROUND_COLOR;
    ctx.fillRect(WINDOW_X, WINDOW_Y, WINDOW_WIDTH, WINDOW_HEIGHT);

    ctx.font = FONT;
    ctx.fillStyle = FONT_COLOR;
    ctx.fillText(WINDOW_TITLE, windowTitleX, windowTitleY);
  };

  var renderShadow = function (ctx) {
    ctx.fillStyle = SHADOW_COLOR;
    ctx.fillRect(shadowX, shadowY, WINDOW_WIDTH, WINDOW_HEIGHT);
  };

  var getMaxNumber = function (arr) {
    var maxNumber = arr[0];

    for (var i = 0; i < arr.length; i++) {
      maxNumber = (maxNumber < arr[i]) ? arr[i] : maxNumber;
    }

    return maxNumber;
  };

  var getRandomBarColor = function () {
    var saturation = Math.floor(Math.random() * 101);
    return 'hsl(' + BAR_HUE + ', ' + saturation + '%, ' + BAR_LIGHTNESS + '%)';
  };

  var renderBar = function (ctx, barName, barValue, barX, barHeight, barColor) {
    var barY = barNameY - (FONT_GAP + barHeight);
    var valueY = barY - FONT_GAP;

    ctx.fillStyle = FONT_COLOR;
    ctx.fillText(barName, barX, barNameY);
    ctx.fillText(barValue, barX, valueY);

    ctx.fillStyle = barColor;
    ctx.fillRect(barX, barY, BAR_WIDTH, barHeight);
  };

  var renderBarChart = function (ctx, barNames, barValues) {
    ctx.fillStyle = FONT_COLOR;
    ctx.fillText(BAR_CHART_TITLE, barChartTitleX, barChartTitleY);

    var maxBarValue = getMaxNumber(barValues);

    for (var i = 0; i < barNames.length; i++) {
      var barName = barNames[i];
      var barValue = Math.round(barValues[i]);
      var barX = WINDOW_X + WINDOW_GAP + (BAR_WIDTH + BAR_GAP) * i;
      var barHeight = (barValues[i] / maxBarValue) * BAR_MAX_HEIGHT;
      var barColor = (barName === CURRENT_PLAYER_NAME) ?
        CURRENT_PLAYER_COLOR :
        getRandomBarColor();

      renderBar(ctx, barName, barValue, barX, barHeight, barColor);
    }
  };

  window.renderStatistics = function (ctx, names, times) {
    renderWindow(ctx);

    renderBarChart(ctx, names, times);
  };
})();
