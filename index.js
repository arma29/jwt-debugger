
document.getElementById("btn-test").onclick = clickme;

function clickme(){
    const text = document.getElementsByTagName("textarea")[0].value;
    console.log(text);
}