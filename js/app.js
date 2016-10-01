$(document).ready(function(){

    function AppViewModel(){
        this.toggleMenu = function(){
        $("#wrapper").toggleClass("toggled");
        }
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
        map = new google.maps.Map(document.getElementById('map'),{
            center: {lat: 50, lng: 50},
            zoom: 3,
            styles: styles,
        });

    var locations = [
        { title: 'Great wall of China', location: { lat:40.4345472, lng:116.4978999}},
        { title: 'Petra', location: { lat:30.328459, lng:35.4421735}},
        { title: 'Stonehenge', location: { lat:51.1788853, lng:-1.8284037}},
        { title: 'Leaning Tower of Pisa', location: { lat:43.7229559, lng:10.3944083}},
        { title: 'Taj Mahal', location: { lat:27.1750199, lng:78.0399665}},
        { title: 'Abbaye de Cluny', location: { lat:46.4341389, lng:4.6570857}},
        { title: 'Colosseum', location: { lat:41.8902142, lng:12.4900422}},

    ]

    for (var i = 0; i < locations.length; i++) {
        // Get the position from the location array.
        var position = locations[i].location;
        var title = locations[i].title;
          // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker({
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            // icon: defaultIcon,
            map:map,
            id: i
        });
        // Push the marker to our array of markers.
        markers.push(marker);
        // Create an onclick event to open the large infowindow at each marker.
        marker.addListener('click', function() {
            // populateInfoWindow(this, largeInfowindow);
            alert("marker clicked")
        });
        // Two event listeners - one for mouseover, one for mouseout,
        // to change the colors back and forth.
        // marker.addListener('mouseover', function() {
        //     this.setIcon(highlightedIcon);
        // });
        // marker.addListener('mouseout', function() {
        //     this.setIcon(defaultIcon);
        // });
    }

     // Sets the map on all markers in the array.
      function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }

      };

});