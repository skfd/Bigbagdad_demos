var can, ctx, tm, gcount, col_iter, palette;
var pi = Math.PI;
var y_ind = 200;

var vectorMove = 1;


$(document).ready(function () {

    InitCanvas();
    InitPallete();
    tm = setInterval("drawCos();", 1);

});


function drawCos() {
    can.width = can.width;

    for (var g = 0; g < 50; g++) {

        var x_ = gcount - g;
        var y_ = Math.cos(pi * (x_ / 100)) * y_ind;

        DrawArc(x_ * 2, y_ + 350, 50 + (g * 1), 0, pi * 2, palette[col_iter]);
    }
    
    gcount += vectorMove
    if (gcount >= 500 || gcount <= 0) {
        vectorMove *= -1;
        //can.width = can.width;
        //clearInterval(tm);
    }
    if (col_iter++ >= palette.length) col_iter = 0;

}

function InitPallete() {
    palette = new Array();
    var r = 255;
    var g = 0;
    var b = 0;

    for (var i = 0; i <= 255; i++) {
        b = i;
        palette[palette.length] = getHexColor(r, g, b);
    }

    for (var i = 255; i >= 0; i--) {
        r = i;
        palette[palette.length] = getHexColor(r, g, b);
    }

    for (var i = 0; i <= 255; i++) {
        g = i;
        palette[palette.length] = getHexColor(r, g, b);
    }

    for (var i = 255; i >= 0; i--) {
        b = i;
        palette[palette.length] = getHexColor(r, g, b);
    }

    for (var i = 0; i <= 255; i++) {
        r = i;
        palette[palette.length] = getHexColor(r, g, b);
    }

    for (var i = 255; i >= 0; i--) {
        g = i;
        palette[palette.length] = getHexColor(r, g, b);
    }

}

function getHexColor(r, g, b) {
    return "#" + getHex(r) + getHex(g) + getHex(b);
}

function getHex(key) {
    var res = Number(key).toString(16);

    if (res.length == 1)
        res = (res.toString() + res.toString());

    return res;
}

// ---------------------------------------------------------------

function InitCanvas() {
    can = document.getElementById("pp");
    ctx = can.getContext("2d");

    gcount = 0;
    col_iter = 0;
}

// ---------------------------------------------------------------

function DrawArc(cX, cY, rad, stAng, endAng, color) {

    ctx.beginPath();
    ctx.arc(cX, cY, rad, stAng, endAng, false);
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    ctx.stroke();
}

// ----------------------------------------------------------------

function rnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
