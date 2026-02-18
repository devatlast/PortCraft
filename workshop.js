

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






// Function to apply themes
function changeTheme(themeOpt) {
    const theme = themes[themeOpt];
    if (!theme) return;
    //body
    document.body.style.backgroundColor = theme.bgBody;
    document.body.style.color = theme.bodyColor;
    document.body.style.fontFamily = theme.font;
    //header
    document.querySelector('header').style.backgroundColor = theme.headerBg;
    //sections
    document.querySelector('.section').forEach( section => {
        section.style.backgroundColor = theme.sectionBg;
    });
     //headings
    document.querySelectorAll('h1, h2').forEach(h => {
        h.style.color = theme.hColor;
    });

    document.getElementById('open-ai-chat').style.backgroundColor = theme.aibtnBg;
    document.getElementById('open-ai-chat').style.color = aibtnColor;
     //hover effects for ai-chat-btn
    document.getElementById('open-ai-chat').addEventListener('mouseout', () => {
        document.getElementById('open-ai-chat').style.backgroundColor = theme.aibtnBg;
    });
    document.getElementById('open-ai-chat').addEventListener('mouseover', () => {
        document.getElementById('open-ai-chat').style.backgroundColor = theme.aibtnHover;
    });
     //Export
    document.getElementById('export-btn').style.backgroundColor = theme.exportBg;
    document.getElementById('export-btn').style.color = theme.exportColor;
    //ai-modal
    document.getElementById('ai-modal').style.backgroundColor = theme.modalBg;
    document.getElementById('ai-modal').style.color = theme.modalColor;

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
const ctx = canvas.getContext('2d');
let drawing = false;
canvas.addEventListener('mousedown', () => drawing = true);
canvas.addEventListener('mouseup', () => drawing = false );
canvas.addEventListener('mousemove', (e) => {
    if(drawing) {
        ctx.LineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }
});
//clear signature canvas
document.getElementById('clear-canvas').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height );
});
//apply signature
document.getElementById('apply-signature').addEventListener('click', () => {
    const dataUrl = canvas.toDataUrl();
    document.getElementById('sig-img').src = dataUrl;
});
//PDF export
document.getElementById('export-btn').addEventListener('click', () => {
    const element = document.body;
    html2pdf().from(element).save('portfolio.pdf')
})



//AI
const aiModal = document.getElementById('ai-modal');
const aiChatBtn =document.getElementById('open-ai-chat');
const closeAiModal = document.getElementById('close-chat');
const aiSend = document.getElementById('ai-send-btn');
const aiInput = document.getElementById('ai-chat-input');
const aiHistory = document.getElementById('ai-chat-history');
const aiClose = document.getElementById('close-chat');

aiChatBtn.addEventListener('click', () => aiModal.style.display = 'block');
aiClose.addEventListener('click', () => aiModal.style.display = 'none');
//integrating ai with chat messages
aiSend.addEventListener('click', () => {
    const userMessage = aiInput.value.trim();
    if(!userMessage) return;

    aiHistory += `<p><strong>You: </strong> ${userMessage}</p>`;
    aiInput.value = '';
    aiLoader.style.display = 'block';
    aiSend.disabled = true;

    fetch('http://localhost:3000/api/chat', {
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
