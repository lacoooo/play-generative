var Vertex = function(x, y, z) {
    this.x = parseFloat(x);
    this.y = parseFloat(y);
    this.z = parseFloat(z);
};

var Vertex2D = function(x, y) {
    this.x = parseFloat(x);
    this.y = parseFloat(y);
};

var Cube = function(center, side) {
    // Generate the vertices
    var d = side / 2;

    this.vertices = [
        new Vertex(center.x - d, center.y - d, center.z + d),
        new Vertex(center.x - d, center.y - d, center.z - d),
        new Vertex(center.x + d, center.y - d, center.z - d),
        new Vertex(center.x + d, center.y - d, center.z + d),

        new Vertex(center.x + d, center.y + d, center.z + d),
        new Vertex(center.x + d, center.y + d, center.z - d),
        new Vertex(center.x - d, center.y + d, center.z - d),
        new Vertex(center.x - d, center.y + d, center.z + d)
    ];

    // Generate the faces
    this.faces = [
        [this.vertices[0], this.vertices[1], this.vertices[2], this.vertices[3]],
        [this.vertices[3], this.vertices[2], this.vertices[5], this.vertices[4]],
        [this.vertices[4], this.vertices[5], this.vertices[6], this.vertices[7]],
        [this.vertices[7], this.vertices[6], this.vertices[1], this.vertices[0]],
        [this.vertices[7], this.vertices[0], this.vertices[3], this.vertices[4]],
        [this.vertices[1], this.vertices[6], this.vertices[5], this.vertices[2]]
    ];
};

function project(M) {
    return new Vertex2D(M.x, M.z);
}

function render(object, ctx, dx, dy) {
    console.log(111)
    // Clear the previous frame
    ctx.clearRect(0, 0, 2 * dx, 2 * dy);
    ctx.save()
    ctx.translate(dx, dy)
    for (var i = 0; i < object.faces.length; i++) {
        // Current face
        var face = object.faces[i];

        // Draw the other vertices
        for (var j = 1; j < face.length; j++) {
            var P = project(face[j]);
            if (j === 0) {
                ctx.beginPath();
                ctx.moveTo(P.x, -P.y);
            }
            ctx.lineTo(P.x, -P.y);
        }

        // Close the path and draw the face
        ctx.closePath();
        ctx.stroke();
        // ctx.fill();
    }
    ctx.restore()
}

(function() {
    // Fix the canvas width and height
    var canvas = document.getElementById('cnv');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    var dx = canvas.width / 2;
    var dy = canvas.height / 2;

    // object style
    var ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';

    // Create the cube
    var cube_center = new Vertex(0, dy, 0);
    window.cube = new Cube(cube_center, dy);
    var object = window.cube;

    // First render
    render(object, ctx, dx, dy);

    // Events
    var mx = 0;
    var my = 0;

    document.addEventListener('mousemove', move);

    // Rotate a vertice
    function rotate(M, center, theta, phi) {
        // Rotation matrix coefficients
        var ct = Math.cos(theta);
        var st = Math.sin(theta);
        var cp = Math.cos(phi);
        var sp = Math.sin(phi);

        // Rotation
        var x = M.x - center.x;
        var y = M.y - center.y;
        var z = M.z - center.z;

        M.x = ct * x - st * cp * y + st * sp * z + center.x;
        M.y = st * x + ct * cp * y - ct * sp * z + center.y;
        M.z = sp * y + cp * z + center.z;
    }

    function move(evt) {
        var theta = (evt.clientX - mx) * Math.PI / 180;
        var phi = (evt.clientY - my) * Math.PI / 180;

        for (var i = 0; i < 8; ++i)
            rotate(cube.vertices[i], cube_center, theta, phi);

        mx = evt.clientX;
        my = evt.clientY;

        render(object, ctx, dx, dy);
    }

})();