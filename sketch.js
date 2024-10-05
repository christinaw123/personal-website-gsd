let song;
let amplitude;
let imageSize = 100; // Size of the image
let beatThreshold = 0.2; // Adjust this threshold to control sensitivity to beats
let img; // Variable to hold the image
let prevMouseX;
let prevMouseY;
let currentAngle = 0;
let targetAngle = 0;
let angleInterpolation = 0.1; // Adjust this value to control the smoothness of rotation
let cols;
let rows;
let currentR, currentG, currentB;
let prevR, prevG, prevB;
let cPick;
let r = 255;
let g = 0;
let b = 0;
let showColorPicker = false;
let dampening = 0.999;
let bg = (153, 192, 227);

function preload() {
  soundFormats('mp3');
  waterSound = loadSound('assets/watersound.mp3');
  song = loadSound('assets/HatachiNoKoi.mp3');
  img = loadImage('assets/pinkjelly.png');
}

//keys
function keyPressed() {
  if (key === "h") {
    showColorPicker = true;
  }
  if (key === "s") {
    saveCanvas("screenshot", "png");
  }
}

function setup() {
  //sound
  amplitude = new p5.Amplitude();
  song.play();
  song.setVolume(0.65);
  waterSound.setVolume(0.5);
  //store mouse position
  prevMouseX = mouseX;
  prevMouseY = mouseY;
  //color picker
  cPick = createColorPicker("deeppink");
  cPick.position(10, 10);
  cPick.size(100, 100);
  cPick.hide();
  cPick.input(updateRGB); // Call updateRGB function when color picker value changes
  updateRGB();

  pixelDensity(1);
  createCanvas(windowWidth/2, windowHeight);

  cols = width;
  rows = height;

  // all current arrays
  currentR = new Array(cols).fill(bg).map(() => new Array(rows).fill(bg));
  currentG = new Array(cols).fill(bg).map(() => new Array(rows).fill(bg));
  currentB = new Array(cols).fill(bg).map(() => new Array(rows).fill(bg));

  // all previous arrays
  prevR = new Array(cols).fill(bg).map(() => new Array(rows).fill(bg));
  prevG = new Array(cols).fill(bg).map(() => new Array(rows).fill(bg));
  prevB = new Array(cols).fill(bg).map(() => new Array(rows).fill(bg));
}

function draw() {
  if (showColorPicker) {
    cPick.show();
  } else {
    cPick.hide();
  }

  if (mouseIsPressed) {
    background(bg);
    loadPixels();
    brush1();
    let level = amplitude.getLevel();

    // Check if the current level exceeds the beat threshold
    if (level > beatThreshold) {
      // Increase image size
      imageSize += 10;
      // Ensure image size doesn't exceed 200
      imageSize = min(imageSize, 200);
    } else if (imageSize > 100) {
      // Decrease image size gradually, but keep it above 100
      imageSize -= 5;
    }
  
    //calculate angle
    targetAngle = atan2(mouseY - prevMouseY, mouseX - prevMouseX);
  
    //make transition smooth between current and target angles
    currentAngle = lerp(currentAngle, targetAngle, angleInterpolation);
  
    //update image rotation
    push();
    translate(mouseX, mouseY);
    rotate(currentAngle + HALF_PI); // Add HALF_PI (90 degrees) to face the top of the image
  
    imageMode(CENTER);
    image(img, 0, 0, imageSize, imageSize);
    pop();
  
    // Update previous mouse position
    prevMouseX = mouseX;
    prevMouseY = mouseY;
  }
  if (mouseIsPressed != true) {
    noFill();
  }

 
}

function brush1() {
  // ripple effect
  for (let i = 1; i < cols - 1; i++) {
    for (let j = 1; j < rows - 1; j++) {
      // pixel values
      let { cR, cG, cB } = processPixel(i, j);

      //dampening
      cR *= dampening;
      cG *= dampening;
      cB *= dampening;

      // update current color arrays
      currentR[i][j] = cR;
      currentG[i][j] = cG;
      currentB[i][j] = cB;

      // pixel colors in the pixels array
      let index = (i + j * cols) * 4;
      pixels[index + 0] = cR;
      pixels[index + 1] = cG;
      pixels[index + 2] = cB;
    }
  }
  updatePixels();

  // swap current and previous arrays
  swap(prevR, currentR);
  swap(prevG, currentG);
  swap(prevB, currentB);
}

function keyReleased() {
  showColorPicker = false;
}

// update rgb w color picker
function updateRGB() {
  let colorValue = cPick.color();
  r = red(colorValue);
  g = green(colorValue);
  b = blue(colorValue);
}

function mouseDragged() {
  prevR[mouseX][mouseY] = r;
  prevG[mouseX][mouseY] = g;
  prevB[mouseX][mouseY] = b;
}

// function to calculate intensity value
function intensityV(previous, current, i, j) {
  return (
    (previous[i - 1][j] +
      previous[i + 1][j] +
      previous[i][j - 1] +
      previous[i][j + 1]) /
      2 -
    current[i][j]
  );
}

function processPixel(i, j) {
  // intensity values for each color channel
  let intensityR = intensityV(prevR, currentR, i, j);
  let intensityG = intensityV(prevG, currentG, i, j);
  let intensityB = intensityV(prevB, currentB, i, j);

  // make intensity values within [0, 255] range
  let cR = Math.min(Math.max(intensityR, 0), 255);
  let cG = Math.min(Math.max(intensityG, 0), 255);
  let cB = Math.min(Math.max(intensityB, 0), 255);

  return { cR, cG, cB };
}

// swap current and previous arrays
function swap(prev, curr) {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let temp = prev[i][j];
      prev[i][j] = curr[i][j];
      curr[i][j] = temp;
    }
  }
}

function mousePressed() {
  waterSound.play();
}
