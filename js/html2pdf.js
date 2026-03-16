
function addScript(url, callback) {
    var script = document.createElement('script');
    script.type = 'application/javascript';
    script.src = url;
    script.onload = function(){
        if (callback) callback();
    };
    script.onerror = function() {
        console.error('Failed to load script:' + url);
    };
    document.head.appendChild(script);
}
addScript('https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js');