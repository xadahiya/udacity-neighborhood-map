function loadScript() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyBszVxYD0f5bCGl7O6eZPEy1_PMoO685a0&v=3&callback=initMap";
    document.body.appendChild(script);
    script.onerror = function(){
        alert("Unable to load google maps");
    }
}
window.onload = loadScript;

var counter = 0;
var map;
var markers = [];

var locations_array = [{
    title: "Great wall of China",
    desc: "",
    location: {
        lat: 40.4345472,
        lng: 116.4978999
    },
    id: "ChIJzyx_aNch8TUR3yIFlZslQNA",
    pageId: "5094570"
}, {
    title: "Petra",
    desc: "",
    location: {
        lat: 30.328459,
        lng: 35.4421735
    },
    id: "ChIJsbYaAjBpARURueCjw3tpOuQ",
    pageId: "45008"
}, {
    title: "Stonehenge",
    desc: "",
    location: {
        lat: 51.1788853,
        lng: -1.8284037
    },
    id: "ChIJEfYKhTvmc0gR3dLTvOJwkZc",
    pageId: "27633"
}, {
    title: "Leaning Tower of Pisa",
    desc: "",
    location: {
        lat: 43.7229559,
        lng: 10.3944083
    },
    id: "ChIJzYhOxKaR1RIRA_xU1bGp7DI",
    pageId: "625899"
}, {
    title: "Taj Mahal",
    desc: "",
    location: {
        lat: 27.1750199,
        lng: 78.0399665
    },
    id: "ChIJPRQcHyBxdDkRs1lw_Dj1QnU",
    pageId: "3135639"
}, {
    title: "Abbaye de Cluny",
    desc: "",
    location: {
        lat: 46.4341389,
        lng: 4.6570857
    },
    id: "ChIJn63c2bgK80cRyRNh9EUhiC4",
    pageId: "20209307"
}, {
    title: "Colosseum",
    desc: "",
    location: {
        lat: 41.8902142,
        lng: 12.4900422
    },
    id: "ChIJrRMgU7ZhLxMRxAOFkC7I8Sg",
    pageId: "49603"
}, ];


var styles = [{
    "featureType": "administrative.province",
    "elementType": "all",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "landscape",
    "elementType": "all",
    "stylers": [{
        "saturation": -100
    }, {
        "lightness": 65
    }, {
        "visibility": "on"
    }]
}, {
    "featureType": "poi",
    "elementType": "all",
    "stylers": [{
        "saturation": -100
    }, {
        "lightness": 51
    }, {
        "visibility": "simplified"
    }]
}, {
    "featureType": "road.highway",
    "elementType": "all",
    "stylers": [{
        "saturation": -100
    }, {
        "visibility": "simplified"
    }]
}, {
    "featureType": "road.arterial",
    "elementType": "all",
    "stylers": [{
        "saturation": -100
    }, {
        "lightness": 30
    }, {
        "visibility": "on"
    }]
}, {
    "featureType": "road.local",
    "elementType": "all",
    "stylers": [{
        "saturation": -100
    }, {
        "lightness": 40
    }, {
        "visibility": "on"
    }]
}, {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [{
        "saturation": -100
    }, {
        "visibility": "simplified"
    }]
}, {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{
        "hue": "#ffff00"
    }, {
        "lightness": -25
    }, {
        "saturation": -97
    }]
}, {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#666666"
    }]
}, {
    "featureType": "water",
    "elementType": "labels",
    "stylers": [{
        "visibility": "on"
    }, {
        "lightness": -25
    }, {
        "saturation": -100
    }]
}, ];




function initMap() {
    // console.log(appViewModel.locations());
    this.largeInfowindow = new google.maps.InfoWindow();

    map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: 50,
            lng: 50
        },
        zoom: 3,
        styles: styles,
    });

    this.defaultIcon = makeMarkerIcon("0091ff");
    // Create a "highlighted location" marker color for when the user
    // mouses over the marker.
    this.highlightedIcon = makeMarkerIcon("FFFF24");


    addMarkers(appViewModel.locations());

    //modify markers on filter change
    appViewModel.locations.subscribe(function() {
        hideMarkers(markers);
        markers = [];
        addMarkers(appViewModel.locations());
        console.log(markers);

    });

    appViewModel.clickedItem.subscribe(function() {
        var marker = markers[appViewModel.clickedItem()];
        getPlacesDetails(marker, largeInfowindow);
        marker.setIcon(highlightedIcon);

    });


};

function makeMarkerIcon(markerColor) {
    var markerImage = new google.maps.MarkerImage(
        "http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|" + markerColor +
        "|40|_|%E2%80%A2",
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34),
        new google.maps.Size(21, 34));
    return markerImage;
}


// This function will loop through the listings and hide them all.
function hideMarkers(markers) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}

function addMarkers(locations) {
    // console.log(appViewModel.locations().length);
    for (var i = 0; i < locations.length; i++) {
        // Get the position from the location array.
        var position = locations[i].location;
        var title = locations[i].title;
        var id = locations[i].id;
        // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker({
            position: position,
            title: title,
            id: id,
            animation: google.maps.Animation.DROP,
            icon: defaultIcon,
            map: map,
        });
        // Push the marker to our array of markers.
        markers.push(marker);
        // Create an onclick event to open the large infowindow at each marker.
        marker.addListener("click", function() {
            // populateInfoWindow(this, largeInfowindow/);
            this.setIcon(highlightedIcon);
            getPlacesDetails(this, largeInfowindow);
            // alert("marker clicked")
        });
        // Two event listeners - one for mouseover, one for mouseout,
        // to change the colors back and forth.
        marker.addListener("mouseover", function() {
            this.setIcon(highlightedIcon);
        });
        marker.addListener("mouseout", function() {
            this.setIcon(defaultIcon);
        });
    }
}

function getPlacesDetails(marker, infowindow) {
    var service = new google.maps.places.PlacesService(map);
    service.getDetails({
        placeId: marker.id
    }, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            // Set the marker property on this infowindow so it isn't created again.
            infowindow.marker = marker;
            var innerHTML = "<div>";
            if (place.name) {
                innerHTML += "<strong>" + place.name + "</strong>";
            }
            if (place.photos) {
                innerHTML += "<br><br><img src='" + place.photos[0].getUrl({
                    maxHeight: 100,
                    maxWidth: 200
                }) + "'>";
            }
            innerHTML += "</div>";
            infowindow.setContent(innerHTML);
            infowindow.open(map, marker);
            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener("closeclick", function() {
                marker.setIcon(defaultIcon);
                infowindow.marker = null;
            });
        } else {
            alert(status);
        }
    });
}


var appViewModel = {
    toggleMenu: function() {
        $("#wrapper").toggleClass("toggled");
    },

    locations: ko.observableArray([{
            title: "Great wall of China",
            desc: "",
            location: {
                lat: 40.4345472,
                lng: 116.4978999
            },
            id: "ChIJzyx_aNch8TUR3yIFlZslQNA",
            pageId: "5094570"
        }, {
            title: "Petra",
            desc: "",
            location: {
                lat: 30.328459,
                lng: 35.4421735
            },
            id: "ChIJsbYaAjBpARURueCjw3tpOuQ",
            pageId: "45008"
        }, {
            title: "Stonehenge",
            desc: "",
            location: {
                lat: 51.1788853,
                lng: -1.8284037
            },
            id: "ChIJEfYKhTvmc0gR3dLTvOJwkZc",
            pageId: "27633"
        }, {
            title: "Leaning Tower of Pisa",
            desc: "",
            location: {
                lat: 43.7229559,
                lng: 10.3944083
            },
            id: "ChIJzYhOxKaR1RIRA_xU1bGp7DI",
            pageId: "625899"
        }, {
            title: "Taj Mahal",
            desc: "",
            location: {
                lat: 27.1750199,
                lng: 78.0399665
            },
            id: "ChIJPRQcHyBxdDkRs1lw_Dj1QnU",
            pageId: "3135639"
        }, {
            title: "Abbaye de Cluny",
            desc: "",
            location: {
                lat: 46.4341389,
                lng: 4.6570857
            },
            id: "ChIJn63c2bgK80cRyRNh9EUhiC4",
            pageId: "20209307"
        }, {
            title: "Colosseum",
            desc: "",
            location: {
                lat: 41.8902142,
                lng: 12.4900422
            },
            id: "ChIJrRMgU7ZhLxMRxAOFkC7I8Sg",
            pageId: "49603"
        },

    ]),
    query: ko.observable(""),

    // Search function for list view
    search: function(value) {
        appViewModel.locations.removeAll();
        // console.log(locations_array.length);
        for (var i = 0; i < locations_array.length; i++) {
            if (locations_array[i].title.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                appViewModel.locations.push(locations_array[i]);
                // console.log(appViewModel.locations());
            }
        }
    },
    clickedItem: ko.observable(""),
    itemClicked: function(index) {
        appViewModel.clickedItem(index);
    },
    mapsError: function() {
        alert("Unable to load maps");
    }

}

//Subscribe to search service
appViewModel.query.subscribe(appViewModel.search);
//Apply binding to appViewModel
ko.applyBindings(appViewModel);

//ajax request
//get wiki data for all elements of locations_array
locations_array.forEach(getWikiData);

//Ajax request from wikipedia
function getWikiData(location) {
    $.ajax({
        type: "GET",
        url: "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&pageids=" + location.pageId,
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "jsonp",
        success: function(data, textStatus, jqXHR) {
            counter++;
            var pages = data.query.pages;
            var extract, shortText;
            $.each(pages, function(i, val) {
                shortText = jQuery.trim(val.extract).substring(0, 75).split(" ").slice(0, -1).join(" ") + "...";
                console.log(shortText);
                location.desc = shortText;
            });
            if (counter >= 6) {
                appViewModel.locations.removeAll();
                // console.log(locations_array.length);
                for (var i = 0; i < locations_array.length; i++) {
                    appViewModel.locations.push(locations_array[i]);
                    // console.log(appViewModel.locations());
                }
                counter = 0;
            }
        },
        error: function(errorMessage) {
            alert("Unable to load details from wikipedia");
        },
        timeout: 3000,
    });
}
