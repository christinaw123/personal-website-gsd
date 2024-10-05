attribute vec3 aPosition;
attribute vec2 aTexCoord;

varying vec2 pos;

uniform float millis;

void main() {
  pos = aTexCoord;

  vec4 position = vec4(aPosition, 1.0);
  position.xy = position.xy * 2. - 1.;
  position.y += cos(millis/500. + position.x * 8.)/8.;
  
  gl_Position = position;
}

