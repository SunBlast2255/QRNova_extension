function generate(data){
    document.getElementById("qrcode").innerHTML = "";

    new QRCode(document.getElementById("qrcode"), {
        text: data,
        width: 256,
        height: 256,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });

}

document.getElementById("generate-btn").addEventListener("click", () => {
    let data = document.getElementById("url-input").value;

    if(data == ""){
        return;
    }

    generate(data);
});

window.onload = () => {
    generate("Check my other projects: https://github.com/SunBlast2255")
};