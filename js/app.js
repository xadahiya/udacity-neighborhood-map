$(document).ready(function(){

    var locations = [
        { title: 'Great wall of China', location: { lat: 40.4345472, lng: 116.4978999}, id: 'ChIJzyx_aNch8TUR3yIFlZslQNA'},
        { title: 'Petra', location: { lat:30.328459, lng:35.4421735}, id: 'ChIJsbYaAjBpARURueCjw3tpOuQ'},
        { title: 'Stonehenge', location: { lat:51.1788853, lng:-1.8284037}, id: 'ChIJEfYKhTvmc0gR3dLTvOJwkZc'},
        { title: 'Leaning Tower of Pisa', location: { lat:43.7229559, lng:10.3944083}, id: 'ChIJzYhOxKaR1RIRA_xU1bGp7DI'},
        { title: 'Taj Mahal', location: { lat:27.1750199, lng:78.0399665}, id: 'ChIJPRQcHyBxdDkRs1lw_Dj1QnU'},
        { title: 'Abbaye de Cluny', location: { lat:46.4341389, lng:4.6570857}, id: 'ChIJn63c2bgK80cRyRNh9EUhiC4'},
        { title: 'Colosseum', location: { lat:41.8902142, lng:12.4900422}, id: 'ChIJrRMgU7ZhLxMRxAOFkC7I8Sg'},

    ];

    function AppViewModel(){
        this.toggleMenu = function(){
        $("#wrapper").toggleClass("toggled");
        };

        this.locations = ko.observableArray(locations);
    }

    ko.applyBindings(new AppViewModel);

// initMap needs to be in global scope, hence window.initMap
    var map;
    var markers = [];

    var styles = [
        {
            "featureType": "administrative.province",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": 65
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": 51
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": 30
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": 40
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "hue": "#ffff00"
                },
                {
                    "lightness": -25
                },
                {
                    "saturation": -97
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#666666"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "lightness": -25
                },
                {
                    "saturation": -100
                }
            ]
        }
    ]

    

    
    window.initMap = function(){

    var largeInfowindow = new google.maps.InfoWindow();
        
        map = new google.maps.Map(document.getElementById('map'),{
            center: {lat: 50, lng: 50},
            zoom: 3,
            styles: styles,
        });

    var defaultIcon = makeMarkerIcon('0091ff');
    // Create a "highlighted location" marker color for when the user
    // mouses over the marker.
    var highlightedIcon = makeMarkerIcon('FFFF24');


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
            map:map,
        });
        // Push the marker to our array of markers.
        markers.push(marker);
        // Create an onclick event to open the large infowindow at each marker.
        marker.addListener('click', function() {
            // populateInfoWindow(this, largeInfowindow/);
            getPlacesDetails(this, largeInfowindow);
            // alert("marker clicked")
        });
        // Two event listeners - one for mouseover, one for mouseout,
        // to change the colors back and forth.
        marker.addListener('mouseover', function() {
            this.setIcon(highlightedIcon);
        });
        marker.addListener('mouseout', function() {
            this.setIcon(defaultIcon);
        });
    }

    function getPlacesDetails(marker, infowindow) {
        var service = new google.maps.places.PlacesService(map);
        service.getDetails({
        placeId: marker.id
        }, function(place, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                // Set the marker property on this infowindow so it isn't created again.
                infowindow.marker = marker;
                var innerHTML = '<div>';
                if (place.name) {
                    innerHTML += '<strong>' + place.name + '</strong>';
                }
                if (place.photos) {
                    innerHTML += '<br><br><img src="' + place.photos[0].getUrl(
                    {maxHeight: 100, maxWidth: 200}) + '">';
                }
            innerHTML += '</div>';
            infowindow.setContent(innerHTML);
            infowindow.open(map, marker);
            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick', function() {
                infowindow.marker = null;
             });
            }
            else{
                alert(status);
            }
        });
    }

     // Sets the map on all markers in the array.
      function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }

      function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
          'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
          '|40|_|%E2%80%A2',
          new google.maps.Size(21, 34),
          new google.maps.Point(0, 0),
          new google.maps.Point(10, 34),
          new google.maps.Size(21,34));
        return markerImage;
      }


      };

});