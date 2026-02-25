

const themes = {
    'default': {
        bodyBg: '#f4f4f4',
        bodyColor: '#333',
        headerBg: '#fff',
        hColor: '#007bff',
        sectionBg: 'white',
        font: 'Arial, sans-serif'
    },
    'dark-mode': {
        bodyBg: '#121212',
        bodyColor: '#e0e0e0',
        headerBg: '#1e1e1e',
        hColor: '#bb86fc',
        font: 'Arial, sans-serif',
        sectionBg: '#1e1e1e',
    },
    'vibrant':   {
        sectionBg: 'ffe0b2',
        bodyBg: '#fff3e0',
        bodyColor: '#4e342e',
        headerBg: '#ffcc80',
        hColor: '#f57f17',
        font: 'Arial, sans-serif'
    },
    'minimalist': {
        sectionBg: 'transparent',
        bodyBg: '#ffffff',
        bodyColor: '#000000',
        headerBg: '#ffffff',
        hColor: '#000000',
        font: 'Helvetica, sans-serif',
    }
}






// Function to apply themes to portfolio
function changeTheme(themeOpt) {
    const theme = themes[themeOpt];
    if (!theme) return;
    //body
    document.body.style.backgroundColor = theme.bgBody;
    document.body.style.color = theme.bodyColor;
    document.body.style.fontFamily = theme.font;
    
  
    //sections
    document.querySelectorAll('.section').forEach( section => {
        section.style.backgroundColor = theme.sectionBg;
    });
     //headings
    document.querySelectorAll('h2, h3').forEach(h => {
        h.style.color = theme.hColor;
    });
   

    
    
     //Export
    document.getElementById('export-btn').style.backgroundColor = theme.exportBg;
    document.getElementById('export-btn').style.color = theme.exportColor;
    

}

//logic for theme-selector
const themeSelector = document.getElementById('theme-select');
themeSelector.addEventListener('change', (e) => {
    changeTheme(e.target.value);
    localStorage.setItem('selectedTheme', e.target.value);
});
//save and load theme
const savedTheme = localStorage.getItem('selectedTheme') || 'default';
changeTheme(savedTheme);
themeSelector.value = savedTheme;



//signature canvas logic
const canvas = document.getElementById('signature-canvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true});
console.log(canvas);
console.log(ctx);
ctx.lineWidth = 2;
ctx.strokeStyle = '#000000';
let drawing = false;
canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY)
});

canvas.addEventListener('mouseup', () => drawing = false );
canvas.addEventListener('mousemove', (e) => {
    if(drawing) {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }
});

//clear signature canvas
document.getElementById('clear-canvas').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height );
});
//apply signature
document.getElementById('apply-signature').addEventListener('click', () => {
    const dataUrl = canvas.toDataURL();
    document.getElementById('sig-img').src = dataUrl;
});


//PDF export
addScript('https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js', function() {
document.getElementById('export-btn').addEventListener('click', () => {
    const portfolio = document.getElementById('portfolio');
    const invoice = document.getElementById('invoice');
    
    if (!portfolio || !invoice) return alert('portfolio or invoice section not found!')
         // Wrapper div for both sections
        const wrapper = document.createElement('div');
        if (!wrapper || !wrapper.style) {
            console.error('Wrapper creation failed!', wrapper);
            return;
        }
        wrapper.style.position = 'absolute';
        wrapper.style.left = '-9999px';
        wrapper.appendChild(portfolio.cloneNode(true));
        // page break for pdf via css
        const pageBreak = document.createElement('div');
        pageBreak.style.pageBreakAfter = 'Always';
        wrapper.appendChild(invoice.cloneNode(true));
        document.body.appendChild(wrapper);

        const opt = {
            margin: [0.5, 0.5, 0.5, 0.5],
            filename: 'portfolio_and_invoice.pdf',
            image: {type: 'JPEG', quality: 0.98 },
            html2canvas: {scale: 2, useCORS: true, allowTaint: true},
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait'}
        };

        setTimeout( () => {
            html2pdf().set(opt).from(wrapper).save().then(() => {
                document.body.removeChild(wrapper);
            }).catch(err => console.error('Html2pdf error', err));
            alert('Export failed: see console for details.');
        }, 1000)
        
  });
});



//AI
const aiModal = document.getElementById('ai-modal');
const aiChatBtn =document.getElementById('open-ai-chat');
const closeAiModal = document.getElementById('close-chat');
const aiSend = document.getElementById('ai-send-btn');
const aiInput = document.getElementById('ai-chat-input');
const aiHistory = document.getElementById('ai-chat-history');
const aiClose = document.getElementById('close-chat');
const aiLoader = document.getElementById('msg-loader')


aiChatBtn.addEventListener('click', () => aiModal.classList.add('open'));
console.log('opened');
aiClose.addEventListener('click', () => aiModal.classList.remove('open'));
//integrating ai with chat messages
aiSend.addEventListener('click', () => {
    const userMessage = aiInput.value.trim();
    if(!userMessage) return;

    aiHistory.innerHTML+= `<p><strong>You: </strong> ${userMessage}</p>`;
    aiInput.value = '';
    aiLoader.style.display = 'block';
    aiSend.disabled = true;

    fetch('http://127.0.0.1:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage})
    })
    .then(response => {
        if(!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.error){
            throw new Error('data.error');
        }
        const aiResponse = data.response;
        aiHistory.innerHTML += `<p><strong>AI:</strong> ${aiResponse}</p>`;
        aiHistory.scrollTop = aiHistory.scrollHeight;
        aiLoader.style.display = 'none';
        aiSend.disabled = false;
    })
    .catch(error => {
        console.error('Proxy Error:', error);
        aiHistory.innerHTML += `<p><strong>AI:</strong> Sorry, something went wrong: ${error.message}</p>`;
        aiLoader.style.display = 'none';
        aiSend.disabled = false;
    });
});



//Upload Image
const uploadBtn = document.getElementById('upload-btn');
const profileInput = document.getElementById('profile-upload');
const profileImg = document.getElementById('profile-img');

if (uploadBtn && profileInput && profileImg) {
    uploadBtn.addEventListener('click', () => profileInput.click());
    profileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            profileImg.src = event.target.result;
            profileImg.crossOrigin = 'anonymous';
            profileImg.style.display = 'block';
            uploadBtn.style.display = 'none';
        };
        reader.readAsDataURL(file);
      }
    });
}


// about portcraft buttton to back to home/about

const aboutBtn = document.getElementById('about-btn');
const aboutSection = document.getElementById('about-link');
const backToHome = document.getElementById('back-to-home');
const portfolio = document.getElementById('portfolio');

if (aboutBtn && aboutSection && backToHome) {
    aboutBtn.addEventListener('click', () => {
        portfolio.style.display = 'none';
        aboutSection.style.display = 'block';
    });
    backToHome.addEventListener('click', () => {
        aboutSection.style.display = 'none';
        portfolio.style.display = 'block';
    });
}