   /**************************************************************
  ==========================================================
  == Project    : Display Path of Waypoints on Map Page
  == Created by : MOHAMED CHIBANI - mohamedchibani1996@gmail.com
  ==========================================================
  ***************************************************************/


  var c = 0;
  $("#add-way-point").click(function () {
      $(this).hide();
      $(".waypoints").append('<i class="fa fa-map-pin fa-lg icon_map_pin" title="Get My Location"></i><input id="address_waypoint'+c+'" class="form-control waypoint_address" placeholder="Waypoint address" onchange="add_new_waypoint('+c+')"/><br>');
        c = c+1;
        console.log(c);
  });

  function add_new_waypoint(nb){
      if($('#address_waypoint'+nb).val().length != 0){
          $('#add-way-point').show();
      }
  }

    var map = null;

    var origin_marker;
    var destination_marker;

    var geocoder;
    var infowindow;
    var address = null;

    /*----------------------------------------------------------------------------------------------------------*/
var waypointsAddress = [];

   
/*Origin Address*/
  var originInput = document.getElementById('address_origin');

  var lat_origin = document.getElementById('lat_origin');
  var lng_origin = document.getElementById('lng_origin');

  var choosen_latitude_origin = document.getElementById('lat_origin').value;
  var choosen_longitude_origin = document.getElementById('lng_origin').value;   



/*Destination Address*/
  var destinationInput = document.getElementById('address_destination');

  var lat_destination = document.getElementById('lat_destination');
  var lng_destination = document.getElementById('lng_destination');

  var choosen_latitudedestination = document.getElementById('lat_destination').value;
  var choosen_longitude_destination = document.getElementById('lng_destination').value; 


  

var directionsService;
var directionsDisplay;

//Points d'arrêts
var waypoints = [];

//Latitudes des points d'arrêts
var waypointsLat = [];

//Longitudes des points d'arrêts
var waypointsLng = []; 


  //in1itialize map on document ready
  function initMap(){
      directionsService = new google.maps.DirectionsService();
      directionsDisplay = new google.maps.DirectionsRenderer();

      //map parameters
      var myOptions = {
        zoom: 12,
        center: {lat: 33.9875418, lng: -6.8871931},
        //mapTypeControl: true,
        mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
        //navigationControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };


      //our main map
      map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
      
      //define geocoder
      geocoder = new google.maps.Geocoder();
     
      directionsDisplay.setMap(map);


      //define our autocomplete function on originInput and destinationInput= #address_origin
      var autocompleteOrigine = new google.maps.places.Autocomplete(originInput);
      var autocompleteDestination = new google.maps.places.Autocomplete(destinationInput);
      


      // Bind the map's bounds (viewport) property to the autocomplete object,
      // so that the autocomplete requests use the current map bounds for the
      // bounds option in the request.
      autocompleteOrigine.bindTo('bounds', map);
      autocompleteDestination.bindTo('bounds', map);


      // Set the data fields to return when the user selects a place.
      autocompleteOrigine.setFields(['address_components', 'geometry', 'icon', 'name']);
      autocompleteDestination.setFields(['address_components', 'geometry', 'icon', 'name']);
         

      var infowindow = new google.maps.InfoWindow();


      /***************************************** Start get elements origin *******************************************/
      autocompleteOrigine.addListener('place_changed', function () {
          
          if(origin_marker){
              origin_marker.setVisible(false);
          }
          var from_place = autocompleteOrigine.getPlace();
          var from_address = from_place.formatted_address;
          document.getElementById('address_origin').val = from_address;

      formatted_address_type = document.getElementById('address_origin').value;

      console.log(formatted_address_type);
      geocoder.geocode({'address': formatted_address_type }, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
              if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
                  var address_lat = results[0].geometry.location.lat();   
                  var address_lng = results[0].geometry.location.lng();     
              }
          }
          console.log(address_lat , address_lng);

          document.getElementById('lat_origin').value = address_lat;
          document.getElementById('lng_origin').value = address_lng;

          if (!from_place.geometry) {
            // User entered the name of a from_place that was not suggested and
            // pressed the Enter key, or the from_place Details request failed.
            window.alert("No details available for input: '" + from_place.name + "'");
            return;
          }

       /* Start Define and set Origin Marker*/
          origin_marker = new google.maps.Marker({
                content: "Hello it is me, origin marker",
                position: new google.maps.LatLng(lat_origin.value,lng_origin.value),
                map: map,
                animation: google.maps.Animation.DROP,

                icon:'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'
              });

          //origin_marker.addListener('click', toggleBounce);
          map.setCenter(new google.maps.LatLng(lat_origin.value, lng_origin.value));
          map.setZoom(11); 
          origin_marker.setMap(map);
        /*End Define and set Origin Marker*/

        /*Début : info window*/
        google.maps.event.addListener(origin_marker, 'click', function () {
            if(infowindow){
              infowindow.setMap(null);
              infowindow = null;
            }
      
            infowindow = new google.maps.InfoWindow({
                  content: 'Position d\'origine: <b>'+document.getElementById('address_origin').value+'</b>',
                  size: new google.maps.Size(150,50),
                  pixelOffset: new google.maps.Size(0, -30),
                  position: new google.maps.LatLng(address_lat, address_lng),
                  map: map
              });
        });
        /*Fin : info window*/

      });
      });

      var latlng_origin;
      /*Get origin address text automatically after the user set his latitude and longitude (just after his longitude value)*/
      lng_origin.onchange = function(){
          console.log(lat_origin.value,lng_origin.value);

          geocoder = new google.maps.Geocoder();

          latlng_origin = {lat: parseFloat(lat_origin.value), lng: parseFloat(lng_origin.value)};
          
          console.log(latlng_origin);

          //Geocoder 'location' => to transforme coordonations(latitude - longitude) to address text
          geocoder.geocode({'location': latlng_origin}, function(results, status) {
              
          console.log(results[0].formatted_address);
           
          //Result that we need lat & lng ==> to address text
          originInput.value = results[0].formatted_address;  
          
          //define the origin marker and set it on the map
          var origin_marker = new google.maps.Marker({
                content: "Hello it is me",
                position: new google.maps.LatLng(parseFloat(lat_origin.value),parseFloat(lng_origin.value)),
                map: map,
                title: "Origin",
                animation: google.maps.Animation.DROP,
                icon:'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'
              });
          

          google.maps.event.addListener(origin_marker, 'click', function () {
            if(infowindow){
              infowindow.setMap(null);
              infowindow = null;
            }
      
            infowindow = new google.maps.InfoWindow({
                  content: 'Position d\'origine: <b>'+formatted_address_type+'</b>',
                  size: new google.maps.Size(150,50),
                  pixelOffset: new google.maps.Size(0, -30),
                  position: new google.maps.LatLng(address_lat, address_lng),
                  map: map
              });
        });

          map.setCenter(new google.maps.LatLng(parseFloat(lat.value),parseFloat(lng.value)));
          map.setZoom(11); 
          
          origin_marker.setMap(map);


        });
      };
      /****************************************** End get elements origine **********************************************/



      /***************************************** Start get elements waypoints *******************************************/
      var autocompleteWayPoint = [];
      var address_lat = [];
      var address_lng = []
      
      $('#add-way-point').click(function(){
          for (var i=0; i<c; i++){
              
              autocompleteWayPoint[i-1] = new google.maps.places.Autocomplete(document.getElementById('address_waypoint'+i));
              autocompleteWayPoint[i-1].bindTo('bounds', map);  
              autocompleteWayPoint[i-1].setFields(['address_components', 'geometry', 'icon', 'name']); 
                 
              autocompleteWayPoint[i-1].addListener('place_changed', function () {

              waypointsAddress.push($('#address_waypoint'+(i-1)).val()+' - ');
              console.log(waypointsAddress[i-1]);
          

                  geocoder.geocode({'address': waypointsAddress[i-1] }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
                            address_lat[i-1] = results[0].geometry.location.lat();   
                            address_lng[i-1]= results[0].geometry.location.lng();

                            waypointsLat.push(address_lat[i-1]);
                            waypointsLng.push(address_lng[i-1]);     
                        
                        }
                    }

                    console.log(address_lat[i-1] , address_lng[i-1]);
                    var waypoint_marker = [];
                  // Define and set Marker Destination
                    
                    var waypoint_marker = new google.maps.Marker({
                        content: "Hello it is me, destination marker",
                        position: new google.maps.LatLng(address_lat[i-1],address_lng[i-1]),
                        map: map,
                        title: "Destination",
                        animation: google.maps.Animation.DROP,
                        icon:'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                      });

                      google.maps.event.addListener(waypoint_marker, 'click', function () {
                      if(infowindow){
                        infowindow.setMap(null);
                        infowindow = null;
                      }
                
                      infowindow = new google.maps.InfoWindow({
                            content: 'Point d\'arrêt N:°'+i+': <b style="color:#F00">'+waypointsAddress[i-1]+'</b>',
                            size: new google.maps.Size(150,50),
                            pixelOffset: new google.maps.Size(0, -30),
                            position: new google.maps.LatLng(address_lat[i-1],address_lng[i-1]),
                            map: map
                        });
                  });

                    //origin_marker.addListener('click', toggleBounce);
                    map.setCenter(new google.maps.LatLng(address_lat[i-1],address_lng[i-1]));
                    map.setZoom(11); 
                    waypoint_marker.setMap(map);


                      waypoints.push({
                        location: new google.maps.LatLng(address_lat[i-1],address_lng[i-1]),
                        stopover: true
                      });

                      
                  });
         
              });
          }
        });
            /*End Define and set Origin Marker*/
         // });
        //}

           

  
      /************************************ End get elements waypoints **************************************/




      /******************************Start get elements destination **************************************/
      autocompleteDestination.addListener('place_changed', function () {
          
        if(destination_marker){
          destination_marker.setVisible(false);
        }
          var to_place = autocompleteDestination.getPlace();
          var to_address = to_place.formatted_address;
          document.getElementById('address_destination').val = to_address;

      formatted_address_type = document.getElementById('address_destination').value;

      console.log(formatted_address_type);
      geocoder.geocode({'address': formatted_address_type }, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
              if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
                  var address_lat = results[0].geometry.location.lat();   
                  var address_lng = results[0].geometry.location.lng();     
              }
          }
          console.log(address_lat , address_lng);

          document.getElementById('lat_destination').value = address_lat;
          document.getElementById('lng_destination').value = address_lng;

          if (!to_place.geometry) {
            // User entered the name of a to_place that was not suggested and
            // pressed the Enter key, or the to_place Details request failed.
            window.alert("No details available for input: '" + to_place.name + "'");
            return;
          }

       // Define and set Marker Destination
            destination_marker = new google.maps.Marker({
                content: "Hello it is me, destination marker",
                position: new google.maps.LatLng(lat_destination.value,lng_destination.value),
                map: map,
                title: "Destination",
                animation: google.maps.Animation.DROP,
                icon:'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
              });

            /*Début : info window*/
        google.maps.event.addListener(destination_marker, 'click', function () {
            if(infowindow){
              infowindow.setMap(null);
              infowindow = null;
            }
      
            infowindow = new google.maps.InfoWindow({
                  content: 'Position de destination: <b>'+formatted_address_type+'</b>',
                  size: new google.maps.Size(150,50),
                  pixelOffset: new google.maps.Size(0, -30),
                  position: new google.maps.LatLng(address_lat,address_lng),
                  map: map
              });
        });
        /*Fin : info window*/

          //origin_marker.addListener('click', toggleBounce);
          map.setCenter(new google.maps.LatLng(lat_destination.value, lng_destination.value));
          map.setZoom(11); 
          destination_marker.setMap(map);

      });
      });


         var distance_from_location;
         var latlng_destination;
         lng_destination.onchange = function(){
          console.log(lat_destination.value,lng_destination.value);

          geocoder = new google.maps.Geocoder();

          latlng_destination = {lat: parseFloat(lat_destination.value), lng: parseFloat(lng_destination.value)};
          
          console.log(latlng_destination);
          //Geocoder 'location' => to transforme coordonations(latitude - longitude) to address text
          geocoder.geocode({'location': latlng_destination}, function(results, status) {
              
          console.log(results[0].formatted_address);
           
          //Result that we need lat & lng ==> to address text
          destinationInput.value = results[0].formatted_address;  
          
          //define the origin marker and set it on the map
          var destination_marker = new google.maps.Marker({
                content: "",
                position: new google.maps.LatLng(parseFloat(lat_destination.value),parseFloat(lng_destination.value)),
                map: map,
                title: "Destination",
                animation: google.maps.Animation.DROP,
                icon:'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
              });
          //origin_marker.addListener('click', toggleBounce);

          /*Début : info window*/
        google.maps.event.addListener(destination_marker, 'click', function () {
            if(infowindow){
              infowindow.setMap(null);
              infowindow = null;
            }
      
            infowindow = new google.maps.InfoWindow({
                  content: 'Position de destination: <b>'+formatted_address_type+'</b>',
                  size: new google.maps.Size(150,50),
                  pixelOffset: new google.maps.Size(0, -30),
                  position: new google.maps.LatLng(parseFloat(lat_destination.value),parseFloat(lng_destination.value)),
                  map: map
              });
        });
        /*Fin : info window*/

          map.setCenter(new google.maps.LatLng(parseFloat(lat.value),parseFloat(lng.value)));
          map.setZoom(11); 
          
          destination_marker.setMap(map);
        });


      };
      /********************************** End get elements destination **************************************/
    
    };
      
      function getpaths(){

        directionsService = new google.maps.DirectionsService();
        directionsDisplay = new google.maps.DirectionsRenderer();

        var address_origin   = $('#address_origin').val();
        var lat_origin   = $('#lat_origin').val();
        var lng_origin   = $('#lng_origin').val();


        var address_destination   = $('#address_origin').val();
        var lat_destination   = $('#lat_destination').val();
        var lng_destination   = $('#lng_destination').val();


        var marker_origin_lat_lng = new google.maps.LatLng(lat_origin, lng_origin);
        var marker_destination_lat_lng = new google.maps.LatLng(lat_destination, lng_destination);
        //var distance_from_location = google.maps.geometry.spherical.computeDistanceBetween(marker_origin_lat_lng, marker_destination_lat_lng);

        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix({
            origins: [marker_origin_lat_lng],
            destinations: [marker_destination_lat_lng],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false
        }, function (response, status) {
            if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
                var distance = response.rows[0].elements[0].distance.text;
                var duration = response.rows[0].elements[0].duration.text;

                
                
                if (duration.indexOf('day') != -1) {
                    var days = duration.split('day')[0].trim();
                    var hours = duration.split('day')[1].trim().split(' ')[0].trim();
                    duration = (parseInt(days) * 60 * 24) + (parseInt(hours) * 60) + " mins";
                }
                else if (duration.indexOf('hours') != -1) {
                    var hours = duration.split('hours')[0].trim();
                    var minutes = duration.split('hours')[1].trim().split(' ')[0].trim();
                    duration = (parseInt(hours) * 60) + parseInt(minutes) + " mins";
                }
                else if (duration.indexOf('hour') != -1) {
                    var hour = duration.split('hour')[0].trim();
                    var minutes = duration.split('hour')[1].trim().split(' ')[0].trim();
                    duration = (parseInt(hour) * 60) + parseInt(minutes) + " mins";
                }
                else {
                    duration = response.rows[0].elements[0].duration.text.trim();
                }

                

                var str_distance = distance.replace(" Km", "");

                if(parseFloat(str_distance) < 3){
                  var prix = 12;
                }else{
                  var prix = parseFloat(str_distance) * 0.50; //0.50 MAD
                }

                console.log('Distance:'+distance);
                console.log('Duration:'+duration);
                console.log('prix:'+prix);
                document.getElementById('distance').value = distance;
                document.getElementById('duree').value = duration;
                document.getElementById('prix').value = prix;  

                $('#valider_offre').removeAttr("disabled");


            } else {
                alert("Unable to find the distance via road.");
            }
        });


       
        
        if(address_origin && address_destination){

                 var request = {
                          origin: new google.maps.LatLng(lat_origin, lng_origin),
                          destination :new google.maps.LatLng(lat_destination, lng_destination),
                          waypoints: waypoints, //an array of waypoints
                          //optimizeWaypoints: true, //set to true if you want google to determine the shortest route or false to use the order specified.
                          travelMode: 'DRIVING',
                          //provideRouteAlternatives: true
                    };   


                     directionsService.route(request, function (response, status) {

                          if (status == google.maps.DirectionsStatus.OK) {

                              directionsDisplay.setDirections(response);
                              var routes = response.routes;
                              var colors = ['black', 'green', 'red', 'orange', 'yellow', 'purple'];

                              for (var j = 0; j < routes.length; j++) {

                                  new google.maps.DirectionsRenderer({
                                      map: map,
                                      directions: response,
                                      routeIndex: j,
                                      suppressMarkers: true,

                                      polylineOptions: {

                                          strokeColor: colors[j],
                                          strokeWeight: 6,
                                          strokeOpacity: .6
                                      }
                                  });

                                  
                              }
                          }
                      });
              
          }

      }

