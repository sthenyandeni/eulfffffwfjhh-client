// const SERVER_URL = 'https://eulfffffwfjhh-server.herokuapp.com/'
const SERVER_URL = 'https://cd00-196-36-112-50.eu.ngrok.io/'
// const SERVER_URL = 'http://localhost:3000/'

const makeScoreCard = (place, title, score) => {
    return $("<div>", {'class': 'card mb-2 shadow border-primary'}).append(
        $("<div>", {'class': 'card-body py-1 '}).append([
                $("<h3>", {'class': 'd-inline me-4'}).text(`#${place}`),
                $("<h3>", {'class': 'd-inline'}).text(title),
                $("<h3>", {'class': 'd-inline float-end'}).text(`${score} Points`)
            ])
        )
}

const makeTeamCard = (teamName) => {
    return $("<div>", {'class': 'col-4'}).append(
        $("<div>", {'class': 'card mb-3 me-1 shadow border-primary'}).append(
            $("<div>", {'class': 'card-body py-1'}).append(
                $("<h3>", {'class': 'text-center'}).text(teamName)
            )
        )
    )
}

const scoreboard = (game) => {

    $("body").append(
        $("<div>", {'class': 'row'}).append(
            $("<div>", {'class': 'list-group col-12 mb-3', 'id': 'scoreboard-heading'}).append(
                $("<h1>", {'class': 'text-center'}).text("Scoreboard")
            )
        ).append(
            $("<div>", {'class': 'list-group col-6', 'id': 'scoreboard'})
        )
    )

    const poll = () => {
        fetch(`${SERVER_URL}${game}`)
            .then((response) => {
                if (!response.status == 200)
                    return Promise.reject(response.status)
                return response.json()
            })
            .then(data => {
                $("#scoreboard").empty().append(
                    data.map((item, index) => makeScoreCard(index + 1, item.name, item.score))
                )
            })
            .catch(err => {
                console.log(`Server Error: ${err}`)
                $("#scoreboard").empty().append(
                    $("<div>", {'class': 'card mb-2 shadow'}).append(
                        $("<div>", {'class': 'card-body py-1'}).append(
                            $("<h3>", {'class': 'text-center'}).text("No scores yet")
                        )
                    )
                )
            })
    }  
    setInterval(poll, 3000)
}

const teams = () => {
    $("body").empty().append(
        $("<div>", {'class': 'list-group col-12 mb-3', 'id': 'teams-heading'}).append(
            $("<h1>", {'class': 'text-center'}).text("Team Names")
        ).append(
        $("<div>", {'class': 'row', 'id': 'teams'})
        )
    )
    const poll = () => {
        fetch(`${SERVER_URL}team_names`)
            .then((response) => {
                if (!response.status == 200)
                    return Promise.reject(response.status)
                return response.json()
            })
            .then(data => {
                $("#teams").empty().append(
                    data.map(team => makeTeamCard(team))
                )
            })
            .catch(err => {
                console.log(`Server Error: ${err}`)
                $("#teams").empty().append(
                    $("<div>", {'class': 'card mb-2 shadow'}).append(
                        $("<div>", {'class': 'card-body py-1 '}).append(
                            $("<h3>", {'class': 'text-center'}).text("No teams yet")
                        )
                    )
                )
            })
    }
    setInterval(poll, 3000)
}

const leaderboard = () => {
    $("body").empty().append(
        $("<div>", {'class': 'list-group col-12 mb-3', 'id': 'leaderboard-heading'}).append(
            $("<h1>", {'class': 'text-center'}).text("♚ LEADERBOARD ♚")
        ).append(
        $("<div>", {'class': 'row', 'id': 'leaderboard'})
        )
    )

    const poll = () => {
        fetch(`${SERVER_URL}leaderboard`)
            .then((response) => {
                if (!response.status == 200)
                    return Promise.reject(response.status)
                return response.json()
            })
            .then(data => {
                $("#leaderboard").empty().append(
                    data.map((item, index) => makeScoreCard(index + 1, item.name, item.score))
                )
            })
            .catch(err => {
                console.log(`Server Error: ${err}`)
                $("#leaderboard").empty().append(
                    $("<div>", {'class': 'card mb-2 shadow'}).append(
                        $("<div>", {'class': 'card-body py-1'}).append(
                            $("<h3>", {'class': 'text-center'}).text("No scores yet")
                        )
                    )
                )
            })
    }
    setInterval(poll, 5000)
}

const winners = () => {
    $("body").empty().append(
        $("<div>", {'class': 'list-group col-12 mb-3 text-warning', 'id': 'winners-heading'}).append(
            $("<h1>", {'class': 'text-center'}).text("★ WINNERS ★")
        ).append(
        $("<div>", {'class': 'row', 'id': 'winners'})
        )
    )
}

const main = () => {   
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (target, prop) => target.get(prop)
    });

    let page = params.page
    if (page == null || page == "") {
        $("body").append(
            $("<h4>").text("Please enter the page on the ?page parameter")
        )
        return;
    }
    else if (page == "game") {
        let game = params.game;

        if (game == null || game == "") {
            $("body").append(
                $("<h4>").text("Please enter the game on the ?game parameter")
            )
            return;
        }
        scoreboard(game)
    }
    else if (page == "teams") {
        teams()
    }
    else if (page == "winners") {
        winners()
    }else if(page == "leaderboard"){
        leaderboard()
    }
    else {
        $("body").empty().append(
            $("<h4>").text("This page does not exists, enter either 'game', 'teams', 'winners' or 'leaderboard'")
        )
    }
}

$(document).ready(main)
