// Canva's blocks width and height
let blockWidth, blockHeight, canvasWidth, canvasHeight, score;
blockWidth = 101;
blockHeight = 83;
canvasWidth = 505;
canvasHeight = 606;
score = 0;

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 70;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if ( this.x > canvasWidth) {
        this.x = -100 * Math.floor(Math.random() * 4) + 1;
    } else {
        this.x += (200 * dt);
    }

    // Check collision between Enemy and Player
    if (collision(player.x, player.y, player.width, player.height, this.x, this.y, this.width, this.height)) {
        // Reset player's position
        player.x = 205;
        player.y = 375;
        // Subtract 1 from score
        if (score > 0) {
            score --;
        }
        // Update score UI
        document.querySelector(".score").textContent = score;
    }
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 70;
    this.sprite = 'images/char-horn-girl.png';
};

Player.prototype.update = function(dt) {
    if (player.y <= 30) {
        // Add +1 to score
        score ++;
        // Update score UI
        document.querySelector(".score").textContent = score;
        // Reset player's position
        player.x = 205;
        player.y = 375;
    }
};

Player.prototype.render = function()  {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(route) {
    if (route === "up" && this.y - blockHeight > 0 - player.height) {
        this.y -= blockHeight;
    } else if (route === "down" && this.y + blockHeight < canvasHeight - (blockWidth * 2)) {
        this.y += blockHeight;
    } else if (route === "left" && this.x - blockWidth >= 0) {
        this.x -= blockWidth;
    } else if (route === "right" && this.x + blockWidth < canvasWidth) {
        this.x += blockWidth;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [55, 130 ,220].map((enemyPositionY, index) => {
    return new Enemy((-100 * (index + 1)), enemyPositionY)
});

const player = new Player(205, 375);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Check collision between player and enemies
function collision(playerX, playerY, playerWidth, playerHeight, enemyX, enemyY, enemyWidth, enemyHeight) {
    return (Math.abs(playerX - enemyX) * 2 < playerWidth + enemyWidth) && (Math.abs(playerY - enemyY) * 2 < playerHeight + enemyHeight)
}

// Restart the game
document.querySelector(".restart").addEventListener('click', () => {
    // Reset score to 0
    score = 0;

    // Update score UI
    document.querySelector(".score").textContent = score;

    // Reset player's position
    player.x = 205;
    player.y = 375;

    // Reset Enemies
    allEnemies = [55, 130 ,220].map((enemyPositionY, index) => {
        return new Enemy((-100 * (index + 1)), enemyPositionY)
    });
})