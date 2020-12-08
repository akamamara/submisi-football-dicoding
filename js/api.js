var base_url = "https://api.football-data.org/v2/competitions/2001/";

var fetchAPI = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': '458f1fe9867c48e7a0b7d6c0896d2d99'
        }
    });
}

var convertUTCDate = date => {
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}<br> ${formatAMPM(date)}`
}

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    hours = minutes < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ';
    return strTime;
}





function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        // Method reject() akan membuat blok catch terpanggil
        return Promise.reject(new Error(response.statusText));
    } else {
        // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
        return Promise.resolve(response);
    }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
    return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
    // Parameter error berasal dari Promise.reject()
    console.log("Error : " + error);
}

function getSeasons() {
    if ('caches' in window) {
        caches.match(base_url).then(function(response) {
            if (response) {
                response.json().then(function(data) {
                    // console.log("Memuat data seasons...");
                    let season = "";
                    season = ` Dimulai pada ${data.currentSeason.startDate}, hingga ${data.currentSeason.endDate}`;
                    document.getElementById("season").innerHTML = season;
                });
            }
        });
    }

    fetchAPI(base_url)
        .then(status)
        .then(json)
        .then(function(data) {
            // console.log("Meminta request seasons...");
            let season = "";
            season = ` Dimulai pada ${data.currentSeason.startDate}, hingga ${data.currentSeason.endDate}`;
            document.getElementById("season").innerHTML = season;
        });
}

function getStandings() {
    if ('caches' in window) {
        caches.match(base_url + "standings?standingType=TOTAL").then(function(response) {
            if (response) {
                response.json().then(function(data) {
                    // console.log("Memuat data klasemen...");
                    resultStandingsJSON(data);
                });
            }
        });
    }

    fetchAPI(base_url + "standings?standingType=TOTAL")
        .then(status)
        .then(json)
        .then(function(data) {
            // console.log("Meminta request klasemen...");
            resultStandingsJSON(data);
        })
        .catch(error);
}

function getMatchesByID() {
    if ('caches' in window) {
        caches.match(base_url + "matches?status=SCHEDULED").then(function(response) {
            if (response) {
                response.json().then(function(data) {
                    // console.log("Memuat data pertandingan...");
                    resultMatchesJSON(data);
                });
            }
        });
    }

    fetchAPI(base_url + "matches?status=SCHEDULED")
        .then(status)
        .then(json)
        .then(function(data) {
            // console.log("Meminta request pertandingan...");
            resultMatchesJSON(data);
        });

}

function getMatchesDetail() {
    return new Promise(function(resolve, reject) {
        // Ambil nilai query parameter (?id=)
        var urlParams = new URLSearchParams(window.location.search);
        var idParam = urlParams.get("id");
        var dataSquadHTML = ''
        var tabelSquadHTML = ''
        if ('caches' in window) {
            caches.match('https://api.football-data.org/v2/matches/' + idParam).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        resultMatchesDetailJSON(data);
                        resolve(data);
                    });
                }
            });
        }
        fetchAPI('https://api.football-data.org/v2/matches/' + idParam)
            .then(status)
            .then(json)
            .then(function(data) {
                // Objek JavaScript dari response.json() masuk lewat variabel data.
                // console.log(data);
                // Menyusun komponen card artikel secara dinamis
                resultMatchesDetailJSON(data);
                resolve(data);
            })
            .catch(error);
    });
}

function getSavedMatchById() {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = Number(urlParams.get("id"));

    getMatchesById(idParam).then(function(match) {
        resultMatchesDetailJSON(match);
    });
}

function resultMatchFav(data) {
    // console.log(data)
    var dataMatchesFavHTML = "";
    var rowDataMatchesFav = "";
    data.forEach(function(match) {
        // console.log(match);
        rowDataMatchesFav += `
        <tr>
            <td>${convertUTCDate(new Date(match.match.utcDate))}</td>
            <td class="right-align">${match.match.homeTeam.name}</td>
            <td class="hide-on-med-and-down center-align"><strong>VS</strong></td>
            <td>${match.match.awayTeam.name}</td>
            <td>
                <a class="waves-effect waves-light btn-flat" href="./matchDetail.html?id=${match.id}">
                <i class="material-icons" style="font-size: 2em;">save_alt</i>
                </a>
            </td>
        </tr>
        `;
    });
    dataMatchesFavHTML += `
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
        ` + rowDataMatchesFav + `
    </tbody>
</table>
    `;

    if (document.getElementById("matchFavorite") != null) {
        document.getElementById("matchFavorite").innerHTML = dataMatchesFavHTML;
        // console.log("Elemen berhasil dimuat.");
    }
}