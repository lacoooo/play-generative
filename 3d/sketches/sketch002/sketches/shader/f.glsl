uniform float time;
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vColor;

float pi = 3.1415926;

void main() {

    vec3 n = normalize(  cross(dFdx(vColor),  dFdy(vColor))  );

    float diff = dot(n, vec3(1., 0., 0.));

    gl_FragColor = vec4(vec3(.1), 1.);
}