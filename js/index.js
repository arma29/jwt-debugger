const shareText = document.querySelector('div.share__text');
const textArea = document.getElementsByTagName('textarea')[0];
const validateBtn = document.getElementsByClassName('btn-wrap__btn')[0];
const algorithmSpan = document.getElementById('js-jwt-security__span');
const algorithmSelector = document.getElementsByTagName('select')[0];
const jwtHeaderCodeDiv = document.getElementsByClassName('jwt-header__code')[0];
const jwtPayloadCodeDiv = document.getElementsByClassName('jwt-payload__code')[0];
const jwtSecurityCodeDiv = document.getElementsByClassName('jwt-security__code')[0];
const jwtSecretInput = document.getElementById('js-json-security__secret');
const encodedCommDiv = document.getElementsByClassName('comm-process__title')[0];
const decodedCommDiv = document.getElementsByClassName('comm-process__title')[1];
const encodedBoxDiv = document.getElementsByClassName('box-content')[0];
const decodedBoxDiv = document.getElementsByClassName('box-content')[1];
const mediaQuery = window.matchMedia('(max-width:768px)');

window.onload = function () {
    updateAlgorithmSpan();
    handleMediaQuery();
};

algorithmSelector.onchange = updateAlgorithmSpan;

mediaQuery.onchange = handleMediaQuery;

validateBtn.onclick = function () {
    let token = textArea.value;
    let secret = jwtSecretInput.value;
    if (isTokenValid(token)) {
        changeSignatureState(token, secret);
        let tokenObject = getTokenObject(token);
        updateCodeDiv(jwtHeaderCodeDiv, tokenObject.header);
        updateCodeDiv(jwtPayloadCodeDiv, tokenObject.payload);
    } else {
        shareText.className = 'share__text js-share__text--invalid';
        shareText.innerText = 'Invalid Token';
    }
};


function updateAlgorithmSpan() {
    algorithmSpan.innerText = algorithmSelector.value;
}

function handleMediaQuery() {
    if (mediaQuery.matches) {
        encodedCommDiv.className = 'comm-process__title js-comm-process--current';
        encodedBoxDiv.className = 'box-content js-box-content--current';
        encodedCommDiv.firstElementChild.addEventListener('click', handleEncodedCommDiv);
        decodedCommDiv.firstElementChild.addEventListener('click', handleDecodedCommDiv);
    } else {
        encodedCommDiv.className = 'comm-process__title';
        decodedCommDiv.className = 'comm-process__title';
        encodedBoxDiv.className = 'box-content';
        decodedBoxDiv.className = 'box-content';
        encodedCommDiv.firstElementChild.removeEventListener('click', handleEncodedCommDiv);
        decodedCommDiv.firstElementChild.removeEventListener('click', handleDecodedCommDiv);
    }
}

function changeSignatureState(token, secret) {
    if (!isSignatureValid(token, secret)) {
        shareText.className = 'share__text js-share__text--invalid';
        shareText.innerText = 'Invalid Signature';
    } else {
        shareText.className = 'share__text js-share__text--correct';
        shareText.innerText = 'Signature Verified';
    }
}


function updateCodeDiv(div, code) {
    div.innerHTML = JSON.stringify(code, undefined, 4);
}

function handleEncodedCommDiv() {
    encodedCommDiv.className = 'comm-process__title js-comm-process--current';
    decodedCommDiv.className = 'comm-process__title';
    encodedBoxDiv.className = 'box-content  js-box-content--current';
    decodedBoxDiv.className = 'box-content'
}

function handleDecodedCommDiv() {
    encodedCommDiv.className = 'comm-process__title';
    decodedCommDiv.className = 'comm-process__title js-comm-process--current';
    encodedBoxDiv.className = 'box-content';
    decodedBoxDiv.className = 'box-content  js-box-content--current'
}