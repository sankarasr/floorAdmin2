<!DOCTYPE html>
<html lang="java">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <!-- Load c3.css -->
    <link href="/resources/css/c3.css" rel="stylesheet">
	<style type="text/css">
		div#map_container{
		width:600px;
		height:500px;
		}
	</style>

    <!-- Load d3.js and c3.js -->
    <script type="text/javascript" src="/resources/js/d3.js" charset="utf-8"></script>
    <script type="text/javascript" src="/resources/js/c3.js"></script>
    <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
    <script type="text/javascript">
	  function loadMap() {
		var latlng = new google.maps.LatLng(4.3695030, 101.1224120);
		var myOptions = {
		  zoom: 4,
		  center: latlng,
		  mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var map = new google.maps.Map(document.getElementById("map_container"),myOptions);

		var marker = new google.maps.Marker({
		  position: latlng,
		  map: map,
		  title:"Hong Kong"
		});

	  }
	</script>
	
	
</head>
<body onload="loadMap()">

<!-- <div id="chart">Test</div>-->
<div id="map_container">Test</div>

<script type="text/javascript">
var chart = c3.generate({
    bindto: '#chart',
    data: {
	  x: 'x',
	  xFormat: '%d/%m/%y',
      url: '/resources/data/test-euro.csv',
      axes: {
        JPY: 'y',
        USD: 'y2',
        BGN: 'y2'
        }
    },
    axis: {
       x: {
            type: 'timeseries',
            tick: {
                format: '%d/%m/%y'
             }
        },
       y2: {
            show: true
        }
    }
});
</script>

</body>
</html>