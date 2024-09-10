chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.qrHTML) {
        document.getElementById("qrcode-new").innerHTML = request.qrHTML;
    }
});