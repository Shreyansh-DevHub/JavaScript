const $ = (id) => document.getElementById(id);

// Calculator
let calcExpression = "";
document.querySelectorAll("[data-calc]").forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.dataset.calc;
        if (value === "clear") calcExpression = "";
        else if (value === "back") calcExpression = calcExpression.slice(0, -1);
        else if (value === "=") {
            try {
                if (!/^[0-9+\-*/. ]+$/.test(calcExpression)) throw new Error("Invalid expression");
                const result = Function(`"use strict"; return (${calcExpression})`)();
                calcExpression = Number.isFinite(result) ? String(result) : "";
            } catch {
                calcExpression = "";
                $("calc-display").value = "Error";
                return;
            }
        } else calcExpression += value;
        $("calc-display").value = calcExpression || "0";
    });
});

// Counter
let counter = 0;
function updateCounter() { $("counter-value").textContent = counter; }
$("counter-plus").addEventListener("click", () => { counter += 1; updateCounter(); });
$("counter-minus").addEventListener("click", () => { counter -= 1; updateCounter(); });
$("counter-reset").addEventListener("click", () => { counter = 0; updateCounter(); });

// Stopwatch
let watchStartTime = 0;
let watchElapsed = 0;
let watchTimer = null;
function renderWatch() {
    const total = watchElapsed;
    const minutes = Math.floor(total / 60000).toString().padStart(2, "0");
    const seconds = Math.floor(total / 1000 % 60).toString().padStart(2, "0");
    const tenths = Math.floor(total % 1000 / 10).toString().padStart(2, "0");
    $("stopwatch-display").textContent = `00:${minutes}:${seconds}.${tenths}`;
}
$("watch-start").addEventListener("click", () => {
    if (watchTimer) {
        clearInterval(watchTimer);
        watchTimer = null;
        $("watch-start").textContent = "Resume";
    } else {
        watchStartTime = Date.now() - watchElapsed;
        watchTimer = setInterval(() => { watchElapsed = Date.now() - watchStartTime; renderWatch(); }, 40);
        $("watch-start").textContent = "Pause";
    }
});
$("watch-reset").addEventListener("click", () => { clearInterval(watchTimer); watchTimer = null; watchElapsed = 0; $("watch-start").textContent = "Start"; renderWatch(); });

// Temperature converter
function convertTemperature() {
    const input = Number($("temperature-input").value);
    const unit = $("temperature-unit").value;
    if (!Number.isFinite(input)) return;
    if (unit === "c") $("temperature-result").textContent = `${input}°C = ${(input * 9 / 5 + 32).toFixed(1)}°F`;
    else $("temperature-result").textContent = `${input}°F = ${((input - 32) * 5 / 9).toFixed(1)}°C`;
}
$("temperature-input").addEventListener("input", convertTemperature);
$("temperature-unit").addEventListener("change", convertTemperature);

// Dice roller
$("roll-dice").addEventListener("click", () => {
    const count = Math.min(3, Math.max(1, Number($("dice-count").value) || 1));
    $("dice-count").value = count;
    $("dice-results").innerHTML = Array.from({ length: count }, () => `<span>${Math.floor(Math.random() * 6) + 1}</span>`).join("");
});

// Rock paper scissors
const choices = ["rock", "paper", "scissors"];
let playerScore = 0;
let computerScore = 0;
document.querySelectorAll("[data-choice]").forEach((button) => button.addEventListener("click", () => {
    const playerChoice = button.dataset.choice;
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    const wins = (playerChoice === "rock" && computerChoice === "scissors") || (playerChoice === "paper" && computerChoice === "rock") || (playerChoice === "scissors" && computerChoice === "paper");
    const tie = playerChoice === computerChoice;
    if (wins) playerScore += 1;
    if (!wins && !tie) computerScore += 1;
    $("rps-result").textContent = tie ? `Tie — both chose ${computerChoice}` : `${wins ? "You win" : "You lose"} — computer chose ${computerChoice}`;
    $("player-score").textContent = playerScore;
    $("computer-score").textContent = computerScore;
}));

// Password generator
function makePassword() {
    const length = Number($("password-length").value);
    const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    for (let index = 0; index < length; index += 1) password += alphabet[Math.floor(Math.random() * alphabet.length)];
    $("password-output").value = password;
}
$("password-length").addEventListener("input", () => { $("password-length-value").textContent = $("password-length").value; makePassword(); });
$("generate-password").addEventListener("click", makePassword);
$("copy-password").addEventListener("click", async () => {
    await navigator.clipboard.writeText($("password-output").value);
    $("copy-password").textContent = "✓";
    setTimeout(() => { $("copy-password").textContent = "▣"; }, 1200);
});
makePassword();

// Number guessing game
let secretNumber = Math.floor(Math.random() * 100) + 1;
let guesses = 0;
function resetGuessGame() { secretNumber = Math.floor(Math.random() * 100) + 1; guesses = 0; $("guess-input").value = ""; $("guess-message").textContent = "I am thinking of a number..."; }
$("submit-guess").addEventListener("click", () => {
    const guess = Number($("guess-input").value);
    if (!Number.isInteger(guess) || guess < 1 || guess > 100) { $("guess-message").textContent = "Please enter a whole number from 1 to 100."; return; }
    guesses += 1;
    if (guess === secretNumber) $("guess-message").textContent = `Correct! You found it in ${guesses} ${guesses === 1 ? "attempt" : "attempts"}.`;
    else $("guess-message").textContent = guess < secretNumber ? "Too low — try a bigger number." : "Too high — try a smaller number.";
});
$("new-guess-game").addEventListener("click", resetGuessGame);

// Random numbers
$("generate-numbers").addEventListener("click", () => {
    $("random-numbers").innerHTML = Array.from({ length: 3 }, () => `<span>${Math.floor(Math.random() * 10) + 1}</span>`).join("");
});

// Live clock
function updateClock() {
    const now = new Date();
    $("clock-display").textContent = now.toLocaleTimeString();
    $("clock-date").textContent = now.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}
updateClock();
setInterval(updateClock, 1000);

// Fisher-Yates array shuffle
const shuffledItems = [1, 2, 3, 4, 5];
function showArray() { $("array-output").textContent = shuffledItems.join(" · "); }
$("shuffle-array").addEventListener("click", () => {
    for (let index = shuffledItems.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [shuffledItems[index], shuffledItems[randomIndex]] = [shuffledItems[randomIndex], shuffledItems[index]];
    }
    showArray();
});

// Simple image-slider idea using colored panels
const slideColors = ["#dceec5", "#c9e7e8", "#f8dfb7"];
let slideIndex = 0;
function showSlide() {
    $("color-slide").style.backgroundColor = slideColors[slideIndex];
    $("color-slide").textContent = `Slide ${slideIndex + 1}`;
}
$("next-slide").addEventListener("click", () => { slideIndex = (slideIndex + 1) % slideColors.length; showSlide(); });
$("previous-slide").addEventListener("click", () => { slideIndex = (slideIndex + slideColors.length - 1) % slideColors.length; showSlide(); });

// Pokemon API
$("find-pokemon").addEventListener("click", async () => {
    const name = $("pokemon-name").value.trim().toLowerCase();
    if (!name) { $("pokemon-result").textContent = "Please enter a Pokemon name."; return; }
    $("pokemon-result").textContent = "Searching...";
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(name)}`);
        if (!response.ok) throw new Error("Pokemon not found");
        const data = await response.json();
        $("pokemon-result").textContent = `${data.name.toUpperCase()} · height ${data.height} · weight ${data.weight}`;
    } catch {
        $("pokemon-result").textContent = "Pokemon not found. Try pikachu.";
    }
});

// Basic checkbox and radio input example
$("check-inputs").addEventListener("click", () => {
    const selectedLevel = document.querySelector('input[name="level"]:checked').value;
    $("check-result").textContent = `${$("learning-check").checked ? "Great! " : ""}Your level is ${selectedLevel}.`;
});
renderWatch();
