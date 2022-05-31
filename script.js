const SERVER_URL = 'https://eulfffffwfjhh-server.herokuapp.com/'
// const SERVER_URL = 'http://localhost:3000/'

const makeScoreCard = (place, title, score) => {
    return $("<div>", {'class': 'card mb-2'}).append(
        $("<div>", {'class': 'card-body py-1'}).append([
                $("<h3>", {'class': 'd-inline me-4'}).text(`#${place}`),
                $("<h3>", {'class': 'd-inline'}).text(title),
                $("<h3>", {'class': 'd-inline float-end'}).text(`${score} Points`)
            ])
        )
}

const makeTeamCard = (teamName) => {
    return $("<div>", {'class': 'col-4'}).append(
        $("<div>", {'class': 'card mb-3 me-1'}).append(
            $("<div>", {'class': 'card-body py-1'}).append(
                $("<h3>", {'class': 'text-center'}).text(teamName)
            )
        )
    )
}

const scoreboard = (game) => {
    $("body").append(
        $("<div>", {'class': 'row'}).append(
            $("<div>", {'class': 'list-group col-5', 'id': 'scoreboard'})
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
                    data.map((item, index) => makeScoreCard(index + 1, item.title, item.score))
                )
            })
            .catch(err => {
                console.log(`Server Error: ${err}`)
                $("#scoreboard").empty().append(
                    $("<div>", {'class': 'card mb-2'}).append(
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
        $("<div>", {'class': 'row', 'id': 'teams'})
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
                    $("<div>", {'class': 'card mb-2'}).append(
                        $("<div>", {'class': 'card-body py-1'}).append(
                            $("<h3>", {'class': 'text-center'}).text("No teams yet")
                        )
                    )
                )
            })
    }
    setInterval(poll, 3000)
}

const winners = () => {

}

const main = () => {   
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (target, prop) => target.get(prop)
    });

    let page = params.page
    if (game == null || page == "") {
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
    }
    else {
        $("body").empty().append(
            $("<h4>").text("This page does not exists, enter either 'game', 'teams' or 'winners'")
        )
    }
}

$(document).ready(main)
