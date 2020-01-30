
document.getElementsByClassName('btn-wrap__btn')[0].onclick = getTextareaValue;

function getTextareaValue(){
    const text = document.getElementsByTagName("textarea")[0].value;

    // Separar em 3 partes (jwt) , splitted by dot '.'
    // Base64 Decode (via atob() function )
    // Mostrar em forma de JSON

    console.log(atob(text.split('.')[2]));
}

function isEachFileAProgram(){
    const answer = "For JS, Yes, this prevents one file interrupt the whole program => Error handler"
    return answer;   
}

function nextEpisode(){
    const answer = "Functions, CH2, YOU DON'T KNOW JS"
}