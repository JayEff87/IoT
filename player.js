class Player {
    constructor(x, y) {
        this._x = x;
        this._y = y;
        this._r = 10;
        this._maxSpeedY = 5;
        this._speedY = 0;
        this._color = "#FF0000"
        this._first = true;
    }

    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }

    draw(ctx) {
        if (this._first) {
            //alert("coords: " + this.x + ", " + this.y);
            this._first = false;
        }

        this._y = this._y + this._speedY;

        ctx.fillStyle = this._color;
        ctx.beginPath();
        //ctx.arc(100, 100, 100, 0, Math.PI*2, true);
        ctx.arc(this._x, this._y, this._r, 0, Math.PI*2, true);
        ctx.fill();      
    }

    applyForce(val) {
        this._speedY += val;
        this.speedCorrect();
    }

    setSpeed(val) {
        this._speedY = val;
    }

    speedCorrect() {
        if (this._speedY > this._maxSpeedY)
            this._speedY = this._maxSpeedY;
        if (this._speedY < -this._maxSpeedY)
            this._speedY = -this._maxSpeedY;

    }

}