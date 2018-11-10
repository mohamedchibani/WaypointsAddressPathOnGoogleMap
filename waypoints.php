
<?php ?>
  <!--
  ===============================================================================================================
  == Project    : Display Path Waypoints on Map Page
  == Created by : MOHAMED CHIBANI - mohamedchibani1996@gmail.com
  == Explication : why this file has php extention ? because the google map api used is for localhost server 
  (developpment project) , that means that you have to run this project on the localhost server - 127.0.0.1
  , to change it you have to create a project and put your own Javascript API -- https://console.developers.google.com --
  ==============================================================================================================
  -->



<!DOCTYPE html>
<html>
  <head>
    <title>Display waypoints on map</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.1/css/all.css" integrity="sha384-O8whS3fhG2OnA5Kas0Y9l3cfpmYjapjI0E4theH4iuMD+pLhbf6JI0jIMfYcK3yZ" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="waypoints.css">

   
  </head>
  <body>
    <div class="container">
        

        <!-- Start Origin Address -->
        <div class="row origin_address_section">

            <!--Start Origin Address Field-->
            <input id="address_origin" class="form-control address_origin" placeholder="Origin address"/>
            <!--End Origin Address Field-->
         
            <!--Start Fields Lat Lng Origin-->
            <input id="lat_origin" class="form-control lat_lng" type="text" placeholder="Origin latitude">
            <input id="lng_origin" class="form-control lat_lng" type="text" placeholder="Origin longitude">
            <!--End Fields Lat Lng Origin-->

            <!-- Start Add waypoint icon-->
                <i id="add-way-point" class="fa fa-plus fa-lg icon_add_way_point" title="Add waypoint"></i>
            <!-- End Add waypoint icon-->  

        </div>
        <!-- End Origin Address -->
        



        <!-- Start WayPoints Address -->  
        <div class="row waypoint_address_section">  
              <div class="waypoints">
                  
              </div>
        </div>
        <!-- End WayPoints Address -->




        <!-- Start Destination Address -->
        <div class="row destination_address_section">
                   
            <!--Start Destination Address Field-->
            <input id="address_destination" class="form-control address_destination" placeholder="Destination address"/>
            <!--Start Destination Address Field-->

            <!--Start Fields Lat Lng Destination-->
            <input id="lat_destination" class="form-control lat_lng" type="text" placeholder="Destination latitude">
            <input id="lng_destination" class="form-control lat_lng" type="text" placeholder="Destination longitude">
            <!--Start Fields Lat Lng Destination-->
        

            <!-- Start Button Get Path-->
            <a class="btn btn-warning btn-get-path" onclick="getpaths()"><b>Get Path</b></a>
            <!-- End Button Get Path-->
                       
        </div>
        <!-- End Destination Address -->
        


        <!-- Start Map -->
        <div id="map_canvas" class="my_map"></div>
        <!-- End Map -->
          
  </div>

      
      <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
      <script src="waypoints.js"></script>
      <script async defer
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBOAyxF8oJ7TpcZ3mrcZoHhysb8NMpLd98&callback=initMap&libraries=geometry,places&sensor=false"">
      </script>
      
  </body>
</html>

  