function cartesian(n) {
    return createVector(cos(n), sin(n))
}

function astroid(n) {
    const sinn = sin(n)
    const cosn = cos(n)
    
    const xt = sq(sinn) * sinn
    const yt = sq(cosn) * cosn
    
    return createVector(xt, yt)
}

function cissoid(n) {
    const sinn2 = 2 * sq(sin(n))
    
    const xt = sinn2
    const yt = sinn2 * tan(n)
    
    return createVector(xt, yt)
}

function kampyle(n) {
    const sec = 1 / sin(n)
    
    const xt = sec
    const yt = tan(n) * sec

    return createVector(xt, yt)
}

function rect_hyperbola(n) {
    const sec = 1 / sin(n)
    
    const xt = 1 / sin(n)
    const yt = tan(n)
    
    return createVector(xt, yt)
}

function superformula(n) {
    const superformula_a = 1
    const superformula_b = 1
    const superformula_m = 6
    const superformula_n1 = 1
    const superformula_n2 = 7
    const uperformula_n3 = 8
    f1 = pow(abs(cos(superformula_m*n/4)/superformula_a), superformula_n2)
    f2 = pow(abs(sin(superformula_m*n/4)/superformula_b), superformula_n3)
    fr = pow(f1 + f2, -1/superformula_n1)
    
    xt = cos(n) * fr
    yt = sin(n) * fr
    
    return createVector(xt, yt)
}

function swirl(p, weight = 1) {
    const r2 = sq(p.x) + sq(p.y)
    const sinr = sin(r2)
    const cosr = cos(r2)
    const newX = 0.8 * (sinr * p.x - cosr * p.y)
    const newY = 0.8 * (cosr * p.y + sinr * p.y)
    return createVector(weight * newX, weight * newY)
}

function sinusoidal(v, amount = 1) {
return createVector(amount * sin(v.x), amount * sin(v.y))
}

function waves2(p, weight = 1) {
const x = weight * (p.x + 0.9 * sin(p.y * 4))
const y = weight * (p.y + 0.5 * sin(p.x * 5.555))
return createVector(x, y)
}

function polar(p, weight = 1) {
    const r = p.mag()
    const theta = atan2(p.x, p.y)
    const x = theta / PI
    const y = r - 2.0
    return createVector(weight * x, weight * y)
}

function hyperbolic(v, amount = 1) {
    const r = v.mag() + pow(10, -10)
    const theta = atan2(v.x, v.y)
    const x = amount * sin(theta) / r
    const y = amount * cos(theta) * r
    return createVector(x, y)
}

function power(p, weight = 1) {
    const theta = atan2(p.y, p.x)
    const sinr = sin(theta)
    const cosr = cos(theta)
    const pow = weight * pow(p.mag(), sinr)
    return createVector(pow * cosr, pow * sinr)
}

function cosine(p, weight = 1) {
    const pix = p.x * PI
    const x = weight * 0.8 * cos(pix) * cosh(p.y)
    const y = -weight * 0.8 * sin(pix) * sinh(p.y)
    return createVector(x, y)
}

function cross(p, weight = 1) {
const r = sqrt(1.0 / (sq(sq(p.x)-sq(p.y))) + pow(10, -10))
return createVector(weight * 0.8 * p.x * r, weight * 0.8 * p.y * r)
}

function vexp(p, weight = 1) {
const r = weight * exp(p.x)
return createVector(r * cos(p.y), r * sin(p.y))
}

function pdj(v, amount = 1) {
    const pdj_a = 0.1
    const pdj_b = 1.9
    const pdj_c = -0.8
    const pdj_d = -1.2
    return createVector( amount * (sin(pdj_a * v.y) - cos(pdj_b * v.x)), amount * (sin(pdj_c * v.x) - cos(pdj_d * v.y)))
}

function cosh(x) { return 0.5 * (exp(x) + exp(-x))}
function sinh(x) { return 0.5 * (exp(x) - exp(-x))}