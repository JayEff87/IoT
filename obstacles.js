class Obstacle {
    constructor(top, bottom, x) {
        this._top = top;
        this._bottom = bottom;
        this._x = x;
        this._first = true;
    }

    get x() {
        return this._x;
    }
    get top() {
        return this._top;
    }
    get bottom() {
        return this._bottom;
    }

    set x(val) {
        this._x = val;
    }

    collide(player) {
        if (Math.abs(player.x - this._x) < player.r) {
            if (this._top > 0) {
                if (player.y - player.r <= this._top)
                    return true;
            }
            if (this._bottom > 0) {
                if (player.y + player.r >= this._bottom)
                    return true;
            }
        }
        return false;
    }

    draw(ctx, top, bottom) {
        
        if (this._first) {
            //alert("top: " + this._top + " bottom: " + this._bottom);
            this._first = false;
        }

        ctx.beginPath();
       
        if (this._top > 0) {
            ctx.moveTo(this._x, top);
            ctx.lineTo(this._x, this._top);
        }

        if (this._bottom > 0) {
            ctx.moveTo(this._x, bottom);
            ctx.lineTo(this._x, this._bottom);
        }
        ctx.strokeStyle = "red";
        ctx.lineWidth = 5;
        ctx.stroke();
    }
}

class ObstacleGenerator {
    constructor(top, left, bottom, right) {
        this._top = top;
        this._bottom = bottom;
        this._left = left;
        this._right = right;
        this._obstacles = [];        
        this._obstacles.push(new Obstacle(50, 250, right - 100));
        this._obstacles.push(new Obstacle(150, 350, right));
        this._first = true;
        this._generationTimer = 0;
        this._difficulty = 100;
        this._budget = 0;
        this._minGap = (bottom - top) * 0.25;
        this._maxGap = (bottom - top) * 0.45;
        this._maxDist = (bottom - top) * (0.35);
        this._obsSpeed = -(right-left) / 500;
        //solve speed times (sum from i=1 to offset-in-frames over i) = maxDist for offset-in-frames
        this._multiObsOffset = -.5 + Math.sqrt(.25 + 2 * this._maxDist / (3 * 0.08 * (right-left)/412));
        this._multiObsOffset *= -this._obsSpeed;
    }

    get difficulty() {
        return this._difficulty;
    }
    set difficulty(val) {
        this._difficulty = val;
    }

    increaseSpeed() {
        this._obsSpeed += 0.1
        //solve speed times (sum from i=1 to offset-in-frames over i) = maxDist for offset-in-frames
        this._multiObsOffset = -.5 + Math.sqrt(.25 + 2 * this._maxDist / (3 * 0.08 * (right-left)/412));
        this._multiObsOffset *= -this._obsSpeed;
    }

    startGenerating() {
        var obj = this;
        this._generationTimer = setInterval(function(){obj._generate();}, 1000);
    }
    stopGenerating() {
        clearInterval(this._generationTimer);
    }

    _generate() {
        this._budget += this._difficulty;
        var offset = 0;
        var prevObs = this._obstacles[this._obstacles.length - 1];
        if (this._right - prevObs.x < 100)
            return;
        //alert("generating with budget: " + this._budget);
        while (Math.random() * 1000 < this._budget) {
            //alert("generating with offset: " + offset);
            var thisObs = this._createObs(offset);
            offset += this._multiObsOffset;
            this._budget -= 100;
            this._obstacles.push(thisObs);
        }
    }
    _createObs(offset) {
        var gap = Math.random() * (this._maxGap - this._minGap) + this._minGap;
        this._budget -= (200 - gap);
        var distance = 0;
        if (offset > 0) {
            distance = Math.random() * this._maxDist / 3;
            this._budget -= distance * 3;
        } else {
            distance = Math.random() * this._maxDist;
            this._budget -= distance;
        }
        //alert("gap: " + gap + " distance: " + distance + " budget: " + this._budget);
        var lastObs = this._obstacles[this._obstacles.length - 1];
        var newTop, newBottom;
        if (lastObs.top - distance <= 10) {
            newBottom = lastObs.bottom + distance;
            newTop = newBottom - gap;
        } else {
            newTop = lastObs.top - distance;
            newBottom = newTop + gap;
        }
        return new Obstacle(newTop, newBottom, this._right + offset);
    }

    moveObstacles() {
        var speed = this._obsSpeed;
        this._obstacles.forEach(function(item) {
            item.x = item.x + speed;
        })
        if (this._obstacles.length > 0) {
            if (this._obstacles[0].x < 0) {
                this._obstacles.shift();
                
            }
        }
    }

    collide(player) {
        for (var i = 0; i < this._obstacles.length; i++)
            if (this._obstacles[i].collide(player))
                return true;

        return false;
    }

    draw(ctx) {
        if (this._first) {
            this._first = false;
        }
        for (var i = 0; i < this._obstacles.length; i++)
            this._obstacles[i].draw(ctx, this._top, this._bottom);
    }
}