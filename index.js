
document.getElementsByClassName('btn-wrap__btn')[0].onclick = getTextareaValue;

function getTextareaValue(){
    const text = document.getElementsByTagName("textarea")[0].value;

    // Separar em 3 partes (jwt) , splitted by dot '.'
    // Base64 Decode (via atob() function )
    // Mostrar em forma de JSON
    
    validateToken(text);

    console.log(text.split('.'));
}

function validateToken(token){
    const splittedToken = token.split('.');
    const element = document.querySelector("div.share__text");
    if(splittedToken.length != 3){
        element.className = "share__text js-share__text--wrong";
        element.innerText = "WRONG FDP"
        return;
    }

    try {
        console.log(atob(splittedToken[0]) + '|');
        console.log(atob(splittedToken[1]) + '|');
        console.log(atob(splittedToken[2]) + '|');
    } catch (error) {
        element.className = "share__text js-share__text--wrong";
        element.innerText = "Not base64"
        return;
    }
}