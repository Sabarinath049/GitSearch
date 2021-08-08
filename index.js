let root = document.getElementById("root")
let inputElement = document.getElementById("username")
let submitButtonElement = document.getElementById("submit")
let clearButtonElement = document.getElementById("clear")
let spinnerElement = document.getElementById("spinner")

let usernameValue
const client_id = 'c5868f39180303a9e8e4';
const client_secret = '32735d5e618c1fc35ce25bcc7c44b0472f590a7c';
submitButtonElement.onclick=function(){
    spinnerElement.classList.remove("d-none")
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
    if (inputElement.value!==""){
        inputElement.value=""
    }
    else{
        window.alert("Already Cleared")
    }
}

function displayUserProfile(eachItem){
    spinnerElement.classList.add("d-none")
    const {login, avatar_url} = eachItem
    let div = document.createElement("div")
    div.classList.add("user-div")
    let img = document.createElement("img")
    img.src = avatar_url 
    img.classList.add("profile-image")
    div.appendChild(img)
    let heading = document.createElement("h1")
    heading.classList.add("user-name")
    heading.textContent=login
    div.appendChild(heading)
    let anchorElement = document.createElement("a")
    div.appendChild(anchorElement)
    let viewProfileButton = document.createElement("button")
    viewProfileButton.textContent="View Profile"
    viewProfileButton.classList.add("view-button")
    anchorElement.appendChild(viewProfileButton)
    root.appendChild(div)
}

async function getData(){
    const userUrl = `https://api.github.com/search/users?q=${usernameValue}`
    const repoUrl = `https://api.github.com/users/${usernameValue}/repos?per_page=100&sort=asc&client_id=${this.client_id}&client_secret=${client_secret}`
    const options = {
        method: 'GET'
    }
    const profile = await fetch(userUrl,options)
    .then((respone) => {
        return respone.json()
    })
    .then((jsonData) => {
        console.log(jsonData)
        const {items} = jsonData
        for (let eachItem of items){
            displayUserProfile(eachItem)
        }
    })

    const repo = await fetch(repoUrl,options)
    .then((respone) => {
        return respone.json()
    })
    .then((jsonData) => {
    })
}
