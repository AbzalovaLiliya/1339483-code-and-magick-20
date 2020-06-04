'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP_RECT = 10;
var GAP_TEXT = 30;

var TEXT_HEIGHT = 20;
var BAR_HEIGHT_MAX = 140;
var MY_RESULT_COLOR = 'rgba(255, 0, 0, 1)';
var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function(arr) {
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
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP_TEXT, GAP_TEXT);
  ctx.fillText('Список результатов:', CLOUD_X + GAP_TEXT, GAP_TEXT + TEXT_HEIGHT);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000000';
    ctx.fillText(players[i], CLOUD_X + 100*i + 30, 250);

    if (players[i] === 'Вы') {
      ctx.fillStyle = MY_RESULT_COLOR;
    } else {
      ctx.fillStyle = getRandomColor();
    }
     ctx.fillRect(CLOUD_X + 100*i + 30, 240, 40, -(BAR_HEIGHT_MAX * times[i]) / maxTime);
    ctx.fillStyle = '#000000';
    ctx.fillText(Math.round(times[i]), CLOUD_X + 100*i + 30, 220 - (BAR_HEIGHT_MAX * times[i]) / maxTime);
  }
};
