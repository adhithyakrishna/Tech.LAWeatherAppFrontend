$(document).ready(function() {

       // Initialize and add the map
       var map;
       var markersArray = [];
       function initMap() 
       {
         var uluru = {lat: 33.78, lng: -117.97};
         map = new google.maps.Map(document.getElementById('map'), {zoom: 4, center: uluru});
         var marker = new google.maps.Marker({position: uluru, map: map});
         markersArray.push(marker);
         fetchInfo(uluru.lat, uluru.lng);
         initControl();
       }
       
       function initControl()
       {
        google.maps.event.addListener(map, 'click', function(e) {    
          deleteOverlays();
          placeMarker(e.latLng, map);
          latitude = e.latLng.lat();
          longitude = e.latLng.lng();
          fetchInfo(latitude, longitude);
        });
       }
   
      function fetchInfo(latitude, longitude)
      {
        var settings = {
          "url": "https://techlabackend.herokuapp.com/weatherinfo",
          "method": "POST",
          "timeout": 0,
          "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          "data": JSON.stringify({"latitude":latitude,"longitude":longitude}),
        };
        
        $.ajax(settings).done(function (response) {          
            $(".latitude").text(response.latitude);
            $(".longitude").text(response.longitude);
            $(".timezone").text(response.timezone);
            $(".currentWeather").text(response.currently.summary);
            $(".precpIntensity").text(response.currently.precipIntensity);
            $(".precpProbab").text(response.currently.precipProbability);
            $(".currentTemp").text(response.currently.temperature);
            $(".humid").text(response.currently.humidity);
            $(".dew").text(response.currently.dewPoint);
            $(".press").text(response.currently.pressure);
            $(".wind").text(response.currently.windSpeed);
            $(".visiblity").text(response.currently.visibility);
            $(".nextHour").text(response.hourly.summary);
            $(".weekly").text(response.daily.summary);
        });
      }
      

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

      var flag = false;
      function checkFlag() {
        if(flag == false) {
          if (typeof google === 'object' && typeof google.maps === 'object'){
            initMap();
            flag = true;
          }
          else {
            window.setTimeout(checkFlag, 100); /* this checks the flag every 100 milliseconds*/
          }     
        } 
    }
    checkFlag();
      
      
      
});