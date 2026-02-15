
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

// BUG FIX: Skip workshop intro section to go straight to editor page
// ISSUE: Workshop intro was displaying on every "Yes" click, interrupting user flow
// SOLUTION: Added classList.add('hidden') to #workshop-intro and classList.remove('hidden') to #editor-page
// ALSO FIX: Dark mode button was hidden during persuasion section, need to unhide it here
// FEATURE: Show "Back to Home" link when navigating away from persuasion section
document.querySelector('#yes-btn').addEventListener('click', () => {
    document.querySelector('#persuasion-section').classList.add('hidden');
    document.querySelector('#workshop').classList.remove('hidden');
    document.querySelector('#workshop-intro').classList.add('hidden');
    document.querySelector('#editor-page').classList.remove('hidden');
    document.querySelector('#mode-display').classList.remove('hidden');
    document.querySelector('#back-to-home').classList.remove('hidden');
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
});
yesBtn.addEventListener('click', () => {
    document.getElementById('persuasion-section').classList.add('hidden');
    document.getElementById('workshop').classList.remove('hidden');

    console.log("Entering Workshop.......");
});
//Persuasion logic ends here


//Portfolio Workshop logic starts here
//Etch a sketch
const canvas = document.getElementById('etch-a-sketch-pad');
const ctx = canvas.getContext('2d');
let drawing = false;

//start drawing
// FIX: Corrected syntax error - was () => = true, now uses proper arrow function syntax
canvas.addEventListener('mousedown', () => { drawing = true; });
canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.beginPath(); // resets line so it doesn't jump
    saveToLocal();// saves progress automatically
});
//draw as mouse move
canvas.addEventListener('mousemove', (e) => {
    if (!drawing) return;
    ctx.lineWidth = 2;
    ctx.linecap ='round';
    ctx.strokeStyle = '#000';

    //gets mouse position on canvas
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX -rect.left, e.clientY -rect.top);
    ctx.stroke();
});
// click to erase button logic
document.getElementById('clear-sketch').addEventListener('click', () =>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    localStorage.removeItem('savedSignature');
});

//Portfolio
//save portfolio texts on every keystroke
const portfolio = document.getElementById('portfolio-editor');
portfolio.addEventListener('input', () =>{
    localStorage.setItem('userPortfolio', portfolio.innerHTML);
});

//load everything when page opens
window.onload = () => {
    const savedText = localStorage.getItem('userPortfolio');
    if (savedText) portfolio.innerHTML = savedText;
    // saving canvas images as DataUrl string
    const savedSign = localStorage.getItem('savedSignature');
    if (savedSign) {
        const img = new Image();
        img.src = savedSign;
        img.onload = () => ctx.drawImage(img, 0, 0);
    }
};
//download button logic
document.getElementById('download-port').addEventListener('click', () => {
    const portContent = document.getElementById('portfolio-editor').innerHTML;
    const SigImage = canvas.toDataURL(); // gets sketchpad drawing

    // wrap in html structure so it looks good when downloaded
    const fullHtml = `         
    <html>
        <head><title>My Portfolio</title></head>
        <body style="font-family: sans-serif; padding: 40px;">
            ${portContent}
            <hr>
            <img src="${SigImage}" alt= "My signature"/>
            </hr>
        </body>
    </html>
    `;

//create background link and click it automatically

const blob = new Blob([fullHtml], {type: 'text/html'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href =url;
    a.download = 'My_Portfolio.html'; //this is the filename
    a.click();
});
//port-Workspace to game 
// BUG FIX: Use classList instead of style.display for section transitions
//port-Workspace to game 
// BUG FIX: Use classList instead of style.display for section transitions
// ISSUE: Mixed use of .style.display and .hidden class caused conflicts (display:block vs display:none !important)
// SOLUTION: Use classList.add('hidden') and classList.remove('hidden') consistently throughout
// ALSO FIX: Dark mode button wasn't available on RPS game page
// SOLUTION: Added classList.remove('hidden') to #mode-display so button shows on all pages
// FEATURE: Show "Back to Home" link when navigating to RPS game
document.getElementById('port-rps').addEventListener('click', () =>{
    document.getElementById('editor-page').classList.add('hidden');
    document.getElementById('rps-game').classList.remove('hidden');
    document.querySelector('#mode-display').classList.remove('hidden');
    document.querySelector('#back-to-home').classList.remove('hidden');
});
//Portfoli Ends Here



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
    if (playerscore === 4) {
        alert ("Congrats! You've won the match. Moving to the next page.");
    }   else if (computerscore === 4) {
            alert ("Oopsies! Computer won. Try again to beat computer.");
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
    // FIX: Changed from textContent to innerHTML - textContent displays emoji codes as plain text
    // innerHTML properly renders HTML entities (&#127769 and &#9728) as actual emoji characters
    toggleBtn.innerHTML = currentTheme === 'dark' ? '&#127769' : '&#9728';
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

// FEATURE: Add "About" nav link to skip to RPS game directly
// ALLOWED: Users can now jump straight to the game without waiting through portfolio building
// IMPLEMENTATION: Hide all sections except RPS game and show dark mode button
document.getElementById('about-link').addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default link behavior
    
    // Hide persuasion and workshop sections
    document.querySelector('#persuasion-section').classList.add('hidden');
    document.querySelector('#workshop').classList.add('hidden');
    document.querySelector('#editor-page').classList.add('hidden');
    
    // Show RPS game section
    document.querySelector('#rps-game').classList.remove('hidden');
    
    // Show dark mode button and back to home link
    document.querySelector('#mode-display').classList.remove('hidden');
    document.querySelector('#back-to-home').classList.remove('hidden');
});

// FEATURE: Add "Back to Home" nav link to refresh the homepage
// LOGIC: Reload the entire page to reset all state and sections to initial state
document.getElementById('back-to-home').addEventListener('click', (e) => {
    e.preventDefault();
    // Refresh the page to reset everything back to the home state
    location.reload();
});