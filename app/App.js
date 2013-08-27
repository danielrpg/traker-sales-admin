TukTuk.Modal.loading();
setTimeout( TukTuk.Modal.hide, 1000);
var url = "http://10.0.0.4:3000/";
var map;
$(document).on('ready', App(TukTuk));
function App(tuk, undefined){
	var socket = io.connect(url);
	//console.log(socket);
	socket.on('compartirPoscion',function(data){
		//console.dir(data);
		map = new GMaps({
		   div: '#id_mapa_geo',
		   lat: data.lat,
		   lng: data.lon,
		   zoom: 16
		 });
		 contexto = '<div><strong>'+data.login+'</strong></div> ';
		 map.addMarker({
		    lat: data.lat,
		    lng: data.lon,
			title: 'TRAKER RESPONSE',
			infoWindow: {
				content: contexto 
			}
		});
	});
};
