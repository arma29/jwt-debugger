const signatureState = document.querySelector('div.share__text');
const textArea = document.getElementsByTagName('textarea')[0];
const validateBtn = document.getElementsByClassName('btn-wrap__btn')[0];
const algorithmSpan = document.getElementById('js-jwt-security__span');
const algorithmSelector = document.getElementsByTagName('select')[0];
const jwtHeaderCodeDiv = document.getElementsByClassName('jwt-header__code')[0];
const jwtPayloadCodeDiv = document.getElementsByClassName('jwt-payload__code')[0];
const jwtSecurityCodeDiv = document.getElementsByClassName('jwt-security__code')[0];
const jwtSecret = document.getElementById('js-json-security__secret');

window.onload = function(){
    updateAlgorithmSpan();
};

algorithmSelector.onchange = function() {
    updateAlgorithmSpan();
};

validateBtn.onclick = function(){
    let token = textArea.value;
    let secret = jwtSecret.value;
    if(isTokenValid(token)){
        changeSignatureState(token,secret);
        let tokenObject = getTokenObject(token);
        updateCodeDiv(jwtHeaderCodeDiv,tokenObject.header);
        updateCodeDiv(jwtPayloadCodeDiv,tokenObject.payload);
    }
    else{
        signatureState.className = 'share__text js-share__text--invalid';
        signatureState.innerText = 'Invalid Token';
    }
};


function changeSignatureState(token,secret) {
    if (!isSignatureValid(token,secret)) {
        signatureState.className = 'share__text js-share__text--invalid';
        signatureState.innerText = 'Invalid Signature';
    }
    else {
        signatureState.className = 'share__text js-share__text--correct';
        signatureState.innerText = 'Signature Verified';
    }
}

function updateAlgorithmSpan() {
    algorithmSpan.innerText = algorithmSelector.value;
}

function updateCodeDiv(div, code){
    div.innerHTML = JSON.stringify(code,undefined, 4);
}

