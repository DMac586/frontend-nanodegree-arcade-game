// Random number generator
var randomFactor = function() {
    factor = Math.random();
    return factor;
};

// Random number from Interval generator
var randomIntFromInterval = function(min, max) {
    i = Math.floor(Math.random() * (max - min + 1) + min);
    return i;
};

// randomly assign a row
var setRow = function() {
    randomFactor();
    if (factor < 0.33)
        this.y = 60; // set to first row
    else if (factor > 0.66)
        this.y = 150; // set to second row
    else
        this.y = 230; // set to third row
    return this.y;
};

// randomly assing a collumn
var setCollumn = function() {
    randomFactor();
    if (factor <= 0.20)
        this.x = 0; // sets first collumn
    else if (factor > 0.20 && factor <= 0.40)
        this.x = 100; // sets second collumn
    else if (factor > 0.40 && factor <= 0.60)
        this.x = 200; // sets third collumn
    else if (factor > 0.60 && factor <= 0.80)
        this.x = 300; // sets fourth collumn
    else
        this.x = 400; // sets fifthy collumn
    return this.x;
};

// set randomized speed between limits
var Speed = function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 100));
};


//EMEMIES SECTION BEGIN---------------------------------------------------

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = -100;
    this.y = setRow();
    this.width = 75;
    this.height = 50;
    this.speed = Speed(100, 300);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Creates the 3 Enemies
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
// Puts 3 Enemies into an array
var allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3);

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    //Resets the Enemies after they wnet off the Canvas
    if (this.x > 500) {
        this.x = -50;
        this.y = setRow();
        this.speed = Speed(50, 350);
    }
};
// Put Enemies on screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//ENEMIES SECTION ENDS ---------------------------------------------------

//PLAYER SECTION BEGIN---------------------------------------------------

//Player Selection
document.getElementById('player-selected').innerHTML = 'Choose your Player!';
// Select player
var selectedChar = false;
var selectChar = function(char) {
    console.log(char);
    selectedChar = char;
    switch (selectedChar) {
        case 'images/char-boy.png':
            document.getElementById('player-selected').innerHTML = 'Boy';
            break;
        case 'images/char-cat-girl.png':
            document.getElementById('player-selected').innerHTML = 'Cat Girl';
            break;
        case 'images/char-horn-girl.png':
            document.getElementById('player-selected').innerHTML = 'Horn Girl';
            break;
        case 'images/char-pink-girl.png':
            document.getElementById('player-selected').innerHTML = 'Pink Girl';
            break;
        case 'images/char-princess-girl.png':
            document.getElementById('player-selected').innerHTML = 'Princess';
            break;
    }
    return selectedChar;
};

//Starts Play section movement
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 75;
    this.sprite = selectedChar;
};

// Place the player object in a variable called player
// Instances of Players
var player = new Player(200, 400);

// Resets Player back to original start
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

// Player Update
Player.prototype.update = function(dt) {
    if (this.y <= -12.5) {
        this.win();
        this.reset();
    }
    this.checkCollisions();
    this.gemsCollisions();
    this.rocksCollisions();
};


// Player Render
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(selectedChar), this.x, this.y);
};
//PLAY SECTION ENDS----------------------------------------------------

//GEM SECTION BEGINS --------------------------------------------------
var Gems = function(sprite) {
    this.x = setCollumn();
    this.y = setRow();
    this.width = 30;
    this.height = 30;
    this.sprite = sprite;
};
Gems.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Gems.prototype.update = function(dt) {
};

// Instance of Gem's
var gemHeart = new Gems('images/Heart.png');
var gemOrange = new Gems('images/Gem-Orange.png');
var gemGreen = new Gems('images/Gem-Green.png');
var gemBlue = new Gems('images/Gem-Blue.png');
var gemStar = new Gems('images/Star.png');
var allGems = [];

// Set Gems Randomly
var randomGems = function() {
    var allGemsArr = [gemHeart, gemOrange, gemGreen, gemBlue, gemStar];
    randomIntFromInterval(0, 4);
    allGemsArr[i].x = setCollumn();
    allGemsArr[i].y = setRow();
    return allGemsArr[i];
};

// Set time for Gems to display and disapear
var displayGems = function() {
    setTimeout(function() {
        allGems.pop();
    }, randomIntFromInterval(10000, 20000));
    setTimeout(function() {
        allGems.push(randomGems());
    }, randomIntFromInterval(5000, 10000));
};
displayGems();
setInterval(displayGems, randomIntFromInterval(10000, 20000));
//GEM SECTION ENDS----------------------------------------------------

//ROCK SECTION BEGINS------------------------------------------------

var Rocks = function() {
    this.x = setCollumn();
    this.y = setRow();
    this.width = 75;
    this.height = 75;
    this.sprite = 'images/Rock.png';
};
Rocks.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Rocks.prototype.update = function(dt) {};

// Instance of Rocks
var allRocks = [];

var setRocks = function() {
    // Set the number of Rocks in condition to number of crosses
    if (crosses >= 3 && crosses < 6) {
        var rock1 = new Rocks();
        allRocks.push(rock1);
        allRocks = [];
        allRocks.push(rock1);
    } else if (crosses >= 6 && crosses < 10) {
        var rock2 = new Rocks();
        var rock3 = new Rocks();
        allRocks.push(rock2, rock3);
        allRocks = [];
        allRocks.push(rock2, rock3);
    } else if (crosses >= 10 && crosses < 15) {
        var rock4 = new Rocks();
        var rock5 = new Rocks();
        var rock6 = new Rocks();
        allRocks.push(rock4, rock5, rock6);
        allRocks = [];
        allRocks.push(rock4, rock5, rock6);
    } else if (crosses >= 15 && crosses < 20) {
        var rock7 = new Rocks();
        var rock8 = new Rocks();
        var rock9 = new Rocks();
        var rock10 = new Rocks();
        allRocks.push(rock7, rock8, rock9, rock10);
        allRocks = [];
        allRocks.push(rock7, rock8, rock9, rock10);
    } else if (crosses >= 20 && crosses < 50) {
        var rock11 = new Rocks();
        var rock12 = new Rocks();
        var rock13 = new Rocks();
        var rock14 = new Rocks();
        var rock15 = new Rocks();
        allRocks.push(rock11, rock12, rock13, rock14, rock15);
        allRocks = [];
        allRocks.push(rock11, rock12, rock13, rock14, rock15);
    } else if (crosses >= 50) {
        var rock16 = new Rocks();
        var rock17 = new Rocks();
        var rock18 = new Rocks();
        var rock19 = new Rocks();
        var rock20 = new Rocks();
        var rock21 = new Rocks();
        allRocks.push(rock16, rock17, rock18, rock19, rock20, rock21);
        allRocks = [];
        allRocks.push(rock16, rock17, rock18, rock19, rock20, rock21);
    }
};
//ROCK SECTION ENDS---------------------------------------------------------------------------------------

// Starting scores
var crosses = 0;
var streak = 0;
var score = 0;
var life = 5;
var star = 0;
var starActivation = 1;

//Activates Star
var starActive = false;
var starActive = function() {
    if (star > 0) {
        setTimeout(function() {
            star = 0;
            return true;
        }, 5000);

    } else {
        return false;
    }
};

//Streak and crosses counter
Player.prototype.win = function() {
    crosses++;
    streak++;
    if (streak > 20 && streak < 31 || crosses > 50 && crosses < 101) {
        score += 20;
    } else if (streak > 30 && streak < 51 || crosses > 100 && crosses < 151) {
        score += 30;
    } else if (streak > 50 || crosses > 150) {
        score += 40;
    } else {
        score += 10;
    }
    setRocks();
};

// Game Reset
var gameReset = function() {
    crosses = 0;
    streak = 0;
    score = 0;
    life = 5;
    star = 0;
    starActivation = 1;
    allRocks = [];
    allGems.pop();
    enemyOne.x = -100;
    enemyTwo.x = -100;
    enemyThree.x = -100;
};

//PLAYER HITS ITEMS SECTION--------------------------------------------------------
// Player hits Enemies
Player.prototype.checkCollisions = function() {
    if (starActive() === false) {   //Disables collision if starActive is true
        for (i = 0; i < allEnemies.length; i++)
            if (this.x < allEnemies[i].x + allEnemies[i].width &&
                this.x + this.width > allEnemies[i].x &&
                this.y < allEnemies[i].y + allEnemies[i].height &&
                this.height + this.y > allEnemies[i].y) {

                this.reset();
                streak = 0;
                life--;
                if (life < 0) {
                    alert("Game Over!!  " + "  Crosses: " + crosses + "   Score: " + score);
                    gameReset();
                }
                setRocks();
            }
    }
};

// Player Gets Gem
Player.prototype.gemsCollisions = function() {
    for (i = 0; i < allGems.length; i++)
        if (this.x < allGems[i].x + allGems[i].width &&
            this.x + this.width > allGems[i].x &&
            this.y < allGems[i].y + allGems[i].height &&
            this.height + this.y > allGems[i].y) {
            if (allGems[i].sprite === 'images/Gem-Orange.png') {
                if (streak > 20 && streak < 31 || crosses > 50 && crosses < 101) {
                    score += 200;
                } else if (streak > 30 && streak < 51 || crosses > 100 && crosses < 151) {
                    score += 300;
                } else if (streak > 50 || crosses > 150) {
                    score += 400;
                } else {
                    score += 100;
                }
            } else if (allGems[i].sprite === 'images/Gem-Green.png') {
                if (streak > 20 && streak < 31 || crosses > 50 && crosses < 101) {
                    score += 400;
                } else if (streak > 30 && streak < 51 || crosses > 100 && crosses < 151) {
                    score += 600;
                } else if (streak > 50 || crosses > 150) {
                    score += 800;
                } else {
                    score += 200;
                }
            } else if (allGems[i].sprite === 'images/Gem-Blue.png') {
                if (streak > 20 && streak < 31 || crosses > 50 && crosses < 101) {
                    score += 800;
                } else if (streak > 30 && streak < 51 || crosses > 100 && crosses < 151) {
                    score += 1200;
                } else if (streak > 50 || crosses > 150) {
                    score += 1600;
                } else {
                    score += 300;
                }
            } else if (allGems[i].sprite === 'images/Heart.png') {
                life++;

            } else if (allGems[i].sprite === 'images/Star.png') {
                starActivation++;
            }
            allGems.pop(); //Make gems disapear after being collected
        }
};


// PLAYER HITS ROCK SECTION BEGIN ----------------------------------------------
var xArr = []; //Contain all X coordinates
var yArr = []; //Contain all Y coordinates
var lastX;
var lastY;
//Push Coordinates to Array
var addLoc = function() {
    xArr.push(player.x);
    yArr.push(player.y);
};
//Reverse Array to get last x position
var lastLocX = function() {
    xArr.reverse();
    lastX = xArr[0];
    return lastX;
};
//Reverse Array to get last y position
var lastLocY = function() {
    yArr.reverse();
    lastY = yArr[0];
    return lastY;
};

Player.prototype.rocksCollisions = function() {
    if (starActive() === false) {   //Disables collision if starActive is true
        for (i = 0; i < allRocks.length; i++)
            if (this.x < allRocks[i].x + allRocks[i].width &&
                this.x + this.width > allRocks[i].x &&
                this.y < allRocks[i].y + allRocks[i].height &&
                this.height + this.y > allRocks[i].y) {

                lastLocX();
                lastLocY();
                this.x = lastX;
                this.y = lastY;
            }
    }
};



// Player HandleInput
player.handleInput = function(direction) {
    if (direction === 'left' && this.x > 0) {
        this.x -= 100;
    }
    if (direction === 'up' && this.y > -12.5) {
        this.y -= 82.5;
    }
    if (direction === 'right' && this.x < 400) {
        this.x += 100;
    }
    if (direction === 'down' && this.y < 400) {
        this.y += 82.5;
    }
    if (direction === 'star activation') {
        if (starActivation > 0) {
            star++;
            starActivation--;
            var originalChar = selectedChar;
            selectedChar = 'images/Star.png';
            setInterval(function() {
                selectedChar = originalChar;
            }, 5000);
        }
    }
    if (direction === 'restart') {
        gameReset();
    }
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        83: 'star activation',
        82: 'restart'
    };
    player.handleInput(allowedKeys[e.keyCode]);
    addLoc();
    xArr.reverse();
    yArr.reverse();
});

//Introduction Page
function startGame() {
    if (selectedChar === false) {
        alert('Please Select a Player');
    } else {
        document.getElementById("introduction").setAttribute("class", "hide");
        Engine(this);
    }
}
