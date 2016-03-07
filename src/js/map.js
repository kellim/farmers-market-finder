function initializeMap() {
  var mapOptions = {
    // Center Google Maps on Seattle
    center:new google.maps.LatLng(47.6063889,-122.3308333),
    zoom: 9
    };
   var map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

// google.maps.event.addDomListener(window, 'load', initializeMap);

