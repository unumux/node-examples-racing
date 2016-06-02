import {EventEmitter} from "events";
import chalk from "chalk";
const readline = require("readline");

class RaceCar {
    constructor(topSpeed, acceleration, color) {
        this.topSpeed = topSpeed;
        this.acceleration = acceleration;
        this.color = color;
        this.reset();
    }

    get currentSpeed() {
        return this._currentSpeed;
    }

    set currentSpeed(speed) {
        this._currentSpeed = speed > this.topSpeed ? this.topSpeed : speed; 
    }

    reset() {
        this.position = 0;
        this._currentSpeed = 0;
    }

    advance() {
        this.currentSpeed = this.currentSpeed + this.acceleration;
        this.position += this.currentSpeed;
    }
}

class Track extends EventEmitter {
    constructor(length) {
        super();
        this.length = length;
        this.cars = [];
    }

    addCar(car) {
        this.cars.push(car);
    }

    advanceCars() {
        this.cars.forEach(function(car) {
            car.advance();
        });
    }

    getWinningCars() {
        return this.cars.filter((car) => {
            return car.position > this.length;
        });
    }

    race() {
        this.advanceCars();
        this.emit("update");
        let winningCars = this.getWinningCars();
        if(winningCars.length) {
            this.emit("done", winningCars);
        } else {
            setTimeout(() => {
                this.race();
            }, 20);
        }
    }
}

var race = new Track(1000);

race.addCar(new RaceCar(100, 3, "red"));
race.addCar(new RaceCar(120, 2, "blue"));
race.addCar(new RaceCar(200, 1, "yellow"));
race.addCar(new RaceCar(80, 4, "green"));


race.race();






// Don't worry about what's happening down here!

race.on("done", function(cars) {
    readline.moveCursor(process.stdout, 0, this.cars.length + 2);
    
    let carColors = cars.map(function(car) {
        return car.color;
    });

    console.log(`Winner is: ${carColors.join(", ")}`);
    process.stderr.write('\x1B[?25h'); // this reshows our cursor
    process.exit();
});

race.on("update", function() {
    process.stderr.write('\x1B[?25l'); // this hides our cursor
    let colNum = process.stdout.columns;
    let lengthPerCol = this.length / colNum;    
    let trackEdge = new Array(colNum).fill("◎").join("");
    readline.clearLine(process.stdout, 0);
    console.log(trackEdge);
    this.cars.forEach(function(car) {
        let numOfSpaces = Math.floor(car.position / lengthPerCol);
        if(numOfSpaces  > colNum - 1) {
            numOfSpaces = colNum - 1;
        }
        let spaces = numOfSpaces > 0 ? new Array(numOfSpaces).fill(" ").join("") : "";
        let carChar = chalk[car.color]("►");
        console.log(`${spaces}${carChar}`);
    });
    console.log(trackEdge);
    readline.moveCursor(process.stdout, 0, 0 - (this.cars.length + 2));        
});