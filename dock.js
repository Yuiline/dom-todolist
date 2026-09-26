// ---------- 左侧菜单：展开 / 收起 ----------

const dock = document.getElementById("dock")
const dockToggle = document.getElementById("dockToggle")

// 点一下加上 open 类（展开），再点一下去掉（淡出）
dockToggle.addEventListener("click", function () {
  dock.classList.toggle("open")
})
