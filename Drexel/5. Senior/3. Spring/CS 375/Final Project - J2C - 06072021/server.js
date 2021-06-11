let express = require("express");
var unirest = require("unirest");
let app = express();

let port = 3000;
let hostname = "localhost";


async function getPlayerStats(gameId){
	return new Promise((resolve, reject) => {
		let game = unirest("GET", "https://api-nba-v1.p.rapidapi.com/gameDetails/" + gameId);
		
		game.headers({
			"x-rapidapi-key": "a011230fc1msh434ab7884778abap10f5a2jsne3fb5dc9e240",
			"x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
			"useQueryString": true
		});
	
		game.end(function (res) {
			if (res.error){
				return reject(res.error);
			}
			return resolve(res.body.api.game[0]);
		});
	})
} // This function gets players stats as promise form, and is used in the /recent and /upcoming calls

app.get("/live", function (req, res) {
	// res.sendFile(path.join(__dirname, '/index.html'));
	let req1 = unirest("GET", "https://api-nba-v1.p.rapidapi.com/games/live/");

	req1.headers({
		"x-rapidapi-key": "a011230fc1msh434ab7884778abap10f5a2jsne3fb5dc9e240",
		"x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
		"useQueryString": true
	});

	req1.end(function (apires) {
		if (apires.error) throw new Error(apires.error);
	
		console.log(apires.body);
		res.header("Access-Control-Allow-Origin", "*");
        for (let i = 0; i < apires.body.api.games.length; i++){
			
			let newGameId = apires.body.api.games[i].gameId;
			let gameStats = getPlayerStats(newGameId);
			apires.body.api.games[i].stats = gameStats;
		}
		res.json(apires.body);
	});
	
	console.log("server received live games");
}); // This request pulls api data (in json form) for LIVE games 

app.get("/recent", function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	
	if (req.query.date == undefined){
		var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = today.getFullYear();

		today = yyyy + '-' + mm + '-' + dd;
		console.log(today);
		
		return

		
	}
	else{var today = new Date(Date.parse(req.query.date));}
	
	if (isNaN(today.getTime())) {
		res.status(400);
		res.json({error: "Invalid Date."});
		return
	}

	let yesterday = new Date();

	yesterday.setDate(today.getDate());
	year = yesterday.getFullYear().toString();
	month = (yesterday.getMonth() + 1).toString().padStart(2,"0");
	day = yesterday.getDate().toString().padStart(2,"0");
	stringRep = year + "-" + month + "-" + day;

	var apireq = unirest("GET", "https://api-nba-v1.p.rapidapi.com/games/date/"+stringRep);

	apireq.headers({
		"x-rapidapi-key": "a011230fc1msh434ab7884778abap10f5a2jsne3fb5dc9e240",
		"x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
		"useQueryString": true
	});


	apireq.end(function (apires) {
		if (apires.error) throw new Error(apires.error);
		let promises = [];
		for (let i = 0; i < apires.body.api.games.length; i++){
			let newGameId = apires.body.api.games[i].gameId;
			let gameStats = getPlayerStats(newGameId);
			promises.push(gameStats
				.then( (stats) => apires.body.api.games[i].playerStats = stats)
			)
		}
		Promise.all(promises).then( (list) => res.json(apires.body))
	});
}); // This request pulls the api data (in json form) for games one day BEFORE entered date

app.get("/upcoming", function (req, res) {
	
	res.header("Access-Control-Allow-Origin", "*");

	if (req.query.date == undefined){
		res.status(400);
		res.json({error: "Date required."});
		return
	}
	var today = new Date(Date.parse(req.query.date));
	if (isNaN(today.getTime())) {
		res.status(400);
		res.json({error: "Invalid Date."});
		return
	}

	let tomorrow = new Date();

	tomorrow.setDate(today.getDate() + 2);
	year = tomorrow.getFullYear().toString();
	month = (tomorrow.getMonth() + 1).toString().padStart(2,"0");
	day = tomorrow.getDate().toString().padStart(2,"0");
	stringRep = year + "-" + month + "-" + day;

	var apireq = unirest("GET", "https://api-nba-v1.p.rapidapi.com/games/date/"+stringRep);

	apireq.headers({
		"x-rapidapi-key": "a011230fc1msh434ab7884778abap10f5a2jsne3fb5dc9e240",
		"x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
		"useQueryString": true
	});


	apireq.end(function (apires) {
		if (apires.error) throw new Error(apires.error);
		let promises = [];
		for (let i = 0; i < apires.body.api.games.length; i++){
			let newGameId = apires.body.api.games[i].gameId;
			let gameStats = getPlayerStats(newGameId);
			promises.push(gameStats
				.then( (stats) => apires.body.api.games[i].playerStats = stats)
			)
		}
		Promise.all(promises).then( (list) => res.json(apires.body))
	});
}); // This request pulls the api data (in json form) for games one day AFTER the entered date




app.listen(port, hostname, () => {
    console.log(`Listening at: http://${hostname}:${port}`);
});