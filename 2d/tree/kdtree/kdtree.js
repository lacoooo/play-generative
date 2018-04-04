;

class Node {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.left = null
        this.right = null
        this.dimension = null
        this.collectionLeft = []
        this.collectionRight = []
    }
    add ( newNode ) {

    }
}

// 二维kdtree
class Kdtree {

    constructor(sizeX, sizeY) {
        this.size = {
            sizeX: sizeX, sizeY: sizeY
        }
        this.root = null
        this.collection = []
    }

    produceNodes(num = 10) {
        for (let i = 0; i < num; i ++) {
            const x = Math.random() * this.size.sizeX
            const y = Math.random() * this.size.sizeY
            this.collection.push(new Node(x, y))
        }
        return this
    }

    getCenter(collection, dimension) {
        const len = collection.length
        let total = 0
        for (let i = 0; i < len; i++) {
            if (dimension == 0) total += collection[i].x
            else if (dimension == 1) total += collection[i].y
        }
        const centerNum = total / len
        let center = null
        let index = 0
        
        let num
        if (dimension == 0) num = 'x'
        else if (dimension == 1) num = 'y'
        collection.map( (ele, i) => {
            const differ = Math.min( Math.abs(ele[num] - centerNum) )
            if ( center == null || differ < center[num] ) {
                center = ele
                index = i
            }
        } )
        collection.map( (ele, i) => {
            if (i == index) return
            if (ele[num] < center[num]) center.collectionLeft.push(ele)
            else if (ele[num] > center[num]) center.collectionRight.push(ele)
        } )
        
        return center
    }

    getNode(dimension) {
        let center = this.getCenter(this.collection, dimension)
        this.addToTree( center )
    }

    addToTree( newNode ) {
        if (!this.root) this.root = newNode
        else this.root.add( newNode )
    }
}

let tree = new Kdtree(1000, 1000).produceNodes(100)