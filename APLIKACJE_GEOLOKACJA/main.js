
    let map = L.map('map').setView([53.430127, 14.564802], 18);
    // L.tileLayer.provider('OpenStreetMap.DE').addTo(map);
    L.tileLayer.provider('Esri.WorldImagery').addTo(map);
    let marker = L.marker([53.430127, 14.564802]).addTo(map);
    marker.bindPopup("<strong>Hello!</strong><br>This is a popup.");

    document.getElementById("saveButton").addEventListener("click", function() {
        leafletImage(map, function (err, canvas) {
            // Pozyskaj obraz z płótna
            let sourceCanvas = canvas;
            let sourceContext = sourceCanvas.getContext("2d");

            // Szerokość i wysokość fragmentu mapy
            let mapWidth = sourceCanvas.width;
            let mapHeight = sourceCanvas.height;


            let pieceWidth = mapWidth / 4;
            let pieceHeight = mapHeight / 4;


            for (let row = 0; row < 4; row++) {
                for (let col = 0; col < 4; col++) {

                    let pieceCanvas = document.createElement("canvas");
                    pieceCanvas.className = "item draggable";
                    pieceCanvas.setAttribute("draggable", "true");
                    pieceCanvas.id = "piece" + (row * 4 + col + 1);
                    pieceCanvas.width = pieceWidth;
                    pieceCanvas.height = pieceHeight;
                    let pieceContext = pieceCanvas.getContext("2d");

                    pieceContext.drawImage(sourceCanvas, col * pieceWidth, row * pieceHeight, pieceWidth, pieceHeight, 0, 0, pieceWidth, pieceHeight);

                    document.body.appendChild(pieceCanvas);
                    pieceCanvas.style.marginRight = "10px";
                }
            }

        });
    });



    document.getElementById("getLocation").addEventListener("click", function(event) {
        if (! navigator.geolocation) {
        console.log("No geolocation.");
    }

        navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        map.setView([lat, lon]);
    }, positionError => {
        console.error(positionError);
    });
    });

    function getLocation() {
        if (! navigator.geolocation) {
            alert("Sorry, no geolocation available for you!");
        }

        navigator.geolocation.getCurrentPosition((position) => {
            document.getElementById("latitude").innerText = position.coords.latitude;
            document.getElementById("longitude").innerText = position.coords.longitude;
            let marker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(map);
        }, (positionError) => {
            console.error(positionError);
        }, {
            enableHighAccuracy: false
        });
    }



    document.addEventListener('DOMContentLoaded', function() {
        var canvas = document.getElementById('rasterMap');
        var context = canvas.getContext('2d');

        var pieceWidth = canvas.width / 4;
        var pieceHeight = canvas.height / 4;

        for (var row = 0; row < 4; row++) {
            for (var col = 0; col < 4; col++) {

                var startX = col * pieceWidth;
                var startY = row * pieceHeight;

                context.strokeRect(startX, startY, pieceWidth, pieceHeight)

            }
        }

    });


    let items = document.querySelectorAll('.item');
    for (let item of items) {
        item.addEventListener("dragstart", function(event) {
            this.style.border = "5px dashed #D8D8FF";
            event.dataTransfer.setData("text", this.id);
        });

        item.addEventListener("dragend", function(event) {
            this.style.borderWidth = "0";
        });
    }

    let targets = document.querySelectorAll(".drag-target");
    for (let target of targets) {
        target.addEventListener("dragenter", function (event) {
            this.style.border = "2px solid #7FE9D9";
        });
        target.addEventListener("dragleave", function (event) {
            this.style.border = "2px dashed #7f7fe9";
        });
        target.addEventListener("dragover", function (event) {
            event.preventDefault();
        });
        target.addEventListener("drop", function (event) {
            let draggedItemId = event.dataTransfer.getData('text');
            if (draggedItemId) {
                let myElement = document.querySelector("#" + draggedItemId);
                if (myElement) {
                    this.appendChild(myElement);
                    this.style.border = "2px dashed #7f7fe9";
                }
            }
        }, false);
    }