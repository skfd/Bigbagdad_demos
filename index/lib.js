var can, ctx, i, tm;
var pi = Math.PI;

var array_Arcs = new Array();

$(document).ready(function () {

    InitCanvas();
    InitArray();
    tm = setInterval("CallArcDraw();", 10);

});

// ---------------------------------------------------------------

function CallArcDraw() {
    can.width = can.width;
    var cv = (i / 100);

    for (var y = 0; y < array_Arcs.length; y++) {
        var o = array_Arcs[y];
        DrawArc(o.cX, o.cY, o.rad, (cv - o.stAng) * pi, (cv - o.endAng) * pi, o.color, o.lW);

    }

    i = i++ == 200 ? 0 : i;
}

// ---------------------------------------------------------------

function InitArray() {
    for (var i = 0; i < 10; i++) {
        var arc = new Object();
        arc = { cX: rnd(60, 250), cY: rnd(60, 70), rad: rnd(5, 60), stAng: rnd(0.0, 1.0), endAng: rnd(1.1, 2), color: "#00ff00", lW: 2 };

        array_Arcs[i] = arc;
    }
}

// ---------------------------------------------------------------

function InitCanvas() {
    can = document.getElementById("pp");
    ctx = can.getContext("2d");

    i = 0;
}

// ---------------------------------------------------------------

function DrawArc(cX, cY, rad, stAng, endAng, color, lW) {

    ctx.arc(cX, cY, rad, stAng, endAng, false);
    ctx.lineWidth = lW;
    ctx.strokeStyle = color;
    ctx.stroke();
}

function rnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}