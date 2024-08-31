async function generate(data){
    document.getElementById("qrcode").innerHTML = "";

    let settings = await getSettings();

    let qr = new QRCode(document.getElementById("qrcode"), {
        text: data,
        width: parseInt(settings.width),
        height: parseInt(settings.height),
        colorDark : settings.foreground,
        colorLight : settings.background,
        correctLevel : QRCode.CorrectLevel.H
    });
}

async function getSettings(){
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(null, function(result) {
            if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError);
            }
            
            if (Object.keys(result).length === 0) {
                let defaultSettings = {background: "#FFFFFF", foreground: "#000000", width: "256", height: "256"};
                chrome.storage.local.set(defaultSettings, function() {
                    resolve(defaultSettings);
                });
            } else {
                resolve(result);
            }
        });
    });
}

window.onload = function(e) {
    generate("Check my other projects: https://github.com/SunBlast2255");
};

document.getElementById("generate-btn").addEventListener("click", function() {
    let data = document.getElementById("url-input").value;
    if(!data) return;
    generate(data);
});

//settings

document.getElementById("settings-btn").addEventListener("click", async function() {
    document.getElementById("settings-modal").style.display = "flex";

    let settings = await getSettings();

    document.getElementById("background").value = settings.background;
    document.getElementById("foreground").value = settings.foreground;
    document.getElementById("width").value = settings.width;
    document.getElementById("height").value = settings.height;
});

document.getElementById("apply-btn").addEventListener("click", function() {
    document.getElementById("settings-modal").style.display = "none";

    let background = document.getElementById("background").value;
    let foreground = document.getElementById("foreground").value;
    let width = document.getElementById("width").value;
    let height = document.getElementById("height").value;

    chrome.storage.local.set({
        background: background,
        foreground: foreground,
        width: width,
        height: height
    });
    
});

//context menu

document.getElementById("qrcode").oncontextmenu = function (e){
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

window.addEventListener('click', function(){
    document.getElementById("context").style.display = "none";
});

