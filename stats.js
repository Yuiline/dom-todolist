// ---------- 好感度 / 金币 ----------

const SAVE_KEY = "yuiline_save"     // 存在浏览器本地的"存档名"
const FAVOR_MAX = 1000              // 好感度上限
const TICK_MS = 2 * 60 * 1000       // 2 分钟 = 120000 毫秒

// 读存档：第一次打开没有存档，就用初始值
function loadSave() {
  try {
    const raw = localStorage.getItem(SAVE_KEY)
    if (!raw) return { favor: 0, coin: 0 }
    const data = JSON.parse(raw)
    return { favor: data.favor || 0, coin: data.coin || 0 }
  } catch (e) {
    console.warn("存档读取失败，先用初始值：", e)
    return { favor: 0, coin: 0 }
  }
}

let save = loadSave()

// 写存档：把对象变成字符串再存进去
function persist() {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(save))
  } catch (e) {
    console.warn("存档保存失败：", e)
  }
}

// ---------- 面板显示 ----------

const statsPanel = document.getElementById("statsPanel")
const favorVal = document.getElementById("favorVal")
const coinVal = document.getElementById("coinVal")

function renderStats() {
  favorVal.textContent = save.favor
  coinVal.textContent = save.coin
}

// 点"好感度"图标 → 打开 / 关闭
document.getElementById("menuFavor").addEventListener("click", function () {
  renderStats()
  statsPanel.classList.toggle("open")
})

// 点面板本身 → 关掉
statsPanel.addEventListener("click", function () {
  statsPanel.classList.remove("open")
})

// 点"设置" → 询问是否保存
document.getElementById("menuSetting").addEventListener("click", function () {
  if (confirm("需要保存吗？")) {
    persist()
    console.log("已保存：", localStorage.getItem(SAVE_KEY))
  }
})

// ---------- 挂机收益：每 2 分钟 +1 好感 +1 金币 ----------

setInterval(function () {
  if (save.favor < FAVOR_MAX) save.favor += 1   // 到 1000 就不再涨
  save.coin += 1                                // 金币没有上限
  persist()
  renderStats()
}, TICK_MS)

renderStats()

// ---------- 给商店等模块调用的两个函数 ----------

// 加好感度：自动卡在 1000 上限
function addFavor(n) {
  save.favor = Math.min(FAVOR_MAX, save.favor + n)
  persist()
  renderStats()
}

// 扣金币：够就扣并返回 true，不够就返回 false 什么都不做
function spendCoin(n) {
  if (save.coin < n) return false
  save.coin -= n
  persist()
  renderStats()
  return true
}
