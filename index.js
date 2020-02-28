const signatureState = document.querySelector('div.share__text');
const textArea = document.getElementsByTagName('textarea')[0];
const validateBtn = document.getElementsByClassName('btn-wrap__btn')[0];
const algorithmSpan = document.getElementById('js-jwt-security__span');
const algorithmSelector = document.getElementsByTagName('select')[0];
const jwtHeaderCodeDiv = document.getElementsByClassName('jwt-header__code')[0];
const jwtPayloadCodeDiv = document.getElementsByClassName('jwt-payload__code')[0];
const jwtSecurityCodeDiv = document.getElementsByClassName('jwt-security__code')[0];
const jwtSecret = document.getElementById('js-json-security__secret');
const encodedDiv = document.getElementsByClassName('comm-process__title')[0];
const decodedDiv = document.getElementsByClassName('comm-process__title')[1];
const mediaQuery = window.matchMedia('(max-width:768px)');

window.onload = function(){
    updateAlgorithmSpan();
};

algorithmSelector.onchange = function() {
    updateAlgorithmSpan();
};

function myFunction(){
    if(mediaQuery.matches){
        encodedDiv.className = 'comm-process__title js-comm-process--current';
        encodedDiv.firstElementChild.addEventListener('click', function(){
            encodedDiv.className = 'comm-process__title js-comm-process--current';
            decodedDiv.className = 'comm-process__title';
            // TODO: Show and Hide content
        });
        decodedDiv.firstElementChild.addEventListener('click',function(){
            encodedDiv.className = 'comm-process__title';
            decodedDiv.className = 'comm-process__title js-comm-process--current';
            // TODO: Show and Hide content
        });
    }
    else{
        encodedDiv.className = 'comm-process__title';
        decodedDiv.className = 'comm-process__title';
    }
}

mediaQuery.addEventListener('change', myFunction);

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

