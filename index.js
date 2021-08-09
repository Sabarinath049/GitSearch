let form = document.getElementById("form")
let root = document.getElementById("root")
let userDetailsContainer = document.getElementById("userDetails")
let inputElement = document.getElementById("username")
let errorMessage = document.getElementById("errorParagraph")
let submitButtonElement = document.getElementById("submit")
let clearButtonElement = document.getElementById("clear")
let spinnerElement = document.getElementById("spinner")

let usernameValue
const client_id = 'c5868f39180303a9e8e4';
const client_secret = '32735d5e618c1fc35ce25bcc7c44b0472f590a7c';

form.addEventListener('submit',function(event){
    event.preventDefault()
    if (inputElement.value!==""){
        spinnerElement.classList.remove("d-none")
        root.classList.add("d-none")
        usernameValue = inputElement.value
        inputElement.value=""
        getData()
    }
    else{
        window.alert("Enter Username")
    }
})

clearButtonElement.onclick=function(){
    inputElement.value=""
    //need to remove root div
}

function displayUserProfile(eachItem){
    const {url} = eachItem
    spinnerElement.classList.add("d-none")
    root.classList.remove("d-none")
    const {login, avatar_url} = eachItem

    let div = document.createElement("div")
    div.id = login
    div.classList.add("user-div")

    let img = document.createElement("img")
    img.src = avatar_url 
    img.alt = `person-image ${login}`
    img.classList.add("profile-image")
    div.appendChild(img)

    let heading = document.createElement("h1")
    heading.classList.add("user-name")
    heading.textContent=login
    div.appendChild(heading)

    let anchorElement = document.createElement("a")
    anchorElement.target = "_blank"
    div.appendChild(anchorElement)

    let viewProfileButton = document.createElement("button")
    viewProfileButton.textContent="View Profile"
    viewProfileButton.classList.add("view-button")
    viewProfileButton.onclick=function(){
        window.location.href = "userDetails.html"
        localStorage.setItem("username",usernameValue)
        localStorage.setItem("url",url)
    }
    anchorElement.appendChild(viewProfileButton)

    root.appendChild(div)
}

async function getData(){
    const userUrl = `https://api.github.com/search/users?q=${usernameValue}`
    const repoUrl = `https://api.github.com/users/${usernameValue}/repos?per_page=100&sort=asc&client_id=${client_id}&client_secret=${client_secret}`
    const options = {
        method: 'GET'
    }
    await fetch(userUrl,options)
    .then((respone) => {
        return respone.json()
    })
    .then((jsonData) => {
        const {items} = jsonData
        for (let eachItem of items){
            displayUserProfile(eachItem)
        }
    })
}
