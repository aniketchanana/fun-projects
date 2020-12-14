const canvas = <HTMLCanvasElement>document.querySelector('#bubbleCanvas');
const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');

function getRandomValue(minValue: number, maxValue: number): number {
	return Math.floor(Math.random() * (maxValue - minValue) + minValue) + 1;
}

class Bubble {
	private x: number;
	private y: number;
	private radius: number;

	constructor() {
		this.x = getRandomValue(100, 400);
		this.y = getRandomValue(100, 400);
		this.radius = getRandomValue(30, 40);
	}

	drawCircleInContext(ctx: CanvasRenderingContext2D) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		ctx.stroke();
	}
}

const b = new Bubble();
b.drawCircleInContext(ctx);