const signatureState = document.querySelector("div.share__text");

document.getElementsByClassName('btn-wrap__btn')[0].onclick = getTextareaValue;

function getTextareaValue(){
    const text = document.getElementsByTagName("textarea")[0].value;

    // Separar em 3 partes (jwt) , splitted by dot '.'
    // Base64 Decode (via atob() function )
    // Mostrar em forma de JSON
    
    if(!isTokenValid(text)){
        //modify class
        signatureState.className = "share__text js-share__text--wrong";
        signatureState.innerText = "Invalid Signature"
    }

    console.log(text.split('.'));
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