var paths = []
var scale = 50
function onMouseDown(event) {
    var num = Math.floor( 50 )
    for (var i = 0; i < num; i++) {
        var path = new Path( event.point + [Math.random() * scale, Math.random() * scale] )
        var color = Math.floor(Math.random() * 200)
        var opacity = Math.random()
        path.strokeColor = 'rgba(' + color + ', ' + color + ', ' + color + ', ' + opacity + ')'
        paths.push( path )
    }
}

function onMouseDrag(event) {
    for (var i = 0; i < paths.length; i++) {
        
        paths[i].add( event.point + [Math.random() * scale, Math.random() * scale] )
    }
}

function onMouseUp(event) {
    for (var i = 0; i < paths.length; i++) {
        paths[i].add( event.point + [Math.random() * scale, Math.random() * scale] )
        paths[i].flatten(50)
    }
    paths = []
};