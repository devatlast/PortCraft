
//the persuasion section
let clickCount =0;
const messages = [
    "Your professional identity deserves a digital home that works as hard as you do.",
    "Stop losing precious billable hours to manual paperworkand disorganized layouts",
    "Secure your business revenue with professional invoices that guarantees payment.",
    "Impress every potential client with a sleek, polished showcase of your skills.",
    "Take control of your full career growth by unlocking these essential tools."
];

const clickmebtn = document.querySelector('#click-me');
const displayText =document.querySelector('#main-text');

clickmebtn.addEventListener( 'click', () => {
    clickCount++;
    if ( clickCount < 5) {
        displayText.textContent = messages[clickCount];
    } else {
        displayText.textContent = "Are you ready to transform your workflow?";
        document.querySelector('#click-me').classList.add('hidden');
        document.querySelector('#choices').classList.remove('hidden');
        document.querySelector('#mode-display').classList.add('hidden');
    }
});

document.querySelector('#yes-btn').addEventListener('click', () => {
    document.querySelector('#persuasion-section').classList.add('hidden');
    document.querySelector('#workshop').classList.remove('hidden');
});

let noCount=0;
const desperateMessages = [
    "Are you sure? Your future self might regret this!",
    "But... The professional world is waiting for you!",
    "Think of all the invoices you could be sending and how sleek your portfolio looks.",
    "Please click, Yes?",
    "Now you're being difficult.",
];

const noBtn = document.querySelector('#no-btn');
const yesBtn = document.querySelector('#yes-btn');

// logic for choices buttons and to make the yes button grow bigger
noBtn.addEventListener('click', () => {
    if (noCount < desperateMessages.length) {
        document.querySelector('#main-text').textContent = desperateMessages[noCount];
        noCount++;
    } else {
        document.querySelector('#main-text').textContent = "Fine i'll make Yes impossible to miss!";
    }

    let nowScale = 1 + (noCount * 0.5);
    yesBtn.style.transform = `scale(${nowScale})`;
    yesBtn.style.transition = "transform 0.3s ease";
})




// logic to rps game
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
// End of rps logic




//event listener for dark mode button
const toggleBtn = document.getElementById('toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    toggleBtn.textContent = currentTheme === 'dark' ? '&#127769' : '&#9728';
}

toggleBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    
    if (theme=== 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        toggleBtn.innerHTML = '&#127769';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        toggleBtn.innerHTML = '&#9728';
    }
});