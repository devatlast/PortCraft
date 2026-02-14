let playerscore = 0;
let computerscore = 0;

function getcomptOptions (playerChoice) {
    const options = [ "rock", "paper", "scissors"];
    const Winopts = {   rock : "paper", paper : "scissors", scissors : "rock", };
    if (Math.random () < 0.37 && playerChoice) {
        return WinOpts [playerChoice];
    };

    const randomIndex =Math.floor(Math.random() * options.length);
    return options[randomIndex];
};


function matchRound ( playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        alert("It's a tie!");
    } else if (
            (playerChoice === "rock" && computerChoice === "scissors") ||
            (playerChoice === "scissors" && computerChoice === "rock") ||
            (computerChoice === "paper" && playerChoice === "scissors")
        ) {
            playerscore++;
            alert (`Point to you: ${playerChoice} beats ${computerChoice}`);
        } else {
            computerscore++;
                alert (`Point to computer: ${computerChoice} beats ${playerChoice}`);
        }
                document.getElementById('player-score').innerText = playerscore;
                document.getElementById('computer-score').innerText = computerscore;
                
                checkGameStatus();
            
}

function checkGameStatus() {
    if (playerscore === 2) {
        alert ("Congrats! You've won the match. Moving to the next page.");
    }   else if (computerscore === 2) {
            alert ("Oopsies! Computer won. Try again to access the next page.");
        resetGame();
    }
}

function resetGame() {
    playerscore = 0;
    computerscore = 0;
    document.getElementById('player-score').innerText =0;
    document.getElementById('computer-score').innerText=0;

}


const buttons = document.querySelectorAll('#arsenal button');
buttons.forEach(btn =>{
    btn.addEventListener('click' , () => {
    const playerChoice = btn.id;
    const computerChoice = getcomptOptions();
    const result = matchRound(playerChoice, computerChoice);
      });
});
