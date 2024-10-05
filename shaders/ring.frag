//adapted from https://p5js.org/reference/#/p5.FFT and https://github.com/lewislepton/shadertutorialseries/blob/master/021_circleOfLights/021_circleOfLights.frag 
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform bool u_beat;
uniform float amplitude;


void main(){
    vec2 coord = gl_FragCoord.xy / u_resolution;
    vec3 color = vec3(0.0);
    vec2 translate = vec2(-1,-1);
    coord +=translate;

    //draws ring of light
    for(int i = 0; i<40;i++){
        //spread of circle
        float radius = 0.9 * amplitude;
        //full circle 360 degrees split into 40 parts
        float rad = radians(360.0/40.0) * float(i);
        color += 0.003 / length(coord+vec2(radius*cos(rad), radius * sin(rad))*abs(sin(u_time*0.9)));
    }

    //color gradient
    color.r += abs(0.2+length(coord)*abs(sin(u_time*0.9)-amplitude));
    color.g += abs(0.05+length(coord)*abs(sin(u_time*0.9)-amplitude));

    gl_FragColor = vec4(color, 1.0);
}