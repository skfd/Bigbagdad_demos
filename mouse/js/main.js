var mX, mY, cnv, ctx;
var movingStoryLength = 10;
var pointsCount = 3;
var points = new Array(pointsCount);
var colors = new Array(3);

jQuery(document).ready(function(){
	initMouseEvents();
	initCanvas();
	initColors();
	generatePoints();

	drawRotating();
});

function initColors(){
	colors[0] = '#53ED0C';
	colors[1] = '#F70505';
	colors[2] = '#05BBF7';
}

function generatePoints(){
	for(var i=0; i < pointsCount; i++){
		points[i] = {
			x: 0,
			y: 0,
			movingStory: new Array(movingStoryLength),
			msInd: 0,
			color: colors[getRandomInt(0, 2)],
			vector: getRandomInt(0, 1),
			angle: Math.PI * getRandomArbitary(0, 2),
			radius: getRandomInt(50, 300),
			rVector: getRandomInt(0, 1)
		};
	}
}

function initMouseEvents(){
   $(document).mousemove(function(e){
      var cnv_offset = $('#cnv_main').offset();

      mX = e.pageX - cnv_offset.left;
      mY = e.pageY - cnv_offset.top;
   }); 	
}

function writeMouseStoryMoving(_point){
	_point.movingStory[_point.msInd] = { x: _point.x, y: _point.y };
	_point.msInd = _point.msInd == movingStoryLength ? 0 : _point.msInd + 1;
}

function initCanvas(){
	cnv = document.getElementById('cnv_main');
	ctx = cnv.getContext('2d');

	ctx.rect(0, 0, cnv.width, cnv.height);
    ctx.fillStyle = 'black';
	ctx.fill();
}

function drawPointWithTail(_point){
	for(var i=0; i < movingStoryLength; i++){
		drawPoint(3, 6, 0 + (i * 0.1), _point.color, _point.movingStory[i].x, _point.movingStory[i].y);
	}
}

function drawRotating(){
	setInterval(function(){
		cnv.width = cnv.width;

		for(var i=0; i < pointsCount; i++){
			rotatePoint(points[i]);
		}
	}, 10);
}

function rotatePoint(p){
	p.angle += (p.vector == 0 ? 1 : -1) / 10;

	if(p.radius <= 10) p.rVector = 1;
	if(p.radius >= 300) p.rVector = 0;

	p.radius += p.rVector == 0 ? -1 : 1;

	p.x = (mX) + (p.radius * Math.sin(p.angle));
	p.y = (mY + p.radius) - (p.radius * (1 - Math.cos(p.angle)));

	writeMouseStoryMoving(p);

	drawPointWithTail(p);
}

function drawPoint(_radius, _lineWidth, _alpha, _color, _x, _y){
	ctx.globalAlpha = _alpha;
    ctx.beginPath();
    ctx.arc(_x, _y, _radius, 0, Math.PI * 2, false);
    ctx.lineWidth = _lineWidth;
    ctx.strokeStyle = _color;
    ctx.stroke();
}

function getRandomArbitary (min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}