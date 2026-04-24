let input;
let slider;
let btn;
let closeBtn; // 新增：關閉按鈕變數
let isJittering = false; 
let sel; 
let iframeContainer;
let tkuiFrame;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // 1. 文字輸入框
  input = createInput('淡江大學');
  input.position(20, 20);
  input.size(200, 25);
  input.style('font-size', '20px');
  input.style('border-radius', '10px');
  input.style('background-color', '#F0F3F7'); 
  input.style('color', '#4f000b'); 

  // 2. 文字大小滑桿
  slider = createSlider(15, 80, 30);
  slider.position(270, 22);

  // 3. 彈跳按鈕
  btn = createButton('開啟彈跳效果'); 
  btn.position(450, 10);
  btn.size(130, 50);
  btn.style('font-size', '18px');
  btn.style('border-radius', '8px');
  btn.mousePressed(() => isJittering = !isJittering);

  // 4. 下拉式選單
  sel = createSelect();
  sel.position(600, 20);
  sel.option('淡江大學');
  sel.option('教科系');
  sel.style('height', '30px');
  sel.changed(changeSite);

  // 5. 新增：關閉網頁按鈕
  closeBtn = createButton('關閉網頁');
  closeBtn.position(720, 10); // 放在選單旁邊
  closeBtn.size(100, 50);
  closeBtn.style('font-size', '18px');
  closeBtn.style('border-radius', '8px');
  closeBtn.style('background-color', '#ffb3b3'); // 給它一個淡紅色區分
  // 點擊後隱藏整個容器
  closeBtn.mousePressed(() => iframeContainer.hide());

  // 6. iframe 容器
  iframeContainer = createDiv();
  iframeContainer.style('position', 'absolute');
  iframeContainer.style('top', '200px');
  iframeContainer.style('bottom', '200px');
  iframeContainer.style('left', '200px');
  iframeContainer.style('right', '200px');
  iframeContainer.style('box-shadow', '0px 10px 40px rgba(0,0,0,0.8)'); 
  iframeContainer.style('z-index', '10');
  iframeContainer.style('opacity', '0.98');

  tkuiFrame = createElement('iframe');
  tkuiFrame.attribute('src', 'https://www.tku.edu.tw');
  tkuiFrame.style('width', '100%');
  tkuiFrame.style('height', '100%');
  tkuiFrame.style('border', 'none');
  tkuiFrame.parent(iframeContainer);
}

function draw() {
  background('#4f000b'); 

  let str = input.value();

  if (str.length > 0) {
    let currentSize = slider.value();
    textSize(currentSize);
    let tw = textWidth(str);

    if (tw > 0) {
      let palette = ['#ffffff', '#ffcecc', '#ff7f7f', '#ffb3b3', '#ffd9d9']; 
      
      for (let y = 100; y < height; y += currentSize + 35) {
        let colIdx = 0;
        for (let x = 0; x < width; x += tw + 30) {
          fill(palette[colIdx % palette.length]);

          let bounceY = 0;
          if (isJittering) {
            bounceY = sin(frameCount * 0.1 + x * 0.05) * 25;
          }

          text(str, x, y + bounceY);
          colIdx++;
        }
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function changeSite() {
  let val = sel.value();
  
  // 當使用者選了新站點，自動把網頁視窗秀出來
  iframeContainer.show();

  if (val === '淡江大學') {
    tkuiFrame.attribute('src', 'https://www.tku.edu.tw');
    input.value('淡江大學');
  } else if (val === '教科系') {
    tkuiFrame.attribute('src', 'https://www.et.tku.edu.tw/');
    input.value('教科系');
  }
}