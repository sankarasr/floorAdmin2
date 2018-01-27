							  function loadMap() {
	
								var latlng = new google.maps.LatLng(22.290943, 114.198071);
								
								var myOptions = {
								  zoom: 4,
								  center: latlng,
								  mapTypeId: google.maps.MapTypeId.ROADMAP
								};
								
								var map = new google.maps.Map(document.getElementById("map_container"),myOptions);
								
								var locationArray = [<% for (int i = 0; i < locationList.size(); i++) { %>"<%= locationList.get(i).getLatitude() +","+ locationList.get(i).getLongitude()%>"<%= i + 1 < locationList.size() ? ",":"" %><% } %>];
								
								var arrayLength = locationArray.length;
								
								for (var i = 0; i < arrayLength; i++) {
									var templatlang = locationArray[i].split(",");
									var marker = new google.maps.Marker({
									  //position: new google.maps.LatLng(22.290943, 114.198071),
									  position: new google.maps.LatLng(templatlang[0],templatlang[1]),
									  map: map,
									  title:"Hong Kong"
									});
								}
							  }