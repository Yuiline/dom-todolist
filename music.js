// ---------- 音乐系统 ----------

// 歌单：数组就是"有顺序的列表"，按播放顺序排好
const songs = [
  "5_20am(1) (1).mp3",   // 第 0 首
  "海愿.mp3"             // 第 1 首
]

let current = 0                          // 现在播到第几首
const bgm = new Audio(songs[current])    // 用 Audio 对象播放，不用 HTML 标签
bgm.volume = 0.6                         // 音量 0 ~ 1

const playIcon = document.getElementById("playIcon")
const nextIcon = document.getElementById("nextIcon")

// ---------- 播放 / 暂停：点一下切换 ----------
playIcon.addEventListener("click", function () {
  if (bgm.paused) {
    bgm.play()
  } else {
    bgm.pause()
  }
})

// ---------- 切歌 ----------
nextIcon.addEventListener("click", function () {
  current = (current + 1) % songs.length   // 最后一首的下一首回到第一首
  bgm.src = songs[current]
  bgm.play()
})

// ---------- 进度条 ----------

const progressEl   = document.getElementById("progress")      // 整条轨道
const progressFill = document.getElementById("progressFill")  // 已播放的部分
const progressDot  = document.getElementById("progressDot")   // 能拖的小圆点
const curTimeEl    = document.getElementById("curTime")       // 当前时间
const durTimeEl    = document.getElementById("durTime")       // 总时长

let isDragging = false    // 是否正在拖

// 把秒数变成 3:05 这种写法
function formatTime(sec) {
  if (!isFinite(sec)) return "0:00"                        // 总时长还没读到时的兜底
  const m = Math.floor(sec / 60)
  const s = String(Math.floor(sec % 60)).padStart(2, "0")
  return m + ":" + s
}

// 让进度条和两边的时间跟着播放位置走
function renderProgress() {
  const percent = bgm.duration ? (bgm.currentTime / bgm.duration) * 100 : 0
  progressFill.style.width = percent + "%"
  progressDot.style.left = percent + "%"
  curTimeEl.textContent = formatTime(bgm.currentTime)
  durTimeEl.textContent = formatTime(bgm.duration)
}

bgm.addEventListener("timeupdate", function () {
  if (!isDragging) renderProgress()    // 正在拖的时候，别让播放进度把拖到的位置抢回去
})
bgm.addEventListener("loadedmetadata", renderProgress)   // 读到总时长后先画一次

// 把"点在进度条的哪个位置"换算成"跳到第几秒"
function seekFromEvent(e) {
  const rect = progressEl.getBoundingClientRect()
  let ratio = (e.clientX - rect.left) / rect.width
  ratio = Math.min(1, Math.max(0, ratio))     // 限制在 0 ~ 1，拖出界也不会跳飞
  bgm.currentTime = ratio * bgm.duration
  renderProgress()
}

progressEl.addEventListener("pointerdown", function (e) {
  isDragging = true
  progressEl.setPointerCapture(e.pointerId)   // 指针移出轨道也继续收得到 move 事件
  seekFromEvent(e)
})

progressEl.addEventListener("pointermove", function (e) {
  if (isDragging) seekFromEvent(e)
})

progressEl.addEventListener("pointerup", function (e) {
  isDragging = false
  progressEl.releasePointerCapture(e.pointerId)
})

progressEl.addEventListener("pointercancel", function () {
  isDragging = false
})
