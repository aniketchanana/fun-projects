const canvas = <HTMLCanvasElement>document.querySelector('canvas');

interface SnakeBodyPart {
	x: number,
	y: number
};

enum SnakeBodyPartDimensions {
	height = 20,
	width = 20
}

enum Arrow {
	UP = 38,
	DOWN = 40,
	LEFT = 37,
	RIGHT = 39
}

enum BoardDimensions {
	height = canvas.height,
	width = canvas.width
}

function getRandomValue(minValue: number, maxValue: number): number {
	return Math.floor(Math.random() * (maxValue - minValue) + minValue) + 1;
}

let gameTimer: number;
class Board {
	private canvasContext: CanvasRenderingContext2D;

	constructor() {
		this.canvasContext = <CanvasRenderingContext2D>canvas.getContext('2d');
	}

	getCanvasContext() {
		return this.canvasContext;
	}

	plotPoints(points: Array<SnakeBodyPart>) {
		points.forEach((point, index) => {
			if (index === 0) {
				this.canvasContext.fillStyle = "rgba(255,0,0,0.5)";
			} else {
				this.canvasContext.fillStyle = "rgba(255,0,0,1)";
			}
			this.plotPoint(point.x, point.y);
		})
	}

	plotPoint(x: number, y: number) {
		this.canvasContext.fillRect(x, y, SnakeBodyPartDimensions.height, SnakeBodyPartDimensions.width);
	}

	clearBoard() {
		this.canvasContext.clearRect(0, 0, BoardDimensions.width, BoardDimensions.height);
	}
}

class Food {
	private x: number;
	private y: number;

	constructor() {
		const points = this.generateValidPoints();
		this.x = points.x;
		this.y = points.y;
	}

	getFoodPoints() {
		return {
			x: this.x,
			y: this.y
		}
	}

	generateNewFoodPoints() {
		const points = this.generateValidPoints();
		this.x = points.x;
		this.y = points.y;
	}

	private generateValidPoints() {
		let x: number = getRandomValue(0, BoardDimensions.height - SnakeBodyPartDimensions.height);
		let y: number = getRandomValue(0, BoardDimensions.height - SnakeBodyPartDimensions.height);

		x = x - (x % SnakeBodyPartDimensions.width);
		y = y - (y % SnakeBodyPartDimensions.height);

		console.log(x, y);
		return { x, y };
	}
}

class Snake {
	private snakeBody: Array<SnakeBodyPart>;

	constructor() {
		this.snakeBody = [{ x: 60, y: 0 }, { x: 40, y: 0 }, { x: 20, y: 0 }, { x: 0, y: 0 }];
	}

	eatFoodAndGrow(x: number, y: number) {
		this.snakeBody.unshift({ x, y });
	}

	private checkCollision() {
		const snakeHead = this.snakeBody[0];
		for (let i = 1; i < this.snakeBody.length; i++) {
			if (snakeHead.x === this.snakeBody[i].x && snakeHead.y === this.snakeBody[i].y) {
				window.clearInterval(gameTimer);
				alert('Game Over');
				return true;
			}
		}
		return false;
	}

	moveSnakeOneStepInPositiveX() {
		let currSnakeHeadX: number = this.snakeBody[0].x;
		let currSnakeHeadY: number = this.snakeBody[0].y;

		if (this.snakeBody[0].x + SnakeBodyPartDimensions.width >= BoardDimensions.width) {
			this.snakeBody[0].x = 0;
		} else {
			this.snakeBody[0].x += SnakeBodyPartDimensions.width;
		}

		const isGameOver = this.checkCollision();
		if (!isGameOver) {
			this.followTheHead(currSnakeHeadX, currSnakeHeadY);
		}
	}

	moveSnakeOneStepInNegativeX() {
		let currSnakeHeadX: number = this.snakeBody[0].x;
		let currSnakeHeadY: number = this.snakeBody[0].y;

		if (this.snakeBody[0].x - SnakeBodyPartDimensions.width < 0) {
			this.snakeBody[0].x = (BoardDimensions.width - SnakeBodyPartDimensions.width);
		} else {
			this.snakeBody[0].x -= SnakeBodyPartDimensions.width;
		}

		const isGameOver = this.checkCollision();
		if (!isGameOver) {
			this.followTheHead(currSnakeHeadX, currSnakeHeadY);
		}
	}

	moveSnakeOneStepInPositiveY() {
		let currSnakeHeadX: number = this.snakeBody[0].x;
		let currSnakeHeadY: number = this.snakeBody[0].y;

		if (this.snakeBody[0].y + SnakeBodyPartDimensions.height >= BoardDimensions.height) {
			this.snakeBody[0].y = 0;
		} else {
			this.snakeBody[0].y += SnakeBodyPartDimensions.height;
		}
		const isGameOver = this.checkCollision();
		if (!isGameOver) {
			this.followTheHead(currSnakeHeadX, currSnakeHeadY);
		}
	}

	moveSnakeOneStepInNegativeY() {
		let currSnakeHeadX: number = this.snakeBody[0].x;
		let currSnakeHeadY: number = this.snakeBody[0].y;

		if (this.snakeBody[0].y - SnakeBodyPartDimensions.width < 0) {
			this.snakeBody[0].y = (BoardDimensions.height - SnakeBodyPartDimensions.height);
		} else {
			this.snakeBody[0].y -= SnakeBodyPartDimensions.height;
		}

		const isGameOver = this.checkCollision();
		if (!isGameOver) {
			this.followTheHead(currSnakeHeadX, currSnakeHeadY);
		}
	}

	private followTheHead(currSnakeHeadX: number, currSnakeHeadY: number) {
		for (let i = 1; i < this.snakeBody.length; i++) {
			const tempX: number = this.snakeBody[i].x;
			const tempY: number = this.snakeBody[i].y;

			this.snakeBody[i].x = currSnakeHeadX;
			this.snakeBody[i].y = currSnakeHeadY;

			currSnakeHeadX = tempX;
			currSnakeHeadY = tempY;
		}
	}

	getSnakeBody() {
		return this.snakeBody;
	}
}

class Game {
	private isMovingInPositiveX: boolean | null;
	private isMovingInPositiveY: boolean | null;

	private gameBoard: Board;
	private snake: Snake;
	private food: Food;

	private gameTimer: unknown;

	constructor() {
		this.isMovingInPositiveX = true;
		this.isMovingInPositiveY = null;

		this.gameBoard = new Board();
		this.snake = new Snake();
		this.food = new Food();
	}

	private drawBoard() {
		const points = this.snake.getSnakeBody();
		this.gameBoard.plotPoints(points);
		const foodPoints = this.food.getFoodPoints();
		this.gameBoard.plotPoint(foodPoints.x, foodPoints.y);
	}

	private checkCollisonWithFood() {
		let points: Array<SnakeBodyPart> = this.snake.getSnakeBody();
		const snakeHead = points[0];
		const foodPoints = this.food.getFoodPoints();
		if (snakeHead.x === foodPoints.x && snakeHead.y === foodPoints.y) {
			this.snake.eatFoodAndGrow(foodPoints.x, foodPoints.y);
			points = this.snake.getSnakeBody();
			this.food.generateNewFoodPoints();
		}
	}

	private controlDirections() {
		if (this.isMovingInPositiveX !== null) {
			if (this.isMovingInPositiveX) {
				this.snake.moveSnakeOneStepInPositiveX();
			} else {
				this.snake.moveSnakeOneStepInNegativeX();
			}
		}
		if (this.isMovingInPositiveY !== null) {
			if (this.isMovingInPositiveY) {
				this.snake.moveSnakeOneStepInPositiveY();
			} else {
				this.snake.moveSnakeOneStepInNegativeY();
			}
		}
	}

	private keyBoardControlls(keyCode: number) {
		if (keyCode === Arrow.UP && this.isMovingInPositiveY === null) {
			this.isMovingInPositiveY = false;
			this.isMovingInPositiveX = null;
		} else if (keyCode === Arrow.DOWN && this.isMovingInPositiveY === null) {
			this.isMovingInPositiveY = true;
			this.isMovingInPositiveX = null;
		} else if (keyCode === Arrow.LEFT && this.isMovingInPositiveX === null) {
			this.isMovingInPositiveX = false;
			this.isMovingInPositiveY = null;
		} else if (keyCode === Arrow.RIGHT && this.isMovingInPositiveX === null) {
			this.isMovingInPositiveX = true;
			this.isMovingInPositiveY = null;
		}
	}

	start() {
		gameTimer = window.setInterval(() => {
			this.gameBoard.clearBoard();
			this.checkCollisonWithFood();
			this.drawBoard();
			this.controlDirections();
		}, 100);

		window.addEventListener('keydown', e => {
			const { keyCode } = e;
			this.keyBoardControlls(keyCode);
		});
	}
}

const game = new Game();

game.start();