import { registerUser, loginUser } from "./localStorage.js";






document.addEventListener('DOMContentLoaded', () => {
    //signupbtn
    console.log('Login/Signup loaded-forms ready.....')
    const signupBtn = document.getElementById('signup-btn');
    signupBtn?.addEventListener('click', async (e) => {
        e.preventDefault();
        const username = document.getElementById('signup-username')?.value.trim();
        const password = document.getElementById('signup-pwd')?.value;
        if (!username || password) {
            alert ('Please fill in username and password.');
            return;
        }
        try {
            await registerUser(username, password);
            alert('Account created successfully! redirecting.....');
            signupBtn.style.transition = 'opacity 0.45 ease';
            signupBtn.style.opacity = '0';
            setTimeout(() =>{
                window.location.href = 'workshop.html';
            },400);
        } catch (err) {
            alert(err.message || 'Signup failed. Try again.')
        }
    });


    //loginBtn
    const loginBtn = document.getElementById('login-btn');
    loginBtn?.addEventListener('click', async (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username')?.value.trim();
        const password = document.getElementById('login-pwd')?.value;

        if (!username || password) {
            alert ('Please fill in username and password.');
            return;
        }
        try {
            await loginUser(username, password);
            const currentUser = { username, timestamp: new Date().toISOString()};
            localStorage.setItem('PortBox:currentUser', JSON.stringify(currentUser));
            console.log('Login success - currentUser added:', currentUser);
            alert('Login successful. Redirecting......');
            loginBtn.style.transition = 'opacity 0.45s ease';
            loginBtn.style.opacity = '0';

            setTimeout(() =>{
                window.location.href = 'workshop.html';
            }, 400);
        } catch (err) {
            alert (err.message || 'Invalid username or password.');
        }
    });
});






document.addEventListener('DOMContentLoaded', function() {

  const signSwitch = document.getElementById('switch-to-signup');
  const logSwitch = document.getElementById('switch-to-login');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');

  console.log('Elements found:', {signSwitch:!!signSwitch, logSwitch:!!logSwitch, loginForm:!!loginForm, signupForm:!!signupForm});

  if(loginForm) {
    loginForm.style.display ='block';
  }
  if(signupForm) {
    signupForm.style.display = 'none';
    console.log('Signup form shown intially')
  }
  
  //switch to login
  if(logSwitch) {
    logSwitch.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('login switch clicked!');

     if(loginForm) {
        loginForm.style.display = 'block';
        console.log('Login form: display = blocked');
     }
     if(signupForm) {
        signupForm.style.display = 'none';
        console.log('Signup form: display = none');
     }
    });
  } else {
    console.error('logSwitch Element not found!');
  }

  //switch t signup
  if(signSwitch) {
    signSwitch.addEventListener('click', function(e) {
        e.preventDefault();
        if(signupForm) {
            signupForm.style.display = 'block';
            console.log('Signup form: display = block');
        }
        if(loginForm) {
            loginForm.style.display = 'none';
            console.log('Login form: display = none');
        }
    })
  } else {
    console.error('signSwitch Element not found!');
  }

})
