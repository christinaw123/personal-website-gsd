//adapted circle function from https://www.shadertoy.com/view/3tdSRn
//adapted image deformation from https://editor.p5js.org/BarneyCodes/sketches/Ema18Yjqj and https://www.shadertoy.com/view/mtyGWy

precision mediump float;
varying vec2 pos;
uniform float amplitude;
uniform float millis;

// Define the drawCircle function
vec3 drawCircle(vec2 pos, float radius, float width, float power, vec4 color) {
    float dist = length(pos);
    float edge = width / radius;
    float alpha = 1.0 - smoothstep(radius - edge, radius + edge, dist);
    return color.rgb * pow(alpha, power);
}

void main() {
    // Convert millis to seconds for consistent time-based calculations
    float time = millis / 1000.0;
    vec2 center = vec2(0.5, 0.5);

    // Parameters for the circle's animation
    float radius = 0.5 + amplitude * 0.1; // Radius will pulse over time
    float width = 5.0;
    float power = 0.1;

    // distance from the center
    float h = length(pos - vec2(0.5)) * 5.0;
  //yellow to red
    vec4 color = vec4(h + sin(time), h + sin(time) * 3.0, 0.0, 0.5);

    // deforming effect
    vec2 newPos = pos - normalize(pos - vec2(0.5)) * (amplitude / 1.0 + 9.0);
    newPos = fract(newPos * 2.0);

    // Use the deformed position for circle generation
    vec2 circlePos = (newPos * 20.0 - vec2(1.0, 1.0)) / min(1.0, 1.0);

    // Create the circles with deformed positions
    vec3 circleColor = drawCircle(circlePos, radius, width, power, color);

    // Set the final color to the circle color
    gl_FragColor = vec4(circleColor, length(pos - center));
}
