(function(){
	var map = new google.maps.Map(document.querySelector('.map-wrapper')), 
	marker,
	preloader = document.querySelector('.preloadWrapper'),
	geocoder = new google.maps.Geocoder(),
	geocodeButton = document.querySelector('.geocode'),

	//directions services
	directionService = new google.maps.DirectionsService(),
	directionsDisplay,
	locations = [];

	function initMap(position){
		locations[0] = {lat: position.coords.latitude, lng: position.coords.longitude};

		directionsDisplay = new google.maps.DirectionsRenderer();
		directionsDisplay.setMap(map); //setMap lets you know what map the API should target

		map.setCenter({lat: position.coords.latitude, lng: position.coords.longitude});

		map.setZoom(16);

		marker = new google.maps.Marker({
			position: {lat: position.coords.latitude, lng: position.coords.longitude},
			map: map,
			title: 'Oh hi...'
		});

		preloader.classList.add('hide-preloader');
	}

	function codeAddress()
	{
		//debugger;
		var address = document.querySelector('.address').value;
		console.log(address);

		geocoder.geocode({'address' : address}, function(results, status){
			if (status === google.maps.GeocoderStatus.OK) // if The Geocoder came back valid
			{
				locations[1] = {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()};
				map.setCenter(results[0].geometry.location);//object index 0, inside that geometry object, inside that, a location

				if (marker){
					marker.setMap(null);
					marker = new google.maps.Marker({
						map: map,
						position: results[0].geometry.location
					})
				}

				calcRoute(results[0].geometry.location);
			}else{
				console.log("Geocoder was unsuccessful. Error:", status);
			}
		});
	}

	function calcRoute(codedLoc){
		var request = {
			origin: locations[0],
			destination: locations[1],
			travelMode: 'DRIVING'
		};

		directionService.route(request, function(response, status) {
			if (status === 'OK'){
				directionsDisplay.setDirections(response);
			}
		});
	}

	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(initMap, handleError);
	}else{
		//Give some kind of error message to the user
		console.log('Sorry, your browser does not support geolocation');
	}

	function handleError(e){
		console.log(e);
	}

	geocodeButton.addEventListener('click', codeAddress, false);

})();