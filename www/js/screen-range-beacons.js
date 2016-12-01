// Range beacons screen.
;(function(app)
{
	// app.controller('buscarBeaconController',function(){
	// 	console.log('nothingController');
	// });
	// 'F1:A5:A6:CF:98:BC,E1:0D:88:DA:70:BA'
	beaconsIdsList = ['F1:A5:A6:CF:98:BC'];
	//meters
	beaconDistance = 2;

	app.startRangingBeacons = function()
	{
		function onRange(beaconInfo)
		{
			displayBeconInfo(beaconInfo);
		}

		function onError(errorMessage)
		{
			console.log('Range error: ' + errorMessage);
		}

		function displayBeconInfo(beaconInfo)
		{
			// Clear beacon HTML items.
			$('#id-screen-range-beacons .style-item-list').empty();

			// Sort beacons by distance.
			beaconInfo.beacons.sort(function(beacon1, beacon2) {
				return beacon1.distance > beacon2.distance; });

			// Generate HTML for beacons.
			$.each(beaconInfo.beacons, function(key, beacon)
			{
				var element = $(createBeaconHTML(beacon));
				$('#id-screen-range-beacons .style-item-list').append(element);
			});
		};

		function createBeaconHTML(beacon)
		{
			var colorClasses = app.beaconColorStyle(beacon.color);
			// var htm = '<div class="' + colorClasses + '">'
			// 	+ '<table><tr><td>Major</td><td>' + beacon.major
			// 	+ '</td></tr><tr><td>Minor</td><td>' + beacon.minor
			// 	+ '</td></tr><tr><td>RSSI</td><td>' + beacon.rssi
			if (beacon.proximity)
			{
				// htm += '</td></tr><tr><td>Proximity</td><td>'
				// 	+ app.formatProximity(beacon.proximity)
			}
			if (beacon.distance)
			{
				// htm += '</td></tr><tr><td>Distance</td><td>'
					// + app.formatDistance(beacon.distance);					
				if(isClose(beacon.distance,beaconDistance)){
					callMedia(beacon);

				}
			}
			// htm += '</td></tr></table></div>';
			return '';
		};

		// Show screen.
		app.showScreen('id-screen-range-beacons');
		$('#id-screen-range-beacons .style-item-list').empty();

		// Request authorisation.
		estimote.beacons.requestAlwaysAuthorization();

		// Start ranging.
		estimote.beacons.startRangingBeaconsInRegion(
			{}, // Empty region matches all beacons.
			onRange,
			onError);
	};

	function callMedia(beacon){

		if(!findByMacAddress(beacon.macAddress)){

			//api connection test
			$.get( "http://koko-test.com/click/back-end/index.php/app/test", function( data ) {
				$('#beacon-media').append('<p>'+probando conneccion a la base de datos+'</p>');
			});

			//api insert into clicker_events
		 	$.post( "http://koko-test.com/click/back-end/index.php/app/saveEvent", {id_channel:"null",channel_name:"null",event_name:"null",id_rule:"null",rule_name:"null",id_object:macAddress})
			  .done(function( data ) {
			    $('#beacon-media').append('<p>registrando datos en la bd</p>');
			});

			var beacons = JSON.parse(localStorage.getItem('beacons'));
			beacons.push(beacon.macAddress);
			$('#beacons-history').append('<p>'+beacon.macAddress+'</p>')
			localStorage.setItem('beacons',JSON.stringify(beacons));
			
		}
	}

	function findByMacAddress(macAddress){
		//console.log(macAddress);
		// console.log(beacons);
		// beacons.push('adios');
		// localStorage.setItem('beacons',JSON.stringify(beacons));

		beaconInList = false;

		//find in list...
		for (var i = 0; i < beaconsIdsList.length; i++) {
			if(beaconsIdsList[i]==macAddress){
				beaconInList = true;
			}
		}

		//avoid calling method more than one time
		if (beaconInList) {
			var beacons = JSON.parse(localStorage.getItem('beacons'));

			for (var i = 0; i < beacons.length; i++) {
				if(beacons[i]==macAddress){
					return true;
				}
			}
		}else{
			return true;
		}

		return false;
	}
	
	function isClose(meters, limit){
		if(meters<=limit){
			return true;
		}else{
			return false;
		}
	}

	app.stopRangingBeacons = function()
	{
		estimote.beacons.stopRangingBeaconsInRegion({});
		app.showHomeScreen();
	};

})(app);
