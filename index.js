const signatureState = document.querySelector("div.share__text");
const textArea = document.getElementsByTagName("textarea")[0];
const validateBtn = document.getElementsByClassName('btn-wrap__btn')[0];
const algorithmSpan = document.getElementById('js-jwt-security__span');
const algorithmSelector = document.getElementsByTagName('select')[0];
const jwtSecurityCodeDiv = document.getElementsByClassName('jwt-security__code')[0];

window.onload = function(){
    updateAlgorithmSpan();
    let algorithmText = `(<br>
        base64UrlEncode(header) + "." + 
        base64UrlEncode(payload),
    )`;
    // jwtSecurityCodeDiv.innerHTML = algorithmSpan.innerHTML +  algorithmText;

};

algorithmSelector.onchange = function() {
    updateAlgorithmSpan();
}

validateBtn.onclick = getTextareaValue;

function updateAlgorithmSpan() {
    algorithmSpan.innerText = algorithmSelector.value;
}

function getTextareaValue(){
    let text = textArea.value;
    // Separar em 3 partes (jwt) , splitted by dot '.'
    // Base64 Decode (via atob() function )
    // Mostrar em forma de JSON
    
    changeSignatureState(text);
}

function changeSignatureState(text) {
    if (!isTokenValid(text)) {
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