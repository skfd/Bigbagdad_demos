var can, ctx, tm, matrix_3D, matrix_2D;
var rotator = [ [0.7,   0,      -0.7], 
                [0.4,   0.8,    0.4],
                [0.57, -0.57, 0.57]]; // 45 rad

var pi = Math.PI;
var GLOBAL_COUNTER = 0;


$(document).ready(function () {

    InitCanvas();
    InitMatrix3D();
    tm = setInterval("DrawCube()", 10);

});

function DrawCube() {
    can.width = can.width;
    CalculateRotator(pi * GLOBAL_COUNTER, pi * GLOBAL_COUNTER);
    Calculate2DMatrix();
    Draw2dMatrix();

    GLOBAL_COUNTER = GLOBAL_COUNTER == 2 ? 0 : GLOBAL_COUNTER = GLOBAL_COUNTER + 0.01;
}

// ---------------------------------------------------------------

function InitCanvas() {
    can = document.getElementById("pp");
    ctx = can.getContext("2d");

    gcount = 0;
    col_iter = 0;
}

// ----------------------------------------------------------------

function InitMatrix3D() {
    matrix_3D = [   [0, 0, 0],      [200, 0, 0],    [200, 200, 0],    [0, 200, 0], 
                    [0, 0, 200],    [200, 0, 200],  [200, 200, 200],  [0, 200, 200]];
}

// ----------------------------------------------------------------

function CalculateRotator(alpha, beta) {
    
    var m1 = new Array([1, 0, 0], [0, Math.cos(alpha), sin(alpha)], [0, -1 * sin(alpha), cos(alpha)]);
    var m2 = new Array([cos(beta), 0, -1 * sin(beta)], [0, 1, 0], [sin(beta), 0, cos(beta)]);
    var res = new Array([0, 0, 0], [0, 0, 0], [0, 0, 0]);

    for (var a = 0; a < 3; a++) {
        for (var b = 0; b < 3; b++) {
            res[a][b] = 0;
            for (var c = 0; c < 3; c++) {
                res[a][b] += m1[a][c] * m2[c][b];
            }
        }
    }

    rotator = res;
}

// ----------------------------------------------------------------

function cos(arg) { return Math.cos(arg); }
function sin(arg) { return Math.sin(arg); }

function Draw2dMatrix() {
    var m2 = matrix_2D;
    for(var i=0; i < 8; i++)
    {
        for (var j = 0; j < 8; j++) {
            DrawLine(m2[i][0], m2[i][1], m2[j][0], m2[j][1], 1, "#00ff00");
        }
    }


}

// ----------------------------------------------------------------

function Calculate2DMatrix() {
    var rotated_matrix = new Array();
    
    for (var i = 0; i < 8; i++) {
        rotated_matrix[i] = RotatePoint(matrix_3D[i]);
    }

    matrix_2D = new Array();

    for (var i = 0; i < 8; i++) {
        matrix_2D[i] = new Array( rotated_matrix[i][0], rotated_matrix[i][1] );
    }
}

// ----------------------------------------------------------------

function RotatePoint(p3d) {
    var res_points = new Array();
    for (var a = 0; a < 3; a++) {
        res_points[a] = 0;
        for (var b = 0; b < 3; b++) {
            res_points[a] += (rotator[a][b] * p3d[b])
        }
    }
    
    return res_points;
}

// ----------------------------------------------------------------

function DrawLine(sX, sY, eX, eY, lW, color) {
    ctx.moveTo(sX + 350, sY + 350);
    ctx.lineTo(eX + 350, eY + 350);
    ctx.lineWidth = lW;
    ctx.strokeStyle = color;
    ctx.stroke();
}

// ----------------------------------------------------------------

function rnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
