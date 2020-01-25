
document.getElementsByClassName('btn-wrap__btn')[0].onclick = clickme;

function clickme(){
    const text = document.getElementsByTagName("textarea")[0].value;
    console.log(text);
}