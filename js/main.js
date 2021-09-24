const colors = ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#bdb2ff']; // 隨機亮燈顏色
let randLightTimeId; // 隨機亮燈計時器
let count = 0; // 機器要跑的格數，隨機產生
let num = 0; // 記錄目前跑到第幾格
let sec = 1000; // 跑格子時的延遲時間
let lotteryStatus = 'ready'; // 機台目前狀態 ready準備就緒，running抽獎中，end抽獎完畢

window.onload = () => {
  setStar();
  randLightTimeId = setInterval(randLight, 500);
  document.getElementById('start').addEventListener('click', () => {
    if (lotteryStatus === 'ready') lottery();
    else if (lotteryStatus === 'end') reset();
    else if (lotteryStatus === 'running') return;
  }, false)
}


/**
 * 產生隨機數字
 * 
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @return {Number} 隨機數字
 */
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


/**
 * 根據螢幕寬度，設置星星吊燈
 */
function setStar() {
  let count = window.innerWidth / 50;
  for (let i = 0; i < count; i++) {
    let star = document.createElement('div');
    star.className = 'star';
    star.style.marginTop = '-' + rand(1, 120) + 'px'
    document.getElementById('stars').appendChild(star);
  }
}


/**
 * 清除所有獎品燈
 */
function clearLight() {
  for (let i = 1; i <= 12; i++) {
    document.getElementById(`box${i}`).style.backgroundColor = '#ffffff';
  }
}


/**
 * 獎品隨機亮燈
 */
function randLight() {
  clearLight();
  document.getElementById(`box${rand(1, 12)}`).style.backgroundColor = colors[rand(0, colors.length - 1)]
  document.getElementById(`box${rand(1, 12)}`).style.backgroundColor = colors[rand(0, colors.length - 1)]
}


/**
 * 重置機台
 */
function reset() {
  clearLight();
  randLightTimeId = setInterval(randLight, 500);
  document.getElementById('start').innerText = "START";
  document.getElementById('start').classList.remove('reset');
  document.getElementById('centerBox').innerHTML = "<span>?</span>";
  document.getElementById('centerBox').classList.remove('radiation');
  lotteryStatus = 'ready';
}



/**
 * 抽獎
 */
function lottery() {
  count = rand(12, 36);
  num = 0
  sec = 1000
  clearInterval(randLightTimeId);
  clearLight();
  lotteryStatus = 'running';
  turnbox();
}


/**
 * 獎品輪流亮燈
 */
function turnbox() {
  if (num < count) {
    clearLight();
    document.getElementById(`box${num % 12 + 1}`).style.backgroundColor = "#ffd700";
    document.getElementById('centerBox').innerHTML = `<img src="./image/${num % 12 + 1}.png" alt="">`;
    num++;
    if (num === 2) sec = 100
    sec += 20;
    setTimeout(turnbox, sec);
  } else {
    lotteryStatus = 'end';
    document.getElementById('centerBox').classList.add('radiation');
    document.getElementById('start').classList.add('reset');
    document.getElementById('start').innerText = "RESET";
  }
}




