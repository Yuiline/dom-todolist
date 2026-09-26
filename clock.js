// ---------- 时钟 ----------

const clockEl = document.getElementById("clock")

function updateClock() {
  const now = new Date()                                // 此刻的时间
  const h = String(now.getHours()).padStart(2, "0")     // 时
  const m = String(now.getMinutes()).padStart(2, "0")   // 分
  const s = String(now.getSeconds()).padStart(2, "0")   // 秒
  clockEl.textContent = h + ":" + m + ":" + s
}

updateClock()                     // 打开页面先立刻显示一次
setInterval(updateClock, 1000)    // 之后每 1 秒刷新一次
