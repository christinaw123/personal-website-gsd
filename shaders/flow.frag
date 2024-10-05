//adapted from https://github.com/lewislepton/shadertutorialseries/tree/master/015_waterColor02 
precision mediump float;

varying vec2 pos;

uniform vec2 u_resolution;
uniform float u_time;
uniform float amplitude;


void main() {
  vec2 coord = 3.0 * gl_FragCoord.xy / u_resolution;
  
  for(int n = 1; n < 10; n++){
    float i = float(n);
    coord -= vec2(0.7/i*sin(i*coord.y * amplitude + 0.3 * i) +0.8, 0.4/i * sin(coord.x + u_time + 0.3 * i) +1.6);
}
  
  vec3 color = vec3(0.5 * sin(coord.y) + 0.7, 0.9 * sin(coord.y) - 0.1, sin(0.0));
  gl_FragColor = vec4(color, 1.0);

}
