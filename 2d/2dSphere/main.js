var Vertex = function(x, y, z) {
    this.x = parseFloat(x);
    this.y = parseFloat(y);
    this.z = parseFloat(z);
};

var Cube = function(side) {
    // Generate the vertices
    var d = side / 2;

    this.vertices = [
        new Vertex( - d,  - d,  + d),
        new Vertex( - d,  - d,  - d),
        new Vertex( + d,  - d,  - d),
        new Vertex( + d,  - d,  + d),

        new Vertex( + d,  + d,  + d),
        new Vertex( + d,  + d,  - d),
        new Vertex( - d,  + d,  - d),
        new Vertex( - d,  + d,  + d)
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

function render(object, ctx, dx, dy) {
    var index = 0
    // Clear the previous frame
    ctx.clearRect(0, 0, 2 * dx, 2 * dy);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, 2 * dx, 2 * dy);
    ctx.save()
    ctx.translate(dx, dy)
    for (var i = 0; i < object.faces.length; i++) {
        // Current face
        var face = object.faces[i];

        ctx.beginPath();
        // if (i > 0) continue
        // Draw the other vertices
        var px = 0, py = 0
        for (var j = 0; j < face.length; j++) {
            index ++
            // console.log(index)
            var P = face[j]
            var x = P.x 
            * .6 + P.x * .4 * P.z / 200
            var y = P.y 
            // * .6 + P.x * .4 * P.z / 200
            if (j === 0) {
                ctx.moveTo(px, py);
            }
            // console.log(P.x, -P.z)
            ctx.arcTo(px, py, x + 4, y + 4, 10);
            ctx.lineTo(x, y);
            px = x
            py = y
        }

        // Close the path and draw the face
        ctx.closePath();
        ctx.strokeStyle = `hsla(${255}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 100)}, 1)`;
        ctx.lineWidth = Math.random() * 30
        ctx.stroke();
        ctx.fill();
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

    window.cube = new Cube(dy);
    var object = window.cube;

    // First render
    render(object, ctx, dx, dy);

    // Events
    var mx = 0;
    var my = 0;

    document.addEventListener('mousemove', move);

    // Rotate a vertice
    function rotate(M, theta, phi) {
        // Rotation matrix coefficients
        var ct = Math.cos(theta);
        var st = Math.sin(theta);
        var cp = Math.cos(phi);
        var sp = Math.sin(phi);

        // Rotation
        var x = M.x
        var y = M.y
        var z = M.z

        M.x = ct * x - st * cp * y + st * sp * z
        M.y = st * x + ct * cp * y - ct * sp * z
        M.z = sp * y + cp * z
    }

    function move(evt) {
        var theta = (evt.clientX - mx) * Math.PI / 180 / 4;
        var phi = (evt.clientY - my) * Math.PI / 180 / 4;
        for (var i = 0; i < 8; i++)
            rotate(cube.vertices[i], theta, phi);

        mx = evt.clientX;
        my = evt.clientY;
        render(object, ctx, dx, dy);
    }

})();