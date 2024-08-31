function generate(data){
    document.getElementById("qrcode").innerHTML = "";

    let qr = new QRCode(document.getElementById("qrcode"), {
        text: data,
        width: 256,
        height: 256,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
}

document.getElementById("generate-btn").addEventListener("click", function() {
    let data = document.getElementById("url-input").value;
    if(!data) return;
    generate(data);
});

window.onload = function(e) {
    generate("Check my other projects: https://github.com/SunBlast2255")
};

window.addEventListener('click', function(){
    document.getElementById("context").style.display = "none";
});

window.oncontextmenu = function (e){
    e.preventDefault();

    let context = document.getElementById("context");
    context.style.display = "block";

    let clickX = e.pageX + 15;
    let clickY = e.pageY + 15;

    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    let menuWidth = context.offsetWidth;
    let menuHeight = context.offsetHeight;

    if ((clickX + menuWidth) > windowWidth) {
        context.style.left = (windowWidth - menuWidth) + "px";
    } else {
        context.style.left = clickX + "px";
    }

    if ((clickY + menuHeight) > windowHeight) {
        context.style.top = (windowHeight - menuHeight) + "px";
    } else {
        context.style.top = clickY + "px";
    }
}

document.getElementById("save").addEventListener("click", function() {
    const canvas = document.querySelector('#qrcode canvas');
    const pngUrl = canvas.toDataURL("image/png");

    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qrcode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
});

document.getElementById("copy").addEventListener("click", function() {
    const canvas = document.querySelector('#qrcode canvas');

    canvas.toBlob(function(blob) {
        const item = new ClipboardItem({"image/png": blob});
        navigator.clipboard.write([item]);
    });
});

