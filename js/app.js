let counter = document.querySelector('.score');
let modal = document.getElementById('new-game');

class Enemy {
    constructor(x, y, speed) {
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        // generates random speed (function at the bottom of code)
        this.speed = getRandomInt(50, 300);
    }

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
    update (dt) {   
        this.x += this.speed * dt;
        // when enemies are off the canvas
        if (this.x >= 505) {
            this.x = -100;
            this.speed = getRandomInt(50, 300);
        } 
    }

// Draw the enemy on the screen, required method for game
    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

class Player {
    constructor (x, y) {
        this.sprite = 'images/char-boy.png';
        this.x = x;
        this.y = y;
        this.points = 0;
        this.lives = 3;
    }

    startPosition () {
        this.x = 200;
        this.y = 400;
    }

    // Collision Detection
    // from MDN https://developer.mozilla.org/kab/docs/Games/Techniques/2D_collision_detection
    collision (player, enemy) { 
        if (this.x < enemy.x + 80 &&
             this.x + 60 >enemy.x &&
             this.y < enemy.y + 60 &&
             70 + this.y > enemy.y) {
                return true;
                this.startPosition();
        } else {
            return false;
        }
    }

    update (dt) {

    }

    updateScore () {
        this.points = this.points + 10;
        counter.innerHTML = player.points;
    }

    hideHearts (e) {
        let livesPanel = document.querySelector('.hearts');
        let hearts = livesPanel.querySelectorAll('li');
        // adding class to the list elements to "hide hearts"
        if (player.lives == 3) {
             livesPanel.lastElementChild.classList.add('hidden');
        } else if (player.lives == 2) { 
             livesPanel.lastElementChild.previousElementSibling.classList.add('hidden');
        } else { 
             livesPanel.firstElementChild.classList.add('hidden');
        }
        this.lives --;
    }

    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

// allows to move the player on keypress by 100 on x axis and 85 on y axis
// defines the area the player can move on (0-400)
    handleInput (e) {
        switch (e) {
            case 'left':
                if (this.x > 0) {
                    this.x -= 100;
                }
                break;
            case 'right':
                if (this.x < 400) {
                    this.x += 100;
                }
                break;
            case 'up':
                if (this.y > 0) {
                    this.y -= 85;
                }
                break;
            case 'down':
                if (this.y < 400) {
                    this.y += 85;
                }
                break;
        } 
        // player reaches the water - position resets
        if (this.y < 0) {
            setTimeout(() => {
                this.x = 200;
                this.y = 400;
            }, 500);
            player.updateScore();
        }
    }
};

const allEnemies =
    [
        enemy1 = new Enemy(-100, 60),
        enemy2 = new Enemy(-200, 145),
        enemy3 = new Enemy(-100, 230),
        enemy4 = new Enemy(0, 145),
    ];

const player = new Player(200, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
function listen(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
};

document.addEventListener('keyup', listen);

// Returns a random integer between min (inclusive) and max (inclusive)
// from stackoverflow https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min; 
};
// removes event listeners from "move keys"
function removeListeners() {
    document.removeEventListener('keyup', listen);
};

// displays modal to start a game and initializes it after clicking the button
function newGame() {
    modal.style.display = 'block';
    removeListeners();
    play();
};

function play() {
    const restartBtn = document.querySelector('#play-btn'); 
    restartBtn.addEventListener("click", function(){
        modal.style.display = "none";
        document.addEventListener('keyup', listen);
        init();
    });
};
}
