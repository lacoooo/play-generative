;

class Spring {

    constructor(x = 0, y = 0, dist = 0, maxSpeed, distLine = 0) {
        this.x = x
        this.y = y
        this.dist = dist
        this.distLine = distLine
        this.maxSpeed = maxSpeed || this.dist / 500
        this.acRate = 1 / 400 //加速度比率

        this.nextPoint = null

        this.nextP = null

        this.lineMode = false

    }

    get _distX() {
        const x = Math.floor(Math.abs(this.x - this.nextP.x))
        return x || 0
    }

    get _distY() {
        const y = Math.floor(Math.abs(this.y - this.nextP.y))
        return y || 0
    }
    get _distR() {
        const r = Math.floor(Math.sqrt(Math.pow(this._distX, 2) + Math.pow(this._distY, 2)))
        return r || 0
    }

    /**
     * 
     * 更新当前点 x, y, z
     */
    update(nextP) {
        this.lineMode = false
        this.nextP = nextP
        const distance = this.dist || options.dist || 100
        if (this._distR == distance) return
        if (this._distR < distance) {
            this.stretch(nextP, 0.2)
        } else {
            this.pull(nextP, 0.1)
        }

    }

    /**
     * 
     * 如果有关联点，相互制约。更新当前点 x, y, z
     */
    updateLine() {
        this.lineMode = true
        if (!this.nextPoint) return
        this.nextP = this.nextPoint
        const distance = this.distLine || options.distLine || 100
        if (this._distR == distance) return
        if (this._distR < distance) {
            this.stretch(this.nextPoint, 1)
        } else {
            this.pull(this.nextPoint, 1)
        }
        this.nextPoint.update(this)
    }

    /**
     * 推开
     * @param {*} nextP 
     * @param {Number} s 强度
     */
    stretch(nextP, s) {
        const dist = this.lineMode ? this.distLine || options.distLine : this.dist || options.dist
        const delta = (dist || 100) - this._distR
        const rate = delta / this._distR
        // x轴等比缩放量
        const deltaX = (rate * this._distX * this.acRate).toFixed(2) * s || 0
        // y轴等比缩放量
        const deltaY = (rate * this._distY * this.acRate).toFixed(2) * s || 0
        if (this.x < nextP.x) this.x -= deltaX
        else if (this.x > nextP.x) this.x += deltaX
        if (this.y < nextP.y) this.y -= deltaY
        else if (this.y > nextP.y) this.y += deltaY
    }

    /**
     * 推开
     * @param {*} nextP 
     * @param {Number} s 强度
     */
    pull(nextP, s) {
        const dist = this.lineMode ? this.distLine || options.distLine : this.dist || options.dist
        // 距离超出的部分
        const delta = this._distR - (dist || 100)
        const rate = delta / this._distR
        // x轴等比缩放量
        const deltaX = (rate * this._distX * this.acRate).toFixed(2) * s || 0
        // y轴等比缩放量
        const deltaY = (rate * this._distY * this.acRate).toFixed(2) * s || 0
        if (this.x < nextP.x) this.x += deltaX
        else if (this.x > nextP.x) this.x -= deltaX
        if (this.y < nextP.y) this.y += deltaY
        else if (this.y > nextP.y) this.y -= deltaY
    }

}