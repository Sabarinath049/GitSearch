let root = document.getElementById("root")
let inputElement = document.getElementById("username")
let submitButtonElement = document.getElementById("submit")
let clearButtonElement = document.getElementById("clear")

let usernameValue
const client_id = 'c5868f39180303a9e8e4';
const client_secret = '32735d5e618c1fc35ce25bcc7c44b0472f590a7c';
submitButtonElement.onclick=function(){
    if (inputElement.value!==""){
        usernameValue = inputElement.value
        inputElement.value=""
        getData()
    }
    else{
        window.alert("Enter Username")
    }
}

clearButtonElement.onclick=function(){
    inputElement.value=""
}

function getData(){
    const url = `https://api.github.com/users/${usernameValue}?client_id=${client_id}&client_secret=${client_secret}`
    const options = {
        method: 'GET'
    }
    fetch(url,options)
    .then((respone) => {
        return respone.json()
    })
    .then((jsonData) => {
        console.log(jsonData)
    })
}
