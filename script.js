const SERVER_URL = 'https://eulfffffwfjhh-server.herokuapp.com/'

const makeScoreCard = (place, title, score) => {
    return $("<div>", {'class': 'card mb-2'})
        .append($("<div>", {'class': 'card-body py-1'})
            .append([
                $("<h3>", {'class': 'd-inline me-4'}).text(`#${place}`),
                $("<h3>", {'class': 'd-inline'}).text(title),
                $("<h3>", {'class': 'd-inline float-end'}).text(`${score} Points`)
            ])
        )
}

const initScoreboard = () => {
    $("body").append(
        $("<div>", {'class': 'row'})
            .append($("<div>", {'class': 'list-group col-5', 'id': 'scoreboard'}))
    )
}

const main = () => {   
    initScoreboard() 

    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (target, prop) => target.get(prop)
    });
    let game = params.game

    if (game == null || game == "") {
        $("body").append(
            $("<h4>").text("Don't forget the game query in the URL"),
            $("<h5>").text("It should look like: ?game=game_name")
        )
        return
    }

    const poll = () => {
        fetch(`${SERVER_URL}${game}`).then((response) => response.json()).then(data => {
            console.log(data)
            // data = [
            //     {title: "Team 1", score: 100},
            //     {title: "Team 2", score: 90},
            //     {title: "Team 3", score: 80},
            //     {title: "Team 4", score: 70},
            //     {title: "Team 5", score: 60},
            //     {title: "Team 6", score: 50},
            // ]
            $("#scoreboard").append(
                data.map((item, index) => makeScoreCard(index + 1, item.title, item.score))
            )
        })
    }
    
    setInterval(poll, 3000)
}

$(document).ready(main)
