(function(){
	var map = new google.maps.Map(document.querySelector('.map-wrapper')), marker;

	function initMap(position){

		map.setCenter({lat: position.coords.latitude, lng: position.coords.longitude});

		map.setZoom(16);

		marker = new google.maps.Marker({
			position: {lat: position.coords.latitude, lng: position.coords.longitude},
			map: map,
			title: 'Oh hi...'
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

})();