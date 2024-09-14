//QR
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.qrHTML) {
        document.getElementById("qrcode-new").innerHTML = request.qrHTML;
    }
});

//Context menu

document.getElementById("qrcode-new").oncontextmenu = function (e){
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
    let img = document.querySelector("img").src;

    const downloadLink = document.createElement("a");
    downloadLink.href = img;
    downloadLink.download = "qrcode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
});

document.getElementById("copy").addEventListener("click", function() {
        let img = document.querySelector("img");

        let canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(function(blob){
            const item = new ClipboardItem({"image/png": blob});
            navigator.clipboard.write([item]);
        })
});

window.addEventListener('click', function(){
    document.getElementById("context").style.display = "none";
}); 

window.oncontextmenu = function(){
    return false;
}
