function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substr(0, index) + chr + str.substr(index + 1);
}

function resultStandingsJSON(data) {
    var dataStandingsHTML = "";
    data.standings.forEach(function(item) {
        if ((item.type === "TOTAL")) {
            let rowDataStandings = "";
            // console.log(item);
            item.table.forEach(function(tableData) {
                // console.log(tableData);

                if (tableData.position === 1) {
                    rowDataStandings += `
                                <div class="card-title grey-text text-darken-4 standings">${toTitleCase(setCharAt(item.group,5,' '))}</div>
                                `;
                    rowDataStandings += `
                    
                                <table class="standings">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>P</th>
                                            <th>W</th>
                                            <th>D</th>
                                            <th>L</th>
                                            <th>Pts</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                `;
                }
                rowDataStandings += `
                            <tr>
                                <td><span style="background-image: url(${tableData.team.crestUrl}); background-repeat: no-repeat; background-size: contain; width: 2em; height: 2em; display: inline-block; margin-right: 1em;"></span>${tableData.team.name}</td>
                                <td>${tableData.playedGames}</td>
                                <td>${tableData.won}</td>
                                <td>${tableData.draw}</td>
                                <td>${tableData.lost}</td>
                                <td>${tableData.points}</td>
                            </tr>
                            `;
            });

            rowDataStandings = `
            <div class="col s12 m6 l6">
            <div class="card" style="margin-bottom: 3em;">
            <div class="card-content">
            ${rowDataStandings}
            </tbody></table>
            </div>
            </div>
            </div>
            `;
            dataStandingsHTML += rowDataStandings;
            // console.log(rowDataPerLoop);
        }
    });
    // console.log(item);
    if (document.getElementById("standings") != null) {
        document.getElementById("standings").innerHTML = (dataStandingsHTML);
    }
    // console.log("Elemen berhasil dimuat.");
}