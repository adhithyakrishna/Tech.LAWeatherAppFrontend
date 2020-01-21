$(document).ready(function() {

       // Initialize and add the map
       var map;
       var markersArray = [];
       var latitude;
       var longitude;
       function initMap() 
       {
         var uluru = {lat: -25.344, lng: 131.036};
         map = new google.maps.Map(document.getElementById('map'), {zoom: 4, center: uluru});
         var marker = new google.maps.Marker({position: uluru, map: map});
         markersArray.push(marker);
       }

       initMap();

      google.maps.event.addListener(map, 'click', function(e) {    
        deleteOverlays();
        placeMarker(e.latLng, map);
        latitude = e.latLng.lat();
        longitude = e.latLng.lng();
      });
    

    function deleteOverlays() {
        if (markersArray) {
          for (i in markersArray) {
            markersArray[i].setMap(null);
          }
          markersArray.length = 0;
        }
      }


      function placeMarker(position, map) {
        var marker = new google.maps.Marker({
          position: position,
          map: map
        }); 
        markersArray.push(marker);
        map.panTo(position);
      }

      
});