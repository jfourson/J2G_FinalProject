function renderDataRecent(data) {
    let table = document.getElementById("recentGameTable");
    table.innerHTML = '';
    for (let i = 0; i < data.api.games.length; i++) {
        let team = document.createElement('tr');
        let score = document.createElement('tr');
        let point1 = document.createElement('td');
        let point2 = document.createElement('td');
        let point3 = document.createElement('td');
        let point4 = document.createElement('td');
        let logo1 = document.createElement('img');
        let logo2 = document.createElement('img');
        logo1.setAttribute("id","logo");
        logo2.setAttribute("id","logo");

        logo1.src = data.api.games[i].hTeam.logo;
        logo2.src = data.api.games[i].vTeam.logo;
        
        

        point1.appendChild(logo1);
        point1.appendChild(document.createTextNode(data.api.games[i].vTeam.fullName));
        point2.appendChild(document.createTextNode(data.api.games[i].vTeam.score.points));
        point3.appendChild(logo2);
        point3.appendChild(document.createTextNode(data.api.games[i].hTeam.fullName));
        point4.appendChild(document.createTextNode(data.api.games[i].hTeam.score.points));

        team.appendChild(point1);
        score.appendChild(point3);
        team.appendChild(point2);
        score.appendChild(point4);

        
        table.appendChild(team);
        table.appendChild(score);
        table.appendChild(document.createTextNode("------------------------------"));
    }
}

function renderDataLive(data) {
    let table = document.getElementById("liveGameTable");
    table.innerHTML = '';
    for (let i = 0; i < data.api.games.length; i++) {
        let team = document.createElement('tr');
        let score = document.createElement('tr');
        let point1 = document.createElement('td');
        let point2 = document.createElement('td');
        let point3 = document.createElement('td');
        let point4 = document.createElement('td');
        let logo1 = document.createElement('img');
        let logo2 = document.createElement('img');
        logo1.setAttribute("id","logo");
        logo2.setAttribute("id","logo");

        logo1.src = data.api.games[i].hTeam.logo;
        logo2.src = data.api.games[i].vTeam.logo;

        point1.appendChild(logo1);
        point1.appendChild(document.createTextNode(data.api.games[i].vTeam.fullName));
        point2.appendChild(document.createTextNode(data.api.games[i].vTeam.score.points));
        point3.appendChild(logo2);
        point3.appendChild(document.createTextNode(data.api.games[i].hTeam.fullName));
        point4.appendChild(document.createTextNode(data.api.games[i].hTeam.score.points));

        team.appendChild(point1);
        score.appendChild(point3);
        team.appendChild(point2);
        score.appendChild(point4);
       

        
        table.appendChild(team);
        table.appendChild(score);
        table.appendChild(document.createTextNode("------------------------------"));
    }
}

function renderDataUpcoming(data) {
    let table = document.getElementById("upcomingGameTable");
    table.innerHTML = '';
    for (let i = 0; i < data.api.games.length; i++) {
        
        let team = document.createElement('tr');
        let point1 = document.createElement('td');
        let point2 = document.createElement('td');
        let spacer = document.createElement('td');
        let logo1 = document.createElement('img');
        let logo2 = document.createElement('img');
        logo1.setAttribute("id","logo");
        logo2.setAttribute("id","logo");

        logo1.src = data.api.games[i].hTeam.logo;
        logo2.src = data.api.games[i].vTeam.logo;
        
        point1.appendChild(logo2);
        point1.appendChild(document.createTextNode(data.api.games[i].vTeam.fullName));
        point2.appendChild(logo1);
        point2.appendChild(document.createTextNode(data.api.games[i].hTeam.fullName));
        spacer.appendChild(document.createTextNode("@"));

        team.appendChild(point1);
        team.appendChild(spacer);
        team.appendChild(point2);

        
        table.appendChild(team);
        table.appendChild(document.createTextNode("--------------------------------------------------"));
        
    }
}

function getLive(){
    fetch('http://localhost:3000/live')
    .then(response => {
        response.json().then(json => {
            console.log(json);
            renderDataLive(json,"recentGameTable");
        });

    })
    .catch((error) => console.log(error));
    
}


function getUpcoming(){
    let searchbar = document.getElementById("gameSearchBar")
    fetch('http://localhost:3000/upcoming?date='+ searchbar.value)
    .then(response => {
        response.json().then(json => {
            console.log(json);
            renderDataUpcoming(json);
        });
    })
    .catch((error) => console.log(error));
}

function getRecent(){
    let searchbar = document.getElementById("gameSearchBar")
    fetch('http://localhost:3000/recent?date='+ searchbar.value)
    .then(response => {
        response.json().then(json => {
            console.log(json);
            renderDataRecent(json);
        });
    })
    .catch((error) => console.log(error));
}

// These control what is being done with the specific JSON information, currently these are just printing the reponses from the API

