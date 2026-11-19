function getElement(id) {
    return document.getElementById(id);
}

// Calculator
var calcExpression = "";
var calculatorButtons = document.querySelectorAll("[data-calc]");

for (var buttonIndex = 0; buttonIndex < calculatorButtons.length; buttonIndex += 1) {
    calculatorButtons[buttonIndex].addEventListener("click", function () {
        var value = this.getAttribute("data-calc");

        if (value === "clear") {
            calcExpression = "";
        } else if (value === "back") {
            calcExpression = calcExpression.slice(0, -1);
        } else if (value === "=") {
            try {
                if (!/^[0-9+\-*/. ]+$/.test(calcExpression)) {
                    throw new Error("Invalid expression");
                }

                var result = Function("return (" + calcExpression + ")")();

                if (isFinite(result)) {
                    calcExpression = String(result);
                } else {
                    calcExpression = "";
                }
            } catch (error) {
                calcExpression = "";
                getElement("calc-display").value = "Error";
                return;
            }
        } else {
            calcExpression += value;
        }

        if (calcExpression === "") {
            getElement("calc-display").value = "0";
        } else {
            getElement("calc-display").value = calcExpression;
        }
    });
}

// Counter
var counter = 0;

function updateCounter() {
    getElement("counter-value").textContent = counter;
}

getElement("counter-plus").addEventListener("click", function () {
    counter += 1;
    updateCounter();
});

getElement("counter-minus").addEventListener("click", function () {
    counter -= 1;
    updateCounter();
});

getElement("counter-reset").addEventListener("click", function () {
    counter = 0;
    updateCounter();
});

// Stopwatch
var watchStartTime = 0;
var watchElapsed = 0;
var watchTimer = null;

function addZero(number) {
    if (number < 10) {
        return "0" + number;
    }

    return String(number);
}

function renderWatch() {
    var total = watchElapsed;
    var minutes = Math.floor(total / 60000);
    var seconds = Math.floor(total / 1000) % 60;
    var tenths = Math.floor((total % 1000) / 10);

    getElement("stopwatch-display").textContent =
        "00:" + addZero(minutes) + ":" + addZero(seconds) + "." + addZero(tenths);
}

getElement("watch-start").addEventListener("click", function () {
    if (watchTimer) {
        clearInterval(watchTimer);
        watchTimer = null;
        getElement("watch-start").textContent = "Resume";
    } else {
        watchStartTime = Date.now() - watchElapsed;
        watchTimer = setInterval(function () {
            watchElapsed = Date.now() - watchStartTime;
            renderWatch();
        }, 40);
        getElement("watch-start").textContent = "Pause";
    }
});

getElement("watch-reset").addEventListener("click", function () {
    clearInterval(watchTimer);
    watchTimer = null;
    watchElapsed = 0;
    getElement("watch-start").textContent = "Start";
    renderWatch();
});

// Temperature converter
function convertTemperature() {
    var input = Number(getElement("temperature-input").value);
    var unit = getElement("temperature-unit").value;
    var result;

    if (!isFinite(input)) {
        return;
    }

    if (unit === "c") {
        result = (input * 9) / 5 + 32;
        getElement("temperature-result").textContent =
            input + "°C = " + result.toFixed(1) + "°F";
    } else {
        result = ((input - 32) * 5) / 9;
        getElement("temperature-result").textContent =
            input + "°F = " + result.toFixed(1) + "°C";
    }
}

getElement("temperature-input").addEventListener("input", convertTemperature);
getElement("temperature-unit").addEventListener("change", convertTemperature);

// Dice roller
getElement("roll-dice").addEventListener("click", function () {
    var count = Number(getElement("dice-count").value);
    var diceResults = "";
    var diceIndex;

    if (!count) {
        count = 1;
    }

    if (count < 1) {
        count = 1;
    }

    if (count > 3) {
        count = 3;
    }

    getElement("dice-count").value = count;

    for (diceIndex = 0; diceIndex < count; diceIndex += 1) {
        diceResults += "<span>" + (Math.floor(Math.random() * 6) + 1) + "</span>";
    }

    getElement("dice-results").innerHTML = diceResults;
});

// Rock paper scissors
var choices = ["rock", "paper", "scissors"];
var playerScore = 0;
var computerScore = 0;
var choiceButtons = document.querySelectorAll("[data-choice]");

for (var choiceIndex = 0; choiceIndex < choiceButtons.length; choiceIndex += 1) {
    choiceButtons[choiceIndex].addEventListener("click", function () {
        var playerChoice = this.getAttribute("data-choice");
        var randomChoice = Math.floor(Math.random() * choices.length);
        var computerChoice = choices[randomChoice];
        var wins = false;
        var tie = false;

        if (
            (playerChoice === "rock" && computerChoice === "scissors") ||
            (playerChoice === "paper" && computerChoice === "rock") ||
            (playerChoice === "scissors" && computerChoice === "paper")
        ) {
            wins = true;
        }

        if (playerChoice === computerChoice) {
            tie = true;
        }

        if (wins) {
            playerScore += 1;
        } else if (!tie) {
            computerScore += 1;
        }

        if (tie) {
            getElement("rps-result").textContent =
                "Tie — both chose " + computerChoice;
        } else if (wins) {
            getElement("rps-result").textContent =
                "You win — computer chose " + computerChoice;
        } else {
            getElement("rps-result").textContent =
                "You lose — computer chose " + computerChoice;
        }

        getElement("player-score").textContent = playerScore;
        getElement("computer-score").textContent = computerScore;
    });
}

// Password generator
function makePassword() {
    var length = Number(getElement("password-length").value);
    var alphabet =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    var password = "";
    var passwordIndex;
    var randomIndex;

    for (passwordIndex = 0; passwordIndex < length; passwordIndex += 1) {
        randomIndex = Math.floor(Math.random() * alphabet.length);
        password += alphabet.charAt(randomIndex);
    }

    getElement("password-output").value = password;
}

getElement("password-length").addEventListener("input", function () {
    getElement("password-length-value").textContent =
        getElement("password-length").value;
    makePassword();
});

getElement("generate-password").addEventListener("click", makePassword);
getElement("copy-password").addEventListener("click", function () {
    navigator.clipboard.writeText(getElement("password-output").value).then(function () {
        getElement("copy-password").textContent = "✓";

        setTimeout(function () {
            getElement("copy-password").textContent = "▣";
        }, 1200);
    });
});
makePassword();

// Number guessing game
var secretNumber = Math.floor(Math.random() * 100) + 1;
var guesses = 0;

function resetGuessGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    guesses = 0;
    getElement("guess-input").value = "";
    getElement("guess-message").textContent = "I am thinking of a number...";
}

getElement("submit-guess").addEventListener("click", function () {
    var guess = Number(getElement("guess-input").value);
    var attemptText;

    if (guess !== Math.floor(guess) || guess < 1 || guess > 100) {
        getElement("guess-message").textContent =
            "Please enter a whole number from 1 to 100.";
        return;
    }

    guesses += 1;

    if (guesses === 1) {
        attemptText = "attempt";
    } else {
        attemptText = "attempts";
    }

    if (guess === secretNumber) {
        getElement("guess-message").textContent =
            "Correct! You found it in " + guesses + " " + attemptText + ".";
    } else if (guess < secretNumber) {
        getElement("guess-message").textContent =
            "Too low — try a bigger number.";
    } else {
        getElement("guess-message").textContent =
            "Too high — try a smaller number.";
    }
});

getElement("new-guess-game").addEventListener("click", resetGuessGame);

// Random numbers
getElement("generate-numbers").addEventListener("click", function () {
    var numbers = "";
    var numberIndex;

    for (numberIndex = 0; numberIndex < 3; numberIndex += 1) {
        numbers += "<span>" + (Math.floor(Math.random() * 10) + 1) + "</span>";
    }

    getElement("random-numbers").innerHTML = numbers;
});

// Live clock
function updateClock() {
    var now = new Date();
    var dateOptions = {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric"
    };

    getElement("clock-display").textContent = now.toLocaleTimeString();
    getElement("clock-date").textContent = now.toLocaleDateString(
        undefined,
        dateOptions
    );
}

updateClock();
setInterval(updateClock, 1000);

// Fisher-Yates array shuffle
var shuffledItems = [1, 2, 3, 4, 5];

function showArray() {
    getElement("array-output").textContent = shuffledItems.join(" · ");
}

getElement("shuffle-array").addEventListener("click", function () {
    var index;
    var randomIndex;
    var temporaryValue;

    for (index = shuffledItems.length - 1; index > 0; index -= 1) {
        randomIndex = Math.floor(Math.random() * (index + 1));
        temporaryValue = shuffledItems[index];
        shuffledItems[index] = shuffledItems[randomIndex];
        shuffledItems[randomIndex] = temporaryValue;
    }

    showArray();
});

// Simple image slider using colored panels
var slideColors = ["#dceec5", "#c9e7e8", "#f8dfb7"];
var slideIndex = 0;

function showSlide() {
    getElement("color-slide").style.backgroundColor = slideColors[slideIndex];
    getElement("color-slide").textContent = "Slide " + (slideIndex + 1);
}

getElement("next-slide").addEventListener("click", function () {
    slideIndex += 1;

    if (slideIndex === slideColors.length) {
        slideIndex = 0;
    }

    showSlide();
});

getElement("previous-slide").addEventListener("click", function () {
    slideIndex -= 1;

    if (slideIndex < 0) {
        slideIndex = slideColors.length - 1;
    }

    showSlide();
});

// Pokemon API
getElement("find-pokemon").addEventListener("click", function () {
    var name = getElement("pokemon-name").value.trim().toLowerCase();
    var url;

    if (!name) {
        getElement("pokemon-result").textContent =
            "Please enter a Pokemon name.";
        return;
    }

    getElement("pokemon-result").textContent = "Searching...";
    url = "https://pokeapi.co/api/v2/pokemon/" + encodeURIComponent(name);

    fetch(url)
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Pokemon not found");
            }

            return response.json();
        })
        .then(function (data) {
            getElement("pokemon-result").textContent =
                data.name.toUpperCase() +
                " · height " +
                data.height +
                " · weight " +
                data.weight;
        })
        .catch(function () {
            getElement("pokemon-result").textContent =
                "Pokemon not found. Try pikachu.";
        });
});

// Basic checkbox and radio input example
getElement("check-inputs").addEventListener("click", function () {
    var selectedLevel = document.querySelector(
        'input[name="level"]:checked'
    ).value;
    var learningMessage = "";

    if (getElement("learning-check").checked) {
        learningMessage = "Great! ";
    }

    getElement("check-result").textContent =
        learningMessage + "Your level is " + selectedLevel + ".";
});

renderWatch();
