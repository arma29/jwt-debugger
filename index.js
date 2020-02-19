const signatureState = document.querySelector("div.share__text");
const textArea = document.getElementsByTagName("textarea")[0];
const validateBtn = document.getElementsByClassName('btn-wrap__btn')[0];
const algorithmSpan = document.getElementById('js-jwt-security__span');
const algorithmSelector = document.getElementsByTagName('select')[0];
const jwtHeaderCodeDiv = document.getElementsByClassName('jwt-header__code')[0];
const jwtPayloadCodeDiv = document.getElementsByClassName('jwt-payload__code')[0];
const jwtSecurityCodeDiv = document.getElementsByClassName('jwt-security__code')[0];

window.onload = function(){
    updateAlgorithmSpan();
};

algorithmSelector.onchange = function() {
    updateAlgorithmSpan();
}

validateBtn.onclick = function(){
    let token = textArea.value;
    changeSignatureState(token);
    let tokenObject = getTokenObject(token);
    updateCodeDiv(jwtHeaderCodeDiv,tokenObject.header);
    updateCodeDiv(jwtPayloadCodeDiv,tokenObject.payload);
};

function getTokenObject(token){
    let splittedToken = token.split('.');
    let obj = {
        header : JSON.parse(atob(splittedToken[0])),
        payload : JSON.parse(atob(splittedToken[1])),
        security : splittedToken[2],
    };
    return obj;
}
function updateAlgorithmSpan() {
    algorithmSpan.innerText = algorithmSelector.value;
}

function updateCodeDiv(div, code){
    div.innerHTML = JSON.stringify(code,undefined, 4);
}

function changeSignatureState(token) {
    if (!isTokenValid(token)) {
        signatureState.className = "share__text js-share__text--invalid";
        signatureState.innerText = "Invalid Signature";
    }
    else {
        signatureState.className = "share__text js-share__text--correct";
        signatureState.innerText = "Signature Verified";
    }
}

function isTokenValid(token){
    const splittedToken = token.split('.');
    return hasBase64Format(splittedToken) && isWellFormated(splittedToken);
}

function isWellFormated(splittedToken){
    let result = true;
    if(splittedToken.length != 3){
        result = false;
    }
    return result;
}

function hasBase64Format(splittedToken){
    let result = true;
    try { 
        atob(splittedToken[0]);
        atob(splittedToken[1]);
    } catch (error) {
        result = false;
    }
    return result;
}