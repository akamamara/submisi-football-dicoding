document.addEventListener("DOMContentLoaded", function() {
    var typeFavorit = "";
    loadNav();

    function loadNav() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status != 200) return;

                // Muat daftar tautan menu
                document.querySelectorAll(".tabs, .tabs-swipe-demo").forEach(function(elm) {
                    elm.innerHTML = xhttp.responseText;
                });

                // Daftarkan event listener untuk setiap tautan menu
                document.querySelectorAll(".tabs a, .tabs-swipe-demo a").forEach(function(elm) {
                    elm.addEventListener("click", function(event) {
                        // Muat konten halaman yang dipanggil
                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    });
                });
            }
        };
        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }
    // Load page content
    var page = window.location.hash.substr(1);

    if (page == "") {
        page = "standings";
    }

    loadPage(page);

    function loadPage(page) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                var content = document.querySelector("#body-content");
                if (this.status == 200) {
                    content.innerHTML = xhttp.responseText;
                    if (page == "standings") {
                        getSeasons();
                        getStandings();
                    } else if (page == "upcoming-matches") {
                        getMatchesByID();
                    } else if (page === "favorite") {
                        setupDataFavHtml();
                    }
                } else if (this.status == 404) {
                    content.innerHTML = `<div class="section"><h1>:(</h1><p>Halaman tidak ditemukan. Coba pilih laman lainnya.</p></div>`;
                } else {
                    content.innerHTML = "<h1>:O</h1><p>Halaman tidak dapat diakses.</p>";
                }
            }

        };
        xhttp.open("GET", "pages/" + page + ".html", true);
        xhttp.send();
    }
});