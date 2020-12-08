function databasePromise(idb) {
    var dbPromise = idb.open("football-news", 1, function(upgradeDb) {
        if (!upgradeDb.objectStoreNames.contains("matchFavorite")) {
            var indexMatchFav = upgradeDb.createObjectStore("matchFavorite", {
                keyPath: "id"
            });
            indexMatchFav.createIndex("timTuanRumah", "match.homeTeam.name", {
                unique: false
            });
            indexMatchFav.createIndex("timLawan", "match.awayTeam.name", {
                unique: false
            });
        }
    });

    return dbPromise;
}

function checkData(storeName, id) {
    return new Promise(function(resolve, reject) {
        databasePromise(idb)
            .then(function(db) {
                var tx = db.transaction(storeName, "readonly");
                var store = tx.objectStore(storeName);
                return store.get(id);
            })
            .then(function(data) {
                if (data != undefined) {
                    resolve("Data favorit")
                } else {
                    reject("Bukan data favorit")
                }
            });
    });
}


function rmFavoriteData(storeName, data) {
    databasePromise(idb).then(function(db) {
        var tx = db.transaction(storeName, 'readwrite');
        var store = tx.objectStore(storeName);

        store.delete(data);
        return tx.complete;
    }).then(function() {
        console.log('Item deleted');
        document.getElementById("iconFav").innerHTML = "favorite_border";
        M.toast({
            html: 'Data berhasil dihapus dari favorit!'
        });
    }).catch(function() {
        M.toast({
            html: 'terjadi kesalahan'
        });
    });
}

function createDataFav(dataType, data) {
    if (dataType == "pertandingan") {
        storeName = "matchFavorite"
        if (data.head2head === null) {
            dataToCreate = {
                id: data.match.id,
                head2head: data.head2head,
                match: {
                    utcDate: data.match.utcDate,
                    venue: data.match.venue,
                    matchday: data.match.matchday,
                    homeTeam: {
                        name: data.match.homeTeam.name
                    },
                    awayTeam: {
                        name: data.match.awayTeam.name
                    }
                }
            }
        } else {
            dataToCreate = {
                id: data.match.id,
                head2head: {
                    numberOfMatches: data.head2head.numberOfMatches,
                    homeTeam: {
                        wins: data.head2head.homeTeam.wins,
                        draws: data.head2head.homeTeam.draws,
                        losses: data.head2head.homeTeam.losses
                    },
                    awayTeam: {
                        wins: data.head2head.awayTeam.wins,
                        draws: data.head2head.awayTeam.draws,
                        losses: data.head2head.awayTeam.losses
                    }
                },
                match: {
                    utcDate: data.match.utcDate,
                    venue: data.match.venue,
                    matchday: data.match.matchday,
                    homeTeam: {
                        name: data.match.homeTeam.name
                    },
                    awayTeam: {
                        name: data.match.awayTeam.name
                    }
                }
            }
        }
    }

    console.log("data " + dataToCreate);
    databasePromise(idb).then(db => {
        const tx = db.transaction(storeName, 'readwrite');
        tx.objectStore(storeName).put(dataToCreate);

        return tx.complete;
    }).then(function() {
        console.log('Data berhasil disimpan.');
        document.getElementById("iconFav").innerHTML = "favorite";
        M.toast({
            html: 'Data berhasil difavoritkan!'
        });
    }).catch(function() {
        M.toast({
            html: 'terjadi kesalahan'
        });
    });

}

function getSavedDataById(dataType) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = Number(urlParams.get("id"));

    if (dataType == "pertandingan") {
        getDataById("matchFavorite", idParam).then(function(match) {
            resultMatchesDetailJSON(match);
        });
    }
}

function getDataById(storeName, id) {
    return new Promise(function(resolve, reject) {
        databasePromise(idb)
            .then(function(db) {
                var tx = db.transaction(storeName, "readonly");
                var store = tx.objectStore(storeName);
                return store.get(id);
            })
            .then(function(data) {
                resolve(data);
            });
    });
}

function getAllData(storeName) {
    return new Promise(function(resolve, reject) {
        databasePromise(idb)
            .then(function(db) {
                var tx = db.transaction(storeName, "readonly");
                var store = tx.objectStore(storeName);
                return store.getAll();
            })
            .then(function(data) {
                resolve(data);
            });
    });
}

function setupDataFavHtml() {
    getAllData("matchFavorite").then(function(data) {
        resultMatchFav(data);
    });

}