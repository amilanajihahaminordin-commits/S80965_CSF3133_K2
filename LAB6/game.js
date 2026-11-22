// Global variables to track game state, scores, and round history
let gameStarted = false;
let wins = 0;
let losses = 0;
let draws = 0;
let results = [];

// Starts the game after validating the player's name
function startGame() {
    const nameInput = document.getElementById("playerName").value.trim();

    // Alert if the name input is empty
    if (nameInput === "") {
        alert("Please enter your name.");
        return;
    }

    // Display welcome message and start date/time
    document.getElementById("welcomeMsg").innerHTML = "Welcome, " + nameInput + "!";
    document.getElementById("startTime").innerHTML = "Game started on: " + new Date();
    gameStarted = true;
}

// Randomly selects rock, paper, or scissors for the computer
function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Plays a single round and updates images, result text/color, scores, and history table
function playRound(playerChoice) {
    // Prevent playing before clicking Start Game
    if (!gameStarted) {
        alert("Click Start Game first.");
        return;
    }

    const computerChoice = getComputerChoice();

    // Update both images based on choices
    document.getElementById("playerImg").src = playerChoice + ".png";
    document.getElementById("computerImg").src = computerChoice + ".png";

    const resultEl = document.getElementById("result");
    let roundResult = "";

    // Determine the winner using if...else
    if (playerChoice === computerChoice) {
        roundResult = "Draw";
        draws++;
        resultEl.innerHTML = "It's a Draw!";
        resultEl.style.color = "grey";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "rock")
    ) {
        roundResult = "Win";
        wins++;
        resultEl.innerHTML = "You Win!";
        resultEl.style.color = "green";
    } else {
        roundResult = "Lose";
        losses++;
        resultEl.innerHTML = "You Lose!";
        resultEl.style.color = "red";
    }

    // Update scoreboard numbers
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("draws").innerHTML = draws;

    // Store result in the array
    results.push(roundResult);

    // Add a new row to the history table using innerHTML +=
    const roundNumber = results.length;
    const historyBody = document.getElementById("historyBody");
    historyBody.innerHTML +=
        "<tr>" +
            "<td>" + roundNumber + "</td>" +
            "<td>" + playerChoice + "</td>" +
            "<td>" + computerChoice + "</td>" +
            "<td>" + roundResult + "</td>" +
        "</tr>";
}

// Loops through the results array to calculate total rounds and win percentage
function showSummary() {
    const totalRounds = results.length;

    if (totalRounds === 0) {
        document.getElementById("summary").innerHTML = "No rounds played yet.";
        return;
    }

    let winCount = 0;
    // Count wins using a for loop
    for (let i = 0; i < results.length; i++) {
        if (results[i] === "Win") {
            winCount++;
        }
    }

    const winPercentage = Math.round((winCount / totalRounds) * 100);
    document.getElementById("summary").innerHTML =
        "You played " + totalRounds + " rounds and won " + winPercentage + "%";
}

// Resets all scores, arrays, history table rows, and messages back to initial state
function resetGame() {
    wins = 0;
    losses = 0;
    draws = 0;
    results = [];

    document.getElementById("wins").innerHTML = "0";
    document.getElementById("losses").innerHTML = "0";
    document.getElementById("draws").innerHTML = "0";

    document.getElementById("historyBody").innerHTML = "";
    document.getElementById("result").innerHTML = "";
    document.getElementById("summary").innerHTML = "";
}
