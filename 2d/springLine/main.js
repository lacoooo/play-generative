
        var text = '是诸法空相不生不灭不垢不净不增不减是故空中无色无受想行识无眼耳鼻舌身意无色声香味触法无眼界乃至无意识界无无明亦无无明尽乃至无老死亦无老死尽'
        var texx = text.split('')
        var nodes = [];
        // an array for the springs
        var springs = [];
        var index = 0
        function getText() {
            return texx[Math.floor(Math.random() * text.length)]
        }
        var sketch = function (p) {

            // dragged node
            var selectedNode = null;


            p.setup = function () {
                p.fill(0)
                p.createCanvas(p.windowWidth - 100, p.windowHeight - 100);
                p.background(255);
                p.noStroke();

                p.initNodesAndSprings();
            }

            p.draw = function () {

                p.background(255);

                // let all nodes repel each other
                for (var i = 0; i < nodes.length; i++) {
                    nodes[i].attractNodes(nodes);
                }
                // apply spring forces
                for (var i = 0; i < springs.length; i++) {
                    springs[i].update();
                }
                // apply velocity vector and update position
                for (var i = 0; i < nodes.length; i++) {
                    nodes[i].update();
                }

                if (selectedNode != null) {
                    selectedNode.x = p.mouseX;
                    selectedNode.y = p.mouseY;
                }

                // draw nodes
                p.stroke(0);
                p.strokeWeight(options.line);
                for (var i = 0; i < springs.length; i++) {
                    p.line(springs[i].fromNode.x, springs[i].fromNode.y, springs[i].toNode.x, springs[i].toNode.y);
                }

                p.fill(0);
                p.noStroke();
                p.textFont('宋体')
                for (var i = 0; i < nodes.length; i++) {
                    p.textSize(nodes[i].textSize)
                    p.text(nodes[i].text, nodes[i].x, nodes[i].y)
                }

            }

            p.initNodesAndSprings = function () {
                // init nodes
                nodes = [];
                var scale = 10
                for (var i = 0; i < options.count; i++) {
                    var newNode = new Node(p.width / 2 + p.random(-scale, scale), p.height / 2 + p.random(-scale, scale));
                    newNode.radius = 100;
                    newNode.text = getText()
                    newNode.textSize = p.floor(p.random() * 20) + 16
                    nodes.push(newNode);
                }

                // set springs randomly
                springs = [];

                for (var j = 0; j < nodes.length - 1; j++) {
                    var r = p.floor(p.random(j + 1, nodes.length));
                    var newSpring = new Spring(nodes[j], nodes[r]);
                    springs.push(newSpring);
                }
            }

            p.mousePressed = function () {
                // Ignore anything greater than this distance
                var maxDist = 40;
                for (var i = 0; i < nodes.length; i++) {
                    var checkNode = nodes[i];
                    var d = p.dist(p.mouseX, p.mouseY, checkNode.x, checkNode.y);
                    if (d < maxDist) {
                        selectedNode = checkNode;
                        maxDist = d;
                    }
                }
            }

            p.mouseReleased = function () {
                if (selectedNode != null) {
                    selectedNode = null;
                }
            }

            p.keyPressed = function () {
                if (p.key == 's' || p.key == 'S') {
                    p.saveCanvas(gd.timestamp(), 'png');
                }

                if (p.key == 'r' || p.key == 'R') {
                    p.background(255);
                    initNodesAndSprings();
                }
            }


        }

        var myp5 = new p5(sketch);