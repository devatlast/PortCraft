



/* ==========================
   Landing / Persuasion
   ========================== */
let clickCount = 0;
const messages = [
  "Your professional identity deserves a digital home that works as hard as you do.",
  "Stop losing precious billable hours to manual paperwork and disorganized layouts",
  "Secure your business revenue with professional invoices that guarantees payment.",
  "Impress every potential client with a sleek, polished showcase of your skills.",
  "Take control of your full career growth by unlocking these essential tools."
];

const clickMeBtn = document.getElementById('click-me');
const displayText = document.getElementById('main-text');
const choicesEl = document.getElementById('choices');
const modeDisplayEl = document.getElementById('mode-display');
const backToHomeEl = document.getElementById('back-to-home');

if (clickMeBtn) {
  clickMeBtn.addEventListener('click', () => {
    clickCount++;
    if (clickCount < messages.length) {
      if (displayText) displayText.textContent = messages[clickCount];
    } else {
      if (displayText) displayText.textContent = "Are you ready to transform your workflow?";
      clickMeBtn.classList.add('hidden');
      if (choicesEl) choicesEl.classList.remove('hidden');
      if (modeDisplayEl) modeDisplayEl.classList.add('hidden');
    }
  });
}

const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
let noCount = 0;
const desperateMessages = [
  "Are you sure? Your future self might regret this!",
  "But... The professional world is waiting for you!",
  "Think of all the invoices you could be sending and how sleek your portfolio looks.",
  "Please click, Yes?",
  "Now you're being difficult."
];

if (noBtn) {
  noBtn.addEventListener('click', () => {
    const mainText = document.getElementById('main-text');
    if (noCount < desperateMessages.length) {
      if (mainText) mainText.textContent = desperateMessages[noCount];
      noCount++;
    } else {
      if (mainText) mainText.textContent = "Fine i'll make Yes impossible to miss!";
    }
    if (yesBtn) {
      const nowScale = 1 + (noCount * 0.1);
      yesBtn.style.transform = `scale(${nowScale})`;
      yesBtn.style.transition = 'transform 0.3s ease';
    }
  });
}

document.addEventListener('DOMContentLoaded', () =>{
    const yseBtn = document.getElementById('yes-btn');
    console.log('YesBtn found?', !!yesBtn);
if (yesBtn) {
  yesBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Click fired!')
    const ps = document.getElementById('persuasion-section');
    if (ps) {
        ps.style.transition = 'opacity 0.4s ease';
        ps.style.opacity = '0';
        ps.style.visibility = 'hidden';
        document.body.style.display = 'none';
        console.log('Fade applied-opacity now:........', ps.style.opacity)
    }else {
    console.log('User chose YES —> redirecting to auth/login');
    } 
    setTimeout( () =>{
      console.log('Redirecting now!...')
      window.location.href = 'http://127.0.0.1:5500/workshop.html'
          window.location,href= 'workshop.html';
        }, 100);
  });
}
});

/* ==========================
   Dark Mode
   ========================== */
const toggleBtn = document.getElementById('toggle');
const storedTheme = localStorage.getItem('theme');
if (toggleBtn && storedTheme) {
  document.documentElement.setAttribute('data-theme', storedTheme);
  toggleBtn.innerHTML = storedTheme === 'dark' ? '&#127769' : '&#9728';
}
if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme','light');
      localStorage.setItem('theme','light');
      toggleBtn.innerHTML = '&#127769';
    } else {
      document.documentElement.setAttribute('data-theme','dark');
      localStorage.setItem('theme','dark');
      toggleBtn.innerHTML = '&#9728';
    }
  });
}


/* ==========================
   Rock — Paper — Scissors (RPS)
   ========================== */
let playerScore = 0;
let computerScore = 0;

function getComputerChoice() {
  const opts = ['rock','paper','scissors'];
  return opts[Math.floor(Math.random() * opts.length)];
}

function evaluateRound(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
      return "it's a tie";
  } 
    if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'scissors' && computerChoice === 'paper') ||
    (playerChoice === 'paper' && computerChoice === 'rock')
  ) {return 'player';
  }
  return 'computer';
}

function handleRound(playerChoice) {
  const comp = getComputerChoice();
  const result = evaluateRound(playerChoice, comp);
  let message='';

  if (result === 'player') {
      playerScore++;
      message = 'You win this round!'
   } else if (result === 'computer') {
    computerScore++;
    message = 'Computer wins this round!'
   } else {
    message = "It's a tie";
   }

   alert(message);
  const pEl = document.getElementById('player-score');
  const cEl = document.getElementById('computer-score');
  if (pEl) pEl.innerText = playerScore;
  if (cEl) cEl.innerText = computerScore;
  checkGameStatus();
}

function checkGameStatus() {
  if (playerScore === 5) { alert('Congrats! You\'ve won the match.'); resetGame(); }
  else if (computerScore === 5) { alert('Computer won. Try again.'); resetGame(); }
}

function resetGame() {
  playerScore = 0; computerScore = 0;
  const pEl = document.getElementById('player-score'); if (pEl) pEl.innerText = '0';
  const cEl = document.getElementById('computer-score'); if (cEl) cEl.innerText = '0';
}

const rpsButtons = document.querySelectorAll('#arsenal button');
if (rpsButtons && rpsButtons.length) {
  rpsButtons.forEach(b => b.addEventListener('click', () => handleRound(b.id)));
}


/* ==========================
   Navigation (About / Back to Home)
   ========================== */
const aboutLink = document.getElementById('about-link');
if (aboutLink) {
  aboutLink.addEventListener('click', (e) => {
    e.preventDefault();
    const ps = document.getElementById('persuasion-section'); if (ps) ps.classList.add('hidden');
    const rps = document.getElementById('rps-game'); if (rps) rps.classList.remove('hidden');
    if (modeDisplayEl) modeDisplayEl.classList.remove('hidden');
    if (backToHomeEl) backToHomeEl.classList.remove('hidden');
  });
}

if (backToHomeEl) {
  backToHomeEl.addEventListener('click', (e) => { e.preventDefault(); location.reload(); });
}

// End of file — workshop/portfolio logic removed
