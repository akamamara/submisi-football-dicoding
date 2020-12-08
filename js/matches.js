function resultMatchesJSON(data) {
    let dataMatchesHTML = "";
    let rowDataMatches = "";
    var match = data.matches;
    var maxLooping = match.length;

    if (match.length > 10) {
        maxLooping = 10;
    }

    for (let i = 0; i < maxLooping; i++) {
        rowDataMatches += `
        <tr>
            <td>${convertUTCDate(new Date(match[i].utcDate))}</td>
            <td class="right-align">${match[i].homeTeam.name}</td>
            <td class="hide-on-med-and-down center-align"><strong>VS</strong></td>
            <td>${match[i].awayTeam.name}</td>
            <td>
                <a class="waves-effect waves-light btn-flat" href="./matchDetail.html?id=${match[i].id}">
                <i class="material-icons" style="font-size: 2em;">save_alt</i>
                </a>
            </td>
        </tr>
        `;
    }
    // console.log(rowDataMatches);

    dataMatchesHTML += `
<table class="responsive-table matches">
    <thead>
        <tr>
            <th>Waktu Pertandingan</td>
            <th colspan="3" class="center-align hide-on-med-and-down">Tim yang Bertanding</th>
            <th class="hide-on-large-only">Tim Tuan Rumah</th>
            <th class="hide-on-large-only">Tim Tamu</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        ` + rowDataMatches + `
    </tbody>
</table>
    `;
    // console.log(dataMatchesHTML);

    if (document.getElementById("matches") != null) {
        document.getElementById("matches").innerHTML = dataMatchesHTML;
        console.log("Elemen berhasil dimuat.");
    }
}

function resultMatchesDetailJSON(data) {
    var rowDataMatchesDetail = `
    <div class="title grey lighten-4" style="padding-bottom: 1em;">
        <div class="container">
            <div class="valign-wrapper leagueTitle">
                <img class="champions-logo" src="/assets/champions_league.svg" alt="Champions League Logo">
                <h5>Champion League</h5>
            </div>
            <p>${convertUTCDate(new Date(data.match.utcDate))}</p>
        </div>
    </div>
        `;
    if (data.head2head === null) {
        rowDataMatchesDetail += `
<div class="container section">
<h5 class="center-align">Match</h5>
    <div class="valign-wrapper center-align" style="justify-content: center; margin-top:1em;">
        <div class="homeTeam right-align">
            <h6>${data.match.homeTeam.name}</h6>
        </div>
        <p style="margin: 0 1.5em 0 1.5em;">vs</p>
        <div class="awayTeam left-align">
            <h6>${data.match.awayTeam.name}</h6>
        </div>
    </div>
    <p class="center-align">Statistik pertandingan sebelumnya <strong>belum</strong> ada.</p>
</div>
        `;
    } else {
        rowDataMatchesDetail += `
<div class="container section">
    <h5 class="center-align">Match</h5>
    <div class="valign-wrapper center-align" style="justify-content: center; margin-top:1em;">
        <div class="homeTeam right-align">
            <h6>${data.match.homeTeam.name}</h6>
        </div>
        <p style="margin: 0 1.5em 0 1.5em;">vs</p>
        <div class="awayTeam left-align">
            <h6>${data.match.awayTeam.name}</h6>
        </div>
    </div>
    
    <div class="section valign-wrapper">
        <div class="matchesTeam left" style="margin-right: 2em;">
            <p>Total Matches</p>
            <h4>${data.head2head.numberOfMatches}</h4>
        </div>
        
        <table class="right">
            <thead>
                <th></th>
                <th>W</th>
                <th>D</th>
                <th>L</th>
            </thead>
            <tbody>
                <tr>
                    <td>${data.match.homeTeam.name}</td>
                    <td>${data.head2head.homeTeam.wins}</td>
                    <td>${data.head2head.homeTeam.draws}</td>
                    <td>${data.head2head.homeTeam.losses}</td>
                </tr>
                <tr>
                    <td>${data.match.awayTeam.name}</td>
                    <td>${data.head2head.awayTeam.wins}</td>
                    <td>${data.head2head.awayTeam.draws}</td>
                    <td>${data.head2head.awayTeam.losses}</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
    `;
    }

    document.getElementById("matchesDetail").innerHTML = rowDataMatchesDetail;
}