// declare variables:
let gridSize = 32;
let currentMode = 'color';
const canvasColor = 'rgb(40, 40, 40)';

const canvas = document.querySelector('.canvas');
const controlPanel = document.querySelector('.control-panel');
let gridSquares = document.querySelectorAll('.gridsquare');

const colorPicker = controlPanel.querySelector('#color-pick');
const clearBtn = controlPanel.querySelector('#clear-btn');
const eraserBtn = controlPanel.querySelector('#eraser-btn');
const rainbowBtn = controlPanel.querySelector('#rainbow-btn');
const sliderText = controlPanel.querySelector('#slider-text');
const sizeSlider = controlPanel.querySelector('#slider');

// declare functions:
function generateGrid(size){ 
  const squareSize = 100 / size;
  for(let i = 0; i < size * size; i++){ 
    let cell = document.createElement("div"); 
    cell.className = "gridsquare";
    cell.style.cssText = `background-color: ${canvasColor}; width: ${squareSize}%; height: ${squareSize}%;`;
    canvas.appendChild(cell);
  } 
}

function deleteGrid(){
  canvas.innerHTML = '';
}

function setGridSize(size) {
  gridSize = size;
}

let mouseDown = false;
canvas.onmousedown = function() { mouseDown = true; }
canvas.onmouseup = function() { mouseDown = false; }
function colorSquare(square){
  square.addEventListener('mouseover', function () {
    if(mouseDown){
      if(currentMode === 'color'){  
        square.style.backgroundColor = `${colorPicker.value}`;
      }else if(currentMode === 'rainbow'){
        let r = Math.floor(Math.random()*255);
        let g = Math.floor(Math.random()*255);
        let b = Math.floor(Math.random()*255);
        square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
      }
      else if(currentMode === 'erase'){
        square.style.backgroundColor = `${canvasColor}`;
      }
    }
  });
}

function enableDraw(){
  gridSquares = document.querySelectorAll('.gridsquare');
  gridSquares.forEach(colorSquare);
}

function clearGrid(){
  gridSquares.forEach((square) => {
    if(square.style.backgroundColor !== canvasColor){
      square.style.backgroundColor = canvasColor;
    }
  })
}

let eraserBtnState = false;
let rainbowBtnState = false;
function whenEraserBtnPressed(){
  if(!eraserBtnState){
    currentMode = 'erase';
    eraserBtnState = true;
    eraserBtn.style.cssText = 'border-color: red';
    eraserBtn.innerHTML = "Eraser On";
  }else if(eraserBtnState){
    if(rainbowBtnState){
      currentMode = 'rainbow';
    }else {
      currentMode = 'color';
    }
    eraserBtnState = false;
    eraserBtn.style.cssText = 'border-color: #fff';
    eraserBtn.innerHTML = "Eraser Off";
  }
}
function whenRainbowBtnPressed(){
  if(!rainbowBtnState){
    if(eraserBtnState){
      currentMode = 'erase';
    }else {
      currentMode = 'rainbow';
    }
    rainbowBtnState = true;
    rainbowBtn.style.cssText = 'border-color: cyan';
    rainbowBtn.innerHTML = "Rainbow Mode On";
  }else if(rainbowBtnState){
    if(eraserBtnState){
      currentMode = 'erase';
    }else {
      currentMode = 'color';
    }
    rainbowBtnState = false;
    rainbowBtn.style.cssText = 'border-color: #fff';
    rainbowBtn.innerHTML = "Rainbow Mode Off";
  }
}

function changeSliderText(){
  sliderText.innerHTML = `${sizeSlider.value} x ${sizeSlider.value}`;
}

function redrawGrid(){
  deleteGrid();
  setGridSize(sizeSlider.value);
  generateGrid(gridSize);
  enableDraw();
}

// call functions:
generateGrid(gridSize);
enableDraw();
eraserBtn.addEventListener('mousedown', whenEraserBtnPressed);
clearBtn.addEventListener('click', clearGrid);
rainbowBtn.addEventListener('mousedown', whenRainbowBtnPressed);
sizeSlider.addEventListener('input', changeSliderText);
sizeSlider.addEventListener('change', redrawGrid);