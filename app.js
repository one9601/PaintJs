// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D 참고 

const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".jsColor");
const range = document.querySelector("#jsRange");
const mode = document.querySelector("#jsMode");
const clear = document.querySelector("#jsClear");
const saveBtn = document.querySelector("#jsSave");

const INITIAL_COLOR = "#2c2c2c";

// canvas.width = 700;
// canvas.height = 700;
// 700으로 지정할 수 있지만 오류 생길 여지 + 반응형 고려를 할 수 없으므로 아래와 같이 기재
let CANVAS_WIDTH = document.querySelector(".canvas").offsetWidth;
let CANVAS_HEIGHT = document.querySelector(".canvas").offsetHeight;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
// canvas사이즈 지정

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
ctx.strokeStyle= INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
// 선 색상 지정 (기본색상)
ctx.lineWidth = 2.5;
// 단위는 px
// ctx.fillRect(50, 20, 100, 40);
// x,y,width,height

let painting = false;
let filling = false;
function startPainting(){
  if(filling === false){
    painting = true;
  }
}
function stopPainting(){
  painting= false;
}


// =====리셋=====

function handleReset(){
  ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

if(clear){
  clear.addEventListener("click", handleReset);
}

// =====리셋=====


function onMouseMove(event){
  // console.log(event);
  const x = event.offsetX;
  const y = event.offsetY;
  if(!painting){
    ctx.beginPath();
    // beginPath = 패스생성
    ctx.moveTo(x, y);
    // 선이 생기진 않지만 좌표값은 계속 구하는중
  } else {
    ctx.lineTo(x, y);
    // lineTo : 마지막 점을 특정 좌표와 직선으로 연결
    ctx.stroke();
    // 좌표값을 통해 선을 색칠중
  }
}

function handleCanvasClick(){
  if (filling){
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function handleCM(event){
  event.preventDefault();
}



if(canvas){
  // canvas존재여부 확인
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);

  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}




// =========선 등 색상 변경=========

// function changeColor(event){
//   const color = event.target.style.backgroundColor;
//   ctx.strokeStyle = color;
//   ctx.fillStyle = color;
// }

function changeColor(event){
  const color = event.target.style.backgroundColor;
  if(filling === true){
      const bg_color = color;
      ctx.fillStyle = bg_color;
  }else{
      const painting_color = color;
      ctx.strokeStyle = painting_color;
  }
  console.log(ctx.fillStyle, ctx.strokeStyle);
}


// Array.from(colors).forEach(color => color.addEventListener("click", changeColor));
Array.from(colors).forEach(function(color){
  color.addEventListener("click", changeColor);
});
// colors로부터 array(배열)을 생성 후 반복문 재생. 색상을 클릭 시 마다 changeColor 작동.

// =========선 등 색상 변경=========




// =========선 굵기 변경=========

function changeRange(event){
  const size = event.target.value;
  ctx.lineWidth =size;
}

if(range){
  range.addEventListener("input", changeRange);
}

// =========선 굵기 변경=========


// =========배경 색칠=========

function changeBg(){
  if(filling === true){
    filling = false;
    mode.innerText ="Fill"
  } else {
    filling = true;
    mode.innerText = "Paint"
  }
}

if(mode){
  mode.addEventListener("click", changeBg);
}

// =========배경 색칠=========


// =========저장=========

function handleSaveClick(){
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  // link.href = image;
  link.download = "PaintJs[EXPORT]";
  link.click();
}

if(saveBtn){
  saveBtn.addEventListener("click", handleSaveClick);
}

// =========저장=========

function changeColor(event){
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}
