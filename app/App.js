TukTuk.Modal.loading();
setTimeout( TukTuk.Modal.hide, 1000);
var url = "http://10.0.0.4:3000/";
$(document).on('ready', App(TukTuk));
function App(tuk, undefined){
	var socket = io.connect(url);
	var operators = [];
	var myLatlng = new google.maps.LatLng(-17.38414,-66.166702); // Esta es la latitud y longitud de cochabamba
    var mapOptions = {
        zoom: 14,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("id_mapa_geo"), mapOptions);
    //Se ejecuta cuando un nuevo usuario se ha conectado
	socket.on('newUserConnected', function(data){
		placeMarker(data.codigo_op, data.login,data.latitude, data.longitude);
		
	});
	//Se ejecuta cuando se comparte la ubicacion del usuario
	socket.on('compartirPoscion',function(data){
		//console.dir(data);
		
	});

	socket.on('userDisconnected', function(data){
		$.each(operators, function(index, op) {
			 if(op.id == data.codigo_op){
			 	deleteMarker(op);
			 }
		});
	});
	var placeMarker = function(id_op, login, latitude, longitude){
		var opLocation = new google.maps.LatLng(latitude, longitude);
		var marker = new google.maps.Marker({
			id:id_op,
			position : opLocation,
			map:map,
			animation:google.maps.Animation.DROP,
			title : login
		});
		operators.push(marker);
		var infowindow = new google.maps.InfoWindow({
			size:new google.maps.Size(50, 50) 
		});
		google.maps.event.addListener(marker, 'click', function(){
			infowindow.open(map, marker);
			console.log(marker.position);
			var div = $('<div>'+marker.title+'-'+marker.position+'<br></div>');
			infowindow.setContent(div[0]);
		});
	};
	// Eliminar un marcador
	var deleteMarker = function(marker){
		marker.setMap(null);
	};
};
