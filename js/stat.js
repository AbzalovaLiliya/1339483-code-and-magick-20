'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP_RECT = 10;
var GAP = 30;
var INTERVAL = 100;
var TEXT_HEIGHT = 20;
var BAR_HEIGHT_MAX = 140;
var BAR_WIDTH = 40;
var MY_RESULT_COLOR = 'rgba(255, 0, 0, 1)';
var BOTTOM_LINE = 250;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var getRandomColor = function () {
  var randomColor = 'hsl(240, ' + Math.random() * 100 + '%, 50%)';
  return randomColor;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP_RECT, CLOUD_Y + GAP_RECT, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP, GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, GAP + TEXT_HEIGHT);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000000';
    ctx.fillText(players[i], CLOUD_X + INTERVAL * i + GAP, BOTTOM_LINE);

    if (players[i] === 'Вы') {
      ctx.fillStyle = MY_RESULT_COLOR;
    } else {
      ctx.fillStyle = getRandomColor();
    }
    ctx.fillRect(CLOUD_X + INTERVAL * i + GAP, BOTTOM_LINE - GAP_RECT, BAR_WIDTH, -(BAR_HEIGHT_MAX * times[i]) / maxTime);
    ctx.fillStyle = '#000000';
    ctx.fillText(Math.round(times[i]), CLOUD_X + INTERVAL * i + GAP, BOTTOM_LINE - GAP_RECT * 3 - (BAR_HEIGHT_MAX * times[i]) / maxTime);
  }
};
