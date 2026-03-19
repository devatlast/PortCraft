

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
    document.querySelectorAll('#portfolio-btn, #invoice-btn').forEach(btn => {
        btn.style.backgroundColor = theme.btnBg;
        btn.style.color = theme.btnColor;
    });
    

}





/*========Theme selector======*/
const themeSelector = document.getElementById('theme-select');
themeSelector.addEventListener('change', (e) => {
    changeTheme(e.target.value);
});



//signature canvas logic
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('signature-canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true});
  console.log(canvas);
  console.log(ctx);
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#000000';
  let drawing = false;
  function getPosition(e){
    const rect = canvas.getBoundingClientRect();
    if (e.touches){
        return{
            x: e.touches[0].clientX - rect.left,
            y: e.touches[0].clientY - rect.top
        };
    }else {
        return{
            x: e.offsetX,
            y: e.offsetY
        };
    }
  }
  function startDrawing(e){
    drawing = true;
    const pos = getPosition(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }

  function draw(e){
    if(!drawing) return;
    const pos = getPosition(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }

  function stopDrawing() {
    drawing = false;
  }
  //Mouse 
  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDrawing );
  //Touch
  canvas.addEventListener('touchstart', startDrawing);
  canvas.addEventListener('touchmove', draw);
  canvas.addEventListener('touchend', stopDrawing);

  
  /*canvas.addEventListener('mousedown', (e) => {
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
  });*/

  //clear signature canvas
  document.getElementById('clear-canvas').addEventListener('click', () => {
    const canvas = document.getElementById('signature-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height );
  });


  //Apply signature
  const applyBtn = document.getElementById('apply-signature');
  applyBtn.addEventListener('click', ()=> {
    applyBtn.disabled = true;

    const img = document.getElementById('sig-img');
    const clearBtn = document.getElementById('clear-canvas');
    img.src = canvas.toDataURL();
    img.style.display = 'block';
    canvas.remove();
    applyBtn.style.display = 'none';
    clearBtn.style.display = 'none';

  });

});






//AI
const aiModal = document.getElementById('ai-modal');
const aiChatBtn =document.getElementById('open-ai-chat');
const closeAiModal = document.getElementById('ai-close-btn');
const aiSend = document.getElementById('ai-send-btn');
const aiInput = document.getElementById('ai-chat-input');
const aiHistory = document.getElementById('ai-chat-history');
const aiClose = document.getElementById('close-chat');
const aiLoader = document.getElementById('msg-loader')


aiChatBtn.addEventListener('click', () => aiModal.classList.add('open'));
console.log('opened');

closeAiModal.addEventListener("click", ()=> aiModal.classList.remove('open'));
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









/* =======Buttons to download Invoice and Portfolio=========*/

document.getElementById("invoice-btn").addEventListener('click', () => {
    const invoiceBtn = document.getElementById('invoice-btn');
    invoiceBtn.style.display = "none";
    const element = document.getElementById("invoice");
    setTimeout(() => {
    html2pdf().set ({
        margin: [10,10,10,10],
        filename: "invoice.pdf",
        html2canvas: {scale: 2, 
            useCORS: true
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait"}
    }).from(element).save();
},1000);
});


document.getElementById("portfolio-btn").addEventListener('click', () => {
    const portfolioBtn = document.getElementById('portfolio-btn');
    portfolioBtn.style.display= "none";
    const element = document.getElementById("portfolio");
    setTimeout(() => {
    html2pdf().set({
        margin: [10,10,10,10],
        filename: "portfolio.pdf",
        html2canvas: {scale: 2,
            useCORS: true
        },
        
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait"},
        pagebreak: {
            mode: ['css', 'legacy']
        }
    }).from(element).save();
}, 1000);
});