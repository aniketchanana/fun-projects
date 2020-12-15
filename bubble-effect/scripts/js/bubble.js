"use strict";
function getRandomValue(minValue, maxValue) {
    return Math.floor(Math.random() * (maxValue - minValue) + minValue) + 1;
}
var canvas = document.querySelector('#bubbleCanvas');
var ctx = canvas.getContext('2d');
var CanvasDimensions;
(function (CanvasDimensions) {
    CanvasDimensions[CanvasDimensions["canvasMaxWidth"] = canvas.width] = "canvasMaxWidth";
    CanvasDimensions[CanvasDimensions["canvasMinWidth"] = 0] = "canvasMinWidth";
    CanvasDimensions[CanvasDimensions["canvasMaxHeight"] = canvas.height] = "canvasMaxHeight";
    CanvasDimensions[CanvasDimensions["canvasMinHeight"] = 0] = "canvasMinHeight";
})(CanvasDimensions || (CanvasDimensions = {}));
var BubbleDimensions;
(function (BubbleDimensions) {
    BubbleDimensions[BubbleDimensions["minimumRadius"] = 30] = "minimumRadius";
    BubbleDimensions[BubbleDimensions["maximumRadius"] = 40] = "maximumRadius";
    BubbleDimensions[BubbleDimensions["maxValueOfX"] = CanvasDimensions.canvasMaxWidth - BubbleDimensions.maximumRadius] = "maxValueOfX";
    BubbleDimensions[BubbleDimensions["minValueOfX"] = 40] = "minValueOfX";
    BubbleDimensions[BubbleDimensions["maxValueOfY"] = CanvasDimensions.canvasMaxHeight - BubbleDimensions.maximumRadius] = "maxValueOfY";
    BubbleDimensions[BubbleDimensions["minValueOfY"] = 40] = "minValueOfY";
    BubbleDimensions[BubbleDimensions["minSpeed"] = 1] = "minSpeed";
    BubbleDimensions[BubbleDimensions["maxSpeed"] = 5] = "maxSpeed";
})(BubbleDimensions || (BubbleDimensions = {}));
var MAX_BUBBLES = 100;
var Bubble = (function () {
    function Bubble() {
        this.x = getRandomValue(BubbleDimensions.minValueOfX, BubbleDimensions.maxValueOfX);
        this.y = getRandomValue(BubbleDimensions.minValueOfY, BubbleDimensions.maxValueOfY);
        this.radius = getRandomValue(BubbleDimensions.minimumRadius, BubbleDimensions.maximumRadius);
        this.red = getRandomValue(50, 255);
        this.green = getRandomValue(50, 255);
        this.blue = getRandomValue(50, 255);
        this.alpha = getRandomValue(0, 0.2);
        this.xv = getRandomValue(BubbleDimensions.minSpeed, BubbleDimensions.maxSpeed);
        this.yv = getRandomValue(BubbleDimensions.minSpeed, BubbleDimensions.maxSpeed);
        this.xd = 1;
        this.yd = 1;
    }
    Bubble.prototype.drawCircleInContext = function (ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(" + this.red + "," + this.green + "," + this.blue + "," + this.alpha + ")";
        ctx.fill();
    };
    Bubble.prototype.moveBubbleInContext = function (ctx) {
        if (this.x + this.xv >= 500) {
            this.xd = 0;
        }
        if (this.x - this.xv <= 0) {
            this.xd = 1;
        }
        if (this.y + this.yv >= 500) {
            this.yd = 0;
        }
        if (this.y - this.yv <= 0) {
            this.yd = 1;
        }
        if (this.xd === 1) {
            this.x = this.x + this.xv;
        }
        else {
            this.x = this.x - this.xv;
        }
        if (this.yd === 1) {
            this.y += this.yv;
        }
        else {
            this.y -= this.yv;
        }
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(" + this.red + "," + this.green + "," + this.blue + "," + this.alpha + ")";
        ctx.fill();
    };
    return Bubble;
}());
var bubbles = [];
for (var i = 0; i < MAX_BUBBLES; i++) {
    bubbles.push(new Bubble());
}
bubbles.forEach(function (bubble) {
    bubble.drawCircleInContext(ctx);
});
function startAnimation() {
    ctx.clearRect(0, 0, CanvasDimensions.canvasMaxWidth, CanvasDimensions.canvasMaxHeight);
    bubbles.forEach(function (bubble) {
        bubble.moveBubbleInContext(ctx);
    });
    window.requestAnimationFrame(startAnimation);
}
startAnimation();
