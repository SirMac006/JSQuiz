document.addEventListener("DOMContentLoaded", function () {
  displayHighScores();

  const playAgainBtn = document.getElementById("play-again-btn");
  playAgainBtn.addEventListener("click", function () {
    /*Redirect to the game page*/
      window.location.href = "index.html";
  });
});

function displayHighScores() {
  const highScoresList = document.getElementById("high-scores-list");

  /* Retrieve high scores from local storage*/
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  /*Display high scores in the table*/
  highScores.forEach((score, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${index + 1}</td><td>${score.initials}</td><td>${score.score}</td>`;
      highScoresList.appendChild(row);
  });
}
