
const searchInput = document.getElementById("searchInput");
const user = document.querySelector(".user");

const base_url = "https://api.github.com/users";

searchInput.value='';


async function getData(url) {
    let response = await fetch(url);
    return response.json();
}

function templating(obj) {
    let result = `
        <div class="col-6">
            <div class="card">
                <div class="card-body">
                    <div class="card-img">
                        <img src="${obj.avatar_url}" alt="${obj.name}">
                    </div>
                    <div class="card-content">
                        <div class="card-heading">
                            <h3 class="username">${obj.login} <span><sub>(${obj.type})</sub></span></h3>
                            <h4 class="name">${obj.name}</h4>
                        </div>
                        <div class="timeline">
                            <p>Created on: <span>${obj.created_at.slice(0, 10)}<span></p>
                            <p>Last Updated: <span>${obj.updated_at.slice(0, 10)}<span></p>
                        </div>
                        <div class="repos" id="repos">
                            
                        </div>
                        <a href="${obj.html_url}" class="visit" target="_blank">visit profile</a>
                    </div>
                </div>
            </div>
        </div>
    `;
    user.innerHTML = result;
}

const searchEventHandler = (e) => {
    if(e.key == "Enter") {
        let searchValue = searchInput.value.toLowerCase().trim();
        let searchUrl = base_url + `/${searchValue}`;

        if (!searchValue) {
            throw new Error("undefined");
        }else {
            getData(searchUrl)
                .then(data => {
                    templating(data);
                    let repo_url = data.repos_url;
                    getData(repo_url)
                        .then(arr => {
                            let repo = document.getElementById("repos");
                            let result = '';
                            for(let i = 0; i < arr.length; i++) {
                                if(i < 5) {
                                    let a = document.createElement("a");
                                    let span = document.createElement("span");
                                    span.innerHTML = arr[i].name;
                                    a.setAttribute('href', `${arr[i].html_url}`);
                                    a.setAttribute('target', `_blank`);
                                    a.appendChild(span);
                                    repo.appendChild(a);
                                }
                            }
                        })
                })
        }

    }
}

// events

searchInput.addEventListener("keyup", searchEventHandler)


