$(document).ready(function(){

// initMap needs to be in global scope, hence window.initMap
    var map;
    window.initMap = function(){
        map = new google.maps.Map(document.getElementById('map'),{
            center: {lat: -34.397, lng: 150.644},
            zoom: 10
        });
    };

// Toggle sidebar class
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });

});