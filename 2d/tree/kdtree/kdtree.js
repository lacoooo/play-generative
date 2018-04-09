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
        this.parent = ''
        this.deep = 0
    }

    add(dimension, deep) {
        this.deep = deep
        if (this.dimension == null) this.dimension = dimension
        if (this.dimension) dimension = 0
        else dimension = 1
        let centerLeft = tree.getCenter(this.collectionLeft, dimension)
        if (centerLeft) {
            centerLeft.parent = this
            if (!this.left) {
                this.left = centerLeft
            }
            this.left.add(dimension, deep + 1)
        }

        let centerRight = tree.getCenter(this.collectionRight, dimension)
        if (centerRight) {
            centerRight.parent = this
            if (!this.right) {
                this.right = centerRight
            }
            this.right.add(dimension, deep + 1)
        }

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
        for (let i = 0; i < num; i++) {
            const x = Math.random() * this.size.sizeX
            const y = Math.random() * this.size.sizeY
            this.collection.push(new Node(x, y))
        }
        return this
    }

    getCenter(collection, dimension) {
        const len = collection.length
        if (!len || len < 1) return false
        let total = 0
        for (let i = 0; i < len; i++) {
            if (dimension == 0) total += collection[i].x
            else if (dimension == 1) total += collection[i].y
        }
        const centerNum = total / len
        let center = null
        let defferMin = 99999999999999
        let index = 0

        let num
        if (dimension == 0) num = 'x'
        else if (dimension == 1) num = 'y'

        collection.map((ele, i) => {
            const deffer = Math.abs(ele[num] - centerNum)
            if (deffer < defferMin) {
                defferMin = deffer
                center = ele
                index = i
            }
        })
        collection.map((ele, i) => {
            if (i == index) return
            if (!ele[num] || !center[num]) return
            if (ele[num] < center[num]) center.collectionLeft.push(ele)
            else if (ele[num] > center[num]) center.collectionRight.push(ele)
        })
        return center
    }

    getNode(dimension) {
        let center = this.getCenter(this.collection, dimension)
        this.addToTree(center, dimension)
    }

    addToTree(newNode, dimension) {
        newNode.dimension = dimension
        this.root = newNode
        this.root.add(1, 1)
    }

}


