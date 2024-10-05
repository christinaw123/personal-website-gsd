let song, fft, waveform, spectrum;
let sunShader, flower1Shader, flower2Shader, flowShader;
let isPlaying = false;
let amplitude;
let currentShader;

function preload() {
  song = loadSound('assets/thisisalife.mp3');
  sunShader = loadShader('shaders/vshader.vert', 'shaders/ring.frag');
  flower1Shader = loadShader('shaders/flower1.vert', 'shaders/flower1.frag');
  flower2Shader = loadShader('shaders/flower2.vert', 'shaders/flower2.frag');
  flowShader = loadShader('shaders/flow.vert', 'shaders/flow.frag');
}

function setup() {
  createCanvas(windowWidth*0.75, windowHeight, WEBGL);
  amplitude = new p5.Amplitude();
  fft = new p5.FFT();
  currentShader = shader1;

  document.getElementById('sunShaderButton').addEventListener('click', function(){
    switchShader(shader1);
  });
  
  document.getElementById('flower1ShaderButton').addEventListener('click', function(){
    switchShader(shader2);
  });

  document.getElementById('flower2ShaderButton').addEventListener('click', function(){
    switchShader(shader3);
  });

  document.getElementById('flowShaderButton').addEventListener('click', function(){
    switchShader(shader4);
  });

  document.getElementById('PlayButton').addEventListener('click', function(){
    startAudioPlayback();
  });

  document.getElementById('PauseButton').addEventListener('click', function(){
    pauseAudioPlayback();
  });
}

function draw() {
  background(0) 
  waveform = fft.waveform();
  spectrum = fft.analyze();
  if (isPlaying) {
    currentShader(); //call current shader only if audio is playing
  }
}

function startAudioPlayback() {
  if (!isPlaying) {
    song.loop(); // Enable looping
    isPlaying = true;
  }  
}

function pauseAudioPlayback() {
  if(isPlaying){
    song.pause();
    isPlaying = false;
    // Clear the canvas when pausing the audio to pause the shader effect
    clear();
  }
}

function shader1(){
  //set shader
  shader(sunShader);
  // Set sunshader uniforms
  sunShader.setUniform('u_resolution', [width, height]);
  let level = amplitude.getLevel();
  sunShader.setUniform("amplitude", level);
  sunShader.setUniform('u_time', millis() / 1000);
  sunShader.setUniform('u_mouse', [mouseX, mouseY]);

  // Draw a quad covering the entire canvas
  quad(-width/2, -height/2, width/2, -height/2, width/2, height/2, -width/2, height/2);
}

function shader2(){
  //set shader
  shader(flower1Shader);
  // Update the uniform 'amplitude' to the current amplitude level
  let level = amplitude.getLevel();
  flower1Shader.setUniform("amplitude", level);
  flower1Shader.setUniform('millis', millis());

  // Draw a rectangle that covers the entire canvas
  rect(-width / 2, -height / 2, width, height);
}

function shader3(){
      //set shader
      shader(flower2Shader);
      // Run shader
      let level = amplitude.getLevel();
      flower2Shader.setUniform("amplitude", level);
      flower2Shader.setUniform("millis", millis());
      rect(-width / 2, -height / 2, width, height);
}

function shader4(){
  //set shader
  shader(flowShader);
  let level = amplitude.getLevel();
  flowShader.setUniform("amplitude", level);
  flowShader.setUniform('u_resolution', [width, height]);
  flowShader.setUniform('u_time', millis() / 1000.0); // Pass time to the shader
  rect(0, 0, width, height); // Draw a rectangle covering the whole screen to apply the shader
}

function switchShader(shaderFunction){
  currentShader = shaderFunction;
}
