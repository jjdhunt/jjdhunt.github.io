
var HOST = '192.168.0.4';
var PORT = 9000;

var peer1 = new Peer('123454321',{host: HOST, port: PORT});

peer1.on('open', function(id) {
  console.log('I\'m peer1 and my id is: ' + id);
});

var peer2 = new Peer('223454321',{host: HOST, port: PORT});

peer2.on('open', function(id) {
  console.log('I\'m peer2 and my id is: ' + id);
});

function makeACall() {
// call peer2
console.log('peer1 calling peer 2!');
peer1.call('223454321', window.localStream);
}

function getUserVideo() {
	
	// select the right getUserMedia (deprecated)
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
	
	navigator.getUserMedia({audio: true, video: true}, function(stream){
		window.localStream = stream;
		makeACall()
	}, function(){
		alert("Error! Make sure to click allow when asked for permission by the browser");
	});
};

//$('#my').prop("src", URL.createObjectURL(window.localStream));

function setupVideoElement(stream){
	console.log('makevideo');
	var x = document.createElement("VIDEO");

	if (x.canPlayType("video/mp4")) {
		//x.setAttribute("src",URL.createObjectURL(stream)); //URL.createObjectURL depricated in chrome 
		x.setAttribute("src",stream);
	} else {
		console.log('cant play mp4');
		//x.setAttribute("src","movie.ogg");
	}

	x.setAttribute("width", "320");
	x.setAttribute("height", "240");
	x.setAttribute("controls", "controls");
	document.body.appendChild(x);
}

peer2.on('call', function(call) {
	
    console.log('someone called peer 2!');
    // answer call from peer1
    call.answer(window.localStream);    
    
    // stream to the #partner canvas
    call.on('stream', function(stream){
		console.log('blah');
		// `stream` is the MediaStream of the remote peer.
		// Here you'd add it to an HTML video/canvas element.
        //$('#partner').prop("src", URL.createObjectURL(stream));
		setupVideoElement(stream);
    });
});