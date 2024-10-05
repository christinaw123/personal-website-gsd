//adapted circle function from https://www.shadertoy.com/view/3tdSRn
//adapted image deformation from https://editor.p5js.org/BarneyCodes/sketches/Ema18Yjqj and https://www.shadertoy.com/view/mtyGWy



precision mediump float;
varying vec2 pos;
uniform float millis;
uniform float amplitude;

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

    // Center of the image
    vec2 center = vec2(0.5, 0.5);
    
    // Calculate displacement based on distance from the center
    vec2 displacement = normalize(pos - center);

    // Warp position
    vec2 newPos = pos - displacement * (amplitude / 2.0 + 8.0);
    newPos = fract(newPos * 5.0);

    // Define circle parameters
    float circleRadius = 0.4 + amplitude; 
    float circleWidth = 0.02; 
    float circlePower = 0.1; 
    vec4 circleColor = vec4(1.0, 1.0, 1.0, 1.0); // White color for the circle

    // Create the circle using the drawCircle function
    vec3 circle = drawCircle(newPos, circleRadius, circleWidth, circlePower, circleColor);

    // Adjusting the formula to focus on red variations
    vec3 dynamicRed = 1.5 + 1.5 * sin(amplitude + pos.xyx + vec3(285, 39, 0));
    
    // Final color
    vec4 backgroundColor = vec4((dynamicRed.x + dynamicRed.y) / 3.0, 0.5 * cos(time), 0.0, 0.9 - cos(amplitude) * sin(amplitude));

    // Blend the circle color with the dynamic red background using the distance-based blend factor
    gl_FragColor = mix(vec4(circle, 1.0), backgroundColor, length(pos - center));
}
