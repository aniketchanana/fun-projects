function getRandomValue(minValue: number, maxValue: number): number {
	return Math.floor(Math.random() * (maxValue - minValue) + minValue) + 1;
}

const canvas = <HTMLCanvasElement>document.querySelector('#bubbleCanvas');
const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');

enum CanvasDimensions {
	canvasMaxWidth = canvas.width,
	canvasMinWidth = 0,
	canvasMaxHeight = canvas.height,
	canvasMinHeight = 0
}

enum BubbleDimensions {
	minimumRadius = 30,
	maximumRadius = 40,

	maxValueOfX = CanvasDimensions.canvasMaxWidth - BubbleDimensions.maximumRadius,
	minValueOfX = CanvasDimensions.canvasMinWidth + BubbleDimensions.maximumRadius,
	maxValueOfY = CanvasDimensions.canvasMaxHeight - BubbleDimensions.maximumRadius,
	minValueOfY = CanvasDimensions.canvasMinHeight + BubbleDimensions.maximumRadius,

	minSpeed = 1,
	maxSpeed = 5
}

const MAX_BUBBLES = 100;

class Bubble {
	private x: number;
	private y: number;
	private radius: number;

	private red: number;
	private green: number;
	private blue: number;
	private alpha: number;

	private xv: number;
	private yv: number;

	private xd: number;
	private yd: number;

	constructor() {
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

	drawCircleInContext(ctx: CanvasRenderingContext2D) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		ctx.fillStyle = `rgba(${this.red},${this.green},${this.blue},${this.alpha})`;
		ctx.fill();
	}

	moveBubbleInContext(ctx: CanvasRenderingContext2D) {
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
		} else {
			this.x = this.x - this.xv;
		}

		if (this.yd === 1) {
			this.y += this.yv;
		} else {
			this.y -= this.yv;
		}

		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		ctx.fillStyle = `rgba(${this.red},${this.green},${this.blue},${this.alpha})`;
		ctx.fill();
	}
}

const bubbles: Array<Bubble> = [];

for (let i = 0; i < MAX_BUBBLES; i++) {
	bubbles.push(new Bubble());
}

bubbles.forEach(function (bubble) {
	bubble.drawCircleInContext(ctx);
})

function startAnimation(): void;
function startAnimation(): void {
	ctx.clearRect(0, 0, CanvasDimensions.canvasMaxWidth, CanvasDimensions.canvasMaxHeight);

	bubbles.forEach(function (bubble) {
		bubble.moveBubbleInContext(ctx);
	})

	window.requestAnimationFrame(startAnimation);
}

startAnimation();