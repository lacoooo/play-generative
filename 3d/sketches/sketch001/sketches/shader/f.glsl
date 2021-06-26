uniform float time;
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

mat4 rotationMatrix(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;
    
    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                0.0,                                0.0,                                0.0,                                1.0);
}

vec3 rotate(vec3 v, vec3 axis, float angle) {
    mat4 m = rotationMatrix(axis, angle);
    return (m * vec4(v, 1.0)).xyz;
}

float line(float p, float index) {
    return step(p, index * 1.0 / 5.0) - step(p, (index - 1.) * 1.0 / 5.0);
}

vec3 getColor(float i) {
    vec3 c1 = vec3(0.3451, 0.5059, 0.6588)    * line(i, 1.);
    vec3 c2 = vec3(0.2627, 0.3961, 0.6275) * line(i, 2.);
    vec3 c3 = vec3(0.1922, 0.3804, 0.1922)    * line(i, 3.);
    vec3 c4 = vec3(0.0941, 0.498, 0.8078)    * line(i, 4.);
    vec3 c5 = vec3(.5, .8, .2)    * line(i, 5.);

    return c1 + c2 + c3 + c4 + c5;
}

void main() {

    float pi = 3.1415926;
    vec3 n = rotate(vNormal, vec3(0., 1., 0.), -time);

    float diff = dot(vec3(1.), n);

    // gl_FragColor = vec4( getColor(fract(vUv.y * 3. + time / 2.)), 1.);
    gl_FragColor = vec4( getColor(fract(vUv.y * 3. + time)) + 0.3 * vec3(diff), 1.);
    // gl_FragColor = vec4( n, 1.);
}