let username = localStorage.getItem("username")
let userUrl = localStorage.getItem("url")
let userDetailsContainer = document.getElementById("userDetailsContainer")
let repoContainer = document.getElementById("repoContainer")

const client_id = 'c5868f39180303a9e8e4';
const client_secret = '32735d5e618c1fc35ce25bcc7c44b0472f590a7c';

const repoUrl = `https://api.github.com/users/${username}/repos?per_page=100&sort=asc&client_id=${client_id}&client_secret=${client_secret}`
const options = {
    method: 'GET'
}

function showUserDetails(jsonData){
    const {avatar_url,name,public_repos,public_gists,followers,blog,location,hireable,email,html_url} = jsonData

    let mainProfileLanding = document.createElement("div")
    mainProfileLanding.classList.add("main-profile-landing")

    let profileDiv = document.createElement("div")
    profileDiv.classList.add("profile-container")

    let profileImage = document.createElement("img")
    profileImage.src = avatar_url
    profileImage.classList.add("user-profile-image")
    profileDiv.appendChild(profileImage)

    let anchorElement = document.createElement("a")
    anchorElement.href = html_url
    anchorElement.target = "_blank"
    profileDiv.appendChild(anchorElement)

    let profileButton = document.createElement("button")
    profileButton.textContent = name
    profileButton.classList.add("profile-button")
    anchorElement.appendChild(profileButton)

    mainProfileLanding.appendChild(profileDiv)

    userDetailsContainer.appendChild(mainProfileLanding)

    let statsDetailsContainer = document.createElement("div")
    statsDetailsContainer.classList.add("stats-details-container")

    let publicRepoStat = document.createElement("button")
    publicRepoStat.textContent = "Public Repos: " + public_repos
    publicRepoStat.classList.add("stat-item")
    statsDetailsContainer.appendChild(publicRepoStat)

    let publicGistsStat = document.createElement("button")
    publicGistsStat.textContent = "Public Gists: " + public_gists
    publicGistsStat.classList.add("stat-item")
    statsDetailsContainer.appendChild(publicGistsStat)

    let followersStat = document.createElement("button")
    followersStat.textContent = "Followers: " + followers
    followersStat.classList.add("stat-item")
    statsDetailsContainer.appendChild(followersStat)

    mainProfileLanding.appendChild(statsDetailsContainer)

    userDetailsContainer.appendChild(mainProfileLanding)
    
    let basicDetails = document.createElement("div")
    basicDetails.classList.add("basic-details-container")

    let blogData = document.createElement("h1")
    blogData.textContent = "Website/Blog: " + blog
    blogData.classList.add("detail-item")
    basicDetails.appendChild(blogData)

    let locationData = document.createElement("h1")
    locationData.textContent = "Location: " + location
    locationData.classList.add("detail-item")
    basicDetails.appendChild(locationData)

    let hireableData = document.createElement("h1")
    hireableData.textContent = "Hireable: " + hireable
    hireableData.classList.add("detail-item")
    basicDetails.appendChild(hireableData)

    let emailData = document.createElement("h1")
    emailData.textContent = "Email: " + email
    emailData.classList.add("detail-item")
    basicDetails.appendChild(emailData)

    mainProfileLanding.appendChild(basicDetails)

    userDetailsContainer.appendChild(mainProfileLanding)
}

function showUserRepos(jsonData){
    const {name,html_url,created_at,stargazers_count,forks_count,watchers_count} = jsonData

    let reposContainer = document.createElement("div")
    reposContainer.id = "repo-container"
    reposContainer.classList.add("repo-container")
    
    let repoItem = document.createElement("div")
    repoItem.classList.add("repo-item")
    reposContainer.appendChild(repoItem)

    let repoHeading = document.createElement("a")
    repoHeading.textContent = name
    repoHeading.href = html_url
    repoHeading.target = "_blank"
    repoItem.appendChild(repoHeading)

    let repoStatsContainer = document.createElement("div")
    repoStatsContainer.classList.add("repo-stats")
    repoItem.appendChild(repoStatsContainer)

    let repoStars = document.createElement("button")
    repoStars.textContent = "Stars: " + stargazers_count
    repoStars.classList.add("repo-stat-item","stars")
    repoStatsContainer.appendChild(repoStars)

    let repoWatchers = document.createElement("button")
    repoWatchers.textContent = "Watchers: " + watchers_count
    repoWatchers.classList.add("repo-stat-item","watchers")
    repoStatsContainer.appendChild(repoWatchers)

    let repoForks = document.createElement("button")
    repoForks.textContent = "Forks: " + forks_count
    repoForks.classList.add("repo-stat-item","forks")
    repoStatsContainer.appendChild(repoForks)

    let repoCreatedAt = document.createElement("p")
    repoCreatedAt.textContent = "Created at: " + created_at
    reposContainer.appendChild(repoCreatedAt)

    userDetailsContainer.appendChild(reposContainer)
}


fetch (userUrl,options)
.then((respone) => {
    return respone.json()
})
.then((jsonData) => {
    showUserDetails(jsonData)
})

fetch (repoUrl, options)
.then((respone) => {
    return respone.json()
})
.then((jsonData) => {
    for (let repo of jsonData){
        showUserRepos(repo)
    }
    
})
